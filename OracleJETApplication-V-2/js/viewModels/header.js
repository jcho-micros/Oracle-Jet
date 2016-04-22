define([
    'knockout', 
    'ojs/ojcore', 
    'jquery', 
    'ojs/ojknockout', 
    'ojs/ojnavigationlist',
    'ojs/ojdatacollection-common', 
    'ojs/ojdialog',
    'ojs/ojjsontreedatasource',
    'ojs/ojtabs',
    'ojs/ojfilmstrip',
    'ojs/ojconveyorbelt'
], function (ko, oj, $) {
    function HeaderViewModel() {
        var self = this;
        self.handleActivated = function (info) {

            self.dataSource = new oj.ArrayTableDataSource(appNavData, {idAttribute: 'id'});
//            self.globalstoreName = ko.observable("Beacon Hill");


        };
        var customQuery = oj.ResponsiveKnockoutUtils.createMediaQueryObservable('(max-width: 372px)');
        //where the all employee info will be stored

        //Required for the Avatar Right hand Drop down
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
        
            var appNavData = [
                {name: 'Home', id: 'home', value: ' ', img: 'home-default.png'},
                {name: 'Labor Managment', id: 'labor-management', value: ' ',  img: 'labor-default.png'},
                {name: 'Inventory Managment', id: 'inventory-management', value: ' ',  img: 'inventory-default.png'},
                {name: 'Gift & Loyalty', id: 'gift-loyalty', value: ' ',  img: 'gift-loyalty-default.png'},
                {name: 'Reporting & Analytics', id: 'reports-analytics', value: ' ',  img: 'reporting-analytics-default.png'},
                {name: 'Enterprise', id: 'enterprise', value: ' ',  img: 'enterprise-default.png'},
                {name: 'People', id: 'people', value: ' ',  img: 'people-default.png'}
                ];
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
        //Left side navigation
        self.appDrawer =
            {
                "edge": "start",
                "displayMode": "push",
                "selector": "#appDrawer",
                "selection": "selectedItem"
            };
            
        self.toggleAppDrawer = function ()
        {
            return oj.OffcanvasUtils.toggle(this.appDrawer);
        };
        
        self.appId = appName.id;
        self.appName = appName.name;

        self.userName = ko.observable(toolbarData.userName);
        self.toolbarButtons = toolbarData.toolbar_buttons;
        self.globalNavItems = toolbarData.global_nav_dropdown_items;
        self.dataSideSource = new oj.ArrayTableDataSource(appSideNavData, {idAttribute: 'id'});
        
        
        self.linkUrlAppend = function (locationId)
        {
            var oldLink = locationId;

        }
      
    }
    
    return HeaderViewModel;
    
});

