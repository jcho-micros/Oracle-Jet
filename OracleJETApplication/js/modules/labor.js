define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojconveyorbelt'],
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
                    'overview': {
                        label: 'Overview',
                        value: 'overview',
                        isDefault: true
                    },

                    'employees': {
                        label: 'Employees',
                        value: 'employees'
                    },

                    'schedules-timecards': {
                        label: 'Schedules & Timecards',
                        value: 'schedules-timecards'
                    },

                    'forecasting': {
                        label: 'Forecasting',
                        value: 'forecasting'
                    },

                    'payroll': {
                        label: 'Payroll',
                        value: 'payroll'
                    },

                    'analytics': {
                        label: 'Analytics',
                        value: 'analytics'
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

            //Toggles visibility of sections
            self.toggleSections = function () {
                self.sectionsState(!self.sectionsState());
            };

        };

        return laborContentViewModel;
    });
