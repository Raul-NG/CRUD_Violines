const TIME_ZONE = "America/Mexico_City"; //Ver los formatos de las zonas horarias en https://developers.google.com/adwords/api/docs/appendix/codes-formats#expandable-22

function loadMainForm() {
    const htmlServ = HtmlService.createTemplateFromFile("main");
    const html = htmlServ.evaluate();
    html.setWidth(1200).setHeight(600);
    const ui = SpreadsheetApp.getUi();
    ui.showModalDialog(html, "Registro de Voluntarios");
}

function onOpen(){
    const ui = SpreadsheetApp.getUi();
    const menu = ui.createMenu("CRUD");
    menu.addItem("Abrir CRUD", "loadMainForm");
    menu.addToUi();
}

function requestView(view){
    const htmlServ = HtmlService.createTemplateFromFile(view);
    return htmlServ.evaluate().getContent();
}

function getDataForSearch() {
    const workSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Voluntarios");
    return workSheet.getRange(2, 1, workSheet.getLastRow() - 1, 17).getValues().map((row) => {
        return new Volunteer(
            _id         =   row[5],
            _name       =   row[4],
            _region     =   row[2],
            _department =   row[11],
            _period     =   row[3],
            _project    =   row[12],
            _campus     =   row[10],
            _timeStamp  =   Utilities.formatDate(row[0], TIME_ZONE, 'MMMM dd, yyyy 12:00:00 Z')
        );
    });
}

function deleteVolunteer(timeStamp){
    const workSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Voluntarios");
    const timeStampColumn = workSheet.getRange(2, 1, workSheet.getLastRow() - 1, 1).getValues().map((row) => {return Utilities.formatDate(row[0], TIME_ZONE, 'MMMM dd, yyyy 12:00:00 Z')});
    rowPosition = timeStampColumn.indexOf(timeStamp) + 2;
    workSheet.deleteRow(rowPosition === 1 ? 0 : rowPosition);
}