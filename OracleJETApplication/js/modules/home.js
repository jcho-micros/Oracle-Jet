define(['knockout', 'ojs/ojcore', 'ojs/ojknockout', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojdatacollection-common', 'ojs/ojdialog',  'ojs/ojtabs', 'ojs/ojconveyorbelt','ojs/ojaccordion', 'ojs/ojcollapsible', 'ojs/ojradioset'
], function (ko, oj) {
$(function () {       
    $('a.alert.oj-tabs-title').on('click', '#btnParse', function () { alert('clicked');});
});
        function homeContentViewModel() {
        var self = this;
        
        //KNOCK detect for lgQuery to return true or false
        var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
        self.medium = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
        
        this.sectionName = ko.observable('Home');
        this.iconClass = ko.observable('fa fa-home');
        
        var Tabs = function(data) {
            var d = data || {};
            this.id = ko.observable(d.Id || 0);
            this.title = ko.observable(d.title || '');
            this.template = ko.observable(d.template || '');
        };
        
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
                template: 'tab-overview',
                url: '#'
            },
            {
                name: 'Generic Tab 1',
                id: 'inventory-tab-1',
                template: 'tab-overview',
                url: '#'
            },
            {
                name: 'Generic Tab 2',
                id: 'inventory-tab-2',
                url: '#'
            },
            {
                name: 'Generic Tab 3',
                id: 'inventory-tab-3',
                url: '#'
            },
            {
                name: 'Generic Tab 4',
                id: 'inventory-tab-4',
                url: '#'
            },
            {
                name: 'Generic Tab 5',
                id: 'inventory-tab-5',
                url: '#'
            }

        ];
        this.itemOnly = function(context) {
            return context['leaf'];
        };

        this.appTabData = ko.observableArray(
            ko.utils.arrayMap(appTabData, function(c) {return new Tabs(c);})
        );
        this.selectedTab = ko.observable("Overview");

        this.selectedItem = ko.observable();

        self.dataSideSource = new oj.ArrayTableDataSource(appSideNavData, {idAttribute: 'id'});
        self.dataTabSource = new oj.ArrayTableDataSource(appTabData, {idAttribute: 'id'});
        self.something = ko.observable("Hello World");

        }
        //Please Custom JQuery Scripts Here


   
return homeContentViewModel;




});