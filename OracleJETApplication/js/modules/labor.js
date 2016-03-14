define([
    'ojs/ojcore', 
    'knockout', 
    'data/data', 
    'moment', 
    'hammerjs',
    'ojs/ojknockout', 
    'ojs/ojrouter', 
    'ojs/ojnavigationlist', 
    'ojs/ojconveyorbelt', 
    'ojs/ojbutton', 
    'ojs/ojinputtext',
    'ojs/ojselectcombobox',
     'ojs/ojinputnumber',
    'ojs/ojdialog'],
    function (oj, ko, jsonData, moment) {
        /**
         * The view model for the iCare Child router.
         */

        function laborContentViewModel() {
            var self = this;
            self.locationCity = ko.observableArray([]);
            self.pageHeading = ko.observable("Labor Management");
            self.pageHeadingIconClass = ko.observable('fa fa-briefcase');
            self.organizationName = ko.observable("Micros");
            self.currentValue = ko.observable(0);
            //current visible state of section, either true or false
            self.sectionsState = ko.observable(false);
            self.resultState = ko.observable(true);
            //dialog header information
            self.filterHeading = ko.observable("Filter");
            self.filterHeadingIconClass = ko.observable('fa fa-filter');
            
            //Child Router
            this.router = undefined;

            self.handleActivated = function (data) {
                var parentRouter = oj.Router.rootInstance;

                // Retrieve the childRouter instance created in main.js
                self.locRouter = parentRouter.currentState().value;
                //Creates the child router for employees
                self.locRouter.configure(function (stateId) {
                    var state;
                    if (stateId) {
                        var data = stateId.toString();
                        state = new oj.RouterState(data, {
                            value: data,
                            // For each state, before entering the state,
                            // make sure the data for it is loaded.
                            canEnter: function () {
                                // The state transition will be on hold
                                // until loadData is resolved.
                                return self.loadData(data);
                            }
                        });
                    }
                    return state;
                });
                
                //Child of Location
                self.router = self.locRouter.createChildRouter('labortab').configure({
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
            function getLocURL(id) {
                var url;
                if (id) {
                    url = "js/data/location" + id + ".json";
                } else {
                    url = "js/data/location10.json";
                }

                return url;
            }

            self.goLoc = function (locId) {
                self.locRouter.go(locId.toString());
            };

            // canEnter requires a promise that resolve as true or false
            self.loadData = function (id) {
                return new Promise(function(resolve, reject) {
                    jsonData.fetchData(getLocURL(id)).then(function (location) {
                        self.locationCity(location);
                        self.setupScopeObservables();
                        resolve(true);
                    }).fail(function (error) {
                        console.log('Error: ' + error.message);
                        resolve(false);
                    });
                });
            };
            self.setupScopeObservables = function(){
                self.cityName = ko.observable(self.locationCity().cityname, "Boston");
                self.locID = ko.observable(self.locationCity().locID, "1");
                self.storeName = ko.observable(self.locationCity().name, "Beacon Hill");
                self.region = ko.observable(self.locationCity().region, "North East");
            };
            var tabsNavData = [
                {name: 'Overview', id: 'overview'},
                {name: 'Employees', id: 'employees'},
                {name: 'Schedules & Timecards',id: 'schedules-timecards'},
                {name: 'Forecasting', id: 'forecasting'},
                {name: 'Payroll', id: 'payroll'},
                {name: 'Analytics', id: 'analytics'}
            ];

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

            self.sortLists = function () {
                self.locationList.sort(function (left, right) {
                    return left.name == right.name ? 0 : (left.name < right.name ? -1 : 1);
                });
            };

            
            self.selectHandler = function (event, ui) {
                if ('laborTabs' === event.target.id && event.originalEvent) {
                    // Invoke go() with the selected item.
                    self.router.go(ui.key);
                }
            };
            self.dispose = function () {
                this.router.dispose();
                this.router = null;
            };
            
            //Toggles visibility of sections
            self.toggleSections = function () {
                self.sectionsState(!self.sectionsState());
                if(self.sectionsState()==true){
                    $('.mobileNavTitleArea .fa-chevron-down').addClass('fa-chevron-up').removeClass('fa-chevron-down');
                }else if(self.sectionsState()==false){
                    $('.mobileNavTitleArea .fa-chevron-up').addClass('fa-chevron-down').removeClass('fa-chevron-up');

                }

            };
            self.handleOpen =  function() {
                $("#scrollingDialog").ojDialog("open"); 
            };

            self.handleOKClose = function() {
                $("#scrollingDialog").ojDialog("close"); 
            };

//            goTodialog: function(product){
//                router.navigate('product/' + product.ProductId);
//            }

        };

        return laborContentViewModel;
    });
