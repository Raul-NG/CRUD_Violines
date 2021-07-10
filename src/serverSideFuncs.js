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
            _campus     =   row[10]
        );
    });
}

function deleteById(id){
    const workSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Voluntarios");
    const idColumn = workSheet.getRange(2, 6, workSheet.getLastRow() - 1, 1).getValues().map((row) => {return row[0]});
    rowPosition = idColumn.indexOf(id) + 2;
    workSheet.deleteRow(rowPosition === 1 ? 0 : rowPosition);
}