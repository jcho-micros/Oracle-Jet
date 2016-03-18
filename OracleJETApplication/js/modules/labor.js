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
            self.organizationName = ko.observable("Micros");
            self.currentValue = ko.observable(0);
            self.sectionsState = ko.observable(false);
            //Child Router
            this.router = undefined;

            self.handleActivated = function (data) {

                var parentRouter = oj.Router.rootInstance;
                //Child of Location
                self.router = parentRouter.createChildRouter('labortab').configure({
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
            //General Dialog Reusable
            self.handleOpen =  function(dialog) {
                $(dialog).ojDialog("open");
            };


//            goTodialog: function(product){
//                router.navigate('product/' + product.ProductId);
//            }

        };

        return laborContentViewModel;
    });
