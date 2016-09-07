function createWikiPage(webUrl,listTitle,fileName,success, failure)
{

  getListUrl(webUrl,listTitle,
    function(listUrl){  

     var fileUrl = listUrl + '/' + fileName
     var url = webUrl + "/_api/web/GetFolderByServerRelativeUrl('" + listUrl + "')/Files" +
               "/AddTemplateFile(urlOfFile='" + fileUrl + "',templateFileType=0)";
               console.log('Template URL = ' +url);
     $.ajax({
        url: url,
        method: "POST",
        headers: {
               "accept": "application/json;odata=verbose",
               "content-type": "application/json;odata=verbose",
               "X-RequestDigest" : $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            success(data.d);
        },
        error: function (data) {
            failure(data);
        }
     });

    },
    failure
  );


}


function getListUrl(webUrl,listTitle,success, failure)
{
    var url = webUrl + "/_api/web/lists/GetByTitle('" + listTitle +  "')/RootFolder"; 
    $.ajax({
        url: url,
        method: "GET",
        headers: {
               "accept": "application/json;odata=verbose",
               "content-type": "application/json;odata=verbose"
        },
        success: function (data) {
            success(data.d.ServerRelativeUrl);
        },
        error: function (data) {
            failure(data);
        }
    });
}

function createNewPage() {
//Usage
createWikiPage(siteRelURL,'Pages','landing.aspx',
  function(page){  
    console.log(JSON.stringify(page));
  },
  function(error){
    console.log(JSON.stringify(error));
  }
);
}

function addStyleWebPart() { 
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

var stylingWebPart = '<?xml version="1.0" encoding="utf-8"?>' +
'<WebPart xmlns="http://schemas.microsoft.com/WebPart/v2">' +
    '<Assembly>Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly>' + 
    '<TypeName>Microsoft.SharePoint.WebPartPages.ContentEditorWebPart</TypeName>' + 
    '<Title>Layout Styling (DO NOT REMOVE)</Title>' +
    '<Description>$Resources:core,ContentEditorWebPartDescription;</Description>' +
    '<IsVisible>false</IsVisible>' +
    '<ContentLink xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor">/siteassets/jsapps/siteDesigner/styles/layoutStyle.txt</ContentLink>'+
    '<PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>' +
'</WebPart>';

var newsWebPart = '<?xml version="1.0" encoding="utf-8"?>' +
'<WebPart xmlns="http://schemas.microsoft.com/WebPart/v2">' +
    '<Assembly>Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly>' + 
    '<TypeName>Microsoft.SharePoint.WebPartPages.ContentEditorWebPart</TypeName>' + 
    '<Title>Layout Styling (DO NOT REMOVE)</Title>' +
    '<Description>$Resources:core,ContentEditorWebPartDescription;</Description>' +
    '<IsVisible>false</IsVisible>' +
    '<ContentLink xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor">/siteassets/jsapps/GlobalNewsApp/NewsApp.aspx</ContentLink>'+
    '<PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>' +
'</WebPart>';


if (document.getElementById('deptTemp').checked == true && styleExists != true) {
addWebPart(siteRelURL,'Pages/landing.aspx',stylingWebPart,'Left',1,function(webPart){
    console.log(webPart.get_title() + ' has been added'); 
},function(sender,args){
    console.log(args.get_message());
});
} else {
    console.log('style exists');
}

if (document.getElementById('addNewsApp').checked == true) {
addWebPart(siteRelURL,'Pages/landing.aspx',newsWebPart,'Left',2,function(webPart){
    console.log(webPart.get_title() + ' has been added'); 
},function(sender,args){
    console.log(args.get_message());
});
} else {
    console.log('not checked');
}

}