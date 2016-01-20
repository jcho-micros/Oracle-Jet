define(['ojs/ojcore' ,'knockout', 'ojs/ojtabs'
   ], function(oj, ko) {
            function icareContentViewModel() {
                var self = this;
                self.something = ko.observable("Hello World");
                var appTabData = [
                    {
                        name: 'Overview',
                        id: 'overview',
                        url: '#'
                    },
                    {
                        name: 'Employees',
                        id: 'employees',
                        url: '#'
                    },
                    {
                        name: 'Schedules & Timecards',
                        id: 'schedulestimecards',
                        url: '#'
                    },
                    {
                        name: 'Forecasting',
                        id: 'forecasting',
                        url: '#'
                    },
                    {
                        name: 'Payroll',
                        id: 'payroll',
                        url: '#'
                    },
                    {
                        name: 'Metrics',
                        id: 'metrics',
                        url: '#'
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