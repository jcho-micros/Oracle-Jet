define(['ojs/ojcore', 'knockout', 'data/data', 'ojs/ojknockout', ],
        function (oj, ko, jsonData)
        {

            function PersonViewModel() {
                var self = this;
                self.personProfile = ko.observableArray([]);

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
                        'profile': {label: 'profile', value: 'profile', isDefault: true},
                        'schedules-timecards': {label: 'schedules-timecards', value: 'schedules-timecards'},
                        'jobs-compensation': {label: 'jobs-compensation', value: 'jobs-compensation'},
                        'payroll': {label: 'payroll', value: 'payroll'},
                        'analytics': {label: 'analytics', value: 'analytics'},
                        'permissions': {label: 'permissions', value: 'permissions'}
                    });
                    // Returns the sync promise to handleActivated. The next
                    // phase of the ojModule lifecycle (attached) will not be
                    // executed until sync is resolved.
                    return oj.Router.sync();
                };

                function getEmpURL(id) {
                    var url;
                    if (id) {
                        url = "js/data/employee" + id + ".json";
                    } else {
                        url = "js/data/employee100.json";
                    }

                    return url;
                }

                self.goEmp = function (empId) {
                    self.empRouter.go(empId.toString());
                };

                // canEnter requires a promise that resolve as true or false
                self.loadData = function (id) {
                    return new Promise(function(resolve, reject) {
                        jsonData.fetchData(getEmpURL(id)).then(function (person) {
                            self.personProfile(person);
                            resolve(true);
                        }).fail(function (error) {
                            console.log('Error: ' + error.message);
                            resolve(false);
                        });
                    });
                };

                self.getPhoto = function (id) {
                    var src;
                    // We only have images for employees below 188 for now. Use the nopic avatar for those above 18
                    if (id < 188) {
                        src = 'css/images/people/' + id + '.png';
                    } else {
                        src = 'css/images/people/nopic.png';
                    }
                    return src;
                };

                self.getEmail = function () {
                    return "mailto:" + self.personProfile().email + '@example.net';
                };

                //Child router for tabs - assigns the URL
                self.selectTabHandler = function (event, ui) {
                    if ('profileTabs' === event.target.id && event.originalEvent) {
                        // Invoke go() with the selected item.
                        self.tabRouter.go(ui.key);
                    }
                };

            }

            return new PersonViewModel();
        });
