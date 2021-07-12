const TIME_ZONE = "America/Mexico_City"; //Ver los formatos de las zonas horarias en https://developers.google.com/adwords/api/docs/appendix/codes-formats#expandable-22
var WORKSHEET = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Voluntarios");

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
    return WORKSHEET.getRange(2, 1, WORKSHEET.getLastRow() - 1, 17).getValues().map((row) => {
        return {
            id         :   row[5],
            name       :   row[4],
            region     :   row[2],
            department :   row[11],
            period     :   row[3],
            project    :   row[12],
            campus     :   row[10],
            timeStamp  :   Utilities.formatDate(row[0], TIME_ZONE, 'MMMM dd, yyyy HH:mm:ss Z')
        };
    });
}

function getVolunteerRow(timeStamp){
    const timeStampColumn = WORKSHEET.getRange(2, 1, WORKSHEET.getLastRow() - 1, 1).getValues();
    for (let row = 0; row < timeStampColumn.length; row++){ // Este tipo de for sirve para tener el índice de inmediato.
        if (Utilities.formatDate(timeStampColumn[row][0], TIME_ZONE, 'MMMM dd, yyyy HH:mm:ss Z') === timeStamp){
            return row + 2; //Las filas en la hoja empiezan en el indice 1. La primera fila es de títulos.
        }
    }
    return 0;
}

function deleteVolunteer(timeStamp){
    WORKSHEET.deleteRow(getVolunteerRow(timeStamp));
}

function getFullVolunteer(timeStamp){
    volunteer = WORKSHEET.getRange(getVolunteerRow(timeStamp), 1, 1, 17).getValues()[0];
    return {
        timeStamp           :   Utilities.formatDate(volunteer[0], TIME_ZONE, 'MMMM dd, yyyy HH:mm:ss Z'),
        ingressType         :   volunteer[1],
        region              :   volunteer[2],
        period              :   volunteer[3],
        name                :   volunteer[4],
        id                  :   volunteer[5],
        institutionalEmail  :   volunteer[6],
        personalEmail       :   volunteer[7],
        whatsApp            :   volunteer[8],
        career              :   volunteer[9],
        campus              :   volunteer[10],
        department          :   volunteer[11],
        project             :   volunteer[12],
        talent              :   volunteer[13],
        hours               :   volunteer[14],
        CAG                 :   volunteer[15],
        folderLink          :   volunteer[16]
    };
}

function updateVolunteer(volunteer){
    WORKSHEET.getRange(getVolunteerRow(volunteer.timeStamp), 2/*se salta la columna de timeStamp*/, 1, 16).setValues(
        [[volunteer.ingressType,
        volunteer.region,
        volunteer.period,
        volunteer.name,
        volunteer.id,
        volunteer.institutionalEmail,
        volunteer.personalEmail,
        volunteer.whatsApp,
        volunteer.career,
        volunteer.campus,
        volunteer.department,
        volunteer.project,
        volunteer.talent,
        volunteer.hours,
        volunteer.CAG,
        volunteer.folderLink]]);
}

