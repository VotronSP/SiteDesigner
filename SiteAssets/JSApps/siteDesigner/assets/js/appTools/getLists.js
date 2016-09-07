'use strict';

var getLists;
var oList;
var getTitle;
var contextGetLists;
var listUrl = '';
var newListTitle;
var listID;



function getSiteLists() {
contextGetLists = new SP.ClientContext(siteRelURL);
getLists = contextGetLists.get_web();
oList = getLists.get_lists();

  contextGetLists.load(getLists);
  contextGetLists.load(oList,'Include(Title, Id, DefaultViewUrl, ItemCount, BaseTemplate)');
  contextGetLists.executeQueryAsync(getListSucceeded, getListFailed);
}

function getListSucceeded() {
    console.log("Got the Lists");
    document.getElementById('site_title_header').innerHTML =  getLists.get_title();
    document.getElementById('contentStructure').src =  siteRelURL + '/_layouts/15/sitemanager.aspx?Source={WebUrl}_layouts/15/settings.aspx';
    populateLists();
    
function populateLists() {
    var listInfo = '', listCount = '';
    var listViews;
    var listEnumerator = oList.getEnumerator();

    while (listEnumerator.moveNext()) {
        oList = listEnumerator.get_current();
        listInfo = oList.get_title();
        listUrl = oList.get_defaultViewUrl();
        listCount = oList.get_itemCount();
        listID = oList.get_id();
        console.log("Retrieved all list items");
        
    if (oList.get_baseTemplate() != 101 && oList.get_baseTemplate() != 115) {
        document.getElementById('listInfo').innerHTML += 
                    '<li><div class="railwayFont collapsible-header active" style="font-size:20px;"><i class="fa fa-tasks" aria-hidden="true"></i>'+listInfo+'</div>' +
                    '<div class="collapsible-body"><span class="railwayFont" style="font-size:20x;"><b>Item Count:</b>' +listCount+
                    '<br></span><br>'+
                    '<button class="waves-effect waves-light btn" onClick="window.open(\''+siteRelURL+'/_layouts/15/listedit.aspx?List='+listID+'\');" data-uk-tooltip title="Settings will Open in a New Window" style="font-family: Raleway, sans-serif; font-size: 15px;" class="uk-button-success uk-button" type="button">View Settings</button>' +  
                    '<br><br>' +
                    '</div></li>';
    } else {
        //<a style="text-decoration: none !important; color: #fff;" target="_blank" href="'+siteRelURL+'/_layouts/15/listedit.aspx?List='+listID+'">Settings</a>
        document.getElementById('libInfo').innerHTML += 
                     '<li><div class="railwayFont collapsible-header active" style="font-size:20px;"><i class="fa fa-folder-open" aria-hidden="true"></i> '+listInfo+'</div>' +
                    '<div class="collapsible-body"><span class="railwayFont" style="font-size:20x;"><b>Item Count:</b>' +listCount+
                    '<br></span><br>' +
                    '<button class="waves-effect waves-light btn" onClick="window.open(\''+siteRelURL+'/_layouts/15/listedit.aspx?List='+listID+'\');" data-uk-tooltip title="Settings will Open in a New Window" style="font-family: Raleway, sans-serif; font-size: 15px;" class="uk-button-success uk-button" type="button">View Settings</button>' +  
                    '<br><br>' +
                    '</div></li>';
    }
                    
                     $('.collapsible').collapsible({
                     accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                    });

        }
    }
}



function getListFailed(sender, args) {
    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

function openCreateListModal() {
UIkit.modal.prompt('<span class="railwayFont" style="font-size: 25px;">New List Title:</span>', '', function(newListTitle){  

var createListContext = new SP.ClientContext(siteRelURL);
        var createListWebs = createListContext.get_web();
        var listCreationInformation = new SP.ListCreationInformation();
        listCreationInformation.set_title(newListTitle);
        listCreationInformation.set_templateType(SP.ListTemplateType.genericList);
        var cList = createListWebs.get_lists().add(listCreationInformation);
        createListContext.load(cList);
         createListContext.executeQueryAsync(createListSucceeded, createListFailed);

function createListSucceeded() {
    Materialize.toast('Success! The List '+cList.get_title()+' has been Successfully created.', 8000, 'successToast');
}

function createListFailed(sender, args) {
     Materialize.toast('ERROR! ' + args.get_message(), 8000, 'failToast');
     openCreateListModal();
}
});
}

function openCreateDocLibModal() {
UIkit.modal.prompt('<span class="railwayFont" style="font-size: 25px;">New Document Library Title:</span>', '', function(newDocLibTitle){  

var createDocLibContext = new SP.ClientContext(siteRelURL);
        var createDocLibWebs = createDocLibContext.get_web();
        var docLibCreationInformation = new SP.ListCreationInformation();
        docLibCreationInformation.set_title(newDocLibTitle);
        docLibCreationInformation.set_templateType(SP.ListTemplateType.documentLibrary);
        var cDocLib = createDocLibWebs.get_lists().add(docLibCreationInformation);
        createDocLibContext.load(cDocLib);
        createDocLibContext.executeQueryAsync(createListSucceeded, createListFailed);

function createListSucceeded() {
   Materialize.toast('Success! The Document Library '+cDocLib.get_title()+' has been Successfully created.', 8000, 'successToast');
}

function createListFailed(sender, args) {
    Materialize.toast('ERROR! ' + args.get_message(), 8000, 'failToast');
    openCreateDocLibModal();
}
});
}