var uWeb;
var contextGetProps;
SP.SOD.executeFunc('sp.js','SP.ClientContext', getSiteProps);

    function getSiteProps() {
            contextGetProps = new SP.ClientContext(siteRelURL);
            console.log("client context is " +contextGetProps);
            uWeb = contextGetProps.get_web();
            console.log("got this.uWeb" +uWeb);
            getSiteOwner = uWeb.get_allProperties();
            contextGetProps.load(uWeb);
            contextGetProps.load(getSiteOwner);
            contextGetProps.executeQueryAsync(getSitePropSuccess, getSitePropFail);
                            }

    function getSitePropSuccess(sender, args) {
            console.log("Retrieved Site Title:" +  uWeb.get_title());
                        }
   

    function getSitePropFail(sender, args) {
        console.log(args.get_message());
                                        }

    function clickedSitePropertiesTitle() {
        document.getElementById('site_title').value =  uWeb.get_title();
        document.getElementById('site_title_header').innerHTML =  uWeb.get_title();
        document.getElementById('site_owner').value = getSiteOwner.get_item('siteTechnicalContact');
        
    }

    function setPageTitle() {      
        var newTitle = document.getElementById('site_title').value;
        var siteTitle = uWeb.get_title();
        console.log(siteTitle);
        uWeb.set_title(newTitle);
        uWeb.update();
        contextGetProps.load(uWeb);
        contextGetProps.executeQueryAsync(
function(){
  console.log('Page Title has been updated');    
}, 
function(sender,args){
  console.log(args.get_message());    
}); 

    }

    function setSiteOwner() {   
        var newOwner = document.getElementById('site_owner').value;
        var changeSiteOwner = uWeb.get_allProperties();
        changeSiteOwner.set_item('siteTechnicalContact', newOwner);
        uWeb.update();
        contextGetProps.load(uWeb);
        contextGetProps.load(changeSiteOwner);
        contextGetProps.executeQueryAsync(
function(){

  console.log('Site Owner has been updated');    
}, 
function(sender,args){
  console.log(args.get_message());    
}); 

    }