# Hueniverse 🌈

**Semesterprojekt — Interaktive Medien II**  
_FHGR — 2. Semester, Juni 2026_

---

## Projektübersicht

**Hueniverse** ist eine interaktive Webanwendung zur Erkundung und Analyse von Farben. Das Projekt kombiniert moderne Webtechnologien mit einer benutzerfreundlichen Oberfläche, um Nutzern zu ermöglichen, Farben zu suchen, zu entdecken und mehr über sie zu erfahren.

### Kernfeatures

- **Farbsuche**: Suche nach Farben über HEX-Codes oder einen interaktiven Farbwähler
- **KI-gestützte Farbbeschreibungen**: Generiere automatisch kreative Beschreibungen für Farben mittels Google Gemini API
- **Sternen-Hintergrund**: Animierter Weltraum-Hintergrund für ein immersives Erlebnis
- **Responsive Design**: Optimiert für Desktop und mobile Geräte
- **Performance**: Schnelle Ladezeiten mit optimierten Assets

---

## Projektstruktur

```
Semesterprojekt_IM_2/
├── index.html              # Hauptseite (Startseite)
├── colors.html             # Farbergebnisseite
├── loadingscreen.html      # Ladebildschirm
├── README.md               # Projektdokumentation (diese Datei)
├── api/
│   └── color-text.php      # Backend-API für Farbbeschreibungen (Gemini AI)
├── css/
│   └── style.css           # Hauptstylesheets
├── js/
│   └── script.js           # JavaScript-Logik und Interaktivität
├── fonts/
│   └── Audiowide/          # Benutzerdefinierte Font-Familie
└── img/                    # Bilder und Icons (Logo, Lupe-Icon, etc.)
```

---

## Technologie-Stack

### Frontend

- **HTML5**: Semantische Markup-Struktur
- **CSS3**: Modernes Styling mit Animationen und Flexbox/Grid
- **JavaScript (ES6+)**: Interaktive Funktionalität und DOM-Manipulation
- **Pickr Color Picker**: Externe Bibliothek für den Farbwähler

### Backend

- **PHP**: Serverseitiges Scripting für API-Anfragen
- **Google Gemini API**: KI-Modell für Farbbeschreibungen (Modell: `gemini-2.5-flash-lite`)

### Fonts & Icons

- **Noto Sans** (Google Fonts): Hauptschriftart
- **Audiowide**: Benutzerdefinierte Schriftart für besondere Hervorhebungen
- **Custom SVG Icons**: Logo und Lupe-Icon

---

## Seite hosten

- Um die Seite zu hosten, muss die der Ordner `.vscode-example` umbenannt werden zu `.vscode`.
- Anschliessend muss die Datei `sftp-example.json` umbenannt werden zu `sftp.json`.
- In `sftp.json` müssen alle Platzhaltertexte ersetzt werden.
- sftp.json darf nicht auf GITHub geladen werden.

---

## HTML-Seiten

### 1. `index.html` — Startseite

Die Landingpage des Projekts mit:

- **Logo**: Hueniverse-Branding
- **HEX-Code-Eingabe**: Manuelle Eingabe eines HEX-Farbcodes
- **Farbwähler**: Interaktiver Pickr Color Picker
- **Suchfunktionen**: Buttons zum Auslösen der Farbsuche
- **Sternen-Hintergrund**: CSS-animierter Weltraum-Effekt

### 2. `colors.html` — Farbergebnis-Seite

Zeigt die Ergebnisse der Farbsuche an mit:

- Farbvisualisierung und Details
- Von der KI generierte Farbbeschreibung
- Navigation zurück zur Startseite

### 3. `loadingscreen.html` — Ladebildschirm

Animierter Ladebildschirm, der während der API-Abfrage angezeigt wird.

---

## CSS Styling (`css/style.css`)

Das Stylesheet umfasst:

- **Global Styles**: Reset, Basisformatierung
- **Custom Fonts**: Audiowide-Font für Branding
- **Farbschema**: Dunkler Hintergrund (#000) mit weissem Text für hohen Kontrast
- **Animationen**: Sternen-Hintergrund, Lade-Animationen, Übergänge
- **Responsive Design**: Mobile-first Ansatz mit Media Queries
- **Component-Styling**: Header, Search-Bar, Color-Picker, Buttons, etc.

### Besondere Features

- **Stars-Background**: Animierte Sterne mit Parallax-Effekt
- **Search-Container**: Flex-basiertes Layout für Eingabefelder
- **Color-Picker**: Styling für Pickr-Komponente
- **Error-Messages**: Visuelles Feedback für ungültige Eingaben

---

## JavaScript Logik (`js/script.js`)

### Hauptfunktionalitäten

#### 1. Farbwähler-Integration (Pickr)

```javascript
// Initialisiert den Pickr Color Picker
const pickr = Pickr.create({...})
```

- Reagiert auf Farbänderungen
- Speichert den ausgewählten HEX-Wert
- Aktualisiert die UI mit der Farbvorschau

#### 2. HEX-Code-Suche

- `searchHex()`: Validiert HEX-Eingabe und leitet zur Ergebnis-Seite
- Fehlervalidierung für ungültige HEX-Codes
- Anzeige von Fehlermeldungen

#### 3. Farbsuche mittels Picker

- `searchColor()`: Startet die Suche mit der gewählten Farbe
- Übergabe der Farbdaten an die API

#### 4. API-Integration

- Kommunikation mit der Backend-API (`api/color-text.php`)
- Übergabe des HEX-Codes und der Farbe
- Verarbeitung der Antwort mit KI-generierter Beschreibung
- Fehlerbehandlung und Logging

#### 5. Ladebildschirm-Management

- Anzeige eines Lade-Spinners während der API-Anfrage
- Übergang zur Ergebnisseite nach erfolgreicher Abfrage

---

## Backend-API (`api/color-text.php`)

### Zweck

Die PHP-API dient als Mittler zwischen dem Frontend und der Google Gemini API.

### Funktionsweise

1. **Request-Verarbeitung**
   - Akzeptiert nur POST-Anfragen mit JSON-Payload
   - CORS-Header ermöglichen Cross-Origin-Requests
   - Validiert Eingabedaten

2. **Farbbeschreibung-Generierung**
   - Sendet den Farbnamen/Hex-Code an Google Gemini API
   - Modell: `gemini-2.5-flash-lite` (performant und kosteneffizient)
   - Generiert kreative, kontextbezogene Beschreibungen

3. **Response**
   - Gibt JSON mit Beschreibung und Metadaten zurück
   - Fehlerbehandlung mit aussagekräftigen Meldungen

### API-Konfiguration für Gemini AI

Hier ist es wichtig, dass die PHP-Datei `color-text.php` aufgrund des API-Keys nur auf dem Server gehostet wird, aber nicht auf GITHub geladen wird. Das wird in der .gitignore Datei bereits definiert. Der API-Key darf auf keinen Fall für andere Personen ersichtlich sein.

Damit die API-Anfrage an Gemini AI korrekt funktioniert, muss folgendes gemacht werden:

- Datei `[color-text-example.php](api/color-text-example.php)` umbenennen zu `color-text.php`
- Auf https://ai.google.dev/gemini-api/docs/api-key?hl=de einen API-Key erstellen & diesen kopieren
- in `color-text.php` in Zeile 1 den Platzhalter `"HIER KOMMT DER API KEY"` durch den API-Key ersetzen:

```php
$GEMINI_API_KEY = 'HIER KOMMT DER API KEY';
$MODEL = 'gemini-2.5-flash-lite';
```

---

## Assets

### Fonts (`fonts/Audiowide/`)

- **Audiowide-Regular.ttf**: Custom Font für visuelles Branding
- **OFL.txt**: Lizenzinformation (Open Font License)

### Images (`img/`)

- **Logo_Hueniverse.svg**: Hauptlogo der Anwendung
- **Lupe_Icon.svg**: Such-Icon für Buttons
- Weitere Grafiken und Illustrationen

---

## Verwendung

### Installation & Ausführung

1. **Repository klonen/öffnen**

   ```bash
   cd Semesterprojekt_IM_2
   ```

2. **Lokalen Server starten**
   - PHP-Server: `php -S localhost:8000`
   - Oder Apache/Nginx konfigurieren

3. **Im Browser öffnen**
   ```
   http://localhost:8000/index.html
   ```

### Benutzerfluss

1. **Startseite (index.html)**
   - Wähle zwischen HEX-Code-Eingabe oder Farbwähler
   - Klicke auf "Suchen"

2. **Ladebildschirm (loadingscreen.html)**
   - Warte auf API-Response

3. **Ergebnisseite (colors.html)**
   - Betrachte die Farbe und die KI-generierte Beschreibung
   - Klicke "Zurück" zur Startseite für eine neue Suche

---

## Besonderheiten

### 1. Responsive Design

- Optimiert für alle Bildschirmgrössen
- Flexibles Layout mit modernem CSS

### 2. Benutzerfreundliche UI/UX

- Intuitive Suchfunktionen
- Visuelle Feedback (Fehlermeldungen, Animationen)
- Barrierefreiheit (Aria-Labels, semantisches HTML)

### 3. KI-Integration

- Google Gemini API für natürlichsprachige Farbbeschreibungen
- Kontextbezogene und kreative Ausgaben
- Da kein Abo gelöst ist, sind nur ein paar Anfragen nacheinander möglich, dann muss man wieder warten

### 4. Animations & Visuelle Effekte

- Weltraum-Hintergrund mit animierten Sternen
- Smooth Transitions und Übergänge
- Loading-Spinner während API-Requests
- Alles ist im transparenten Glas-Stil gehalten

---

## Code-Highlights

### HEX-Validierung

Das Projekt validiert HEX-Codes auf Korrektheit (6-stelliger Hex mit #-Präfix).

### Error Handling

Umfassende Fehlerbehandlung auf Frontend und Backend:

- Ungültige HEX-Codes
- API-Fehler
- Netzwerkprobleme

### Performance

- Lazy Loading von Assets
- Optimierte CSS und JavaScript
- Effiziente API-Anfragen mit Timeout-Handling

---

## Lernziele & Kompetenzen

Dieses Projekt demonstriert:

- HTML5 Semantik und Best Practices
- Modernes CSS3 mit Animationen
- JavaScript ES6+ und DOM-Manipulation
- Asynchrone Programmierung (Fetch API)
- Backend-Entwicklung mit PHP
- REST API Integration (Google Gemini)
- CORS und HTTP-Header Management
- Responsive Web Design
- UX/UI Best Practices
- Projektstrukturierung und Dokumentation

---

## Lizenz

Fonts: Open Font License (OFL)  
Projekt: FHGR Semesterprojekt 2026

---

## Autoren

**Elena Ryser, mmp25cv**  
FHGR — Multimedia Production  
2. Semester — Juni 2026

**Cátia Mata Guerreiro, mmp25cv**  
FHGR — Multimedia Production  
2. Semester — Juni 2026

---

## Support & Kontakt

Bei Fragen oder Problemen bitte ein Issue im Repository erstellen.

---

**Viel Spass beim Erkunden von Hueniverse! 🚀🌈**
