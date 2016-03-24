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
            self.pageHeading = ko.observable("Gift & Loyalty");
            self.pageHeadingIconClass = ko.observable('fa fa-gift');
            //current visible state of section, either true or false
            self.sectionsState = ko.observable(false);
            
            //Child Router
            this.router = undefined;

            self.handleActivated = function (data) {
                var parentRouter = oj.Router.rootInstance;
                
                self.router = parentRouter.createChildRouter('giftloyaltytab').configure({
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
            
            self.selectHandler = function (event, ui) {
                if ('giftLoyaltyTabs' === event.target.id && event.originalEvent) {
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

        };

        return icareContentViewModel;
    });
