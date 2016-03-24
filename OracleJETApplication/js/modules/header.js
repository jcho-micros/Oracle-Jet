define([
    'ojs/ojcore',
    'knockout',
    'data/data',
    'jquery', 
    'hammerjs',
    'moment',
    'ojs/ojknockout', 
    'ojs/ojnavigationlist', 
    'ojs/ojoffcanvas', 
    'ojs/ojdatacollection-common', 
    'ojs/ojdialog',
    'ojs/ojjsontreedatasource',
    'ojs/ojtabs',
    'ojs/ojfilmstrip',
    'ojs/ojconveyorbelt'
], function (oj, ko, data, $, Hammer) {
    function HeaderViewModel() {
        var self = this;
        self.allCityList = ko.observableArray([]);
        self.handleActivated = function (info) {

            self.dataSource = new oj.ArrayTableDataSource(appNavData, {idAttribute: 'id'});
//            self.globalLocationInfo = ko.dataFor(document.getElementById('templateWrapper'));
            self.globalRegion = ko.observable("North East");
            self.globalCityName = ko.observable("Boston");
//            self.globalCityNameId = ko.observable(self.globalLocationInfo.locID, "1");
//            self.globalstoreName = ko.observable(self.globalLocationInfo.storeName, "Beacon Hill");
//            self.globalAnalytics = ko.observable(self.globalLocationInfo.analytics);
            self.visibleCity = ko.observable("Boston");


        };
        self.serviceURL = 'js/data/listofcityies.json';
        self.parseDept = function(response) {
            console.log(response);
            return {locID: response['locID'],
                    name: response['name'],
                    locID:response['locID'],
                    cityname:response['cityname'],
                    region:response['region']};
        };
        // Think of this as a single database record or a single table row.
        var Department = oj.Model.extend({
            urlRoot: self.serviceURL,
            parse: self.parseDept,
            idAttribute: 'locID'
        });
 
        var myDept = new Department();
       console.log(myDept);


        var customQuery = oj.ResponsiveKnockoutUtils.createMediaQueryObservable('(max-width: 372px)');
        //where the all employee info will be stored

        //Required for the Drop down
        self.menuItemSelect = function (event, ui) {
            console.log(location.name);
            switch (ui.item.attr("id")) {
                
                case "Preferences":
                    $("#preferenceDialogWindow").ojDialog("open");
                    break;
                default:
            }
        };
        self.offScreenButtonIconClass = "fa fa-bars fa-lg";
        self.offScreenButtonLabel = "MENU";
        //Film Strip in OffCanvas
        self.currentNavArrowPlacement = ko.observable("adjacent");
        self.currentNavArrowVisibility = ko.observable("auto");
        getItemInitialDisplay = function(index)
        {
          return index < 3 ? '' : 'none';
        };
        
            var appNavData = [
                {name: 'Home', id: 'home', value: ' ', img: 'home-default.png'},
                {name: 'Labor', id: 'labor', value: ' ',  img: 'labor-default.png'},
                {name: 'Inventory', id: 'inventory', value: ' ',  img: 'inventory-default.png'},
                {name: 'Gift & Loyalty', id: 'gift-loyalty', value: ' ',  img: 'gift-loyalty-default.png'},
                {name: 'Reporting & Analytics', id: 'reports-analytics', value: ' ',  img: 'reporting-analytics-default.png'},
                {name: 'Mike Rose Cafe', id: 'enterprise', value: ' ',  img: 'enterprise-default.png'},
                {name: 'People', id: 'people', value: ' ',  img: 'people-default.png'}
                ];

        self.chemicals = [
            { name: 'Hydrogen' },
            { name: 'Helium' },
            { name: 'Lithium' },
            { name: 'Beryllium' },
            { name: 'Boron' },
            { name: 'Carbon' },
            { name: 'Nitrogen' },
            { name: 'Oxygen' },
            { name: 'Fluorine' },
            { name: 'Neon' },
            { name: 'Sodium' },
            { name: 'Magnesium' }
        ];
        self.appDrawer =
            {
                "edge": "start",
                "displayMode": "push",
                "selector": "#appDrawer",
                "selection": "selectedItem"
            };
        self.topDrawer =
            {
                "edge": "top",
                "displayMode": "push",
                "selector": "#topDrawer",
                "selection": "selectedItem"
                
            };
            var appSideNavData = [
                {name: 'Charts', id: 'charts'},
                {name: 'Reports', id: 'reports'},
                {name: 'Links', id: 'links'},
                {name: 'iCare', id: 'icare'},
                {name: 'myInventory', id: 'myinventory'},
                {name: 'Forecasting', id: 'forecasting'},
                {name: 'Dashboards', id: 'dashboards'},
                {name: 'myLabor', id: 'mylabor'},
                {name: 'Admin', id: 'admin'}   
            ];
        // Data for application name
            var appName = {
                "id": "qs",
                "name": "Hospitality"
            };
        
               // 
        // Toolbar buttons
        // 
            var toolbarData = {
                // user name in toolbar
                "userName": "john.hancock@oracle.com",
                "toolbar_buttons": [
                    {
                        "label": "toolbar_search_button",
                        "iconClass": "oj-fwk-icon-magnifier oj-fwk-icon",
                        "url": " "
                    }
                ],
                // Data for global nav dropdown menu embedded in toolbar.
                "global_nav_dropdown_items": [
                    {"label": "Preferences",
                        "url": "preference"
                    },
                    {"label": "Help",
                        "url": " "
                    },
                    {"label": "Sign Out",
                        "url": " "
                    }
                ]
            };
        
        self.appId = appName.id;
        self.appName = appName.name;

        //Data Source Linking
//        self.dataSource = new oj.ArrayTableDataSource(appNavData, {idAttribute: 'id'});
        self.dataSideSource = new oj.ArrayTableDataSource(appSideNavData, {idAttribute: 'id'});

        self.userName = ko.observable(toolbarData.userName);
        self.toolbarButtons = toolbarData.toolbar_buttons;
        self.globalNavItems = toolbarData.global_nav_dropdown_items;

//var customQuery = oj.ResponsiveKnockoutUtils.createMediaQueryObservable('(min-width: 378px)');
//alert(customQuery);
        self.toggleSideNav = function(){
            if($('#sidebar-left').is(':visible')){
                $('#sidebar-left').toggle();
                $('.page-area').removeClass('oj-lg-10');
                $('.page-area').addClass('oj-lg-12');
                $('#mainCol').css({'display' : 'block'});
            }else{
                $('#sidebar-left').toggle();
                $('.page-area').removeClass('oj-lg-12');
                $('.page-area').addClass('oj-lg-10');
                $('#mainCol').css({'display' : 'inline-flex'});
            }
        };
        self.topDrawerToggleClick =  function(){
            $("#topDrawer").on("ojbeforeopen", function(event, offcanvas) {
                $('.scopeLink').addClass('active');
                
            });
            $("#topDrawer").on("ojbeforeclose", function(event, offcanvas) {
                $('.scopeLink').removeClass('active');
            });
            return oj.OffcanvasUtils.toggle(this.topDrawer);

        }
        //General Dialog Reusable
        self.handleOpen =  function(dialog) {
            $(dialog).ojDialog("open");
        };
        self.toggleDrawer = function ()
        {
                return oj.OffcanvasUtils.toggle(this.topDrawer);

        };
        self.toggleAppDrawer = function ()
        {
            return oj.OffcanvasUtils.toggle(this.appDrawer);
        };
        self.linkUrlAppend = function (locationId)
        {
            var oldLink = locationId;

//                var root = location.protocol + '//' + location.host;
//                var q = document.URL.split('?')[1];
//                var url = window.location.href;

//                var previousValue = data.previousValue;
//                var loc = self.getUrlParameter('loc');
//                var qs = "&loc=" + encodeURIComponent(loc);
//                var pathLink = 'index.html?' +q.replace(previousValue,targetValue);


//                if(targetValue == 'people'){
//                    self.router.go(data.value);
//                    return (function(){ self.currentSectionState(data.value); });
//                }else{
                  
//                    setTimeout(function() {
//                         window.location = oldLink;
//                    }, 600);
////
//                }
        }
        //
        // Close off-screen content once window becomes larger.
        //
        var query = window.matchMedia("(min-width: 39.375rem)");
        var mqListener = function (event)
        {
            oj.OffcanvasUtils.close(self.appDrawer);
        };
        query.addListener(mqListener);  

    }
    
    return HeaderViewModel;
    
});

