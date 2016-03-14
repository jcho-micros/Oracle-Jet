define([
    'ojs/ojcore', 
    'knockout', 
    'data/data', 
    'moment', 
    'hammerjs',
    'ojs/ojknockout', 
  
], function (oj, ko, jsonData, moment) {
    
    
    function homeContentViewModel() {
        var self = this;
        self.locationCity = ko.observableArray([]);
        
        self.pageHeading = ko.observable("Home");
        
        self.handleActivated = function (info) {

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

            // Returns the sync promise to handleActivated. The next
            // phase of the ojModule lifecycle (attached) will not be
            // executed until sync is resolved.
            return oj.Router.sync();
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

    }

    return homeContentViewModel;

});
