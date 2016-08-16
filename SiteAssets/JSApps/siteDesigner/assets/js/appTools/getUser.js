SP.SOD.executeFunc('sp.js','SP.ClientContext',runthiscode);
    function runthiscode() {
        console.log("sp.js loaded");
            
                
                this.clientContext = new SP.ClientContext.get_current();
                this.oWeb = clientContext.get_web();
                currentUser = this.oWeb.get_currentUser();  
                this.clientContext.load(currentUser);
                this.clientContext.executeQueryAsync(
                    Function.createDelegate(this,this.onQuerySucceeded), 
                    Function.createDelegate(this,this.onQueryFailed));
                                

                            }

    function onQuerySucceeded(sender, args) {
        var userId = currentUser.get_title();
        console.log("Retrieved User:" +userId);
        document.getElementById('userLoggedIn').innerHTML = userId;
        $(function() {
            document.getElementById('site_owner').value = userId;
                        }
        )};

    function onQueryFailed(sender, args) {
        console.log(args.get_message());
                                        }