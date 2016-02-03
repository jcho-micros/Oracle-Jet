define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojconveyorbelt'],
    function (oj, ko, $) {
        /**
         * The view model for the iCare Child router.
         */

        function icareContentViewModel() {
            var self = this;

            //Child Router
            this.router = undefined;

            self.handleActivated = function (data) {
                var parentRouter = data.valueAccessor().params;

                this.router = parentRouter.createChildRouter('icaretab').configure({
                    'profile': {
                        label: 'Profile',
                        value: 'profile',
                        isDefault: true
                    },

                    'schedules-timecards': {
                        label: 'Schedules & Timecards',
                        value: 'schedules-timecards'
                    },

                    'jobs-compensation': {
                        label: 'Jobs & Compensation',
                        value: 'jobs-compensation'
                    },

                    'payroll': {
                        label: 'Payroll',
                        value: 'payroll'
                    },

                    'metrics': {
                        label: 'Metrics',
                        value: 'metrics'
                    },

                    'permissions': {
                        label: 'Permissions',
                        value: 'permissions'
                    }
                });
                // Now that the router for this view exist, synchronise it with the URL
                oj.Router.sync();
            }
            self.selectHandler = function (event, ui) {
                if ('tabs' === event.target.id && event.originalEvent) {
                    // Invoke go() with the selected item.
                    self.router.go(ui.key);
                }
            }
            self.dispose = function () {
                this.router.dispose();
                this.router = null;
            }
            self.pageHeading = ko.observable("iCare");
            self.pageHeadingIconClass = ko.observable('fa fa-gift');
            self.organizationName = ko.observable("Micros");
            self.level1 = ko.observable("level1");
            self.level2 = ko.observable("level2");
            self.location = ko.observable("North East");

            self.pageSubNavigation = ko.computed(function () {
                return self.organizationName() + " | " + self.level1() + " | " + self.level2() + " | " + self.location();
            }, self);

            //current visible state of section, either true or false
            self.sectionsState = ko.observable(false);

            //Toggles visibility of sections
            self.toggleSections = function () {
                self.sectionsState(!self.sectionsState());
            };

        };

        return icareContentViewModel;
    });
