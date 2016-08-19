var currentUser;
var sWeb;
SP.SOD.executeFunc('sp.js','SP.ClientContext', getUserProps);
    function getUserProps() {
                var clientContextTarget = new SP.ClientContext(siteRelURL);
                console.log("client context is " +clientContextTarget);
                sWeb = clientContextTarget.get_web();
                console.log("got this.sWeb" +sWeb);
                currentUser = sWeb.get_currentUser();  
                clientContextTarget.load(sWeb);
                clientContextTarget.load(currentUser);
                clientContextTarget.executeQueryAsync(getUserPropSuccess, getUserPropFail);
                            }

    function getUserPropSuccess(sender, args) {
        var userId = currentUser.get_title();
        console.log("Retrieved User:" +userId);
        document.getElementById('userLoggedIn').innerHTML = currentUser.get_title().split(',')[1]+ ' ' +currentUser.get_title().split(',')[0];
        modalStartApp();
        
            }

    function getUserPropFail(sender, args) {
        console.log(args.get_message());
                }
    