var currentUserPerm;
var webPerm;
SP.SOD.executeFunc('sp.js','SP.ClientContext', checkUserPermissions);
function checkUserPermissions() {
    contextGetPerm = new SP.ClientContext(siteRelURL);
    webPerm = contextGetPerm.get_web();
    currentUserPerm = webPerm.get_currentUser();
    contextGetPerm.load(currentUserPerm);
    contextGetPerm.load(webPerm,'EffectiveBasePermissions');
    contextGetPerm.executeQueryAsync(onSuccessMethod);
}

function onSuccessMethod(sender, args) {
        if (webPerm.get_effectiveBasePermissions().has(SP.PermissionKind.manageWeb)) {
            setTimeout(function(){
            loading_screen.finish();
            },3000);
            console.log("Permissions Sufficient for " +siteRelURL);
    } 
    else if (webPerm.get_effectiveBasePermissions().has(SP.PermissionKind.manageWeb) == false) {
            window.location.replace("/_layouts/15/AccessDenied.aspx");
            Materialize.toast('Uh oh! Turn around. You are not allowed to access this feature on this site.', 10000, 'failToast')
            
        } 
    }