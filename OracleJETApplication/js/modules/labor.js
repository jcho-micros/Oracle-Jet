define(['knockout', 'ojs/ojcore', 'ojs/ojknockout', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojdatacollection-common', 'ojs/ojdialog',  'ojs/ojtabs', 'ojs/ojconveyorbelt','ojs/ojaccordion', 'ojs/ojcollapsible', 'ojs/ojradioset'
], function (ko, oj) {
        function laborContentViewModel() {
        var self = this;
        
        

        //KNOCK detect for lgQuery to return true or false
        var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
        self.medium = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
        
        var appSideNavData = [
            {
                name: 'Charts',
                id: 'charts',
                url: '#'
            },
            {
                name: 'Reports',
                id: 'reports',
                url: '#'
            },
            {
                name: 'Links',
                id: 'links',
                url: '#'
            },
            {
                name: 'iCare',
                id: 'icare',
                url: '#'
            },
            {
                name: 'MyInventory',
                id: 'myinventory',
                url: '#'
            },
            {
                name: 'Forecasting',
                id: 'forecasting',
                url: '#'
            },
            {
                name: 'Dashboards',
                id: 'dashboards',
                url: '#'
            },
            {
                name: 'myLabor',
                id: 'mylabor',
                url: '#'
            },
            {
                name: 'Admin',
                id: 'admin',
                url: '#'
            }

        ];
        var appTabData = [
                    {
                        name: 'Overview',
                        id: 'overview',
                        url: '#'
                    },
                    {
                        name: 'Employees',
                        id: 'employees',
                        url: '#'
                    },
                    {
                        name: 'Schedules & Timecards',
                        id: 'schedulestimecards',
                        url: '#'
                    },
                    {
                        name: 'Forecasting',
                        id: 'forecasting',
                        url: '#'
                    },
                    {
                        name: 'Payroll',
                        id: 'payroll',
                        url: '#'
                    },
                    {
                        name: 'Metrics',
                        id: 'metrics',
                        url: '#'
                    }

        ];

        self.dataSideSource = new oj.ArrayTableDataSource(appSideNavData, {idAttribute: 'id'});
        self.dataTabSource = new oj.ArrayTableDataSource(appTabData, {idAttribute: 'id'});
        self.something = ko.observable("Hello World");

        }

   return laborContentViewModel;

});