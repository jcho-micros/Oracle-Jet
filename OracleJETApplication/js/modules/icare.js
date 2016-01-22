define(['ojs/ojcore', 'knockout', 'ojs/ojtabs'
   ], function (oj, ko) {
    function icareContentViewModel() {
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

        var appTabData = [
            {
                name: 'Profile',
                id: 'profile',
                url: '#',
                fileNameJs: 'profile',
                fileName: 'profile/profile'
            },
            {
                name: 'Schedules & Timecards',
                id: 'schedule-timecards',
                url: '#',
                fileNameJs: 'schedule-timecards',
                fileName: 'schedule-timecards/schedule-timecards'
            },
            {
                name: 'Jobs & Compensation',
                id: 'jobs-compensation',
                url: '#',
                fileNameJs: 'jobs-compensation',
                fileName: 'jobs-compensation/jobs-compensation'
            },
            {
                name: 'Payroll',
                id: 'payroll',
                url: '#',
                fileNameJs: 'payroll',
                fileName: 'payroll/payroll'
            },
            {
                name: 'Metrics',
                id: 'metrics',
                url: '#',
                fileNameJs: 'metrics',
                fileName: 'metrics/metrics'
            },
            {
                name: 'Permissions',
                id: 'permissions',
                url: '#',
                fileNameJs: 'permissions',
                fileName: 'permissions/permissions'
            }
        ];
        //current visible state of section, either true or false
        self.sectionsState = ko.observable(false);

        //access array for Section display
        self.dataTabSource = new oj.ArrayTableDataSource(appTabData, {
            idAttribute: 'id'
        });

        //Setting default values for currentSection name and currentSectionId Ids
        self.currentSection = ko.observable('Overview');
        self.currentSectionId = ko.observable('overview');

        //Toggles visibility of sections
        self.hideSections = function () {
            self.sectionsState(!self.sectionsState());
        };

        self.selectedSection = function () {
            self.currentSection(this.name);
            self.currentSectionId(this.id);
            self.hideSections();
        };

    }
    return icareContentViewModel;
});
