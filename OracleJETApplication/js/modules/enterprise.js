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
                    'overview': {label: 'Overview', value: 'fa fa-cogs', isDefault: true},
                    'locations': {label: 'Locations', value: 'fa fa-crosshairs'},
                    'levels': {label: 'Levels',value: 'fa fa-sitemap'},
                    'labor': {label: 'Labor', value: 'fa fa-briefcase'},
                    'inventory': {label: 'Inventory Management', value: 'fa fa-dropbox'},
                    'gift-loyalty': {label: 'Gift & Loyalty', value: 'fa fa-gift'},
                    'reports': {label: 'Reports', value: 'fa fa-bar-chart'},
                    'roles': {label: 'Roles', value: 'fa fa-users'},
                    'users': {label: 'Users', value: 'fa fa-user'}
                });
                // Now that the router for this view exist, synchronise it with the URL
                oj.Router.sync();
            }
            self.selectHandler = function (event, ui) {
                if ('enterpriseTabs' === event.target.id && event.originalEvent) {
                    // Invoke go() with the selected item.
                    console.log(event.target.id);
                    console.log(ui.key);
                    self.router.go(ui.key);
                }
            }
            self.dispose = function () {
                this.router.dispose();
                this.router = null;
            }
            self.pageHeading = ko.observable("Enterprise Configuration");
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
