
export function onOpen() {//e: GoogleAppsScript.Events.SheetsOnOpen) {
  const menu = SpreadsheetApp.getUi().createAddonMenu();
  menu.addItem('Show Dialog', 'showDialog_').addToUi();
}

export function onInstall() {//e: GoogleAppsScript.Events.AddonOnInstall) {
  onOpen();
  showDialog_();
}

export function showDialog_() {
  const output = HtmlService.createTemplateFromFile('build/index.html').evaluate();
  output.setTitle('Hello World');
  SpreadsheetApp.getUi().showModalDialog(output, 'Hello World');
}

export function getServerHello() {
  return SpreadsheetApp.getActive().getName();
}

export function greetingsBack(msg: string) {
  Logger.log(msg);
}
