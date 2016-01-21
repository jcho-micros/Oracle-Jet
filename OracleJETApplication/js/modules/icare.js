define(['ojs/ojcore' ,'knockout', 'ojs/ojtabs'
   ], function(oj, ko) {
            function icareContentViewModel() {
                var self = this;
                self.something = ko.observable("Hello World");
                var appTabData = [
                    {
                        name: 'Overview',
                        id: 'overview',
                        url: '#',
                        fileName: 'overview'
                    },
                    {
                        name: 'Employees',
                        id: 'employees',
                        url: '#',
                        fileName: 'employees'
                    },
                    {
                        name: 'Schedules & Timecards',
                        id: 'schedulestimecards',
                        url: '#',
                        fileName: 'schedulestimecards'
                    },
                    {
                        name: 'Forecasting',
                        id: 'forecasting',
                        url: '#',
                        fileName: 'forecasting'
                    },
                    {
                        name: 'Payroll',
                        id: 'payroll',
                        url: '#',
                        fileName: 'payroll'
                    },
                    {
                        name: 'Metrics',
                        id: 'metrics',
                        url: '#',
                        fileName: 'metrics'
                    }
                ];
                //current visible state of section, either true or false
                self.sectionsState = ko.observable(false);

                //access array for Section display
                self.dataTabSource = new oj.ArrayTableDataSource(appTabData, {idAttribute: 'id'});

                //Setting default values for currentSection name and currentSectionId Ids
                self.currentSection = ko.observable('Overview');
                self.currentSectionId = ko.observable('overview');

                //Toggles visibility of sections
                self.hideSections = function(){
                    self.sectionsState(!self.sectionsState());
                };

                self.selectedSection = function(){
                    self.currentSection(this.name);
                    self.currentSectionId(this.id);
                    self.hideSections();
                };
            }
   return icareContentViewModel;
});
