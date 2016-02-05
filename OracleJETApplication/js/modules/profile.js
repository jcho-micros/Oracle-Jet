define(['ojs/ojcore', 'knockout', 'data/data', 'moment', 'ojs/ojknockout', 'ojs/ojdialog', 'ojs/ojinputtext'],
        function (oj, ko, jsonData, moment)
        {

            function PersonViewModel() {
                var self = this;
                self.personProfile = ko.observableArray([]);

                //Employee Dialog
                self.handleOpen =  function() {
                    $("#empDialog").ojDialog("open");
                };

                self.handleClose =  function() {
                    $("#empDialog").ojDialog("close");
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
                        'profile': {label: 'Profile', value: 'profile', isDefault: true},
                        'schedules-timecards': {label: 'Schedules & Timecards', value: 'schedules-timecards'},
                        'jobs-compensation': {label: 'Jobs & Compensation', value: 'jobs-compensation'},
                        'payroll': {label: 'Payroll', value: 'payroll'},
                        'analytics': {label: 'Analytics', value: 'analytics'},
                        'permissions': {label: 'Permissions', value: 'permissions'}
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

                            //Not sure why above observable array can't be used with InputText binding in KO. Need to look into this.
                            //Sets up observables to be able to update them only in the view, does not save data.
                            self.firstName = ko.observable(self.personProfile().firstName);
                            self.lastName = ko.observable(self.personProfile().lastName);
                            self.posCheckName = ko.observable(self.personProfile().posCheckName);
                            self.language = ko.observable(self.personProfile().language);
                            self.timeZone = ko.observable(self.personProfile().timeZone);
                            self.ethnicity = ko.observable(self.personProfile().ethnicity);
                            self.gender = ko.observable(self.personProfile().gender);
                            //Still doesn't update when modal is changed
                            if(self.personProfile().veteranStatus === 1 ){
                                self.veteranStatus = ko.observable('yes');
                                self.veteranStatusVisible = ko.observable(true);
                            }else{
                                self.veteranStatus = ko.observable('no');
                                self.veteranStatusVisible = ko.observable(false);
                            }

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
                self.getDischargeDate = function () {
                    var dischargeDate = self.personProfile().dischargeDate;
                    var dateOptions = {formatStyle: 'date', dateFormat: 'medium'};
                    var dateConverter = oj.Validation.converterFactory("datetime").createConverter(dateOptions);
                    var startDate = oj.IntlConverterUtils.dateToLocalIso(moment(dischargeDate).toDate());
                    dischargeDate = dateConverter.format(startDate);
                    return dischargeDate;
                };

                self.formatAddress = function () {
                    var street = self.personProfile().address1;
                    var suite = self.personProfile().address2;
                    var city = self.personProfile().city;
                    var state = self.personProfile().state;
                    var postal = self.personProfile().postal;
                    var country = self.personProfile().country;
                    if(!suite){
                        return street + '<br/>' + city + '<br/>' + state + ' ' + postal + ' ' + country;
                    }else{
                        return street + '<br/>' + suite + '<br/>' + city + '<br/>' + state + ' ' + postal + ' ' + country;
                    }
                };

                self.formatEmergencyContact = function () {
                    var emergencyName = self.personProfile().emergencyName;
                    var relationship = self.personProfile().relationship;
                    var emergencyAddress = self.personProfile().emergencyAddress;
                    var emergencyCity = self.personProfile().emergencyCity;
                    var emergencyState = self.personProfile().emergencyState;
                    var emergencyZipCode = self.personProfile().emergencyZipCode;
                    var emergencyPhone = self.personProfile().emergencyPhone;

                    return emergencyName + ' (' + relationship + ') ' + '<br/>' + emergencyAddress + '<br/>' + emergencyCity + ' ' + emergencyState + ' ' + emergencyZipCode  + '<br/>' + emergencyPhone;
                };
            }


            return new PersonViewModel();
        });
