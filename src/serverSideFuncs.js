function getDataForSearch(){
    // Optimizar
    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const workSheet = spreadSheet.getSheetByName("Voluntarios");
    Logger.log(workSheet);
    return workSheet.getRange(2,1,workSheet.getLastRow() - 1, 15).getValues(); // workSheet.getDataRange().getValues();
}