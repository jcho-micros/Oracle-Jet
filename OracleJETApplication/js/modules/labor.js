define(['ojs/ojcore', 'knockout', 'ojs/ojtabs'
   ], function (oj, ko) {
    function laborContentViewModel() {
        var self = this;

        self.pageHeading = ko.observable("Labor");
        self.pageHeadingIconClass = ko.observable('fa fa-briefcase');
        self.organizationName = ko.observable("Micros");
        self.region = ko.observable("South East");
        self.location = ko.observable("Atlanta");

        self.pageSubNavigation = ko.computed(function() {
            return self.organizationName() + " | " + self.region() + " | " + self.location();
        }, self);

        var appTabData = [
            {
                name: 'Overview',
                id: 'overview',
                url: '#',
                fileNameJs: 'overview',
                fileName: 'overview/overview'
            },
            {
                name: 'Employees',
                id: 'employees',
                url: '#',
                fileNameJs: 'employees',
                fileName: 'employees/employees'
            },
            {
                name: 'Schedules & Timecards',
                id: 'schedules-timecards',
                url: '#',
                fileNameJs: 'schedules-timecards',
                fileName: 'schedules-timecards/schedules-timecards'
            },
            {
                name: 'Forecasting',
                id: 'forecasting',
                url: '#',
                fileNameJs: 'forecasting',
                fileName: 'forecasting/forecasting'
            },
            {
                name: 'Payroll',
                id: 'payroll',
                url: '#',
                fileNameJs: 'payroll',
                fileName: 'payroll/payroll'
            },
            {
                name: 'Analytics',
                id: 'analytics',
                url: '#',
                fileNameJs: 'analytics',
                fileName: 'analytics/analytics'
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
    return laborContentViewModel;
});
