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

## Inhaltsverzeichnis

- [Projektübersicht](#projektübersicht)
  - [Kernfeatures](#kernfeatures)
- [Dokumentation über die Projektarbeit](#dokumentation-über-die-projektarbeit)
  - [Herausforderungen](#herausforderungen)
  - [Figma vs. Endprodukt](#figma-vs-endprodukt)
  - [Zusammenarbeit](#zusammenarbeit)
  - [User Testing](#user-testing)
  - [Learnings](#learnings)
  - [Fazit](#fazit)
- [Projektstruktur](#projektstruktur)
- [Technologie-Stack](#technologie-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Fonts & Icons](#fonts--icons)
- [Seite hosten](#seite-hosten)
- [HTML-Seiten](#html-seiten)
  - [index.html](#1-indexhtml--startseite)
  - [colors.html](#2-colorshtml--farbergebnis-seite)
  - [loadingscreen.html](#3-loadingscreenhtml--ladebildschirm)
- [CSS Styling](#css-styling-cssstylecss)
  - [Besondere Features](#besondere-features)
- [JavaScript Logik](#javascript-logik-jsscriptjs)
  - [Hauptfunktionalitäten](#hauptfunktionalitäten)
- [Backend-API](#backend-api-apicolor-textphp)
  - [Funktionsweise](#funktionsweise)
  - [API-Konfiguration für Gemini AI](#api-konfiguration-für-gemini-ai)
- [Assets](#assets)
- [Verwendung](#verwendung)
- [Besonderheiten](#besonderheiten)
- [Code-Highlights](#code-highlights)
- [Autoren](#autoren)
- [Support & Kontakt](#support--kontakt)

---

## Dokumentation über die Projektarbeit

### Herausforderungen

- `Zusammenarbeit auf GitHub:` Es war anfangs schwierig, die Zusammenarbeit mit GitHub zum Laufen zu kriegen. Wir haben dann aber gemerkt, dass es nur ein Synchronisierungsfehler auf dem Server war und wir lediglich in Visual Studio Code in der Dateiübersicht die Datei manuell nochmals uploaden mussten mit "Upload File". Ab da hat es problemlos funktioniert.

- `Nutzerfreundlichkeit:` Ein wichtiges Ziel unseres Projekts war es, die Benutzererfahrung auf mobilen Geräten möglichst benutzerfreundlich zu gestalten. Deshalb haben wir uns bei den Farbvorschlägen für eine Karussell-Lösung entschieden. So können Nutzerinnen und Nutzer auf kleineren Bildschirmen bequem durch die Vorschläge swipen.

- `Einbindung der API für Textgenerierung:` Die API-Schnittstelle zur Textgenerierung der Farben wollten wir ursprünglich zu OpenAI erstellen, was sich aber leider als unmöglich herausstellte. Der Grund war, dass OpenAI ihr Angebot umgestellt hat und nur noch bezahlte Modelle anbot. Daher wechselten wir dann auf die Schnittstelle zu Gemini AI, die dann problemlos funktionierte (für eine gewisse Anzahl an Anfragen aufs Mal).

- `Lottie-Animation:` Die Einbindung des Ladescreens zwischen der Anfrage an die API auf der Seite index.html und der Ladezeitüberbrückung mit dem Lottie-File war etwas fordernd, da wir das mit asynchroner Ladezeit lösen mussten, damit währenddessen im Hintergrund alle Daten geladen werden.

- `Karussell mit den berechneten Farbwerten:` Eine Herausforderung bestand darin, das Karussell zunächst in Figma korrekt einzurichten, da wir diese Funktion zuvor noch nie verwendet hatten. Anschliessend mussten wir die Lösung mit JavaScript umsetzen. Mithilfe von YouTube-Tutorials und eigener Internetrecherche konnten wir diese Herausforderung erfolgreich meistern.

- `Farbpicker:` Eine weitere Herausforderung war die Umsetzung des Farbpickers. In Figma benötigten wir lediglich ein Bild als Platzhalter. Für die Website wollten wir jedoch eine interaktive Lösung integrieren. Nach einiger Recherche fanden wir heraus, dass sich ein Farbpicker direkt aus dem Internet einbinden lässt, ohne zusätzliche Programme installieren zu müssen.

### Figma vs. Endprodukt

Unsere Webseite sieht nahezu identisch aus, wie in unserem vorgängig designten Figma-UX. Wir haben jedoch ein paar kleine Animationen weggelassen und die Hintergrundfarben der transparenten "Glasflächen" von der Transparenz etwas angepasst.

Während Figma vor allem zur Gestaltung und Visualisierung diente, konnten wir im Endprodukt zusätzliche interaktive Funktionen umsetzen. Ein Beispiel dafür ist der Farbpicker, der in Figma lediglich als statisches Element dargestellt wurde, auf der Website jedoch vollständig interaktiv genutzt werden kann.

Auch das Karussell für die Farbvorschläge mussten wir technisch umsetzen und an verschiedene Bildschirmgrössen anpassen.

### Zusammenarbeit

Unsere Zusammenarbeit im Team verlief sehr gut und effizient. Wir konnten die Aufgaben sinnvoll aufteilen, wobei sich Cátia primär um das CSS und Elena um das JavaScript gekümmert hat. Durch diese ergänzende Arbeitsweise und die parallele Entwicklung an verschiedenen Funktionen kamen wir zügig voran. Mithilfe von GitHub haben wir unsere Änderungen zudem regelmässig zusammengeführt, was es uns ermöglichte, jederzeit effizient zu arbeiten und den Überblick über den Projektstand zu behalten.

### User Testing

Unsere Webseite haben wir zwischenzeitlich immer wieder von Bekannten testen lassen, die nicht in unser Projekt eingeweiht waren. Dabei hat sich herausgestellt, dass eine Eingabevalidierung auf der Startseite sehr praktisch wäre, was wir dann beim HEX-Button, bei dem man manuell den HEX-Code eingeben kann, auch noch integriert haben.

### Learnings

- `Kollaboration auf GitHub:` Das war unser erstes Projekt, bei dem wir über GitHub kollaboriert haben. Es hat sich als sehr praktisch herausgestellt, weil man so immer die Änderungen des anderen Verfolgen kann und immer eine Sicherung des vorherigen Standes hat.
- `Arbeit mit APIs:` Die Arbeit mit einer API haben wir noch nie so umgesetzt, daher war es sehr spannend, einen Einblick in diese Thematik zu erhalten.
- `Einsetzen von JavaScript:` Während des Projekts haben wir viel über JavaScript gelernt. Besonders die Umsetzung des Karussells und die Integration des Farbpickers haben uns geholfen, unsere Programmierkenntnisse zu erweitern.
- `Debugging:` Zudem haben wir gelernt, technische Probleme selbstständig mit Hilfe von Tutorials und Internetrecherchen zu lösen.

### Fazit

Durch die Umsetzung des responsiven Designs und des Karussells konnten wir die Bedienung auf mobilen Geräten deutlich verbessern. Besonders das intuitive Wischen durch die Farbvorschläge und der interaktive Farbpicker tragen massgeblich zu einer angenehmen und benutzerfreundlichen Erfahrung bei. Wir sind sehr stolz auf das Endergebnis; das Projekt hat uns nicht nur fachlich viel beigebracht, sondern auch gezeigt, wie wichtig gute Teamarbeit und selbstständiges Problemlösen in der modernen Webentwicklung sind.

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

- **HTML**: Semantische Markup-Struktur
- **CSS**: Modernes Styling mit Animationen und Flexbox/Grid
- **JavaScript**: Interaktive Funktionalität und DOM-Manipulation
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
- sftp.json darf nicht auf GitHub geladen werden.

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

Hier ist es wichtig, dass die PHP-Datei `color-text.php` aufgrund des API-Keys nur auf dem Server gehostet wird, aber nicht auf GitHub geladen wird. Das wird in der .gitignore Datei bereits definiert. Der API-Key darf auf keinen Fall für andere Personen ersichtlich sein.

Damit die API-Anfrage an Gemini AI korrekt funktioniert, muss folgendes gemacht werden:

- Datei `color-text-example.php` umbenennen zu `color-text.php`
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

1. **Startseite (index.html)**
   - Wähle zwischen HEX-Code-Eingabe oder Farbwähler
   - Klicke auf "Suchen"

2. **Ladebildschirm (loadingscreen.html)**
   - Warte auf API-Response

3. **Ergebnisseite (colors.html)**
   - Betrachte die Farbe und die KI-generierte Beschreibung
   - Kopiere mit Klick auf das Kopier-Icon einen der Codes
   - Klicke auf das Logo, um wieder zur Startseite zu kommen oder gib oben einen neuen Hex-Code ein oder wähle mit dem Farbwähler eine neue Farbe

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
