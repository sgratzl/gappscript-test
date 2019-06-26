import 'core-js/features/string/starts-with';

export function onOpen() {//e: GoogleAppsScript.Events.SheetsOnOpen) {
  const menu = SpreadsheetApp.getUi().createAddonMenu();
  menu.addItem('Show Dialog', 'showDialog_').addToUi();
}

export function onInstall() {//e: GoogleAppsScript.Events.AddonOnInstall) {
  onOpen();
  showDialog_();
}

export function showDialog_() {
  const output = HtmlService.createTemplateFromFile('build/dialog.html').evaluate();
  output.setTitle('Hello World');
  SpreadsheetApp.getUi().showModalDialog(output, 'Hello World');
}

export function getServerHello() {
  const s = SpreadsheetApp.getActive().getName();
  return `${s} - ${s.startsWith('test')}`;
}

export function greetingsBack(msg: string) {
  Logger.log(msg);
}
