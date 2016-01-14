define(['knockout', 'ojs/ojcore', 'ojs/ojknockout', 'ojs/ojnavigationlist', 'ojs/ojoffcanvas', 'ojs/ojdatacollection-common', 'ojs/ojdialog'
], function (ko, oj) {
    function HeaderViewModel() {
        var self = this;
        //Required for the Drop down
        self.menuItemSelect = function (event, ui) {
            switch (ui.item.attr("id")) {
                case "About":
                    $("#aboutDialog").ojDialog("open");
                    break;
                default:
            }
        };
        self.offScreenButtonIconClass = "oj-fwk-icon oj-fwk-icon-hamburger";
        self.offScreenButtonLabel = "MENU";
        self.appDrawer =
            {
                "edge": "start",
                "displayMode": "push",
                "selector": "#appDrawer",
                "selection": "selectedItem"
            };
//        var appNavData = [
//            {
//                name: 'Home',
//                id: 'home',
//                iconClass: 'fa fa-home oj-navigationlist-item-icon'
//            
//            },
//            {
//                name: 'Labor',
//                id: 'labor',
//                iconClass: 'fa fa-briefcase oj-navigationlist-item-icon'
//            },
//            {
//                name: 'Inventory',
//                id: 'inventory',
//                iconClass: 'fa fa-dropbox oj-navigationlist-item-icon'
//            },
//            {
//                name: 'iCare',
//                id: 'icare',
//                iconClass: 'fa fa-gift oj-navigationlist-item-icon'
//            },
//            {
//                name: 'Report & Charts',
//                id: 'reportcharts',
//                iconClass: 'fa fa-bar-chart oj-navigationlist-item-icon'
//            },
//            {
//                name: 'Enterprise Name',
//                id: 'entrerprisename',
//                iconClass: 'fa fa-building-o oj-navigationlist-item-icon'
//            },
//            {
//                name: 'People',
//                id: 'people',
//                iconClass: 'fa fa-users oj-navigationlist-item-icon'
//            }
//            
//        ];
        var appSideNavData = [
            {
                name: 'System Admin\n\ Mike Rose Cafe',
                id: 'home'
            },            {
                name: 'Charts',
                id: 'charts'
            },
            {
                name: 'Reports',
                id: 'reports'
            },
            {
                name: 'Links',
                id: 'links'
            },
            {
                name: 'iCare',
                id: 'icare'
            },
            {
                name: 'MyInventory',
                id: 'myinventory'
            },
            {
                name: 'Forecasting',
                id: 'forecasting'
            },
            {
                name: 'Dashboards',
                id: 'dashboards'
            },
            {
                name: 'myLabor',
                id: 'mylabor'
            },
            {
                name: 'Admin',
                id: 'admin'
            }
            
        ];
        // Data for application name
        var appName = {
            "id": "qs",
            "name": "Hospitality | Enterprise Backoffice"
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
                    "url": "#"
                }
            ],
            // Data for global nav dropdown menu embedded in toolbar.
            "global_nav_dropdown_items": [
                {"label": "Preferences",
                    "url": "#"
                },
                {"label": "Help",
                    "url": "#"
                },
                {"label": "Sign Out",
                    "url": "#"
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

