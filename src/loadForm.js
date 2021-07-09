function loadMainForm() {
    const htmlServ = HtmlService.createTemplateFromFile("main");
    const html = htmlServ.evaluate();
    html.setWidth(1200).setHeight(600);
    const ui = SpreadsheetApp.getUi();
    ui.showModalDialog(html, "Registro de Voluntarios");
}

function createMenu_(){
    const ui = SpreadsheetApp.getUi();
    const menu = ui.createMenu("CRUD");
    menu.addItem("Abrir CRUD", "loadMainForm");
    menu.addToUi();
}

function onOpen(){
    createMenu_();
}