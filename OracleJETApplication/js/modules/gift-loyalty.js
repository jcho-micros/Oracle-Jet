define([
    'ojs/ojcore', 
    'knockout', 
    'data/data', 
    'moment', 
    'hammerjs',
    'ojs/ojknockout', 
    'ojs/ojrouter', 
    'ojs/ojnavigationlist', 
    'ojs/ojconveyorbelt'],
    function (oj, ko, jsonData, moment) {
        /**
         * The view model for the iCare Child router.
         */

        function icareContentViewModel() {
            var self = this;
            self.locationCity = ko.observableArray([]);
            
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

                self.router = self.locRouter.createChildRouter('giftloyaltytab').configure({
                    'profile': {label: 'Profile', value: 'profile', isDefault: true},
                    'schedules-timecards': {label: 'Schedules & Timecards', value: 'schedules-timecards'},
                    'jobs-compensation': {label: 'Jobs & Compensation', value: 'jobs-compensation'},
                    'payroll': {label: 'Payroll', value: 'payroll'},
                    'metrics': {label: 'Metrics', value: 'metrics'},
                    'permissions': {label: 'Permissions', value: 'permissions'}
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
            self.selectHandler = function (event, ui) {
                if ('giftLoyaltyTabs' === event.target.id && event.originalEvent) {
                    // Invoke go() with the selected item.
                    self.router.go(ui.key);
                }
            };

            self.pageHeading = ko.observable("Gift & Loyalty");
            self.pageHeadingIconClass = ko.observable('fa fa-gift');
            //current visible state of section, either true or false
            self.sectionsState = ko.observable(false);

            //Toggles visibility of sections
            self.toggleSections = function () {
                self.sectionsState(!self.sectionsState());
                if(self.sectionsState()==true){
                    $('.mobileNavTitleArea .fa-chevron-down').addClass('fa-chevron-up').removeClass('fa-chevron-down');
                }else if(self.sectionsState()==false){
                    $('.mobileNavTitleArea .fa-chevron-up').addClass('fa-chevron-down').removeClass('fa-chevron-up');

                }

            };

        };

        return icareContentViewModel;
    });
