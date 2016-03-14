define([
    'knockout', 
    'ojs/ojcore', 
    'data/data', 
    'jquery', 
    'ojs/ojknockout', 
    'ojs/ojnavigationlist', 
    'ojs/ojoffcanvas', 
    'ojs/ojdatacollection-common', 
    'ojs/ojdialog',
    'ojs/ojjsontreedatasource',
    'ojs/ojtabs', 
    'ojs/ojconveyorbelt'
], function (ko, oj, data, $) {
    function HeaderViewModel() {
        var self = this;
        
        var customQuery = oj.ResponsiveKnockoutUtils.createMediaQueryObservable('(max-width: 372px)');
        //where the all employee info will be stored
        //self.allregions = ko.observableArray([]);
        self.allregions = ko.observableArray([]);

        self.selectedListItem = ko.observable("None");
        //self.ready = ko.observable(false);

//        var dataTreeList = $.getJSON( "js/data/test.json", function(data) {
//            data = new oj.JsonTreeDataSource(data);
//            console.log( "success" );
//        });
//        self.dataAllRegions = ko.observable(dataTreeList);


        //Required for the Drop down
        self.menuItemSelect = function (event, ui) {
//            switch (ui.item.attr("id")) {
//                case "About":
//                    $("#aboutDialog").ojDialog("open");
//                    break;
//                default:
//            }
        };
        self.offScreenButtonIconClass = "fa fa-bars fa-lg";
        self.offScreenButtonLabel = "MENU";
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
            var appNavData = [
                {name: 'Home', id: 'home', value: ' ', img: 'home-default.png'},
                {name: 'Labor', id: 'labor', value: ' ',  img: 'labor-default.png'},
                {name: 'Inventory', id: 'inventory', value: ' ',  img: 'inventory-default.png'},
                {name: 'Gift & Loyalty', id: 'gift-loyalty', value: ' ',  img: 'gift-loyalty-default.png'},
                {name: 'Reporting & Analytics', id: 'reports-analytics', value: ' ',  img: 'reporting-analytics-default.png'},
                {name: 'Mike Rose Cafe', id: 'enterprise', value: ' ',  img: 'enterprise-default.png'},
                {name: 'People', id: 'people', value: ' ',  img: 'people-default.png'}
                ];
        self.handleActivated = function (info) {

            self.dataSource = new oj.ArrayTableDataSource(appNavData, {idAttribute: 'id'});
            self.globalLocationInfo = ko.dataFor(document.getElementById('templateWrapper'));
            self.globalRegion = ko.observable(self.globalLocationInfo.region, "North East");
            self.globalCityName = ko.observable(self.globalLocationInfo.cityName, "Boston");
            self.globalCityNameId = ko.observable(self.globalLocationInfo.locID, "1");
            self.globalstoreName = ko.observable(self.globalLocationInfo.storeName, "Beacon Hill");
            
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
                    "url": " "
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
        self.newClass = ko.observable(false);
        self.changeClass = function() {
            self.newClass(true);
            self.toggleDrawer();
        }
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
        self.toggleDrawer = function ()
        {
                return oj.OffcanvasUtils.toggle(this.topDrawer);

        };
        self.toggleAppDrawer = function ()
        {
            return oj.OffcanvasUtils.toggle(this.appDrawer);
        };
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

