var getLists;
var contextGetLists;

function getSiteLists() {
contextGetLists = new SP.ClientContext(siteRelURL);
getLists = contextGetLists.get_web();
contextGetLists.load(getLists);
collList = getLists.get_lists();
contextGetLists.load(collList);

    contextGetLists.executeQueryAsync(getListSucceeded, getListFailed);
}

function getListSucceeded() {
    var listInfo = '';
    var listEnumerator = collList.getEnumerator();

    while (listEnumerator.moveNext()) {
        var oList = listEnumerator.get_current();
        listInfo = oList.get_title();
        console.log("Retrieved all list items");
        document.getElementById('listInfo').innerHTML += 
                    '<li><div class="railwayFont collapsible-header" style="font-size:20px;">'+listInfo+'</div><div class="collapsible-body">' +
                    '<span class="railwayFont">Item Count:' +oList.get_itemCount()+ '<br><a href="">Go to List</a></span>' +
                    '</div></li>';
                     $('.collapsible').collapsible({
                            accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
           
    }
 
}

function getListFailed(sender, args) {
    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}