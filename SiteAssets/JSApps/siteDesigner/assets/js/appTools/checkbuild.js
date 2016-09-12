  $(document).ready(function() {
    $('select').material_select();
  });

function checkBuild() {
if (document.getElementById("calendarApp").disabled != true) {
$('#calendarWP').hide();
    }

if (document.getElementById("addNewsApp").disabled != true) {
$('#wp1').hide();
    } else if (document.getElementById("addNewsApp").disabled != false) {
        wp1Inner.innerHTML = "News App";
    }

if ((document.getElementById("resourceIconsApp").disabled != true)) {

    $('#wp2').hide();
    }
    if ((document.getElementById("featuredLinksApp").disabled != true)) {

    $('#featuredLinksWP').hide();
    }
    $('#wp3').hide();
} 

function getNavigationNodesBuild() {
    var ctx = new SP.ClientContext(siteRelURL);
    var web = ctx.get_web();
    var quickLaunchNodes = web.get_navigation().get_quickLaunch();        
    ctx.load(quickLaunchNodes,'Include(Title,Url,Children,Id)');
    ctx.executeQueryAsync(function() {
        document.getElementById('currentNav').innerHTML = "";
        printNodesInfo(quickLaunchNodes);  
    },
    function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    });

function printNodesInfo(nodes){
    nodes.get_data().forEach(function(node){
        var childNodes = node.get_children();
        document.getElementById('currentNav').innerHTML += (String.format('<span class="railwayFont"><i class="fa fa-bars" aria-hidden="true"></i> <b>{0}</b> {1}',node.get_title(), '</span><br>'));
        childNodes.get_data().forEach(function(childNode){
        document.getElementById('currentNav').innerHTML += (String.format('&nbsp;&nbsp;&nbsp;&nbsp;<span class="railwayFont"> <i class="fa fa-chevron-right" aria-hidden="true"></i> {0} {1}',childNode.get_title(),'</span><br>')); 
        });
    }); 
  } 
}

var gp_users=[];
function retrieveAllUsersInGroup() {
  
    var clientContext = new SP.ClientContext(siteRelURL);
    var getWeb = clientContext.get_web();
    var collGroup = getWeb.get_siteGroups();
    var oGroup = collGroup.getById(2986);
    this.collUser = oGroup.get_users();
    clientContext.load(collUser);

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
}

function onQuerySucceeded() {
    var userEnumerator = collUser.getEnumerator();
    while (userEnumerator.moveNext()) {
        var oUser = userEnumerator.get_current();
        
        document.getElementById('siteContacts').innerHTML +='<li><b>Contact Name:</b> ' + oUser.get_title() + '<br><b>Contact Email: </b>' + oUser.get_email() + '</li>';

    }   
}

function onQueryFailed(sender, args) {

    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}


