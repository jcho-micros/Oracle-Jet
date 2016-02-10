define(['ojs/ojcore', 'knockout', 'data/data', 'moment', 'ojs/ojknockout', 'ojs/ojdialog', 'ojs/ojinputtext', 'ojs/ojfilmstrip', 'ojs/ojtable'],
    function (oj, ko, jsonData, moment) {

        function AddEmpViewModel() {
            var self = this;

            //Employee Dialog
            self.handleOpen = function (dialog) {
                $(dialog).ojDialog("open");
            };

            self.handleClose = function (dialog) {
                $(dialog).ojDialog("close");
            };

            self.handleActivated = function (info) {

                var parentRouter = info.valueAccessor().params;

                // Retrieve the childRouter instance created in main.js
                self.empRouter = parentRouter.currentState().value;
                //Creates the child router for employees
                self.empRouter.configure(function (stateId) {
                    var state;
                    if (stateId) {
                        var data = stateId.toString();
                        state = new oj.RouterState(data, {
                            value: data,
                            // For each state, before entering the state,
                            // make sure the data for it is loaded.
                            canEnter: function () {
                                // The state transition will be on hold
                                // until loadData is resolved.
                                return self.loadData(data);
                            }
                        });
                    }
                    return state;
                });
                //Sets up the Child router for tabs
                self.tabRouter = self.empRouter.createChildRouter('tabs').configure({
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
                    'analytics': {
                        label: 'Analytics',
                        value: 'analytics'
                    },
                    'permissions': {
                        label: 'Permissions',
                        value: 'permissions'
                    }
                });

                // Returns the sync promise to handleActivated. The next
                // phase of the ojModule lifecycle (attached) will not be
                // executed until sync is resolved.
                return oj.Router.sync();
            };



            // canEnter requires a promise that resolve as true or false
            self.loadData = function (id) {
                return new Promise(function (resolve, reject) {
                    jsonData.fetchData(getEmpURL(id)).then(function (person) {
                        self.personProfile(person);
                        self.setupObservables();

                        resolve(true);
                    }).fail(function (error) {
                        console.log('Error: ' + error.message);
                        resolve(false);
                    });
                });
            };


            //Child router for tabs - assigns the URL
            self.selectTabHandler = function (event, ui) {
                if ('profileTabs' === event.target.id && event.originalEvent) {
                    // Invoke go() with the selected item.
                    self.tabRouter.go(ui.key);
                }
            };

        }


        return new AddEmpViewModel();
    });
