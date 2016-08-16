/******************************************************
Author: Ermal Shkullaku
Release: 0.0.1
Company: SI Group 
Design: Master JS File for SPA (Page Layouts on Pulse)
******************************************************/

// appEngine.js
// Create our SPA and inject ngAnimate and ui-router 
// =============================================================================
angular.module('sdApp', ['ngAnimate', 'ui.router'])

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
            templateUrl: '/SiteAssets/JSApps/siteDesigner/sd-home.html'
        })
        // url will be nested (/sd/initial)
        .state('sd.initial', {
            url: '/initial',
            templateUrl: '/SiteAssets/JSApps/siteDesigner/sd-initial.html'
        })
        
        // url will be /sd/build
        .state('sd.build', {
            url: '/build',
            templateUrl: '/SiteAssets/JSApps/siteDesigner/sd-build.html'
        })

         // url will be /sd/navigation
        .state('sd.navigation', {
            url: '/navigation',
            templateUrl: '/SiteAssets/JSApps/siteDesigner/sd-navigation.html'
        })
        
        // url will be /sd/finalize
        .state('sd.finalize', {
            url: '/finalize',
            templateUrl: '/SiteAssets/JSApps/siteDesigner/sd-finalize.html'
        });
        
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/sd');
})

// our controller for the form
// =============================================================================
.controller('sdController', function($scope) {  

});

// Loading Screen Messages
 function randomLoadingMessage() {
    var lines = new Array(
        "<span style='font-family: Raleway'>There are no bridges over the Amazon River...</span>",
        "<span style='font-family: Raleway'>China has more English speakers than the United States...</span>",
        "<span style='font-family: Raleway'>Squirrels forget where they hide about half of their nuts...</span>",
        "<span style='font-family: Raleway'>Every human spent about half an hour as a single cell...</span>",
        "<span style='font-family: Raleway'>The total number of steps in the Eiffel Tower are 1665...</span>",
        "<span style='font-family: Raleway'>When hippos are upset, their sweat turns red...</span>",
        "<span style='font-family: Raleway'>King Henry VIII slept with a gigantic axe beside him...</span>",
        "<span style='font-family: Raleway'>You cannot snore and dream at the same time...</span>",
        "<span style='font-family: Raleway'>Facebook, Skype and Twitter are all banned in China...</span>",
        "<span style='font-family: Raleway'>The Titanic was the first ship to use the SOS signal...</span>",
        "<span style='font-family: Raleway'>The Pokemon Hitmonlee and Hitmonchan are based off of Bruce Lee and Jackie Chan...</span>"
    );
    return lines[Math.round(Math.random()*(lines.length-1))];
}

//Loading Screen Timeout, Fix Overflows on Animation
 window.onload=function(){
             $('html, body').css({
                'overflow': 'hidden',
                'height': '100%'
                })

            window.setTimeout(function(){
                    loading_screen.finish();
                    modalStartApp();

            $('html, body').css({
                'overflow-y': 'auto',
                'overflow-x': 'hidden',
                'height': 'auto'
                })
                
            },5000);
}

//Modal on Startup
function modalStartApp() {
    
    UIkit.modal.alert("<span><span style='font-family: Raleway, sans-serif; font-size: 65px;'>s<span style='color:#779949;'>i</span><span style='color:#72b1c8;'>t</span><span style='color:#f5a81c;'>e</span></span>" +
    "<span class='uk-text-top shadowText' style='color: #0071b9; font-family: Raleway, sans-serif; font-size: 25px;'>designer<span class='uk-text-top' style='color:#e63e30;'>.</span></span></span><hr>" +
    "<span class='railwayFont uk-text-center'>Welcome to <b>Site Designer</b> for Pulse. <br> Site Designer will make everything easy for you when it comes to managing" +
    " content on your Pulse site! Here, you'll be able to modify your site properties, create a design based off of a pre-developed layout," +
    " customize your navigation and implement your changes straight from one easy to use Interface.<br><br><span class='uk-text-danger'>Read the quick tip <u>panels</u> upon closing this notification.</span>" +
    " <br><br><center><b> Click 'ok' to continue.<b></center></span>");

    Materialize.toast('Welcome, ' +document.getElementById('userLoggedIn').innerHTML+ '!', 5000, 'standardToast');

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

//Load Get User Tools
$.getScript("/SiteAssets/JSApps/siteDesigner/assets/js/appTools/getUser.js", function(){

   console.log("Loaded getUserJS");

});
        
/* Open Application Window w/ HTML
<a href="http://pulse.siigroup.com/wizSPA/index.html" onclick="openwindow(this.href); return false;">Link</a>
function openwindow(url){
    NewWindow=window.open(url,'newWin','fullscreen=yes,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no');
    NewWindow.focus(); void(0);  
}
*/