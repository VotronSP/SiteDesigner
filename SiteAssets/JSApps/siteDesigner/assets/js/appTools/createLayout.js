var calendarWebPart;
var newsWebPart;
var flinksWebPart;
var rIconsWebPart;

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
                     applyLayoutBtn.disabled=true;
                     document.getElementById("projTemp").disabled = true;
        document.getElementById("funcTemp").disabled = true;
        document.getElementById("facilTemp").disabled = true;
        document.getElementById("regTemp").disabled = true;
        document.getElementById("applyLayoutBtn").disabled = true;
                    applyLayoutBtn.innerHTML='Apply Layout';
                 }, Function.createDelegate(this, logError));
                }
                catch (e) {
                    Materialize.toast('<b>Error -<b><br> Updating Field!', 8000, 'failToast');
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
if (document.getElementById('addNewsApp').checked == false && document.getElementById('calendarApp').checked == false
&& document.getElementById('resourceIconsApp').checked == false && document.getElementById('featuredLinksApp').checked == false
&& document.getElementById('discussionsBApp').checked == false) {
     applyAppInstallBtn.disabled=false;
     applyAppInstallBtn.innerHTML='Install';
    Materialize.toast('Error! You have not selected an app to install.', 5000, 'failToast');
} else {
applyAppInstallBtn.disabled=true; 
applyAppInstallBtn.innerHTML='<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> Installing...';
    //Add news app
if (document.getElementById('addNewsApp').checked == true) {
newsWebPart = '<?xml version="1.0" encoding="utf-8"?>' +
'<WebPart xmlns="http://schemas.microsoft.com/WebPart/v2">' +
    '<Assembly>Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly>' + 
    '<TypeName>Microsoft.SharePoint.WebPartPages.ContentEditorWebPart</TypeName>' + 
    '<Title>'+document.getElementById("site_title_header").innerHTML+' | News</Title>' +
    '<Width>800px</Width>' +
    '<FrameType>TitleBarOnly</FrameType>' +
    '<ZoneID>CenterLeftColumn</ZoneID>' +
    '<Description>$Resources:core,ContentEditorWebPartDescription;</Description>' +
    '<ContentLink xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor">/siteassets/jsapps/GlobalNewsApp/NewsApp.aspx</ContentLink>'+
    '<PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>' +
'</WebPart>';
addWebPart(siteRelURL, 'Pages/start.aspx', newsWebPart, 'CenterLeftColumn', 1, function(webPart){
     applyAppInstallBtn.disabled=false;
    addNewsApp.disabled=true;
    addNewsApp.checked=false;
    Materialize.toast('Success! The News App has been installed on your page.', 5000, 'successToast'); 
    applyAppInstallBtn.innerHTML='Install';
},function(sender,args){
    Materialize.toast('Error!' +args.get_message(), 5000, 'successToast');
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
'<Title>'+document.getElementById("site_title_header").innerHTML+' | Calendar</Title>' +
'<ZoneID>Footer</ZoneID>' +
'<FrameType>TitleBarOnly</FrameType>' +
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
     },5000);
}

    function addCalendarWebPart() {
    console.log(calId);
    addWebPart(siteRelURL, 'Pages/start.aspx', calendarWebPart, 'Footer', 1, function(webPart){
            applyAppInstallBtn.disabled=false;
    calendarApp.disabled=true;
    calendarApp.checked=false;
         Materialize.toast('Success! The Calendar App has been installed on your page.', 5000, 'successToast');
},function(sender,args){
    Materialize.toast('Error!' +args.get_message(), 5000, 'successToast');
        });
    }

//add Featured Links
if (document.getElementById('featuredLinksApp').checked == true) {
    var contextLinks = new SP.ClientContext.get_current().get_site().getCustomListTemplates(
    SP.ClientContext.get_current().get_web());
    var linksInfo = new SP.ListCreationInformation();
    linksInfo.set_title("Links");
    linksInfo.set_description('Featured Links');
    linksInfo.set_templateType('103');
    linksInfo.set_templateFeatureId(
        '00bfea71-2062-426c-90bf-714c59600103');
    var contextLinks2 = new SP.ClientContext(siteRelURL);
    contextLinks2.get_web().get_lists().add(linksInfo);
    contextLinks2.executeQueryAsync(function () {
    addFeaturedLinksGUID();
},function(sender,args){
    console.log(args.get_message());
    addFeaturedLinksGUID();
});
    } else {
    console.log('featured links not checked');
    }
function addFeaturedLinksGUID() { 
    var contextLinks3 = new SP.ClientContext(siteRelURL);
    var getLinksId = contextLinks3.get_web().get_lists().getByTitle('Featured Links');
    contextLinks3.load(getLinksId, 'Id');
    contextLinks3.executeQueryAsync(function () {
    linksId = getLinksId.get_id().toString();
    console.log(linksId);
    flinksWebPart = '<?xml version="1.0" encoding="utf-8" ?>' +
'<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">' +
'<Assembly>Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly>' +
'<TypeName>Microsoft.SharePoint.WebPartPages.ListViewWebPart</TypeName>' +
'<Title>Featured Links</Title>' +
'<ZoneID>CenterRightColumn</ZoneID>' +
'<FrameType>TitleBarOnly</FrameType>' +
'<ListName xmlns="http://schemas.microsoft.com/WebPart/v2/ListView">{'+linksId+'}</ListName>' +
'<ViewContentTypeId xmlns="http://schemas.microsoft.com/WebPart/v2/ListView">0x</ViewContentTypeId>' +
'</WebPart>';
    },function(sender,args){
    console.log(args.get_message());
    });
    window.setTimeout(function(){
    applyAppInstallBtn.disabled=false;
    addFeaturedLinks();
    applyAppInstallBtn.innerHTML='Install';
     },5000);
}

    function addFeaturedLinks() {
    addWebPart(siteRelURL, 'Pages/start.aspx', flinksWebPart, 'CenterRightColumn', 1, function(webPart){
             applyAppInstallBtn.disabled=false;
    featuredLinksApp.disabled=true;
    featuredLinksApp.checked=false;
         Materialize.toast('Success! The Featured links App has been installed on your page.', 5000, 'successToast');
},function(sender,args){
    Materialize.toast('Error! ' +args.get_message(), 5000, 'failToast');
        });
    }

    //add Resource Icons
if (document.getElementById('resourceIconsApp').checked == true) {
    var contextIcons = new SP.ClientContext.get_current().get_site().getCustomListTemplates(
    SP.ClientContext.get_current().get_web());
    var iconsInfo = new SP.ListCreationInformation();
    iconsInfo.set_title("Resource Icons");
    iconsInfo.set_description('Resource Icons');
    iconsInfo.set_templateType('170');
    iconsInfo.set_templateFeatureId(
        '192EFA95-E50C-475E-87AB-361CEDE5DD7F');
    var contextIcons2 = new SP.ClientContext(siteRelURL);
    contextIcons2.get_web().get_lists().add(iconsInfo);
    contextIcons2.executeQueryAsync(function () {
    addIconsGUID();
},function(sender,args){
    console.log(args.get_message());
    addIconsGUID();
});
    } else {
    console.log('featured links not checked');
    }
function addIconsGUID() { 
    var contextIcons3 = new SP.ClientContext(siteRelURL);
    var getIconsId = contextIcons3.get_web().get_lists().getByTitle('Resource Icons');
    contextIcons3.load(getIconsId, 'Id');
    contextIcons3.executeQueryAsync(function () {
    iconsId = getIconsId.get_id().toString();
    console.log(iconsId);
    rIconsWebPart = '<?xml version="1.0" encoding="utf-8" ?>' +
'<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">' +
'<Assembly>Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly>' +
'<TypeName>Microsoft.SharePoint.WebPartPages.ListViewWebPart</TypeName>' +
'<Title>Resource Icons</Title>' +
'<ZoneID>CenterRightColumn</ZoneID>' +
'<FrameType>TitleBarOnly</FrameType>' +
'<ListName xmlns="http://schemas.microsoft.com/WebPart/v2/ListView">{'+iconsId+'}</ListName>' +
'<ViewGuid>{068844B0-946B-4926-8305-CA7779460D1A}</ViewGuid>' +
'<ViewContentTypeId xmlns="http://schemas.microsoft.com/WebPart/v2/ListView">0x</ViewContentTypeId>' +
'</WebPart>';
    },function(sender,args){
    console.log(args.get_message());
    });
    window.setTimeout(function(){
    applyAppInstallBtn.disabled=false;
    addIcons();
    applyAppInstallBtn.innerHTML='Install';
     },5000);
}

    function addIcons() {
    addWebPart(siteRelURL, 'Pages/start.aspx', rIconsWebPart, 'CenterLeftColumn', 2, function(webPart){
            applyAppInstallBtn.disabled=false;
    resourceIconsApp.disabled=true;
    resourceIconsApp.checked=false;
         Materialize.toast('Success! The Resource Icons App has been installed on your page.', 5000, 'successToast');
},function(sender,args){
    Materialize.toast('Error! ' +args.get_message(), 5000, 'failToast');
        });
    }
}