function loadPartialHTML_(partial){
    const htmlServ = HtmlService.createTemplateFromFile(partial);
    return htmlServ.evaluate().getContent();
}

function loadSearchView(){
    return loadPartialHTML_("search");
}

function loadAddVolunteerView(){
    return loadPartialHTML_("add");
}

function loadEditVolunteerView(){
    return loadPartialHTML_("edit");
}