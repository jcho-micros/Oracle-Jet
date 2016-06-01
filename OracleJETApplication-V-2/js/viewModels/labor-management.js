define([
    'ojs/ojcore', 
    'knockout', 
    'data/data',
    'hammerjs',
    'moment',
    'ojs/ojknockout', 
    'ojs/ojrouter', 
    'ojs/ojnavigationlist', 
    'ojs/ojconveyorbelt', 
    'ojs/ojbutton', 
    'ojs/ojinputtext',
    'ojs/ojselectcombobox',
    'ojs/ojinputnumber',
    'ojs/ojdialog',
    'ojs/ojaccordion', 'ojs/ojcollapsible', 
    'ojs/ojjquery-hammer', 
    'ojs/ojswipetoreveal',
    'ojs/ojlistview',
    'ojs/ojmodel',
    'ojs/ojpagingcontrol',
    'ojs/ojdatacollection-common',
    'ojs/ojtabs',
    'ojs/ojcheckboxset',
    'ojs/ojradioset',
    'ojs/ojmenu'
], function (oj, ko, data) {
    
    
    function laborContentViewModel(params) {
        var self = this;
        //Child Router
        this.router = undefined;
       var that = params.self;
//        locationSpecific='Baltimore';//params.location;
//        self.locationName=ko.observable(locationSpecific);
        self.sectionsState = ko.observable(false);
        self.personSchedules = ko.observableArray([]);
        self.jobSchedules = ko.observableArray([]);
        self.firstJobSchedules = ko.observableArray([]);
        self.managerlogs = ko.observableArray([]);
        self.reviewsandapprovals = ko.observableArray([]);
        self.currentlyclockedin = ko.observableArray([]);
        self.jobTabContent = ko.observableArray([]);
        self.stationTabContent = ko.observableArray([]);
        self.personLocationSchedules = ko.observableArray([]);
        self.selectedTab = ko.observable('Job');
        
        //People functionality
        var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        var weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        
        
        self.visibleAdvanceSearch = ko.observable(false);
        self.pageHeading = ko.observable("People");
        
        self.allPeople = ko.observableArray([]);
        self.basicEmpInfo = ko.observableArray([]);
        self.currentScheduledJobNames = ko.observableArray([]);
        self.daysandtimes = ko.observableArray([]);
        self.unavailableDaysAndTimes = ko.observableArray([]);
        self.preferredDaysAndTimes = ko.observableArray([]);
        self.currentScheduledDateValues = ko.observableArray([]);
        self.formattedCurrentScheduledDateValues = ko.observableArray([]);
        
        // this is the invalidComponentTracker on ojCheckboxset
        self.statusTracker = ko.observable();
      
        self.currentStatus = ko.observableArray(["Active", "Inactive-Suspended",
                                            "Inactive-Terminated", "Inactive-Leave Of Absence"]);
        
        self.sortvalue = ko.observableArray(["FN"]);
        self.downloadvalue = ko.observableArray(["pdf"]);
        self.layoutvalue = ko.observableArray(["table"]);
        
        self.downloadRadios = [
            {id: 'pdf', label: 'Pdf'},
            {id: 'excel',    label: 'Excel'}
        ];
        
        self.downloadoption = ko.observable("pdf");
        self.personProfile=ko.observableArray([]);
        self.currentScheduledDates=ko.observableArray([]);
        self.formttedCurrentScheduledDateValues = ko.observableArray([]);
        //Search form observables
        self.payrollIdSearch = ko.observable('');
        self.firstNameSearch = ko.observable('');
        self.advFirstNameSearch = ko.observable('');
        self.lastNameSearch = ko.observable('');
        self.homeStoreSearch = ko.observable('');
        self.awayStoreSearch = ko.observable('');
        self.jobSearch = ko.observable('');
        self.payrollIdSearch = ko.observable('');
          
        that.activeLocation.subscribe(function(value){
            data.fetchData('js/data/employees.json').then(function (people) {
            //self.allPeople(people.employees);
          self.allPeople(ko.utils.arrayFilter(people.employees,function(item){
                 if(item.homeStore === value){
                       return item;
                  }
            }));
           }).fail(function (error) {
            console.log('Error in getting People data: ' + error.message);
        });
            
        });
          
       self.getItemInitialDisplayDialog = function(index){return index < 3 ? '' : 'none';};
        //Employee Basic Info Dialog
       self.empBasicViewOpen =  function(emp) {
            self.basicEmpInfo(emp);
            return new Promise(function(resolve, reject) {
                        data.fetchData("js/data/employee" + emp.empId + ".json").then(function (person) {
                            self.personProfile(person);  
                            
                            self.currentScheduledDates(self.personProfile().currentScheduledDates);
                            self.formttedCurrentScheduledDateValues(self.personProfile().formattedCurrentScheduledDates);
                            
                            self.currentScheduledDateValues(ko.dependentObservable(function() {
                               
                                return ko.utils.arrayGetDistinctValues(
                                        ko.utils.arrayMap(self.currentScheduledDates(), 
                                function(item){ 
                                    var dateValue = new Date(item.currentDayStart);
                                        return dateValue.getDate() + ' ' +monthNames[dateValue.getMonth()] + ' ' +weekday[dateValue.getDay()];
                                    })).sort();
                            }));
                            
                            
                            
                            self.currentScheduledDateValues(ko.dependentObservable(function() {
                               
                                return ko.utils.arrayGetDistinctValues(
                                        ko.utils.arrayMap(self.currentScheduledDates(), 
                                function(item){ 
                                    var dateValue = new Date(item.currentDayStart);
                                        return dateValue.getDate() + ' ' +monthNames[dateValue.getMonth()] + ' ' +weekday[dateValue.getDay()];
                                    })).sort();
                            }));
                            self.daysandtimes(self.personProfile().daysandtimes);
                            self.unavailableDaysAndTimes(ko.dependentObservable(function() {
                                return ko.utils.arrayFilter(self.daysandtimes(), function(item) {
                                    if(item.timesegment === 'unavailable'){
                                        return item;
                                    }
                                });
                            }));
                            self.preferredDaysAndTimes(ko.dependentObservable(function() {
                                return ko.utils.arrayFilter(self.daysandtimes(), function(item) {
                                    if(item.timesegment === 'preferred'){
                                        return item;
                                    }
                                });
                            }));
                            self.currentScheduledJobNames(ko.dependentObservable(function() {
                               
                                return ko.utils.arrayGetDistinctValues(
                                        ko.utils.arrayMap(self.currentScheduledDates(), 
                                function(item){ 
                                    if(item.jobName !== 'Not Assigned') 
                                        return item.jobName;})).sort();
                            }));
                            $("#empLaborBasicDialogWindow").ojDialog("open");
                            resolve(true);
                        }).fail(function (error) {
                            console.log('Error: ' + error.message);
                            resolve(false);
                        });
                    });
            
        };

        self.empBasicViewClose =  function() {
            $("#empLaborBasicDialogWindow").ojDialog("close");
        };


        //self.ready = ko.observable(false);
        data.fetchData('js/data/employees.json').then(function (people) {
            self.allPeople(people.employees);   
        }).fail(function (error) {
            console.log('Error in getting People data: ' + error.message);
        });
        
        
        
        //General function to  auto popup modal based on URL param string and dialog ID
        self.autoDialog = function(param, dialogId){
            if(document.URL.indexOf(param) > -1){
                setTimeout(function() {
                    self.handleOpen(dialogId);
                }, 500);
            }
        };
        
        //Workaround to load dialog box when coming from another page
        self.autoDialog("&trueAddEmp", "#addEmpStatusDialog");
        //Search Feature
        
        self.empBasicViewOpen =  function(emp) {
            self.basicEmpInfo(emp);
            return new Promise(function(resolve, reject) {
                        data.fetchData("js/data/employee" + emp.empId + ".json").then(function (person) {
                            self.personProfile(person);  
                            
                            self.currentScheduledDates(self.personProfile().currentScheduledDates);
                            self.formttedCurrentScheduledDateValues(self.personProfile().formattedCurrentScheduledDates);
                            
                            self.currentScheduledDateValues(ko.dependentObservable(function() {
                               
                                return ko.utils.arrayGetDistinctValues(
                                        ko.utils.arrayMap(self.currentScheduledDates(), 
                                function(item){ 
                                    var dateValue = new Date(item.currentDayStart);
                                        return dateValue.getDate() + ' ' +monthNames[dateValue.getMonth()] + ' ' +weekday[dateValue.getDay()];
                                    })).sort();
                            }));
                            
                            
                            
                            self.currentScheduledDateValues(ko.dependentObservable(function() {
                               
                                return ko.utils.arrayGetDistinctValues(
                                        ko.utils.arrayMap(self.currentScheduledDates(), 
                                function(item){ 
                                    var dateValue = new Date(item.currentDayStart);
                                        return dateValue.getDate() + ' ' +monthNames[dateValue.getMonth()] + ' ' +weekday[dateValue.getDay()];
                                    })).sort();
                            }));
                            self.daysandtimes(self.personProfile().daysandtimes);
                            self.unavailableDaysAndTimes(ko.dependentObservable(function() {
                                return ko.utils.arrayFilter(self.daysandtimes(), function(item) {
                                    if(item.timesegment === 'unavailable'){
                                        return item;
                                    }
                                });
                            }));
                            self.preferredDaysAndTimes(ko.dependentObservable(function() {
                                return ko.utils.arrayFilter(self.daysandtimes(), function(item) {
                                    if(item.timesegment === 'preferred'){
                                        return item;
                                    }
                                });
                            }));
                            self.currentScheduledJobNames(ko.dependentObservable(function() {
                               
                                return ko.utils.arrayGetDistinctValues(
                                        ko.utils.arrayMap(self.currentScheduledDates(), 
                                function(item){ 
                                    if(item.jobName !== 'Not Assigned') 
                                        return item.jobName;})).sort();
                            }));
                            $("#empLaborBasicDialogWindow").ojDialog("open");
                            resolve(true);
                        }).fail(function (error) {
                            console.log('Error: ' + error.message);
                            resolve(false);
                        });
                    });
            
        };
        
        self.getPhoto = function (empId) {
            var src;
            if (empId < 188) {
                src = 'css/images/people/' + empId + '.png';
            } else {
                src = 'css/images/people/nopic.png';
            }
            return src;
        };
        
        //Reset search
        //Resets only the 'First Name' field in the form
        self.resetData = function(){
            self.firstNameSearch('');
            self.filteredAllPeople();
        };
        
        self.advResetData = function(){
            self.advFirstNameSearch('');
            self.lastNameSearch('');
            self.homeStoreSearch('');
            self.awayStoreSearch('');
            self.jobSearch('');
            self.payrollIdSearch('');
            
        };
        
        self.hideSimpleSearch = function(){
           self.visibleAdvanceSearch(true);
           self.listViewDataSource();
        };
        
        
        
        self.advanceSearch=function(){
            self.listViewDataSource();
        };
        self.hideAdvanceSearch = function(){
            self.visibleAdvanceSearch(false);
            self.listViewDataSource();
        }
        
        
        
        
        

        self.filteredAllPeople = ko.computed(
            function(){
                 var peopleFilter = new Array();
                
                 if (self.allPeople().length !== 0) {
                     if(self.visibleAdvanceSearch() === false){//Simple search functionality
                         
                         if (self.firstNameSearch().length === 0) {
                            peopleFilter = self.allPeople();
                            
                         } else {
                            ko.utils.arrayFilter(self.allPeople(),
                             function (r) {
                                 var token = self.firstNameSearch().toLowerCase();
                                 if ((r.firstName.toLowerCase().indexOf(token) === 0 ||
                                         r.lastName.toLowerCase().indexOf(token) === 0 ||
                                         r.homeStore.toLowerCase().indexOf(token) === 0 ||
                                         r.title.toLowerCase().indexOf(token) === 0)) {
                                     peopleFilter.push(r);
                                 }
                            });
                         }
                     } else{//Advance search functionality
                         if (self.advFirstNameSearch().length === 0 &&
                                 self.lastNameSearch().length === 0 &&
                                 self.homeStoreSearch().length === 0 &&
                                 self.awayStoreSearch().length === 0 &&
                                 self.jobSearch().length === 0 &&
                                 self.payrollIdSearch().length === 0 ) {
                            peopleFilter = self.allPeople();
                         } else {
                            console.log("sortvalue = "+self.sortvalue());
                            ko.utils.arrayFilter(self.allPeople(),
                             function (r) {
                                 var firstNameToken = self.advFirstNameSearch().toLowerCase();
                                 var lastNameToken = self.lastNameSearch().toLowerCase();
                                 var homeStoreToken = self.homeStoreSearch().toLowerCase();
                                 //var awayStoreToken = self.awayStoreSearch().toLowerCase();
                                 var jobSearchToken = self.jobSearch().toLowerCase();
                                 var payrollIdToken = self.payrollIdSearch().toLowerCase();
                                 var isExist = self.currentStatus().indexOf(r.status.toString()) > -1;
                                 
                                 if ((self.advFirstNameSearch().length === 0 || r.firstName.toLowerCase().indexOf(firstNameToken) === 0) &&
                                         (self.lastNameSearch().length === 0 || r.lastName.toLowerCase().indexOf(lastNameToken) === 0) &&
                                         (self.homeStoreSearch().length === 0 || r.homeStore.toLowerCase().indexOf(homeStoreToken) === 0) &&
                                         (self.jobSearch().length === 0 || r.title.toLowerCase().indexOf(jobSearchToken) === 0) &&
                                         (self.payrollIdSearch().length === 0 || r.payrollId.toLowerCase().indexOf(payrollIdToken) === 0) &&
                                         isExist) {
                                     
                                     peopleFilter.push(r);

                                 }
                            });
                         }
                     }
                 }
                 if(peopleFilter.length > 0){
                     peopleFilter.sort(function(a, b){
                         if(self.sortvalue() === "FN"){
                             return b.firstName.toLowerCase() > a.firstName.toLowerCase();
                         } else if(self.sortvalue() === "LN"){
                             return b.lastName.toLowerCase() > a.lastName.toLowerCase();
                         } else if(self.sortvalue() === "JT"){
                             return b.title.toLowerCase() > a.title.toLowerCase();
                         } else if(self.sortvalue() === "LO"){
                             return b.homeStore.toLowerCase() > a.homeStore.toLowerCase();
                         }
                     });
                 }
                 return peopleFilter;
             }
            );
    
       
        self.listViewDataSource = ko.computed(function () {
           return new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.filteredAllPeople(),
                    {idAttribute: 'empId'}));
           
        });
        
        
        

        self.loadPersonPage = function () {
            var emp = self.basicEmpInfo();
            if (emp.empId) {
                // Temporary code until go('profile/' + emp.empId); is checked in 1.1.2
                history.pushState('null', '', 'index.html?root=profile&emp=' + emp.empId);
                  //  $("#profileDetails").css({"background-color":"red"}); 
                
               return oj.Router.sync();
            } else {
                // Default id for profile is 100 so no need to specify.
                return oj.Router.rootInstance.go('profile');
             
            }
        };
        self.getBasicFormattedDate = function (oldDate) {
            var dischargeDate = [oldDate];
            var dateOptions = {formatStyle: 'date', dateFormat: 'medium'};
            var dateConverter = oj.Validation.converterFactory("datetime").createConverter(dateOptions);
            var startDate = oj.IntlConverterUtils.dateToLocalIso(moment(dischargeDate).toDate());
            oldDate = dateConverter.format(startDate);
            return oldDate;
        };
    
        //People functionality
        
        data.fetchData("js/data/employeeschedules.json").then(function (schedulecontent) {
                            self.personSchedules(schedulecontent.employees);
                            }).fail(function (error) {
                            console.log('Error: ' + error.message);
                        });
                            
        data.fetchData("js/data/employeesjobschedules.json").then(function (schedulecontent) {
                            self.jobSchedules(schedulecontent.jobschedules);
                            self.firstJobSchedules(schedulecontent.jobschedules);
                            self.firstJobSchedules( self.firstJobSchedules.slice(0,1));
                            self.reviewsandapprovals(schedulecontent.reviewsandapprovals);
                            self.managerlogs(schedulecontent.managerlogs);
                            self.currentlyclockedin(schedulecontent.currentlyclockedin);
                            self.jobTabContent(schedulecontent.jobtabcontent);
                            self.stationTabContent(schedulecontent.stationcontent);
                            //self.listViewDataSource();
                        }).fail(function (error) {
                            console.log('Error: ' + error.message);
                        });
        
        
        self.handleActivated = function (data) {

            var parentRouter = oj.Router.rootInstance;
            //Child of Location
            
            self.router = parentRouter.createChildRouter('labortab').configure({
                'overview': {label: 'Overview', value: 'overview', isDefault: true},
                'employees': {label: 'Employees', value: 'employees'},
                'schedules-timecards': {label: 'Schedules & Timecards', value: 'schedules-timecards'},
                'forecasting': {label: 'Forecasting', value: 'forecasting'},
                'payroll': {label: 'Payroll', value: 'payroll'},
                'analytics': {label: 'Analytics', value: 'analytics'}
            });

        // Now that the router for this view exist, synchronise it with the URL
            oj.Router.sync();
        };
        self.selectHandler = function (event, ui) {
            if ('laborTabs' === event.target.id && event.originalEvent) {
                // Invoke go() with the selected item.
                self.router.go(ui.key);
            }
        };
        self.dispose = function () {
            this.router.dispose();
            this.router = null;
        };
        
        //Toggles visibility of sections
        self.toggleSections = function () {
            self.sectionsState(!self.sectionsState());
            if(self.sectionsState()==true){
                $('.mobileNavTitleArea .fa-chevron-down').addClass('fa-chevron-up').removeClass('fa-chevron-down');
            }else if(self.sectionsState()==false){
                $('.mobileNavTitleArea .fa-chevron-up').addClass('fa-chevron-down').removeClass('fa-chevron-up');

            }

        };
        
        self.changeTabContent = function(state){
                self.selectedTab(state);
            
        };
        
        self.empDayScheduleOpen = function(){
            return new Promise(function(resolve, reject) {
                data.fetchData("js/data/employeesjobschedules.json").then(function (schedulecontent) {
                            
                            self.jobSchedules(schedulecontent.jobschedules);
                            self.selectedTab('Day');
                            $("#laborScheduleDailogWindow").ojDialog("open");
                            resolve(true);
                        }).fail(function (error) {
                            console.log('Error: ' + error.message);
                            resolve(false);
                        });
            });
        };
        
        self.empLaborScheduleOpen = function(){
            return new Promise(function(resolve, reject) {
                data.fetchData("js/data/employeeschedules.json").then(function (schedulecontent) {
                            self.personSchedules(schedulecontent.employees);
                            self.selectedTab('Employee');
                            $("#laborScheduleDailogWindow").ojDialog("open");
                            resolve(true);
                        }).fail(function (error) {
                            console.log('Error: ' + error.message);
                            resolve(false);
                        });
            });
        };
        
        
        
            
    }

    return laborContentViewModel;

});
