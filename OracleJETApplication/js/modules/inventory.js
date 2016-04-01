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

        function inventoryContentViewModel() {
            var self = this;
            self.locationCity = ko.observableArray([]);
            self.pageHeading = ko.observable("Inventory Management");
            self.pageHeadingIconClass = ko.observable('fa fa-dropbox');

            //current visible state of section, either true or false
            self.sectionsState = ko.observable(false);
            
            //Child Router
            this.router = undefined;

            self.handleActivated = function (data) {
                var parentRouter = oj.Router.rootInstance;

                this.router = parentRouter.createChildRouter('inventorytab').configure({
                    'overview': {label: 'Overview', value: 'overview', isDefault: true},
                    'ordering-receiving': {label: 'Ordering & Receiving', value: 'ordering-receiving'},
                    'store': {label: 'Store', value: 'store'},
                    'menus-recipes': {label: 'Menus & Recipes', value: 'menus-recipes'},
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
                        self.setupObservables();
                        resolve(true);
                    }).fail(function (error) {
                        console.log('Error: ' + error.message);
                        resolve(false);
                    });
                });
            };
            self.setupObservables = function(){
                self.cityName = ko.observable(self.locationCity().cityname, "Boston");
                self.locID = ko.observable(self.locationCity().locID, "1");
                self.storeName = ko.observable(self.locationCity().name, "Beacon Hill");
                self.region = ko.observable(self.locationCity().region, "North East");
            };
            self.selectHandler = function (event, ui) {
                if ('inventoryTabs' === event.target.id && event.originalEvent) {
                    // Invoke go() with the selected item.
                    self.router.go(ui.key);
                }
            };
            self.dispose = function () {
                this.router.dispose();
                this.router = null;
            };

            //General Dialog Reusable
            self.handleOpen =  function(dialog) {
                $(dialog).ojDialog("open");
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

        };

        return inventoryContentViewModel;
    });
