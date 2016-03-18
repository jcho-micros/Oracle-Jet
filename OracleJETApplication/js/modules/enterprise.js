define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojconveyorbelt'],
    function (oj, ko, $) {
        /**
         * The view model for the iCare Child router.
         */

        function enterpriseContentViewModel() {
            var self = this;

            //Child Router
            this.router = undefined;

            self.handleActivated = function (data) {
                var parentRouter = oj.Router.rootInstance;
                this.router = parentRouter.createChildRouter('enterprisetabs').configure({
                    'overview': {label: 'Overview', value: 'overview', isDefault: true},
                    'labormanagement': {label: 'Labor Management', value: 'labormanagement'},
                    'inventorymanagement': {label: 'Inventory Management', value: 'inventorymanagement'},
                    'gift-loyalties': {label: 'Gift & Loyalty', value: 'gift-loyalty'},
                    'reportinganalytics': {label: 'Reporting & Analytics', value: 'reportinganalytics'},
                    'locations': {label: 'Location',value: 'locations'},
                    'levels': {label: 'Levels', value: 'levels'},
                    'roles': {label: 'Roles', value: 'roles'},
                    'users': {label: 'Users', value: 'users'}
                });
                // Now that the router for this view exist, synchronise it with the URL
                oj.Router.sync();
            }
            self.selectHandler = function (event, ui) {
                if ('enterpriseTabs' === event.target.id && event.originalEvent) {
                    // Invoke go() with the selected item.
                    self.router.go(ui.key);
                }
            }
            self.dispose = function () {
                this.router.dispose();
                this.router = null;
            }
            self.pageHeading = ko.observable('Enterprise Configuration');
            self.pageHeadingIconClass = ko.observable('fa fa-gift');
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

        return enterpriseContentViewModel;
    });
