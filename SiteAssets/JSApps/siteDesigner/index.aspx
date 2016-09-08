<%@ Page language="C#" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<!DOCTYPE html>
<html>
    <head>
        <!-- LOAD SP.JS -->
        <!--Sharepoint Dependencies-->
        <script src="/_layouts/1033/init.js"></script>
        <script src="/_layouts/1033/core.js"></script>
        <script src="/_layouts/MicrosoftAjax.js"></script>
        <script src="/_layouts/SP.Core.js"></script>
        <script src="/_layouts/SP.Runtime.js"></script>
        <script src="/_layouts/SP.js"></script>
        <script src="/_layouts/SP.UI.Dialog.js"></script>
        <script type="text/javascript" src="/_layouts/15/sp.publishing.js"></script>
        <script src="/_layouts/ScriptResx.ashx?culture=en%2Dus&name=SP%2ERes"></script>
        <title>
            Site Designer: Design, Organize and Simplify your Site
        </title>
        <!-- Master CSS -->
        <link rel="stylesheet" type="text/css" href="/SiteAssets/JSApps/siteDesigner/styles/master.css">
        <!-- UI Kit Style -->
        <link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/uikit/2.26.4/css/uikit.almost-flat.min.css">
        <!-- UI Font Raleway -->
        <link href='http://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
        <!-- Animate CSS -->
         <link rel="stylesheet" href="/SiteAssets/JSApps/siteDesigner/styles/animate.css">
        <!-- NG Animate CSS -->
         <link rel="stylesheet" href="/SiteAssets/JSApps/siteDesigner/styles/ng-animate.css">
        <!-- Please Wait Loading Screen -->
        <link href="/SiteAssets/JSApps/siteDesigner/styles/please-wait.css" rel="stylesheet">
        <!-- Materialize Form CSS -->
        <link rel="stylesheet" href="/SiteAssets/JSApps/siteDesigner/styles/materialize.css">
        <!-- Favicon -->
        <link rel="icon" type="image/png" sizes="32x32" href="/SiteAssets/JSApps/siteDesigner/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/SiteAssets/JSApps/siteDesigner/favicon/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/SiteAssets/JSApps/siteDesigner/favicon/favicon-16x16.png">
    </head>
    <body>   
<!-- required: SharePoint FormDigest -->
<form runat="server">
  <SharePoint:FormDigest runat="server"></SharePoint:FormDigest>
</form>
        <!-- Begin Global Header -->
        <div class="uk-grid">
            <div class="uk-width-1-1">
                <div class="card-panel z-depth-1">
                    
                    <!-- Logo (site.designer) -->
                    <span>
                        <span style="font-family: 'Raleway', sans-serif; font-size: 65px;">s<span style="color:#779949;">i</span><span style="color:#72b1c8;">t</span><span style="color:#f5a81c;">e</span></span>
                        <span class="uk-text-top shadowText" style="color: #0071b9; font-family: 'Raleway', sans-serif; font-size: 25px;">designer<span class="uk-text-top" style="color:#e63e30;">.</span></span>
                    </span>

                    <!-- Session User -->
                    <span class="railwayFont uk-float-right"><span><b>Current Session Logged as:</b> <span id="userLoggedIn"></span> - </span><a data-uk-modal="{target:'#exitClicked'}">Logout?</a></span>

                    <!-- Help Menu -->
                    <div class="uk-vertical-align-bottom fixed-action-btn horizontal click-to-toggle" >
                        <a class="z-depth-2 btn-floating btn-large blue tooltipped" data-position="top" data-delay="50" data-tooltip="Settings">
                            <i class="fa fa-cogs fa-4" aria-hidden="true"></i>
                        </a>
                        <ul>
                            <li><a class="z-depth-2 btn-floating orange tooltipped" data-position="top" data-delay="50" data-tooltip="Latest Updates" data-uk-modal="{target:'#exitClicked'}"><i class="fa fa-cloud-upload" aria-hidden="true"></i></a></li>
                            <li><a class="z-depth-2 btn-floating blue tooltipped" data-position="top" data-delay="50" data-tooltip="Help Guide" data-uk-modal="{target:'#exitClicked'}"><i class="fa fa-info-circle" aria-hidden="true"></i></a></li>
                            <li><a class="z-depth-2 btn-floating green tooltipped" data-position="top" data-delay="50" data-tooltip="Service Desk" data-uk-modal="{target:'#helpClicked'}"><i class="fa fa-desktop" aria-hidden="true"></i></a></li>
                            <li><a class="z-depth-2 btn-floating red tooltipped" data-position="top" data-delay="50" data-tooltip="Exit Application" data-uk-modal="{target:'#exitClicked'}"><i class="fa fa-sign-out" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Beta Disclaimer -->
        <div class="uk-alert uk-alert-warning">
            <span style="font-family: 'Raleway', sans-serif; font-size: 15px;">
            Site designer for Pulse is currently in <b>pre-beta development</b>. 
            This App will not function until we finalize the design. Contact <a href="http://usns030:8888/SMPortal/SitePages/Service%20Catalog.aspx">Service Desk</a> with any questions/concerns.
            </span>
        </div>

        <!-- Begin App Intro -->
        <div ng-app="sdApp" class="uk-grid uk-animation-scale-down">
            <div class="uk-width-1-1 uk-container-center">
                <div class="">
                    <div ui-view>
                    </div>
                </div> 
            </div>
      </div>

      <!-- Content Structure Modal -->
        <div id="contentStructureModal" class="uk-modal uk-text-center uk-container-center">
            <div class="uk-modal-dialog uk-text-center uk-container-center" style="width:100%;">
                <div class="uk-modal-header" style="font-family: 'Raleway', sans-serif; font-size: 20px;">Content and Structure</div>
                <button style="font-family: 'Raleway', sans-serif; font-size: 20px; background: #e63e30;" class="btn waves-effect waves-light uk-modal-close" type="button">Close</button>
                <iframe class="uk-height-viewport uk-width-viewport uk-text-center uk-container-center" frameborder="0" id="contentStructure"></iframe>    
            </div>
        </div>

        <!-- Help Modal -->
        <div id="helpClicked" class="uk-modal">
            <div class="uk-modal-dialog">
                <a class="uk-modal-close uk-close"></a>
               <div class="uk-text-success" style="font-family: 'Raleway', sans-serif; font-size: 25px;">Launch the <b>Interactive Walkthrough</b>?</div>
               <br>
                        <div class="uk-text-center">
                             <button onClick="launchGuide();" style="font-family: 'Raleway', sans-serif; font-size: 20px;" class="btn waves-effect waves-teal uk-modal-close" type="button">Launch</button>
                        </div>
            </div>
        </div>

        <!-- Exit Modal -->
        <div id="exitClicked" class="uk-modal">
            <div class="uk-align-center uk-modal-dialog">
                <a class="uk-modal-close uk-close"></a>
                    <div class="uk-text-danger" style="font-family: 'Raleway', sans-serif; font-size: 25px;">Are you sure you want to <b>quit</b>?</div>
                    <br>
                    <div style="font-family: 'Raleway', sans-serif; font-size: 20px;">Make sure you've saved your changes before you <b>quit</b>!</div>
                        <br>
                        <div class="uk-text-center">
                            <button style="font-family: 'Raleway', sans-serif; font-size: 20px;" class="btn waves-effect waves-teal uk-modal-close" type="button">Back</button>
                            <button style="font-family: 'Raleway', sans-serif; font-size: 20px; background: #779949;" class="btn waves-effect waves-teal uk-modal-close" type="button">Save My Changes</button>
                             <button onClick="window.close()" style="font-family: 'Raleway', sans-serif; font-size: 20px; background: #e63e30;" class="btn waves-effect waves-teal" type="button">Quit</button>
                        </div>
            </div>
        </div> 
    <div>
</body>
        <!-- jQuery Script CDN Injection -->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <!-- Angular Script CDN Injection -->
        <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.1/angular-ui-router.min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/angular-animate.min.js"></script>
        <!--<script src="assets/js/AngularSP.min.js"></script>
        <script src="assets/js/ng-sharepoint.min.js"></script>-->
        <!-- Loading Screen Injection -->
        <script type="text/javascript" src="/SiteAssets/JSApps/siteDesigner/assets/js/please-wait.min.js"></script>
        <!-- Inject the App Engine -->
        <script type="text/javascript" src="/SiteAssets/JSApps/siteDesigner/assets/js/appEngine.js"></script>
         <!-- Loader Settings -->
        <script type="text/javascript">
            window.loading_screen = window.pleaseWait({
            logo: "/SiteAssets/JSApps/siteDesigner/assets/images/pulse_logo.png",
            backgroundColor: '#fafafa',
            loadingHtml: "<div class='uk-width-1-1 uk-height:1-2'><p class='shadowText loading-message' style='font-family: RailWay, sans-serif; font-size: 20px; color: #65656a;'>" + randomLoadingMessage() + "</p><div class='spinner'></div>" +
            "<span style='font-family: Raleway, sans-serif; font-size: 65px;'>s<span style='color:#779949;'>i</span><span style='color:#72b1c8;'>t</span><span style='color:#f5a81c;'>e</span></span>" +
            "<span class='uk-text-top shadowText railwayFont' style='color: #0071b9; font-family: 'Raleway' sans-serif; font-size: 25px;'>designer<span class='uk-text-top' style='color:#e63e30;'>.</span></span></div>"
            });
        </script>
        <!-- UI Kit Script CDN Injection -->
        <script src="http://cdnjs.cloudflare.com/ajax/libs/uikit/2.26.4/js/uikit.min.js"></script>
        <!-- FontAwesome CDN Injection -->
        <script src="http://use.fontawesome.com/5f18e925bc.js"></script>
        <!-- Materialize JS for Forms Injection -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/js/materialize.min.js"></script>
</html>