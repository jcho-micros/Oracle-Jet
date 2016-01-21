define(['ojs/ojcore', 'knockout', 'ojs/ojtabs'
   ], function (oj, ko) {
    function icareContentViewModel() {
        var self = this;
        self.something = ko.observable("Hello World");
        this.iconClass = ko.observable('fa fa-home');
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
                id: 'schedulestimecards',
                url: '#',
                fileNameJs: 'schedulestimecards',
                fileName: 'schedulestimecards/schedulestimecards'
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
                name: 'Metrics',
                id: 'metrics',
                url: '#',
                fileNameJs: 'metrics',
                fileName: 'metrics/metrics'
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
