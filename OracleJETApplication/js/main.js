/**
 * Example of Require.js boostrap javascript
 */

requirejs.config({
    // Path mappings for the logical module names
    paths: {
        'knockout': 'libs/knockout/knockout-3.3.0',
        'jquery': 'libs/jquery/jquery-2.1.3.min',
        'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.11.4.min',
        'ojs': 'libs/oj/v1.1.2/min',
        'ojL10n': 'libs/oj/v1.1.2/ojL10n',
        'ojtranslations': 'libs/oj/v1.1.2/resources',
        'signals': 'libs/js-signals/signals.min',
        'crossroads': 'libs/crossroads/crossroads.min',
        'text': 'libs/require/text',
        'promise': 'libs/es6-promise/promise-1.0.0.min',
        'hammerjs': 'libs/hammer/hammer-2.0.4.min'
    },
    // Shim configurations for modules that do not expose AMD
    shim: {
        'jquery': {
            exports: ['jQuery', '$']
        },
        'crossroads': {
            deps: ['signals'],
            exports: 'crossroads'
        }
    },

    // This section configures the i18n plugin. It is merging the Oracle JET built-in translation
    // resources with a custom translation file.
    // Any resource file added, must be placed under a directory named "nls". You can use a path mapping or you can define
    // a path that is relative to the location of this main.js file.
    config: {
        ojL10n: {
            merge: {
                //'ojtranslations/nls/ojtranslations': 'resources/nls/myTranslations'
            }
        }
    }
});


/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback.
 * 
 * For a listing of which JET component modules are required for each component, see the specific component
 * demo pages in the JET cookbook.
 */
require(['ojs/ojcore',
    'knockout',
    'jquery',
    'ojs/ojrouter',
    'ojs/ojknockout',
    'ojs/ojbutton',
    'ojs/ojtoolbar',
    'ojs/ojmenu',
    'ojs/ojmodule',
    'ojs/ojnavigationlist',
    'ojs/ojtabs',
    'ojs/ojtable',
    'ojs/ojbutton'
], // add additional JET component modules as needed
    function (oj, ko, $) // this callback gets executed when all required modules are loaded
    {
        // this is the global linking the JS files and tmpl file 
        oj.ModuleBinding.defaults.modelPath = 'modules/';
        oj.ModuleBinding.defaults.viewPath = 'text!../templates/';
        oj.ModuleBinding.defaults.viewSuffix = '.tmpl.html';

        var router = oj.Router.rootInstance;
        router.configure({
            'home': {
                label: 'Home',
                value: 'Home',
                isDefault: true
            },
            'labor': {
                label: 'Labor',
                value: 'Labor'
            },
            'inventory-management': {
                label: 'Inventory Management',
                value: 'Inventory Management'
            },
            'icare': {
                label: 'iCare',
                value: 'iCare'
            },
            'reports-charts': {
                label: 'Reports & Charts',
                value: 'Reports & Charts'
            },
            'enterprise': {
                label: 'Enterprise',
                value: 'Enterprise'
            },
            'people': {
                label: 'People',
                value: 'People'
            },
        });


        function RootViewModel() {
            var self = this;
            self.router = router;

            //Knockout js detect for lgQuery to return true or false
            var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
            self.medium = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

            var lgQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP);
            self.large = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(lgQuery);

            var appNavData = [
                {
                    name: 'Home',
                    id: 'home',
                    iconClass: 'fa fa-home oj-navigationlist-item-icon'

            },
                {
                    name: 'Labor',
                    id: 'labor',
                    iconClass: 'fa fa-briefcase oj-navigationlist-item-icon'
            },
                {
                    name: 'Inventory Management',
                    id: 'inventory-management',
                    iconClass: 'fa fa-dropbox oj-navigationlist-item-icon'
            },
                {
                    name: 'iCare',
                    id: 'icare',
                    iconClass: 'fa fa-gift oj-navigationlist-item-icon'
            },
                {
                    name: 'Reports & Charts',
                    id: 'reports-charts',
                    iconClass: 'fa fa-bar-chart oj-navigationlist-item-icon'
            },
                {
                    name: 'Enterprise',
                    id: 'enterprise',
                    iconClass: 'fa fa-building-o oj-navigationlist-item-icon'
            },
                {
                    name: 'People',
                    id: 'people',
                    iconClass: 'fa fa-users oj-navigationlist-item-icon'
            }

        ];
            self.dataSource = new oj.ArrayTableDataSource(appNavData, {
                idAttribute: 'id'
            });
            self.iconBig = new oj.ArrayTableDataSource(appNavData, {
                idAttribute: 'iconClass'
            });
            self.optionChangeHandler = function (event, data) {
                if (data.value == undefined) {
                    data.value = 'home';
                }
                // Only go for user action events
                if ('app-header-mobile-nav' || 'app-header-desktop-nav' === event.target.id && event.originalEvent) {
                    self.router.go(data.value);
                }
            };
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
