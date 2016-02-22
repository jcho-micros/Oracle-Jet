define([
    'ojs/ojcore', 
    'knockout', 
    'data/data', 
    'moment', 
    'ojs/ojknockout', 
    'ojs/ojdialog', 
    'ojs/ojinputtext', 
    'ojs/ojfilmstrip', 
    'ojs/ojtable', 
    'ojs/ojaccordion', 
    'ojs/ojcollapsible', 
    'ojs/ojcheckboxset', 
    'ojs/ojradioset',
    'ojs/ojdatetimepicker', 
    'ojs/ojselectcombobox',
    'ojs/ojchart'],
        function (oj, ko, jsonData, moment)
        {

            function PersonViewModel() {
                var self = this;
                self.personProfile = ko.observableArray([]);

                //Employee Dialog
                self.handleOpen =  function(dialog) {
                    $(dialog).ojDialog("open");
                };

                self.handleClose =  function(dialog) {
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
                            self.directReports(self.personProfile().reports);
                            loadPerfandPotenialData();
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
                        self.dischargeDate = ko.observable(self.getBasicFormattedDate('dischargeDate'));

                    //Veteran Info END

                    self.email = ko.observable(self.personProfile().email);
                    self.receiveEmailNotification = ko.observable(self.personProfile().receiveEmailNotification);
                    self.receiveTextNotification = ko.observable(self.personProfile().receiveTextNotification);
                    self.publishInCompanyDirectory = ko.observable(self.personProfile().publishInCompanyDirectory);
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
                    self.inCityLimits = ko.observable(self.personProfile().inCityLimits);
                    

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
                    
                    //Hire Status variables
                    self.hireDate = ko.observable('');
                    self.hireType = ko.observable('');
                    self.reHireDate = ko.observable('');

                    //This variable is for Schedule time  card Current schedule Dates Nested
                    self.currentScheduledDates = self.personProfile().currentScheduledDates;
               
                    self.futureScheduledDates = self.personProfile().futureScheduledDates;
                    self.currentDayStart = ko.observable(self.getFormattedDate('currentDayStart'));
                    self.currentDayEnd = ko.observable(self.getFormattedDate('currentDayEnd'));
                    self.currentDayStartTime = ko.observable(self.getFormattedTime('currentDayStartTime'));
                    self.currentDayEndTime = ko.observable(self.getFormattedTime('currentDayEndTime'));
                    self.futureDayStart = ko.observable(self.getFutureFormattedDate('futureDayStart'));
                    self.futureDayEnd = ko.observable(self.getFutureFormattedDate('futureDayEnd'));
                    self.futureDayStartTime = ko.observable(self.getFutureFormattedTime('futureDayStartTime'));
                    self.futureDayEndTime = ko.observable(self.getFutureFormattedTime('futureDayEndTime'));
                    self.datasource = new oj.ArrayTableDataSource(self.currentScheduledDates, {idAttribute: 'id'});
                    self.availability = self.personProfile().availability;
                    self.unavailable = self.personProfile().unavailable;
                    self.preferred = self.personProfile().preferred;
                    self.schooldistrict = self.personProfile().schooldistrict;
                    //Schedule Modale
                    self.totalHours = ko.observable(35.0);
                    self.regularHours = ko.observable(35.0);
                    self.hoursOver = ko.observable(0.0);
                    self.overtimeHours = ko.observable(0.0);
                    self.val = ko.observableArray(["current"]);

                    //Home Store Modal
                    self.enterpriseName = ko.observable("W");
                    self.location1Name = ko.observable("CA");
                    self.location2Name = ko.observable('');
                    
                    self.val = ko.observableArray([""]);
                    self.socialnumber = ko.observable("12345678945");
                    //Analytics
                    self.orientationValue = ko.observable('vertical');
                    self.stackValue = ko.observable('off');
                    self.barSeriesValue = ko.observableArray();
                    self.barGroupsValue = ko.observableArray();
                    self.comboSeriesValue = ko.observableArray();
                    self.comboGroupsValue = ko.observableArray();
                    self.pieSeriesValue = ko.observableArray();
                    self.directReports = ko.observableArray([]);
                    self.infoTiles = ko.observableArray();
                    //payroll 
                    self.extPayrollId = ko.observable(self.personProfile().externalPayrollId);
                    self.minimumwage = ko.observable(self.personProfile().subminimumwage);
                    self.overtimeexempt = ko.observable(self.personProfile().overtimeexempt);
                    self.birthDate = ko.observable(self.personProfile().dateofbirth);
                    self.birthDateFormatted = ko.pureComputed(function(){
                        if(self.birthDate() !== ''){
                            var date = new Date(self.birthDate() + ' 00:00:00');
                            var newDate = ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
                        }
                        return newDate;
                    });

                    self.admissionnumber = ko.observable(self.personProfile().admissionnumber);
                    self.insexpirationdate = ko.observable(self.personProfile().insexpirationdate);
                    self.insexpirationdateFormatted = ko.pureComputed(function(){return self.basicCalDateFormat(self.insexpirationdate());});

                    self.insstatus = ko.observableArray([self.personProfile().insstatus]);
                    self.socialsecuritynumber = ko.observable(self.personProfile().socialsecuritynumber);
                    self.identifydocumenttype = ko.observable(self.personProfile().identifydocumenttype);
                    self.identityTypes = ko.observableArray(identityTypes);
                    //Disable the selection view
                    self.disabledState = ko.observable(true);
                    self.bi9documenttype = ko.observable(self.personProfile().bi9documenttype, 'pleaseselect');
                    self.bi9DocTypes = ko.observableArray(bi9DocTypes);
                    self.bi9TypeSelected = ko.observable(self.bi9filterSelectedType());
                    self.bi9documentid = ko.observable(self.personProfile().bi9documentid);
                    self.bi9documentexpiration = ko.observable(self.getBasicFormattedDate('bi9documentexpiration'));
                    self.bi9documentupload = ko.observable(self.personProfile().bi9documentupload);
                    self.ci9documenttype = ko.observable(self.personProfile().ci9documenttype, 'pleaseselect');
                    self.ci9DocTypes = ko.observableArray(ci9DocTypes);
                    self.ci9TypeSelected = ko.observable(self.ci9filterSelectedType());
                    self.ci9documentid = ko.observable(self.personProfile().ci9documentid);
                    self.ci9documentexpiration = ko.observable(self.getBasicFormattedDate('ci9documentexpiration'));
                    self.ci9documentupload = ko.observable(self.personProfile().ci9documentupload);
                    self.agecertification = ko.observable(self.personProfile().agecertification);
                    self.certificationnumber = ko.observable(self.personProfile().certificationnumber);
                    self.certificationexpiration = ko.observable(self.getBasicFormattedDate('certificationexpiration'));
                    self.agecertupload = ko.observable(self.personProfile().agecertupload);
                    self.workpermit = ko.observable(self.personProfile().workpermit);
                    self.workpermitnumber = ko.observable(self.personProfile().workpermitnumber);
                    self.workpermitexpiration = ko.observable(self.getBasicFormattedDate('workpermitexpiration'));
                    self.workpermitupload = ko.observable(self.personProfile().workpermitupload);
                    self.selectedSchedule = ko.observableArray([]);

                };
                //Loops throught the array to match the value to json value and return the nameas
                self.identityfilterSelectedType = function() {
                        type = self.identityTypes();
                        selectedType = self.identifydocumenttype();
                        for(i=0; i< type.length; i++){
                            if(selectedType === type[i].value){
                                var selectedName = type[i].name;
                                return selectedName;
                            }
                        }
                       
                    };
                self.bi9filterSelectedType = function() {
                        type = self.bi9DocTypes();
                        selectedType = self.bi9documenttype();
                        for(i=0; i< type.length; i++){
                            if(selectedType === type[i].value){
                                var selectedName = type[i].name;
                                return selectedName;
                            }
                        }
                       
                    };
                self.ci9filterSelectedType = function() {
                        type = self.ci9DocTypes();
                        selectedType = self.ci9documenttype();
                        for(i=0; i< type.length; i++){
                            if(selectedType === type[i].value){
                                var selectedName = type[i].name;
                                return selectedName;
                            }
                        }
                       
                    };
                var identityTypes = [
                    {name: 'None',  value: 'none'},
                    {name: 'List A',  value: 'list-a'},
                    {name: 'List B and List C',  value: 'list-b-c'},
                ];
                var bi9DocTypes = [
                    {name: 'Please Select',  value: 'pleaseselect'},
                    {name: 'Canadian Drivers License',  value: 'calicense'},
                    {name: 'Clinic, Doctor, or Hospital Record',  value: 'cdhrecords'},
                    {name: 'Drivers License',  value: 'driverlicense'},
                    {name: 'Federal, State, or Local ID Card',  value: 'fslidcard'},
                    {name: 'Military Dependents ID Card',  value: 'mildepidcard'},
                    {name: 'Native American Tribal Document',  value: 'natamericandoc'},
                    {name: 'School ID Card',  value: 'schoolidcard'},
                    {name: 'School Record/Report Card',  value: 'recordreportcard'},
                    {name: 'US Coast Guard merchant',  value: 'uscoastguard'},
                    {name: 'Employment Authorization Document ID Card',  value: 'documentidcard'}
                ];
                var ci9DocTypes = [
                    {name: 'Please Select',  value: 'pleaseselect'},
                    {name: 'Certificate of Birth Abroad',  value: 'calicense'},
                    {name: 'Employment Authorization Document ID Card',  value: 'cdhrecords'},
                    {name: 'Native American Tribal Document',  value: 'dnschoolrecord'},
                    {name: 'US Birth Certificate',  value: 'driverlicense'},
                    {name: 'US Citizen ID Card',  value: 'fslidcard'},
                    {name: 'US Social Security Card',  value: 'ussscard'}
                ];
                var breakDetails = [
                    {id: 1, breakStart: '9:00 AM', breakEnd: '9:15 AM', totalBreak: '15 minutes'},
                    {id: 2, breakStart: '11:00 AM', breakEnd: '11:30 AM', totalBreak: '30 minutes'},
                    {id: 3, breakStart: '1:00 PM', breakEnd: '1:15 PM', totalBreak: '15 minutes'},

                ];
                self.breakDetails = ko.observableArray(breakDetails);
                self.showItemIndex = function (dialog) {
                    var data = ko.dataFor(event.target);
                    if (data) {
                        self.selectedSchedule(data);
                    }
                    $(dialog).ojDialog("open");
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
                self.getBasicFormattedDate = function (oldDate) {
                    var dischargeDate = self.personProfile()[oldDate];
                    var dateOptions = {formatStyle: 'date', dateFormat: 'medium'};
                    var dateConverter = oj.Validation.converterFactory("datetime").createConverter(dateOptions);
                    var startDate = oj.IntlConverterUtils.dateToLocalIso(moment(dischargeDate).toDate());
                    oldDate = dateConverter.format(startDate);
                    return oldDate;
                };

                //This is a basic format when using the ojInputDate component
                self.basicCalDateFormat = function(value){
                    if(value !== ''){
                        var date = new Date(value + ' 00:00:00');
                        var newDate = ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
                    }
                    return newDate;
                };

                /////// JOHN insert for schedule
                //Analytics
                function loadPerfandPotenialData() {
                    
                    var ratcount = [], potcount = [], specyear = [], payyear = [], salcount = [], data = self.personProfile();
                    
                    ko.utils.arrayForEach(data.perfs, function (item) {
                        ratcount.push(item.rating);
                        potcount.push(item.potential);
                        specyear.push(new Date(item.effective).getFullYear());
                    });
                    ko.utils.arrayForEach(data.comps, function (item) {
                        salcount.push(item.compSalary);
                        payyear.push(new Date(item.effective).getFullYear());
                    });
                    self.comboSeriesValue(
                            [{name: "Rating", items: ratcount},
                                {name: "Potential", items: potcount}]
                            );
                    self.comboGroupsValue(specyear);
                    self.barSeriesValue(
                            [{name: "Salary", items: salcount}]
                            );
                    self.barGroupsValue(payyear);
                    self.pieSeriesValue = ko.observableArray(
                            [{name: "Bonus", items: [data.comps[0].bonus]},
                                {name: "Comission", items: [data.comps[0].comission]},
                                {name: "Salary", items: [data.comps[0].compSalary]}]
                            );
                    loadTeamData(data);
                }

                function loadTeamData(data) {

                    self.infoTiles([
                        {"sid": "1", "name": "Item1", "title": "About", "infolable1": "Skills", "infolable1value": data.skills.length, "infolable2": "Tenure", "infolable2value": self.getTenure(data)},
                        {"sid": "2", "name": "Item2", "title": "Performance", "infolable1": "Rating", "infolable1value": data.rating, "infolable2": "Potential", "infolable2value": data.potential},
                        {"sid": "3", "name": "Item3", "title": "Compensation", "infolable1": "Salary", "infolable1value": "$" + (data.salary > 999) ? (data.salary / 1000).toFixed(0) + 'k' : data.salary, "infolable2": "Ratio", "infolable2value": data.compRatio},
                        {"sid": "4", "name": "Item4", "title": "Team", "infolable1": "Group", "infolable1value": data.skills.length, "infolable2": "Directs", "infolable2value": self.directReports().length}
                    ]);
                }

                self.getSkills = function () {
                    var skills = [];
                    ko.utils.arrayForEach(self.personProfile().skills, function (item) {
                        skills.push({id: item.skill.skillId,
                            label: item.skill.skill,
                            value: item.empskillassignRating,
                            shortDesc: 'Rating for ' + item.skill.skill + ': ' + item.empskillassignRating});
                    });
                    return skills;
                };

                self.getTenure = function (data) {
                    var now = new Date().getFullYear();
                    var hired = new Date(data.hireDate).getFullYear();
                    var diff = now - hired;
                    return diff;
                };
                //Employee Dialog
                //
                //General function to  auto popup modal based on URL param string and dialog ID
                self.autoDialog = function(param, dialogId){
                    if(document.URL.indexOf(param) > -1){
                        setTimeout(function() {
                            self.handleOpen(dialogId);
                        }, 700);
                    }
                };

                //Workaround to load ID first then Modify Time Card dialog box when coming from another page
                //exmaple ?root=profile&emp=205&tabs=schedules-timecards&trueModifyTimeCard
                self.autoDialog("&trueModifyTimeCard", "#scheduleTimeCardDialog");
                //Workaround to load ID first then Time off Request card dialog box when coming from another page
                //example ?root=profile&emp=205&tabs=schedules-timecards&trueTimeOffRequest
                self.autoDialog("&trueTimeOffRequest", "#editTimeOffRequestDialog");
                //Workaround to load ID first then Edit Home Store dialog box when coming from another page
                //example ?root=profile&emp=103&trueHomeStoreEdit
                self.autoDialog("&trueHomeStoreEdit", "#hireStatusDialog");
                //Workaround to load ID first then Hire Status Edit dialog box when coming from another page
                //example ?root=profile&emp=103&trueHireStatusEdit
                self.autoDialog("&trueHireStatusEdit", "#hireStatusDialog");
                //Workaround to load ID first then Time off Request card dialog box when coming from another page
                //example ?root=profile&emp=103&trueExternalPayroll
                self.autoDialog("&trueExternalPayroll", "#externalPayrollDialog");
                
                
                
                self.timeCardhandleOpen =  function() {
                    $("#scheduleTimeCardDialog").ojDialog("open");
                };
                self.editRequestTimehandleOpen =  function() {
                    $("#editTimeOffRequestDialog").ojDialog("open");
                };
                self.timeCardhandleClose =  function() {
                    $("#scheduleTimeCardDialog").ojDialog("close");
                };

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
                self.getFormattedTime = function (oldTime) {
                    var currentListTime = self.currentScheduledDates;
                    for(i=0; i < currentListTime.length; i++){
                        var newTime = currentListTime[i][oldTime];
                        var hours24 = parseInt(newTime.substring(0,2));
                        var hours = ((hours24 + 11) % 12) + 1;
                        var amPm = hours24 > 11 ? 'pm' : 'am';
                        var minutes = newTime.substring(2);
                        newTime = hours + ':' + minutes + amPm;
                        currentListTime[i][oldTime] = newTime;
                    }
                };
                self.getFutureFormattedDate = function (oldDate) {
                    var futureListDate = self.futureScheduledDates;
                    for(i=0; i < futureListDate.length; i++){
                        var newDate = futureListDate[i][oldDate];
                        var dateOptions = {formatStyle: 'date', dateFormat: 'medium'};
                        var dateConverter = oj.Validation.converterFactory("datetime").createConverter(dateOptions);
                        var startDate = oj.IntlConverterUtils.dateToLocalIso(moment(newDate).toDate());
                        newDate = dateConverter.format(startDate);
                        //Returns the new format back into the original array dayListStart array
                        futureListDate[i][oldDate] = newDate;
                    }
                };
                self.getFutureFormattedTime = function (oldTime) {
                    var futureListTime = self.futureScheduledDates;
                    for(i=0; i < futureListTime.length; i++){
                        var newTime = futureListTime[i][oldTime];
                        var hours24 = parseInt(newTime.substring(0,2));
                        var hours = ((hours24 + 11) % 12) + 1;
                        var amPm = hours24 > 11 ? 'pm' : 'am';
                        var minutes = newTime.substring(2);
                        newTime = hours + ':' + minutes + amPm;
                        futureListTime[i][oldTime] = newTime;
                    }
                };
                //current visible state of section, either true or false
                self.sectionsState = ko.observable(false);
                //Toggles visibility of sections
                self.toggleSections = function () {
                    self.sectionsState(!self.sectionsState());
                    if(self.sectionsState()==true){
                        $('.mobileNavTitleArea .fa-chevron-down').addClass('fa-chevron-up').removeClass('fa-chevron-down');
                    }else if(self.sectionsState()==false){
                        $('.mobileNavTitleArea .fa-chevron-up').addClass('fa-chevron-down').removeClass('fa-chevron-up');
                        
                    }
                    
                };

                self.currentNavArrowPlacement = ko.observable("adjacent");
                self.currentNavArrowVisibility = ko.observable("auto");

                getItemInitialDisplay = function(index){return index < 3 ? '' : 'none';};

                self.handleAttached = function(){
                    //Adds class to people parent router when profile is active and is removed in the main.js file on exit of the page.
                    $('#people').addClass('oj-selected');

                };

                //General function to  auto popup modal based on URL param string and dialog ID
                self.autoDialog = function(param, dialogId){
                    if(document.URL.indexOf(param) > -1){
                        setTimeout(function() {
                            self.handleOpen(dialogId);
                        }, 600);
                    }
                };

                //Workaround to load hire Status dialog box when coming from the add-employee section
                self.autoDialog("&trueUpdateEmp", "#hireStatusDialog");

                //Workaround to load dialog box for Editing Modal
                self.autoDialog("&editEmp", "#empDialog");

                //Workaround to show the New Employee Added Message when coming from the add-employee section
                if(document.URL.indexOf("&trueAddEmp") > -1){
                     setTimeout(function() {
                        $(".addedNewEmpMessage").show();
                    }, 600);
                }

                //For Schedules and Timecards tab
                //searches for specified param string and returns the value after the equal symbol
                self.findURLParam = function(param){
                     var query = window.location.search.substring(1);
                     var vars = query.split("&");
                     for(i=0; i< vars.length; i++){
                         var pair = vars[i].split("=");
                         if(pair[0] == param){return pair[1];}
                     }
                     return(false);
                     //create a mapping for friend url parameter like monday = 1
                };

                //Workaround to call schedules and timecards modal
                //example ?root=profile&emp=103&tabs=schedules-timecards&currentWeekDay=0
                //the zero thur 6 is the index of the 
                setTimeout(function() {
                    if(document.URL.indexOf('currentWeekDay') > -1){
                        var data = self.personProfile().currentScheduledDates[self.findURLParam('currentWeekDay')];
                        if (data) {
                            self.selectedSchedule(data);
                        }
                        $('#currentWeekModal').ojDialog("open");
                    }
                }, 600);


            };

            return new PersonViewModel();
        });
