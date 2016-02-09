define([
    'ojs/ojcore', 
    'knockout', 
    'jquery', 
    'ojs/ojknockout', 
    'ojs/ojrouter', 
    'ojs/ojnavigationlist', 
    'ojs/ojconveyorbelt', 
    'ojs/ojbutton', 
    'ojs/ojinputtext',
    'ojs/ojselectcombobox',
     'ojs/ojinputnumber',
    'ojs/ojdialog'],
    function (oj, ko, $) {
        /**
         * The view model for the iCare Child router.
         */

        function laborContentViewModel() {
            var self = this;

            //Child Router
            this.router = undefined;

            self.handleActivated = function (data) {
                var parentRouter = data.valueAccessor().params;
                this.router = parentRouter.createChildRouter('labortab').configure({
                    'overview': {label: 'Overview', value: 'overview', isDefault: true},
                    'employees': {label: 'Employees', value: 'employees'},
                    'schedules-timecards': {label: 'Schedules & Timecards', value: 'schedules-timecards'},
                    'forecasting': {label: 'Forecasting', value: 'forecasting'},
                    'payroll': {label: 'Payroll', value: 'payroll'},
                    'analytics': {label: 'Analytics', value: 'analytics'}
                });

                // Now that the router for this view exist, synchronise it with the URL
                oj.Router.sync();

            };
            var tabsNavData = [
                {name: 'Overview', id: 'overview'},
                {name: 'Employees', id: 'employees'},
                {name: 'Schedules & Timecards',id: 'schedules-timecards'},
                {name: 'Forecasting', id: 'forecasting'},
                {name: 'Payroll', id: 'payroll'},
                {name: 'Analytics', id: 'analytics'}
            ];
            //dialog header information
            self.filterHeading = ko.observable("Filter");
            self.filterHeadingIconClass = ko.observable('fa fa-filter');
            //Dialog location array
            self.locationList = ko.observableArray([
               {name: 'atlanta', id:'1', value: 'atlanta', label: 'Atlanta', regional: 'Southeast'},
               {name: 'washingtondc', id:'2', value: 'washingtondc', label: 'Washington DC', regional: 'East'},
               {name: 'newyorkcity', id:'3', value: 'newyorkcity', label: 'New York City', regional: 'East'},
               {name: 'miami', id:'4', value: 'miami',  label: 'Miami', regional: 'Southeast'},
               {name: 'sanfransico', id:'5', value: 'sanfransico',  label: 'San Fransico', regional: 'West'},
               {name: 'seattle', id:'6', value: 'seattle', label: 'Seattle', regional: 'West'},
               {name: 'chicago', id:'7', value: 'chicago', label: 'Chicago', regional: 'Midwest'}
            ]);
            self.sortedlocationList = ko.observableArray();
            self.navDataSource = new oj.ArrayTableDataSource(tabsNavData, {idAttribute: "id"});
            self.dataSource = new oj.ArrayTableDataSource(this.locationList, {idAttribute: "id"});
            self.listLocationCol = ko.observable('atlanta');


            
            
            
            self.sortLists = function () {
                self.locationList.sort(function (left, right) {
                    return left.name == right.name ? 0 : (left.name < right.name ? -1 : 1);
                });
            }
//console.log(self.locationList.sort(function (left, right) {
//                    return left.name == right.name ? 0 : (left.name < right.name ? -1 : 1);
//                }));

            self.currentValue = ko.observable(0);
            
            self.selectHandler = function (event, ui) {
                if ('tabs' === event.target.id && event.originalEvent) {
                    // Invoke go() with the selected item.
                    self.router.go(ui.key);
                }
            };
            self.dispose = function () {
                this.router.dispose();
                this.router = null;
            };
            self.pageHeading = ko.observable("Labor");
            self.pageHeadingIconClass = ko.observable('fa fa-briefcase');
            self.organizationName = ko.observable("Micros");
            self.region = ko.observable("South East");
            self.location = ko.observable("Atlanta");
            
            self.pageSubNavigation = ko.computed(function() {
                return self.organizationName() + " | " + self.region() + " | " + self.location();
            }, self);

            //current visible state of section, either true or false
            self.sectionsState = ko.observable(false);
            self.resultState = ko.observable(true);
            
            //Toggles visibility of sections
            self.toggleSections = function () {
                self.sectionsState(!self.sectionsState());
            };
            self.handleOpen =  function() {
                $("#scrollingDialog").ojDialog("open"); 
            };

            self.handleOKClose = function() {
                $("#scrollingDialog").ojDialog("close"); 
            };
            ko.components.register("dialogwindow", {
                viewModel: function(data) {
                    this.name = (data && data.name) || "none";
                },
                template: "<div data-bind=\"text: name\"></div>"
            });
//            goTodialog: function(product){
//                router.navigate('product/' + product.ProductId);
//            }

        };

        return laborContentViewModel;
    });
