define([
    'ojs/ojcore', 
    'knockout', 
    'data/data',
    'hammerjs',
    'moment',
    'ojs/ojknockout',
    'ojs/ojoffcanvas',
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
    'ojs/ojdatacollection-common',
    'ojs/ojdatetimepicker',
    'ojs/ojtabs',
    'ojs/ojcheckboxset',
    'ojs/ojradioset',
    'ojs/ojfilmstrip',
   'ojs/ojpagingcontrol',
    'ojs/ojmenu'
], function (oj, ko, data) {
    
    
    function laborContentViewModel(params) {
        var self = this;
        self.preventDefaultFunc=function(data,e){
            var keycode1 = (e.keyCode ? e.keyCode : e.which);
            if (keycode1 == 9) {
                e.preventDefault();
                e.stopPropagation();
            }else{
                return true;
            }
        };
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
        self.scheduleDetailContnet = ko.observableArray([]);
        self.visibleclockout = ko.observable(false);
        self.visibleclockin = ko.observable(false);
        self.scheduleStatusChanges = ko.observableArray([]);
        self.hireStatusChanges = ko.observableArray([]);
        self.currentShiftStatus = ko.observable("");
        self.clockindate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(2014, 1, 1)));
        self.clockintime = ko.observable("");
        self.clockoutdate = ko.observable("");
        self.clockouttime = ko.observable("");
        self.clockinreason = ko.observable("");
        
        self.hireType =  ko.observable("");      
        self.reHireDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
        self.hiredateprev = ko.observable("");  
        self.leavestartdate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
        self.leaveenddate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
        self.reasonvalue = ko.observableArray([""]);
        self.leavenotes = ko.observable("");
        self.terminationdate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
        self.termstatusvalue = ko.observableArray([""]);
        self.terminotes =  ko.observable("");
        self.termsreasonvalue1 = ko.observableArray([""]);
        self.hireStatusSelectedTab = ko.observable("");  
        self.rehireEligibility = ko.observable();
        self.visibleEmployeeDetailFilmStrip = ko.observable(false);
        
        //filmStrip observables
        self.currentNavArrowPlacement = ko.observable("adjacent");
        self.currentNavArrowVisibility = ko.observable("auto");

        self.hireStatustabsChangeHandler = function(event, data) {
            self.hireStatusSelectedTab(data.value);
         };
        
        //People functionality
        var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        var weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        
        self.showclockoutlayout = function(){
            self.visibleclockout(true);
        };
        
        self.showclockinlayout = function(){
            self.visibleclockin(true);
        };
        self.closeclockoutlayout = function(){
            self.visibleclockout(false);
        };
        
        self.closeclockinlayout = function(){
            self.visibleclockin(false);
        };
        
        self.saveclockinlayout = function(){
            var a = self.scheduleStatusChanges();
            var found = false;
            for (var i = 0; i < a.length; i++) {
                if (a[i].empid === self.scheduleDetailContnet().empid &&
                         a[i].daypart === self.scheduleDetailContnet().daypart) {
                    found = true;
                    if(a[i].status === 'Future'){
                        a[i].status = 'Active';
                        a[i].daypart = self.scheduleDetailContnet().daypart;
                    } else if(a[i].status === 'Active'){
                        a[i].status = 'Completed';
                        a[i].daypart = self.scheduleDetailContnet().daypart;
                    } 
                    break;
                }
            }
            
            if(found === false){
                if(self.scheduleDetailContnet().status === 'Future'){
                    a.push({
                    'empid': self.scheduleDetailContnet().empid,
                    'daypart' : self.scheduleDetailContnet().daypart,
                    'status' : 'Active'
                    });
                } else if(self.scheduleDetailContnet().status === 'Active'){
                    a.push({
                     'empid': self.scheduleDetailContnet().empid,
                     'daypart' : self.scheduleDetailContnet().daypart,
                    'status' : 'Completed'
                    });
                }
            }
            self.scheduleStatusChanges(a);
            self.visibleclockin(false);
            self.currentShiftStatus('Active');
        };
        
        self.saveclockoutlayout = function(){
            var a = self.scheduleStatusChanges();
            var found = false;
            for (var i = 0; i < a.length; i++) {
                if (a[i].empid === self.scheduleDetailContnet().empid &&
                         a[i].daypart === self.scheduleDetailContnet().daypart) {
                    found = true;
                    if(a[i].status === 'Future'){
                        a[i].status = 'Active';
                        a[i].daypart = self.scheduleDetailContnet().daypart;
                    } else if(a[i].status === 'Active'){
                        a[i].status = 'Completed';
                        a[i].daypart = self.scheduleDetailContnet().daypart;
                    } 
                    break;
                }
            }
            
            if(found === false){
                if(self.scheduleDetailContnet().status === 'Future'){
                    a.push({
                    'empid': self.scheduleDetailContnet().empid,
                    'daypart' : self.scheduleDetailContnet().daypart,
                    'status' : 'Active'
                    });
                } else if(self.scheduleDetailContnet().status === 'Active'){
                    a.push({
                     'empid': self.scheduleDetailContnet().empid,
                     'daypart' : self.scheduleDetailContnet().daypart,
                    'status' : 'Completed'
                    });
                }
            }
            self.scheduleStatusChanges(a);
            self.visibleclockout(false);
            self.currentShiftStatus('Completed');
        };
        
         
        self.visibleAdvanceSearch = ko.observable(false);
        self.visibleSearchResult = ko.observable(false);
        self.pageHeading = ko.observable("People");
        
        self.allPeople = ko.observableArray([]);
        self.distinctJobNames = ko.observableArray([]);
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
        self.getItemInitialDisplayDialog = function(index){return index < 3 ? '' : 'none';};
        self.downloadRadios = [
            {id: 'pdf', label: 'Pdf'},
            {id: 'excel',    label: 'Excel'}
        ];
        
        self.innerDrawer =
        {
            "displayMode": "overlay",
            "selector": "#innerDrawer"
        };

        // toggle show/hide offcanvas
        self.toggleInner = function()
        {
            return oj.OffcanvasUtils.toggle(self.innerDrawer);
        };

        self.closeInner = function()
        {
            return oj.OffcanvasUtils.close(self.innerDrawer);
        };
        
        
        self.downloadoption = ko.observable("pdf");
        self.personProfile=ko.observableArray([]);
        self.currentScheduledDates=ko.observableArray([]);
        self.formttedCurrentScheduledDateValues = ko.observableArray();
        
        
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
                            self.visibleEmployeeDetailFilmStrip(true);
                            $("#laborDialogWindow").ojDialog("open");
                            setTimeout(function(){$( "#filmStrip" ).ojFilmStrip( "option", "maxItemsPerPage", 4)}, 1000);
                            $("#filmStrip").ojFilmStrip("refresh");
                            resolve(true);
                        }).fail(function (error) {
                            console.log('Error: ' + error.message);
                            resolve(false);
                        });
                    });
            
        };
        
        self.empBasicInfoOpen = function(){
            $("#laborScheduleDailogWindow").ojDialog("open");
        };
        
         self.empHireStatusOpen =  function(emp) {
            self.basicEmpInfo(emp);
            return new Promise(function(resolve, reject) {
                        data.fetchData("js/data/employee" + emp.empId + ".json").then(function (person) {
                            self.personProfile(person);
                            self.hiredateprev(oj.IntlConverterUtils.dateToLocalIso(new Date(
                                    new Date(self.basicEmpInfo().hireDate).getFullYear(),
                                    new Date(self.basicEmpInfo().hireDate).getMonth(),
                                    new Date(self.basicEmpInfo().hireDate).getDate())));
                                    
                            $("#laborEmployeeHireStatusDialog").ojDialog("open");
                            $( "#tabs" ).ojTabs( "refresh" );
                            if(self.basicEmpInfo().hireStatus === 'Active'){
                                $( "#tabs" ).ojTabs( { "selected": "tabs-1" } );
                            } else if(self.basicEmpInfo().hireStatus === 'Inactive-Suspended'){
                                $( "#tabs" ).ojTabs( { "selected": "tabs-2" } );
                            } else if(self.basicEmpInfo().hireStatus === 'Inactive-Terminated'){
                                $( "#tabs" ).ojTabs( { "selected": "tabs-2" } );
                            } else if(self.basicEmpInfo().hireStatus === 'Inactive-Leave Of Absence'){
                                $( "#tabs" ).ojTabs( { "selected": "tabs-3" } );
                            }
                            
                            
                            resolve(true);
                        }).fail(function (error) {
                            console.log('Error: ' + error.message);
                            resolve(false);
                        });
                    });
            
        };


        self.empBasicInfoClose =  function() {
            $("#empBasicDialogWindow").ojDialog("close");
        };
        
        self.empHireStatusClose =  function() {
            var a=self.hireStatusChanges();
            var found = false;
            for (var i = 0; i < a.length; i++) {
                if (a[i].empid === self.basicEmpInfo().empId) {
                    found = true;
                    if(self.hireStatusSelectedTab() === 't1'){
                        a[i].newhiredate = self.reHireDate();
                        a[i].newhirestatus = 'Active';
                    } else if(self.hireStatusSelectedTab() === 't2'){
                        a[i].newhiredate = self.terminationdate();
                        a[i].newhirestatus = 'Inactive-Terminated';
                    } else if(self.hireStatusSelectedTab() === 't3'){
                        a[i].newhiredate = self.leavestartdate();
                        a[i].newhirestatus = 'Inactive-Leave Of Absence';
                    }
                    break;
                }
            }
            if(found === false){
                if(self.hireStatusSelectedTab() === 't1'){
                a.push({
                'empid': self.basicEmpInfo().empId,
                'newhiredate' : self.reHireDate(),
                'newhirestatus' : 'Active'
                });
            } else if(self.hireStatusSelectedTab() === 't2'){
                a.push({
                'empid': self.basicEmpInfo().empId,
                'newhiredate' : self.terminationdate(),
                'newhirestatus' : 'Inactive-Terminated'
                });
            } else if(self.hireStatusSelectedTab() === 't3'){
                a.push({
                'empid': self.basicEmpInfo().empId,
                'newhiredate' : self.leavestartdate(),
                'newhirestatus' : 'Inactive-Leave Of Absence'
                });
            }

            }
                        
            self.hireStatusChanges(a);
            console.log("length of hireStatusChanges = "+self.hireStatusChanges().length);
            $("#laborEmployeeHireStatusDialog").ojDialog("close");
            //self.filteredAllPeople();
        };
        
        self.empScheduleDetailInfoOpen = function(emp){
            self.scheduleDetailContnet(emp);
            var a = self.scheduleStatusChanges();
            var found = false;
            for (var i = 0; i < a.length; i++) {
                 if (a[i].empid === self.scheduleDetailContnet().empid &&
                         a[i].daypart === self.scheduleDetailContnet().daypart) {
                     found = true;
                     self.currentShiftStatus(a[i].status);
                 }
            }
            if(found == false){
                self.currentShiftStatus(self.scheduleDetailContnet().status);
            }
            self.clockindate(oj.IntlConverterUtils.dateToLocalIso(new Date(2015, 9, self.scheduleDetailContnet().daydate)));
            if(self.scheduleDetailContnet().daypart === 'openshift'){
                 self.clockintime(oj.IntlConverterUtils.dateToLocalIso(new Date(2015, 9, self.scheduleDetailContnet().daydate, 5, 0, 0, 0)));
                 self.clockouttime(oj.IntlConverterUtils.dateToLocalIso(new Date(2015, 9, self.scheduleDetailContnet().daydate, 8, 0, 0, 0)).substring(0,16));
            } else if(self.scheduleDetailContnet().daypart === 'breakfastshift'){
                 self.clockintime(oj.IntlConverterUtils.dateToLocalIso(new Date(2015, 9, self.scheduleDetailContnet().daydate, 8, 0, 0, 0)));
                 self.clockouttime(oj.IntlConverterUtils.dateToLocalIso(new Date(2015, 9, self.scheduleDetailContnet().daydate, 11, 0, 0, 0)).substring(0,16));
            } else if(self.scheduleDetailContnet().daypart === 'lunchshift'){
                 self.clockintime(oj.IntlConverterUtils.dateToLocalIso(new Date(2015, 9, self.scheduleDetailContnet().daydate, 11, 0, 0, 0)));
                 self.clockouttime(oj.IntlConverterUtils.dateToLocalIso(new Date(2015, 9, self.scheduleDetailContnet().daydate, 15, 0, 0, 0)).substring(0,16));
            
            } else if(self.scheduleDetailContnet().daypart === 'dinnershift'){
                 self.clockintime(oj.IntlConverterUtils.dateToLocalIso(new Date(2015, 9, self.scheduleDetailContnet().daydate, 15, 0, 0, 0)));
                 self.clockouttime(oj.IntlConverterUtils.dateToLocalIso(new Date(2015, 9, self.scheduleDetailContnet().daydate, 23, 0, 0, 0)).substring(0,16));
            
            } else if(self.scheduleDetailContnet().daypart === 'closeshift'){
                 self.clockintime(oj.IntlConverterUtils.dateToLocalIso(new Date(2015, 9, self.scheduleDetailContnet().daydate, 23, 0, 0, 0)));
                 if(self.scheduleDetailContnet().daydate === "15")
                    self.clockouttime(oj.IntlConverterUtils.dateToLocalIso(new Date(2015, 9, 16, 5, 0, 0, 0)).substring(0,16));
                 else if(self.scheduleDetailContnet().daydate === "16")
                    self.clockouttime(oj.IntlConverterUtils.dateToLocalIso(new Date(2015, 9, 17, 5, 0, 0, 0)).substring(0,16));
                else if(self.scheduleDetailContnet().daydate === "17")
                    self.clockouttime(oj.IntlConverterUtils.dateToLocalIso(new Date(2015, 9, 18, 5, 0, 0, 0)).substring(0,16));
                else if(self.scheduleDetailContnet().daydate === "18")
                    self.clockouttime(oj.IntlConverterUtils.dateToLocalIso(new Date(2015, 9, 19, 5, 0, 0, 0)).substring(0,16));
                else if(self.scheduleDetailContnet().daydate === "19")
                    self.clockouttime(oj.IntlConverterUtils.dateToLocalIso(new Date(2015, 9, 20, 5, 0, 0, 0)).substring(0,16));
                else if(self.scheduleDetailContnet().daydate === "20")
                    self.clockouttime(oj.IntlConverterUtils.dateToLocalIso(new Date(2015, 9, 21, 5, 0, 0, 0)).substring(0,16));
                else if(self.scheduleDetailContnet().daydate === "21")
                    self.clockouttime(oj.IntlConverterUtils.dateToLocalIso(new Date(2015, 9, 22, 5, 0, 0, 0)).substring(0,16));
            
            }
            $("#laborScheduleDetailDailogWindow").ojDialog("open");
        };
        
        self.empScheduleDetailInfoClose = function(){
            $("#laborScheduleDetailDailogWindow").ojDialog("close");
        };

        self.empBasicViewClose =  function() {
            $("#LaborDialogWindow").ojDialog("close");
        };


        //self.ready = ko.observable(false);
        data.fetchData('js/data/employees.json').then(function (people) {
            self.allPeople(people.employees);   
            self.distinctJobNames(ko.utils.arrayGetDistinctValues(
                                        ko.utils.arrayFilter(people.employees, 
                                function(item){ 
                                        return item.title;})
                            ));
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
                var isSearchTextExist = true;
                 var peopleFilter = new Array();
                 if (self.allPeople().length !== 0) {
                     if(self.visibleAdvanceSearch() === false){//Simple search functionality
                         
                         if (self.firstNameSearch().length === 0) {
                              isSearchTextExist = false;
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
                              isSearchTextExist = false;
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
                  if(self.hireStatusChanges().length > 0){
                     for(var item = 0; item < peopleFilter.length; item++){
                         for(var changeItem = 0;  changeItem < self.hireStatusChanges().length; changeItem++){
                             if(peopleFilter[item].empId === self.hireStatusChanges()[changeItem].empid){
                                 peopleFilter[item].hireDate = self.hireStatusChanges()[changeItem].newhiredate;
                                 peopleFilter[item].status = self.hireStatusChanges()[changeItem].newhirestatus;
                             }
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
                 self.visibleSearchResult(isSearchTextExist);
                 return peopleFilter;
             }
            );
    
       
        self.listViewDataSource = ko.computed(function () {
           return new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.filteredAllPeople(),
                    {idAttribute: 'empId'}));
           
        });
        
        
        self.loadOverview = function() {
            self.router.go('overview');
        }

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
                        }).fail(function (error) {
                            console.log('Error: ' + error.message);
                        });
             self.currentNavArrowPlacement = ko.observable("adjacent");
                self.currentNavArrowVisibility = ko.observable("auto");            
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
                if(ui.key === 'schedules-timecards'){
                    setTimeout(function(){self.selectedTab('Day');}, 1000);
                } 
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
                
                if(state === 'Job'){
                     data.fetchData("js/data/employeeschedulejobcontent.json").then(function (schedulecontent) {
                            self.jobTabContent(schedulecontent.jobtabcontent);
                        }).fail(function (error) {
                            console.log('Error: ' + error.message);
                        });
                } else if(state === 'Station'){
                    data.fetchData("js/data/employeeschedulestationcontent.json").then(function (schedulecontent) {
                            self.stationTabContent(schedulecontent.stationcontent);
                        }).fail(function (error) {
                            console.log('Error: ' + error.message);
                        });
                    
                }
                self.selectedTab(state);
        };
        
        self.empDayScheduleOpen = function(){
            return new Promise(function(resolve, reject) {
                data.fetchData("js/data/employeesjobschedules.json").then(function (schedulecontent) {
                            self.jobSchedules(schedulecontent.jobschedules);
                            self.router.go('schedules-timecards');
                            setTimeout(function(){self.selectedTab('Day');}, 1000);
                            // $("#laborScheduleDailogWindow").ojDialog("open");
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
        // Mobile Swipe functions 
        self.handleReady = function()
        {
            // register swipe to reveal for all new list items
            $("#listview").find(".item-marker").each(function(index)
            {
                var id = $(this).prop("id");
                var startOffcanvas = $(this).find(".oj-offcanvas-start").first();
                var endOffcanvas = $(this).find(".oj-offcanvas-end").first();     

                // setup swipe actions               
                oj.SwipeToRevealUtils.setupSwipeActions(startOffcanvas);
                oj.SwipeToRevealUtils.setupSwipeActions(endOffcanvas);

                // make sure listener only registered once
                endOffcanvas.off("ojdefaultaction");
                endOffcanvas.on("ojdefaultaction", function() 
                {
                    self.handleDefaultAction({"id": id});
                });
            });
        };
        self.handleDestroy = function()
        {
            // register swipe to reveal for all new list items
            $("#listview").find(".item-marker").each(function(index)
            {
                var startOffcanvas = $(this).find(".oj-offcanvas-start").first();                    
                var endOffcanvas = $(this).find(".oj-offcanvas-end").first();                    

                oj.SwipeToRevealUtils.tearDownSwipeActions(startOffcanvas);
                oj.SwipeToRevealUtils.tearDownSwipeActions(endOffcanvas);
            });
        };
        self.handleMenuItemSelect = function(event, ui)
        {
            var id = ui.item.prop("id");
            if (id == "read")
                self.handleRead();
            else if (id == "tag")
                self.handleFlag();
        };
        self.closeToolbar = function(which, item)
        {
            var toolbarId = "#"+which+"_toolbar_"+item.prop("id");
            var drawer = {"displayMode": "push", "selector": toolbarId};

            oj.OffcanvasUtils.close(drawer);
        }
        self.handleAction = function(which, action, model)
        {
            var id;
            if (model != null && model.id)
            {
                // offcanvas won't be open for default action case
                if (action != "default")
                    self.closeToolbar(which, $(model));
                id = model.id;
            }
            else
            {
                id = $("#listview").ojListView("option", "currentItem");
            }
            
            self.action("Handle "+action+" action on: "+id);
        }
        self.handleQuickView = function(model)
        {
            self.handleAction("second", "flag", model);
        };
        self.handleStatus = function(model)
        {
            self.handleAction("second", "flag", model);
        };
        self.handleDefaultAction = function(model)
        {
            self.handleAction("second", "default", model);
            self.removeModel(model);
        };
        self.buttonClick = function (data, event) {
            self.clickedButton(event.currentTarget.id);
            return true;
        };
        self.handleFormatChange = function(event, ui) {
            if (ui.option === "checked") {
                // do stuff...
            }
        };
        
        
            
    }

    return laborContentViewModel;

});
