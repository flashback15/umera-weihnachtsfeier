// In Google Sheets: Erweiterungen > Apps Script, hier einfuegen, als Web-App bereitstellen
// (Ausfuehren als: Ich, Zugriff: Jeder) und die URL in index.html bei ENDPOINT eintragen.
const HEADER = ["Zeitpunkt", "Name", "Begleitung", "Wichteln", "Tabak", "Virginia %", "Dark Blend %", "Wunsch"];
const FIELDS = ["name", "begleitung", "wichteln", "tabak", "virginia", "dark", "wunsch"];

function doPost(e) {
  const p = e.parameter;
  if (!p.name || !p.name.trim()) return reply(false);

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADER);
  // Fuehrende =, +, -, @ entschaerfen, damit Eingaben nicht als Formeln laufen.
  const clean = v => String(v || "").slice(0, 500).replace(/^[=+\-@]/, "'$&");
  sheet.appendRow([new Date(), ...FIELDS.map(k => clean(p[k]))]);
  return reply(true);
}

function reply(ok) {
  return ContentService.createTextOutput(JSON.stringify({ ok })).setMimeType(ContentService.MimeType.JSON);
}
