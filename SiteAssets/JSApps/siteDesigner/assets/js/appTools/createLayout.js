var calendarWebPart;
var newsWebPart;

function createBlankLayout() {
 applyLayoutBtn.disabled=true; 
 applyLayoutBtn.innerHTML='<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> Applying...';

 var contextClientBL = new SP.ClientContext(siteRelURL);
 var webBLThis = contextClientBL.get_web();
 var webBL = contextClientBL.get_site().get_rootWeb();
 console.log(webBL);
 var listBL = webBL.get_lists().getById('A5DAAFF4-C427-4F00-AC03-454B83AE83DB');
 var pageLayoutItem = listBL.getItemById(435);

    contextClientBL.load(webBLThis);
    contextClientBL.load(pageLayoutItem);

    contextClientBL.executeQueryAsync(function () {
        var pubWeb = SP.Publishing.PublishingWeb.getPublishingWeb(contextClientBL, webBLThis);
        var pubWebInfo = new SP.Publishing.PublishingPageInformation();
        pubWebInfo.set_name("start.aspx");
        pubWebInfo.set_pageLayoutListItem(pageLayoutItem);
        var newPage = pubWeb.addPublishingPage(pubWebInfo);
        contextClientBL.load(newPage);

        contextClientBL.executeQueryAsync(function() {
            try {
                var pageItem = newPage.get_listItem();
                pageItem.set_item("Title", webBLThis.get_title());
                pageItem.update();
                contextClientBL.load(pageItem);
                

                contextClientBL.executeQueryAsync(function(){
                    Materialize.toast('<b>Success!<b><br> The layout has been created' , 8000, 'successToast');
                     applyLayoutBtn.disabled=false;
                    applyLayoutBtn.innerHTML='Apply Layout';
                 }, Function.createDelegate(this, logError));
                }
                catch (e) {
                    Materialize.toast('<b>Error -<b><br> Updating Field!', 8000, 'failToast');
                    applyLayoutBtn.innerHTML='Layout Exists';
                    }
            }, Function.createDelegate(this, logError));
        });
}
    function logError(sender, args) {
        Materialize.toast('<b>Error!<b><br>' + args.get_message() + '\n', 8000, 'failToast');
         applyLayoutBtn.disabled=false;
 applyLayoutBtn.innerHTML='Apply Layout';
    }

///////////////////////////////////////////////////////////////////

//Add WebPart Function for All Web Parts//
function addWebPart(webUrl, pageUrl,webPartXml,zoneId,zoneIndex, Success,Error){
    
    var context = new SP.ClientContext(webUrl);
    var web = context.get_web();
    var file = web.getFileByServerRelativeUrl(webUrl + pageUrl);
    var webPartMngr = file.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);
    var webPartDef = webPartMngr.importWebPart(webPartXml);
    var webPart = webPartDef.get_webPart();
    webPartMngr.addWebPart(webPart, zoneId, zoneIndex);

    context.load(webPart);
    context.executeQueryAsync(
      function() {
        Success(webPart);
      },
      Error
    );
}

function addWebPartsButton() {
    applyAppInstallBtn.disabled=true; 
    applyAppInstallBtn.innerHTML='<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> Installing...';


//Add news app
if (document.getElementById('addNewsApp').checked == true) {
newsWebPart = '<?xml version="1.0" encoding="utf-8"?>' +
'<WebPart xmlns="http://schemas.microsoft.com/WebPart/v2">' +
    '<Assembly>Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly>' + 
    '<TypeName>Microsoft.SharePoint.WebPartPages.ContentEditorWebPart</TypeName>' + 
    '<Title>News</Title>' +
    '<Width>800px</Width>' +
    '<ZoneID>Center%20Left</ZoneID>' +
    '<Description>$Resources:core,ContentEditorWebPartDescription;</Description>' +
    '<ContentLink xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor">/siteassets/jsapps/GlobalNewsApp/NewsApp.aspx</ContentLink>'+
    '<PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>' +
'</WebPart>';
addWebPart(siteRelURL, 'Pages/start.aspx', newsWebPart, 'Center Left', 1, function(webPart){
    console.log(webPart.get_title() + ' has been added'); 
},function(sender,args){
    console.log(args.get_message());
});
} else {
    console.log('not checked');
}

//add calendar
if (document.getElementById('calendarApp').checked == true) {
    var contextCalendar = new SP.ClientContext.get_current().get_site().getCustomListTemplates(
    SP.ClientContext.get_current().get_web());
    var calendarInfo = new SP.ListCreationInformation();
    calendarInfo.set_title("Calendar");
    calendarInfo.set_description('Calendar App');
    calendarInfo.set_templateType('106');
    calendarInfo.set_templateFeatureId(
        '00bfea71-ec85-4903-972d-ebe475780106');
    var contextCalendar2 = new SP.ClientContext(siteRelURL);
    contextCalendar2.get_web().get_lists().add(calendarInfo);
    contextCalendar2.executeQueryAsync(function () {
    addGetCalendarGUID();
},function(sender,args){
    console.log(args.get_message());
    addGetCalendarGUID();
});
    } else {
    console.log('calendar not checked');
    }
}

function addGetCalendarGUID() { 
    var contextCalendar3 = new SP.ClientContext(siteRelURL);
    var getCalId = contextCalendar3.get_web().get_lists().getByTitle('Calendar');
    contextCalendar3.load(getCalId, 'Id');
    contextCalendar3.executeQueryAsync(function () {
    calId = getCalId.get_id().toString();
    console.log(calId);
    calendarWebPart = '<?xml version="1.0" encoding="utf-8" ?>' +
'<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">' +
'<Assembly>Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly>' +
'<TypeName>Microsoft.SharePoint.WebPartPages.ListViewWebPart</TypeName>' +
'<Title>Calendar</Title>' +
'<ListName xmlns="http://schemas.microsoft.com/WebPart/v2/ListView">{'+calId+'}</ListName>' +
'<ViewContentTypeId xmlns="http://schemas.microsoft.com/WebPart/v2/ListView">0x</ViewContentTypeId>' +
'</WebPart>';
    console.log(calendarWebPart);
    },function(sender,args){
    console.log(args.get_message());
    });
    window.setTimeout(function(){
    applyAppInstallBtn.disabled=false;
    addCalendarWebPart();
    applyAppInstallBtn.innerHTML='Install';
     },3500);
}

    function addCalendarWebPart() {
        console.log(calId);
    addWebPart(siteRelURL, 'Pages/start.aspx', calendarWebPart, 'Footer', 1, function(webPart){
},function(sender,args){
    console.log(args.get_message());
        });
    }

    //Add



