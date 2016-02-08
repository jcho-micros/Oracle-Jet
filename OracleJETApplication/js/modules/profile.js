define(['ojs/ojcore', 'knockout', 'data/data', 'moment', 'ojs/ojknockout', 'ojs/ojdialog', 'ojs/ojinputtext', 'ojs/ojfilmstrip'],
        function (oj, ko, jsonData, moment)
        {

            function PersonViewModel() {
                var self = this;
                self.personProfile = ko.observableArray([]);

                //Employee Dialog
                self.handleOpen =  function() {
                    alert("hi");
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
                            self.setupObservables();

                            resolve(true);
                        }).fail(function (error) {
                            console.log('Error: ' + error.message);
                            resolve(false);
                        });
                    });
                };

                self.setupObservables = function(){
                    //Not sure why above observable array can't be used with InputText binding in KO. Need to look into this.
                    //Sets up observables to be able to update them only in the view, does not save data.
                    self.firstName = ko.observable(self.personProfile().firstName);
                    self.lastName = ko.observable(self.personProfile().lastName);
                    self.posCheckName = ko.observable(self.personProfile().posCheckName);
                    self.language = ko.observable(self.personProfile().language);
                    self.timeZone = ko.observable(self.personProfile().timeZone);
                    self.ethnicity = ko.observable(self.personProfile().ethnicity);
                    self.gender = ko.observable(self.personProfile().gender);

                    self.profilePhoto = ko.observable(self.personProfile().gender);

                    //Veteran Info Start
                        self.veteranStatus = ko.observable(self.personProfile().veteranStatus);
                        //changes veteranStatus 1/0 to yes/no
                        self.changeBooleanFormat(self.veteranStatus);

                        self.vietnamEra = ko.observable(self.personProfile().vietnamEra);
                        //changes veteranStatus 1/0 to text passed to function
                        self.changeBooleanToText(self.vietnamEra, 'Vietnam Era');

                        self.otherEligible = ko.observable(self.personProfile().otherEligible);
                        //changes veteranStatus 1/0 to text passed to function
                        self.changeBooleanToText(self.otherEligible, 'Other Eligible');

                        self.otherProtected = ko.observable(self.personProfile().otherProtected);
                        //changes veteranStatus 1/0 to text passed to function
                        self.changeBooleanToText(self.otherProtected, 'Other Protected');

                        self.armedForcesServiceMedal = ko.observable(self.personProfile().armedForcesServiceMedal);
                        //changes veteranStatus 1/0 to text passed to function
                        self.changeBooleanToText(self.armedForcesServiceMedal, 'Armed Forces Service Medal');

                        self.recentlySeparated = ko.observable(self.personProfile().recentlySeparated);
                        //changes veteranStatus 1/0 to text passed to function
                        self.changeBooleanToText(self.recentlySeparated, 'Recently Separated');

                        self.specialDisabled = ko.observable(self.personProfile().specialDisabled);
                        //changes veteranStatus 1/0 to text passed to function
                        self.changeBooleanToText(self.specialDisabled, 'Special Disabled');

                        self.registeredDisabledNumber = ko.observable(self.personProfile().registeredDisabledNumber);
                        self.dischargeDate = ko.observable(self.getDischargeDate());

                    //Veteran Info END

                    self.email = ko.observable(self.personProfile().email);
                    self.phone = ko.observable(self.personProfile().phone);
                    self.mobile = ko.observable(self.personProfile().mobile);
                    self.faxNumber = ko.observable(self.personProfile().faxNumber);

                    //Address Fields
                    self.address1 = ko.observable(self.personProfile().address1);
                    self.address2 = ko.observable(self.personProfile().address2);
                    self.city = ko.observable(self.personProfile().city);
                    self.state = ko.observable(self.personProfile().state);
                    self.postal = ko.observable(self.personProfile().postal);
                    self.country = ko.observable(self.personProfile().country);

                    //Emergency Contact Fields
                    self.emergencyName = ko.observable(self.personProfile().emergencyName);
                    self.relationship = ko.observable(self.personProfile().relationship);
                    //Formats relationship observable
                    self.formattedRelationship = ko.pureComputed({
                        read: function(){
                            return "(" + self.relationship() + ")";
                        }
                    });
                    self.emergencyAddress = ko.observable(self.personProfile().emergencyAddress);
                    self.emergencyCity = ko.observable(self.personProfile().emergencyCity);
                    self.emergencyState = ko.observable(self.personProfile().emergencyState);
                    self.emergencyZipCode = ko.observable(self.personProfile().emergencyZipCode);
                    self.emergencyPhone = ko.observable(self.personProfile().emergencyPhone);
                    
                    //This variable is for Schedule time  card Current schedule Dates Nested
                    self.currentScheduledDates = self.personProfile().currentScheduledDates;
                    self.dayStart = ko.observable(self.getFormattedDate('dayStart'));
                    self.dayEnd = ko.observable(self.getFormattedDate('dayEnd'));

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

                //Changes values from 1/0 to yes/no
                self.changeBooleanFormat = function(property){
                    if(property() === 1){
                        property("yes");
                    }else{
                        property("no");
                    }
                };

                //Changes values from 1/0 to text
                self.changeBooleanToText = function(property, text){
                    if(property() === 1){
                        property(text);
                    }else{
                        property("");
                    }
                };

                self.getEmail = function () {
                    return "mailto:" + self.email() + '@example.net';
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


                /////// JOHN insert for schedule

                //this is for Schedules and Timecards format Date
                self.getFormattedDate = function (oldDate) {
                    var currentListDate = self.currentScheduledDates;
                    for(i=0; i < currentListDate.length; i++){
                        var newDate = currentListDate[i][oldDate];
                        var dateOptions = {formatStyle: 'date', dateFormat: 'medium'};
                        var dateConverter = oj.Validation.converterFactory("datetime").createConverter(dateOptions);
                        var startDate = oj.IntlConverterUtils.dateToLocalIso(moment(newDate).toDate());
                        newDate = dateConverter.format(startDate);
                        //Returns the new format back into the original array dayListStart array
                        currentListDate[i][oldDate] = newDate;
                    }
                };


                self.currentNavArrowPlacement = ko.observable("adjacent");
                self.currentNavArrowVisibility = ko.observable("auto");

                getItemInitialDisplay = function(index){return index < 3 ? '' : 'none';};

            }


            return new PersonViewModel();
        });
