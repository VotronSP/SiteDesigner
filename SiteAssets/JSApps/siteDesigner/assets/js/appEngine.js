/******************************************************
Author: Ermal Shkullaku
Release: 0.0.1
Company: SI Group 
Design: Master JS File for SPA (Page Layouts on Pulse)
******************************************************/

// appEngine.js
// Create our SPA and inject ngAnimate and ui-router 
// =============================================================================

//Load Globa Variable for Relative url
var siteRelURL = window.opener.siteURL;
console.log(siteRelURL);


//Requests
$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
    options.async = true;
});

//Load Get User Tools
$.getScript("/SiteAssets/JSApps/siteDesigner/assets/js/appTools/getSite.js", function(){
   console.log("Loaded getSiteJS");

});
$.getScript("/SiteAssets/JSApps/siteDesigner/assets/js/appTools/getUser.js", function(){
   console.log("Loaded getUserJS");

});
$.getScript("/SiteAssets/JSApps/siteDesigner/assets/js/appTools/getPerm.js", function(){
   console.log("Loaded getPermJS");

});
$.getScript("/SiteAssets/JSApps/siteDesigner/assets/js/appTools/getLists.js", function(){
   console.log("Loaded getListsJS");

});
$.getScript("/SiteAssets/JSApps/siteDesigner/assets/js/appTools/getNav.js", function(){
   console.log("Loaded getNavJS");

});
$.getScript("/SiteAssets/JSApps/siteDesigner/assets/js/appTools/createLayout.js", function(){
  console.log("Loaded createLayoutJS");

});
$.getScript("/SiteAssets/JSApps/siteDesigner/assets/js/appTools/checkTempExists.js", function(){
  console.log("Loaded checkTempExistsJS");

});


var sdApp = angular.module('sdApp', ['ngAnimate', 'ui.router'])

// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        // route to show our sdard /sd
        .state('sd', {
            url: '/sd',
            templateUrl: '/SiteAssets/JSApps/siteDesigner/sd-start.html',
            controller: 'sdController'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/sd/initial)
        .state('sd.home', {
            url: '/home',
            templateUrl: '/SiteAssets/JSApps/siteDesigner/sd-home.html',
            controller: 'sdHomeController'
        })
        // url will be nested (/sd/initial)
        .state('sd.initial', {
            url: '/initial',
            templateUrl: '/SiteAssets/JSApps/siteDesigner/sd-initial.html',
            controller: 'sdInitialController'
        })
       
        // url will be /sd/build
        .state('sd.lists', {
            url: '/lists',
            templateUrl: '/SiteAssets/JSApps/siteDesigner/sd-lists.html',
            controller: 'sdListsController'
        })
        
        // url will be /sd/build
        .state('sd.build', {
            url: '/build',
            templateUrl: '/SiteAssets/JSApps/siteDesigner/sd-build.html',
            controller: 'sdBuildController'
        })

         // url will be /sd/navigation
        .state('sd.navigation', {
            url: '/navigation',
            templateUrl: '/SiteAssets/JSApps/siteDesigner/sd-navigation.html',
            controller: 'sdNavigationController'
        })
        
        // url will be /sd/finalize
        .state('sd.finalize', {
            url: '/finalize',
            templateUrl: '/SiteAssets/JSApps/siteDesigner/sd-finalize.html',
            controller: 'sdFinalizeController'
        });
        
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/sd');
})

// our controllers for the app
// =============================================================================
sdApp.controller('sdController', function($scope) {  

});

sdApp.controller('sdHomeController', function($scope) { 
$scope.loadProps = function loadUser() {
       checkUserPermissions();
       getUserProps();
    }
}); 

sdApp.controller('sdInitialController', function($scope) { 
$scope.loadProps = function loadProps() {
    //checkTempExists();
    checkTempExists();
    //getprop
clickedSitePropertiesTitle();
    }
}); 

sdApp.controller('sdListsController', function($scope, $state, $compile, $timeout) { 
$scope.loadListsLibraries = function loadListsLibraries() {
    getSiteLists();
            }

$scope.refreshListsAndLibraries = function() {
    refreshListsLibsBtn.disabled=true; 
    refreshListsLibsBtn.innerHTML='<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> Refreshing...';
    window.setTimeout(function(){
    $state.reload($state.current.name);
    },3500);
            }

$scope.openListSettings = function() {
   var openModal = UIkit.modal.alert("openListSettingsModal");
   openModal.show();
    console.log("wrkled")
}
});

sdApp.controller('sdBuildController', function($scope) { 

}); 

sdApp.controller('sdNavigationController', function($scope) { 
    document.getElementById('site_title_header').innerHTML =  uWeb.get_title();
         $(document).ready(function(){
    $('.tooltipped').tooltip({delay: 50});
    getNavigationNodes();
  });

}); 

sdApp.controller('sdFinalizeController', function($scope) { 

}); 
//End Controllers



// Loading Screen Messages
 function randomLoadingMessage() {
    var lines = new Array(
        "<span style='font-family: Raleway'>Loading Site Designer - Please Wait...</span>"
    );
    return lines[Math.round(Math.random()*(lines.length-1))];
}

//Loading Screen Timeout, Fix Overflows on Animation
 window.onload=function(){
             $('html, body').css({
                'overflow-x': 'hidden',
                'height': '100%'
                })    
}

//Modal on Startup
function modalStartApp() {
    
    /*UIkit.modal.alert("<span><span style='font-family: Raleway, sans-serif; font-size: 65px;'>s<span style='color:#779949;'>i</span><span style='color:#72b1c8;'>t</span><span style='color:#f5a81c;'>e</span></span>" +
    "<span class='uk-text-top shadowText' style='color: #0071b9; font-family: Raleway, sans-serif; font-size: 25px;'>designer<span class='uk-text-top' style='color:#e63e30;'>.</span></span></span><hr>" +
    "<span class='railwayFont uk-text-center'>Welcome to <b>Site Designer</b> for Pulse. <br> Site Designer will make everything easy for you when it comes to managing" +
    " content on your Pulse site! Here, you'll be able to modify your site properties, create a design based off of a pre-developed layout," +
    " customize your navigation and implement your changes straight from one easy to use Interface.<br><br><span class='uk-text-danger'>Read the quick tip <u>panels</u> upon closing this notification.</span><br><br><center><span class='uk-text-warning uk-text-center' style='font-weight: 600;'>For the best User Experience, maximize the app window.</span>" +
    "<br><b> Click 'ok' to continue.<b></center></span>");*/

    Materialize.toast('Welcome, ' +currentUser.get_title().split(',')[1]+ ' ' +currentUser.get_title().split(',')[0]+'!', 5000, 'standardToast');
}



//Apply Property Changes
function applyPropChanges()
{
    applyPropChangesBtn.disabled=true; 
    applyPropChangesBtn.innerHTML='<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> Please wait...';
    applyPropChangesDone();
}

function applyPropChangesDone()
{
    window.setTimeout(function(){
        try{
            applyPropChangesBtn.disabled=false;
            applyPropChangesBtn.innerHTML='Apply Changes';
            setPageTitle();
            setSiteOwner();
            /* Always last script line */ Materialize.toast('Changes Applied Successfully', 4000, 'successToast')
        }
        catch(err) {
            Materialize.toast('Error! Contact Service Desk.<br>Message: ' + err.message, 8000, 'failToast')
        }
    },3500);
}

//Apply Layout Changes
function applyPropChanges()
{
    applyPropChangesBtn.disabled=true; 
    applyPropChangesBtn.innerHTML='<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> Please wait...';
    applyPropChangesDone();
}

function applyPropChangesDone()
{
    window.setTimeout(function(){
        try{
            applyPropChangesBtn.disabled=false;
            applyPropChangesBtn.innerHTML='Apply Changes';
            setPageTitle();
            setSiteOwner();
            /* Always last script line */ Materialize.toast('Changes Applied Successfully', 4000, 'successToast')
        }
        catch(err) {
            Materialize.toast('Error! Contact Service Desk.<br>Message: ' + err.message, 8000, 'failToast')
        }
    },3500);
}

//Apply Design Changes
function applyDesignChanges()
{
  applyDesignChangesBtn.disabled=true; 
  applyDesignChangesBtn.innerHTML='<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> Applying...';
  applyDesignChangesDone();
  }

function applyDesignChangesDone()
{
  window.setTimeout(function(){
      try{
        applyDesignChangesBtn.disabled=false;
        applyDesignChangesBtn.innerHTML='Apply Design';
        /* Always last script line */ Materialize.toast('Changes Applied Successfully', 4000, 'successToast')
        }
      catch (err) {
        Materialize.toast('Error! Contact Service Desk.<br>Message: ' + err.message, 8000, 'failToast')
        }
  },3500);
}



