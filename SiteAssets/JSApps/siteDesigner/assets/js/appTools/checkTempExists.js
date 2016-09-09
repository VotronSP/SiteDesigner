function checkTempExists() {
    var request = new XMLHttpRequest(); 
request.open('GET', siteRelURL+'/Pages/start.aspx', true);
request.onreadystatechange = function(){
    if (request.readyState === 4){
        document.getElementById("selectLayoutTitle").innerHTML = '<i class="fa fa-sitemap" aria-hidden="true"></i> Your Layout Style';
        document.getElementById("deptTemp").checked = true;
        document.getElementById("projTemp").disabled = true;
        document.getElementById("funcTemp").disabled = true;
        document.getElementById("facilTemp").disabled = true;
        document.getElementById("regTemp").disabled = true;
        document.getElementById("applyLayoutBtn").disabled = true;
         if  (request.status === 404) {
             document.getElementById("applyLayoutBtn").disabled = false;
             checkTempExistsP();
        }
    }  
};
request.send();
}

function checkTempExistsP() {
    var request = new XMLHttpRequest(); 
request.open('GET', siteRelURL+'/Pages/startp.aspx', true);
request.onreadystatechange = function(){
    if (request.readyState === 4){
        document.getElementById("projTemp").checked = true;
         if  (request.status === 404) {
             document.getElementById("applyLayoutBtn").disabled = false;
             checkTempExistsF();
        }
    }  
};
request.send();
}

function checkTempExistsF() {
    var request = new XMLHttpRequest(); 
request.open('GET', siteRelURL+'/Pages/startf.aspx', true);
request.onreadystatechange = function(){
    if (request.readyState === 4){
        document.getElementById("funcTemp").checked = true;
         if  (request.status === 404) {
             document.getElementById("applyLayoutBtn").disabled = false;
             checkTempExistsFA();
        }
    }  
};
request.send();
}

function checkTempExistsFA() {
    var request = new XMLHttpRequest(); 
request.open('GET', siteRelURL+'/Pages/startfa.aspx', true);
request.onreadystatechange = function(){
    if (request.readyState === 4){
        document.getElementById("facilTemp").checked = true;
         if  (request.status === 404) {
             document.getElementById("applyLayoutBtn").disabled = false;
             checkTempExistsR();
        }
    }  
};
request.send();
}

function checkTempExistsR() {
var request = new XMLHttpRequest(); 
request.open('GET', siteRelURL+'/Pages/startr.aspx', true);
request.onreadystatechange = function(){
    if (request.readyState === 4){
        document.getElementById("regTemp").checked = true;
         if  (request.status === 404) {
             document.getElementById("regTemp").checked = false;
        document.getElementById("deptTemp").checked = false;
        document.getElementById("projTemp").disabled = false;
        document.getElementById("funcTemp").disabled = false;
        document.getElementById("facilTemp").disabled = false;
        document.getElementById("regTemp").disabled = false;
        document.getElementById("applyLayoutBtn").disabled = false;
        UIkit.modal.alert("<span><span style='font-family: Raleway, sans-serif; font-size: 65px;'>s<span style='color:#779949;'>i</span><span style='color:#72b1c8;'>t</span><span style='color:#f5a81c;'>e</span></span>" +
    "<span class='uk-text-top shadowText' style='color: #0071b9; font-family: Raleway, sans-serif; font-size: 25px;'>designer<span class='uk-text-top' style='color:#e63e30;'>.</span></span></span><hr>" +
    "<h2 class='railwayFont uk-text-center'>You must be new...</h2><span class='railwayFont uk-text-center'>Welcome to <b>Site Designer</b> for Pulse. <br> Site Designer will make everything easy for you when it comes to managing" +
    " content on your Pulse site! Here, you'll be able to modify your site properties, create a design based off of a pre-developed layout," +
    " customize your navigation and implement your changes straight from one easy to use Interface.<br><br><span class='uk-text-danger'>Read the quick tip <u>panels</u> upon closing this notification.</span><br><br><center><span class='uk-text-warning uk-text-center' style='font-weight: 600;'>For the best User Experience, maximize the app window.</span>" +
    "<br><b> Click 'ok' to start.<b></center></span>");
        }
    }  
};
request.send();
}

