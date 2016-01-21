define([
    'knockout', 
    'ojs/ojcore', 
    'ojs/ojknockout', 
    'ojs/ojrouter', 
    'ojs/ojnavigationlist', 
    'ojs/ojdatacollection-common', 
    'ojs/ojdialog',  
    'ojs/ojtabs', 
    'ojs/ojconveyorbelt', 
    'ojs/ojaccordion', 
    'ojs/ojcollapsible',
    'ojs/ojbutton',
    'ojs/ojcheckboxset',
    'ojs/ojinputtext',
    'ojs/ojselectcombobox',
    'ojs/ojradioset'
], function (ko, oj) {
$(function () {       
    $('a.alert.oj-tabs-title').on('click', '#btnParse', function () { alert('clicked');});
});
        function peopleContentViewModel() {
        var self = this;
        
        //KNOCK detect for lgQuery to return true or false
        var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
        self.medium = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
        
        this.sectionName = ko.observable('People');
        this.iconClass = ko.observable('fa fa-users');
        
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
        self.buttonClick = function(data, event){
            self.clickedButton(event.currentTarget.id);
            return true;
        }
        
        this.appTabData = ko.observableArray(
            ko.utils.arrayMap(appTabData, function(c) {return new Tabs(c);})
        );
        this.selectedTab = ko.observable("Overview");

        this.selectedItem = ko.observable();
       
        self.dataSideSource = new oj.ArrayTableDataSource(appSideNavData, {idAttribute: 'id'});
        self.dataTabSource = new oj.ArrayTableDataSource(appTabData, {idAttribute: 'id'});
        
        this._HELP_SOURCE = "http://www.oracle.com";
        this._HELP_DEF = "your custom help definition here";
        this.helpSource = ko.observable(this._HELP_SOURCE);
        this.helpDef = ko.observable(this._HELP_DEF);
        //Selection Observable Default
        this.val = ko.observableArray(["CH"]);
        //Check Box Observable Default
        self.currentStatus = ko.observable();
        }
        //Please Custom JQuery Scripts Here


   
return peopleContentViewModel;




});