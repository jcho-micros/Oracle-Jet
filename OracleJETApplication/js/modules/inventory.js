define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojconveyorbelt'],
    function (oj, ko, $) {
        /**
         * The view model for the iCare Child router.
         */

        function inventoryContentViewModel() {
            var self = this;

            //Child Router
            this.router = undefined;

            self.handleActivated = function (data) {
                var parentRouter = data.valueAccessor().params;

                this.router = parentRouter.createChildRouter('inventorytab').configure({
                    'overview': {
                        label: 'Overview',
                        value: 'overview',
                        isDefault: true
                    },

                    'ordering-receiving': {
                        label: 'Ordering & Receiving',
                        value: 'ordering-receiving'
                    },

                    'store': {
                        label: 'Store',
                        value: 'store'
                    },

                    'menus-recipes': {
                        label: 'Menus & Recipes',
                        value: 'menus-recipes'
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
            self.pageHeading = ko.observable("Inventory Management");
            self.pageHeadingIconClass = ko.observable('fa fa-dropbox');
            self.organizationName = ko.observable("Micros");
            self.level1 = ko.observable("level1");
            self.level2 = ko.observable("level2");
            self.location = ko.observable("Atlanta");

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

        return inventoryContentViewModel;
    });