'use strict';
     
function addNavigationNodes() {  
        var titleOfNavNode = document.getElementById('addNav1').value;
        var urlOfNavNode = document.getElementById('addNav2').value;
        var externalURL = document.getElementById('isExternalURL').checked;
        var clientContext = new SP.ClientContext(siteRelURL);
 
        if (clientContext != undefined && clientContext != null) {
            var web = clientContext.get_web();
            var quickLaunchNodeCollection = web.get_navigation().get_quickLaunch();
            clientContext.load(quickLaunchNodeCollection);
            clientContext.executeQueryAsync(function () {

                var nnci = new SP.NavigationNodeCreationInformation();
                nnci.set_title(titleOfNavNode);
                nnci.set_url(urlOfNavNode);
                nnci.set_isExternal(externalURL);
             
                // Create node as the last node in the collection.
                nnci.set_asLastNode(true);
                quickLaunchNodeCollection.add(nnci);
                clientContext.executeQueryAsync(onQueryNavSucceeded, onQueryNavFailed);
        });
    }
}
     
    function runCode() {
        var titleOfNavNode = document.getElementById('addNav1').value;
          if (titleOfNavNode.length == "") {
         Materialize.toast('<b>Error - Empty Nav Queue!<b><br> No links have not been added to the queue. ', 8000, 'failToast')
        } else {
                addNavigationNodes();
    }
}
 
    function onQueryNavSucceeded() {
        var titleOfNavNode = document.getElementById('addNav1').value;
        console.log("Nodes are added to the navigation.");
         Materialize.toast('<b>Success!<b><br> The link ' +titleOfNavNode+ ' has been added to your navigation. ', 8000, 'successToast');
         getNavigationNodes();
    }
 
    function onQueryNavFailed(sender, args) {
        Materialize.toast('<b>Error!<b><br> Something went wrong. ' + args.get_message() + '\n ' + ' Try checking the "External URL" checkbox.', 8000, 'failToast')
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }
 

 function getNavigationNodes() {
    var ctx = new SP.ClientContext(siteRelURL);
    var web = ctx.get_web();
    var quickLaunchNodes = web.get_navigation().get_quickLaunch();        
    ctx.load(quickLaunchNodes,'Include(Title,Url,Children,Id)');
    ctx.executeQueryAsync(function() {
        document.getElementById('currentNav').innerHTML = "";
        document.getElementById('selectChildParentNavNode').innerHTML = "";
        printNodesInfo(quickLaunchNodes);
    },
    function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    });

function printNodesInfo(nodes){
    nodes.get_data().forEach(function(node){
        var childNodes = node.get_children();
        document.getElementById('currentNav').innerHTML += (String.format('<i class="fa fa-bars" aria-hidden="true"></i> <b>{0}</b> {1}',node.get_title(), '<br>'));
        document.getElementById('selectChildParentNavNode').innerHTML += (String.format('<option value='+node.get_id()+'>{0}{1}',node.get_title(), '</option>'));
        $('select').material_select();
        childNodes.get_data().forEach(function(childNode){
        document.getElementById('currentNav').innerHTML += (String.format('&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i> {0} {1}',childNode.get_title(),'<br>')); 
        });
    }); 
  } 
}
//End Parent Nodes

//Add Child Nodes Start
    function addNavigationNodesChild() {
        var idOfParentNode = $('#selectChildParentNavNode').val();
        var nameOfParentNode = $('#selectChildParentNavNode option:selected').text();
        var titleOfNavNodeChild = document.getElementById('addNav1Child').value;
        var urlOfNavNodeChild = document.getElementById('addNav2Child').value;  
        var clientContextChild = new SP.ClientContext(siteRelURL);
 
        if (clientContextChild != undefined && clientContextChild != null) {
            var webChild = clientContextChild.get_web();
            var quickLaunchNodeCollection = webChild.get_navigation().get_quickLaunch();
            clientContextChild.load(quickLaunchNodeCollection);
            clientContextChild.executeQueryAsync(function () {
            
            var e = quickLaunchNodeCollection.getEnumerator();
            var notFound = true;
                while (notFound && e.moveNext()) {
                var parentNode = e.get_current();
                if (parentNode.get_title() === nameOfParentNode) {
                var childrenNode = parentNode.get_children();
                notFound = false;
                console.log("found it ")
                var nnciChild = new SP.NavigationNodeCreationInformation();
                nnciChild.set_title(titleOfNavNodeChild);
                nnciChild.set_url(urlOfNavNodeChild);
                nnciChild.set_isExternal(true);
             
                // Create node as the last node in the collection.
                nnciChild.set_asLastNode(true);
                childrenNode.add(nnciChild);
                clientContextChild.executeQueryAsync(onQueryNavSucceededChild, onQueryNavFailedChild);
                }
            }
        });
    }
}
    
   function runCodeChild() {
        var titleOfNavNodeChild = document.getElementById('addNav1Child').value;
        if (titleOfNavNodeChild.length == "") {
         Materialize.toast('<b>Error - Empty Nav Queue!<b><br> No links have not been added to the queue. ', 8000, 'failToast')
        } else {
        addNavigationNodesChild();
        }
    }
 
    function onQueryNavSucceededChild() {
        var titleOfNavNodeChild = document.getElementById('addNav1Child').value;
        console.log("Nodes are added to the navigation.");
         Materialize.toast('<b>Success!<b><br> The link ' +titleOfNavNodeChild+ ' has been added to your navigation. ', 8000, 'successToast');
         getNavigationNodes();
    }
 
    function onQueryNavFailedChild(sender, args) {
        Materialize.toast('<b>Error!<b><br> Something went wrong. ' + args.get_message() + '\n ', 8000, 'failToast')
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }