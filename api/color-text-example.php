<?php $GEMINI_API_KEY = 'HIER KOMMT DER API KEY'; 
$MODEL = 'gemini-2.5-flash-lite'; 

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Nur POST erlaubt']);
    exit;
}

$raw = file_get_contents('php://input');
$input = json_decode($raw, true);

if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Ungültiges JSON']);
    exit;
}

$colorName = trim($input['colorName'] ?? '');
if ($colorName === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'colorName fehlt']);
    exit;
}

$systemPrompt = "Du bist ein Sprachassistent für Farbwirkungstexte. Antworte AUSSCHLIESSLICH mit einem gültigen JSON-Objekt, nichts anderes.

Struktur:
{
  \"keywords\": \"Wort1 – Wort2 – Wort3\",
  \"text\": \"Vier bis fünf Sätze, insgesamt maximal 50 Wörter. Poetisch, emotional, bildhaft.\"
}

WICHTIG: 
- Nur JSON, keine zusätzlichen Zeichen
- Keine Markdown-Formatierung
- Keine Erklärungen vor oder nach dem JSON
- Beide Felder müssen vorhanden sein";

$userPrompt = "Farbe: #{$colorName}

Erstelle für diese Farbe:

1. keywords: Drei prägnante, emotionale Adjektive (getrennt durch Komma)

2. text: Ein kurzer, fließender Absatz mit 4-5 Sätzen über:
   - Wie wirkt die Farbe optisch?
   - Welche Gefühle/Assoziationen hat sie?
   - Was macht sie psychologisch aus?

Antworte nur mit dem JSON, keine anderen Zeichen.";

$payload = [
    'contents' => [
        ['role' => 'user', 'parts' => [['text' => $systemPrompt . "\n\n" . $userPrompt]]]
    ],
    'generationConfig' => [
        'temperature' => 0.7,
        'topP' => 0.95,
        'topK' => 40,
        'maxOutputTokens' => 2000
    ]
];

$url = "https://generativelanguage.googleapis.com/v1beta/models/{$MODEL}:generateContent?key=" . $GEMINI_API_KEY;

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'x-goog-api-client: gen-lang-client-0264449366'
    ],
    CURLOPT_POSTFIELDS => json_encode($payload)
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'cURL-Fehler', 'details' => $curlError]);
    exit;
}

if ($httpCode >= 400) {
    http_response_code($httpCode);
    echo $response;
    exit;
}

$data = json_decode($response, true);
$content = $data['candidates'][0]['content']['parts'][0]['text'] ?? '{}';

// DEBUG: Speichert die volle ursprüngliche Länge
$original_length = strlen($content);

// Bereinigt die Response & entfernt Kontrollzeichen
$content = trim($content);
$content = preg_replace('/[\x00-\x1F\x7F]/', '', $content); 
$content = str_replace(["\r", "\n", "\t"], [' ', ' ', ''], $content); 

// Entfernt Markdown-Code-Blöcke falls vorhanden
$content = preg_replace('/^```(?:json)?\s*|\s*```$/m', '', $content);
$content = trim($content);

// Extrahiert nur das JSON-Objekt
if (preg_match('/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/s', $content, $matches)) {
    $content = $matches[0];
}

// Versuche zu parsen
$ai = json_decode($content, true);

// Falls fehlgeschlagen, versucht es zu reparieren mit Regex
if (!$ai || empty($ai['text'])) {
    preg_match('/"keywords"\s*:\s*"([^"]*)"/', $content, $kw_match);
    
    // Für text: Versuche mehrere Patterns
    // Pattern 1: Normales Ende mit }
    if (preg_match('/"text"\s*:\s*"(.*?)"\s*\}/', $content, $text_match)) {
        // gefunden
    } 
    // Pattern 2: Text ohne schliessende Klammer
    elseif (preg_match('/"text"\s*:\s*"([^"]*)"/', $content, $text_match)) {
        // gefunden
    }
    // Pattern 3: Alles nach "text": "
    else {
        preg_match('/"text"\s*:\s*"(.*)/', $content, $text_match);
    }
    
    $ai = [
        'keywords' => $kw_match[1] ?? ($ai['keywords'] ?? ''),
        'text' => $text_match[1] ?? ($ai['text'] ?? '')
    ];
}

// Fallback: Falls immer noch nichts, erstelle leeres Object
if (!$ai) {
    $ai = ['keywords' => '', 'text' => ''];
}

echo json_encode([
    'ok' => true,
    'colorName' => $colorName,
    'keywords' => $ai['keywords'] ?? '',
    'text' => $ai['text'] ?? '',
    'debug' => [
        'original_length' => $original_length,
        'cleaned_length' => strlen($content),
        'raw_content' => $content,
        'parsed_ai' => $ai,
        'json_error' => json_last_error_msg()
    ]
], JSON_UNESCAPED_UNICODE);