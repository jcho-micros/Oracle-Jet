/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Example of Require.js boostrap javascript
 */
requirejs.config({
    // Path mappings for the logical module names
    paths:
    //injector:mainReleasePaths
    {
        'knockout': 'libs/knockout/knockout-3.4.0',
        'jquery': 'libs/jquery/jquery-2.1.3.min',
        'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.11.4.min',
        'promise': 'libs/es6-promise/promise-1.0.0.min',
        'hammerjs': 'libs/hammer/hammer-2.0.4.min',
        'knockout-amd-helpers': 'libs/knockout/knockout-amd-helpers.min',
        'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0.min',
        'ojs': 'libs/oj/v2.0.0/debug',
        'ojL10n': 'libs/oj/v2.0.0/ojL10n',
        'ojtranslations': 'libs/oj/v2.0.0/resources',
        'signals': 'libs/js-signals/signals.min',
        'text': 'libs/require/text',
        'moment': 'libs/moment/moment.min'
    }
    //endinjector
    ,
    // Shim configurations for modules that do not expose AMD
    shim: {
        'jquery': {
            exports: ['jQuery', '$']
        }
    },
    // This section configures the i18n plugin. It is merging the Oracle JET built-in translation
    // resources with a custom translation file.
    // Any resource file added, must be placed under a directory named "nls". You can use a path mapping or you can define
    // a path that is relative to the location of this main.js file.
    config: {
        ojL10n: {
            merge: {
                //'ojtranslations/nls/ojtranslations': 'resources/nls/menu'
            }
        }
    }
});

/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojrouter', 'knockout-amd-helpers',
  'ojs/ojmodule', 'ojs/ojoffcanvas', 'ojs/ojnavigationlist', 'ojs/ojarraytabledatasource'],
    function (oj, ko, $) { // this callback gets executed when all required modules are loaded

        // this is the global linking the JS files and tmpl file 
        oj.ModuleBinding.defaults.modelPath = 'viewModels/';
        oj.ModuleBinding.defaults.viewPath = 'text!../views/';
        oj.ModuleBinding.defaults.viewSuffix = '.html';
        ko.amdTemplateEngine.defaultPath = "../views";

        var router = oj.Router.rootInstance;
        router.configure({
            'home': {label: 'Home', isDefault: true},
            'labor-management': {label: 'Labor Management', value: 'labor-management'},
            'inventory-management': {label: 'Inventory', value: 'inventory-management'},
            'gift-loyalty': {label: 'Gift & Loyalty', value: 'gift-loyalty'},
            'reports-analytics': {label: 'Reporting & Analytics', value: 'reports-analytics'},
            'enterprise': {label: 'Enterprise', value: 'enterprise'},
            'people': {label: 'People', value: 'people'},
            'profile': {label: 'Profile', value: 'profile',
                exit: function () {
                    var childRouter = router.currentState().value;
                    childRouter.dispose();
                    $('#people').removeClass('oj-selected');
                },
                enter: function () {
                    var childRouter = router.createChildRouter('emp');
                    childRouter.defaultStateId = '100';
                    router.currentState().value = childRouter;
                }
            }
        });

        function RootViewModel() {
            var self = this;

            //User information from json
            var userData = {
                name: 'Sarah Smith',
                email: 'sarah.smith@gmail.com',
                id: '2',
                role: '2',
                homeLocationID: '1',
                homeLocationName: 'Bunker Hill',
                assignedLocations: [
                    {
                        "locID" : 1,
                        "name" : "Beacon Hill",
                        "cityname" : "Boston1",
                        "region" : "North East1",
                        "dailySales" : "123,234",
                        "laborCosts" : "12,543"
                    },
                    {
                        "locID" : 2,
                        "name" : "Cambridge",
                        "cityname" : "Boston2",
                        "region" : "North East2",
                        "dailySales" : "223,234",
                        "laborCosts" : "22,543"
                    },
                    {
                      "locID": 3,
                      "name": "Bunker Hill",
                      "cityname": "Boston3",
                      "region": "North East3",
                      "dailySales" : "323,234",
                      "laborCosts" : "32,543"
                    }
                ]
            };
            self.userData = ko.observable(userData);

            //Active Store location
            self.activeLocation = ko.observable(userData.homeLocationName);
            self.activeLocationId = ko.observable(userData.homeLocationID);

            //Updates observables to update location based on click
            self.updateActiveLocation = function () {
                var data = ko.dataFor(event.target);
                    if (data) {
                         self.activeLocation(data.name);
                         self.activeLocationId(data.locID);
                    }
            };

            self.router = router;

            var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
            self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
            var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
            self.medium = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
            var lgQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP);
            self.large = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(lgQuery);
                
            /*For dynamic title in header section rather than each page template*/
            self.pageTitle = ko.pureComputed(function(){ 
                var routerId = self.router.stateId();
                switch(routerId){
                    case 'home':
                        title = "Home";
                        return title;
                    case 'labor-management':
                        title = "Labor Management";
                        return title;
                    case 'inventory-management':
                        title = 'Inventory Management';
                        return title;
                    case 'gift-loyalty':
                        title = 'Gift & Loyalty';
                        return title;
                    case 'reports-analytics':
                        title = 'Reports & Analytics';
                        return title;
                    case 'enterprise':
                        title = 'Enterprise';
                        return title;
                    case 'people':
                        title = 'People';
                        return title;
                    case 'profile':
                        title = 'Profile';
                        return title;
                }
            });

            self.optionChangeHandler = function (event, data) {
                if (data.value == undefined) {
                    data.value = 'home';
                } else {
                    self.router.go(data.value);
                    return (function () {
                        self.currentSectionState(data.value);
                    });
                }
            };
            self.topDrawer =
            {
                "displayMode": "push",
                "selector": "#topDrawer"
            };
            // Called by navigation drawer toggle button and after selection of nav drawer item
            self.toggleDrawer = function (){
                $("#topDrawer").on("ojbeforeopen", function(event, offcanvas) {
                    $('.globalStoreLink').addClass('active');
                });
                $("#topDrawer").on("ojbeforeclose", function(event, offcanvas) {
                    $('.globalStoreLink').removeClass('active');
                });
                return oj.OffcanvasUtils.toggle(self.topDrawer);
            };
            
            /*For opening the dialog winodws on all views*/
            self.handleOpen = function (dialog) {
                $(dialog).ojDialog("open");
            };

            // Close the drawer for medium and up screen sizes
            var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
            self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
               //
            // Close off-screen content once window becomes larger.
            //
            var query = window.matchMedia("(min-width: 39.375rem)");
            var mqListener = function (event)
            {
                oj.OffcanvasUtils.close(self.topDrawer);
            };
            query.addListener(mqListener); 

        }
        oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
        oj.Router.sync().then(
            function () {
                //bind your ViewModel for the content of the whole page body.
                ko.applyBindings(new RootViewModel(), document.getElementById('globalBody'));
                $('#globalBody').show();
            },
            function (error) {
                oj.Logger.error('Error in root start: ' + error.message);
            });


    }
);
