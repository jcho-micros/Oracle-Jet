define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojrouter', 'ojs/ojnavigationlist'],
function (oj, ko, $) {

    //Router Items
    var chapters = {
        'preface': 'Darn beamed hurriedly because banal more \ giraffe shuffled and well rid placidly where hence or and and hound lantern cutely\instead inaudibly but demonstrable imitatively one regarding a where much fruitlessly\more depending goodness less as dear shark directed this one.',


        'chapter1': 'Affectingly and yikes one that along \ versus growled unwitting vulnerably fish far pouting otter some as this hamster\ hatchet where amicably far deftly curtsied.',



        'chapter2': 'More up mistaken for a kissed therefore \ ahead thus on dear wow undertook flabbily less much far sourly impala resolutely and\ and as overheard dachshund this.',



        'chapter3': 'Reindeer up while the far darn falcon \ concurrent iguana this strived unicorn hedgehog depending more lemming was swam\ unlike prosperously regarding shameful when and extravagant that then cat contagious.'


    };

    /**
     * The view model for the iCare Child router.
     */

    function icareContentViewModel(){
        var self = this;
        self.pageHeading = ko.observable("iCare");
        self.pageHeadingIconClass = ko.observable('fa fa-gift');
        self.organizationName = ko.observable("Micros");
        self.level1 = ko.observable("level1");
        self.level2 = ko.observable("level2");
        self.location = ko.observable("North East");

          self.pageSubNavigation = ko.computed(function() {
            return self.organizationName() + " | " + self.level1() + " | " + self.level2() + " | " + self.location();
        }, self);

        //Child Router
        this.router = undefined;

        self.handleActivated = function (data) {

            if (this.router) {
                return;
            }
            var parentRouter = data.valueAccessor().params;

            this.router = parentRouter.createChildRouter('tab').configure({
                'preface': {
                    label: 'Preface',
                    value: chapters['preface']
                },

                'chapter1': {
                    label: 'Chapter 1',
                    value: chapters['chapter1']
                },

                'chapter2': {
                    label: 'Chapter 2',
                    value: chapters['chapter2']
                },

                'chapter3': {
                    label: 'Chapter 3',
                    value: chapters['chapter3']
                }
            });
            // Now that the router for this view exist, synchronise it with the URL
            oj.Router.sync();
        }
        self.router, selectHandler = function (event, ui) {
            if ('tabs' === event.target.id && event.originalEvent) {
                // Invoke go() with the selected item.
                self.router.go(ui.key);
            }
        }
    };
//    var icareChildRouterViewModel = {
//
//        router: undefined,
//
//        initialize: function (data) {
//            if (this.router) {
//                return;
//            }
//            var parentRouter = data.valueAccessor().params;
//
//            this.router = parentRouter.createChildRouter('tab').configure({
//                'preface': {
//                    label: 'Profile',
//                    value: chapters['preface']
//                },
//
//                'chapter1': {
//                    label: 'Schedules & Timecards',
//                    value: chapters['chapter1']
//                },
//
//                'chapter2': {
//                    label: 'Jobs & Compensation',
//                    value: chapters['chapter2']
//                },
//
//                'chapter3': {
//                    label: 'Payroll',
//                    value: chapters['chapter3']
//                }
//            });
//
//            // Now that the router for this view exist, synchronise it with the URL
//            oj.Router.sync();
//        },
//
//        selectHandler: function (event, ui) {
//            if ('tabs' === event.target.id && event.originalEvent) {
//                // Invoke go() with the selected item.
//                icareChildRouterViewModel.router.go(ui.key);
//            }
//        }
//
//    };

    //JS not working here
 //  function icareContentViewModel() {
//
//        var self = this;
//
//        self.pageHeading = ko.observable("iCare");
//        self.pageHeadingIconClass = ko.observable('fa fa-gift');
//        self.organizationName = ko.observable("Micros");
//        self.level1 = ko.observable("level1");
//        self.level2 = ko.observable("level2");
//        self.location = ko.observable("North East");
//
//        self.pageSubNavigation = ko.computed(function() {
//            return self.organizationName() + " | " + self.level1() + " | " + self.level2() + " | " + self.location();
//        }, self);
//
//        var appTabData = [
//            {
//                name: 'Profile',
//                id: 'profile',
//                url: '#',
//                fileNameJs: 'profile',
//                fileName: 'profile/profile'
//            },
//            {
//                name: 'Schedules & Timecards',
//                id: 'schedule-timecards',
//                url: '#',
//                fileNameJs: 'schedule-timecards',
//                fileName: 'schedule-timecards/schedule-timecards'
//            },
//            {
//                name: 'Jobs & Compensation',
//                id: 'jobs-compensation',
//                url: '#',
//                fileNameJs: 'jobs-compensation',
//                fileName: 'jobs-compensation/jobs-compensation'
//            },
//            {
//                name: 'Payroll',
//                id: 'payroll',
//                url: '#',
//                fileNameJs: 'payroll',
//                fileName: 'payroll/payroll'
//            },
//            {
//                name: 'Metrics',
//                id: 'metrics',
//                url: '#',
//                fileNameJs: 'metrics',
//                fileName: 'metrics/metrics'
//            },
//            {
//                name: 'Permissions',
//                id: 'permissions',
//                url: '#',
//                fileNameJs: 'permissions',
//                fileName: 'permissions/permissions'
//            }
//        ];
//        //current visible state of section, either true or false
//        self.sectionsState = ko.observable(false);
//
//        //access array for Section display
//        self.dataTabSource = new oj.ArrayTableDataSource(appTabData, {
//            idAttribute: 'id'
//        });
//
//        //Setting default values for currentSection name and currentSectionId Ids
//        self.currentSection = ko.observable('Overview');
//        self.currentSectionId = ko.observable('overview');
//
//        //Toggles visibility of sections
//        self.hideSections = function () {
//            self.sectionsState(!self.sectionsState());
//        };
//
//        self.selectedSection = function () {
//            self.currentSection(this.name);
//            self.currentSectionId(this.id);
//            self.hideSections();
//        };
//    }

   //return icareChildRouterViewModel;
    return icareContentViewModel;
});
