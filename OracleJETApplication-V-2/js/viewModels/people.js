define([
    'ojs/ojcore',
    'knockout',
    'data/data',
    'jquery', 
    'hammerjs',
    'moment',
    'ojs/ojrouter',
    'ojs/ojknockout',
    'ojs/ojjquery-hammer', 
    'ojs/ojswipetoreveal',
    'ojs/ojlistview',
    'ojs/ojmodel',
    'ojs/ojnavigationlist',
    'ojs/ojpagingcontrol',
    'ojs/ojdatacollection-common',
    'ojs/ojdialog',
    'ojs/ojtabs',
    'ojs/ojconveyorbelt',
    'ojs/ojaccordion',
    'ojs/ojcollapsible',
    'ojs/ojbutton',
    'ojs/ojcheckboxset',
    'ojs/ojinputtext',
    'ojs/ojselectcombobox',
    'ojs/ojradioset',
    'ojs/ojdatetimepicker',
    'ojs/ojswitch',
    'ojs/ojmenu'
], function (oj, ko, data, $, Hammer) {
    function peopleContentViewModel() {
        
        
        
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
        var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        var weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        
        var formattedCurrentWeekDetails = [];

        self.ready = ko.observable(false);
        self.visibleAdvanceSearch = ko.observable(false);
        self.visibleSearchResult = ko.observable(false);
        self.pageHeading = ko.observable("People");

        //where the all employee info will be stored
        self.allPeople = ko.observableArray([]);
        self.basicEmpInfo = ko.observableArray([]);
        self.currentScheduledJobNames = ko.observableArray([]);
        self.daysandtimes = ko.observableArray([]);
        self.unavailableDaysAndTimes = ko.observableArray([]);
        self.preferredDaysAndTimes = ko.observableArray([]);
        self.currentScheduledDateValues = ko.observableArray([]);
        self.formattedCurrentScheduledDateValues = ko.observableArray([]);
        
        self.hireStatusChanges = ko.observableArray([]);
        
        self.PageControllVal = ko.observable(5);
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
        self.selectedTab = ko.observable("");  
        self.rehireEligibility = ko.observable();
        
        self.tabsChangeHandler = function(event, data) {
            self.selectedTab(data.value);
         };
         
        self.getItemInitialDisplayDialog = function(index){return index < 3 ? '' : 'none';};
        //Employee Basic Info Dialog
        self.empBasicInfoOpen =  function(emp) {
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
                            
                            self.formattedCurrentScheduledDateValues(ko.dependentObservable(function() {
                                formattedCurrentWeekDetails = [];
                                return ko.utils.arrayMap(self.currentScheduledDates(), 
                                function(item){ 
                                    var obj = {};
                                    obj.startDate = item.currentDayStart;
                                    obj.totalEarning = item.jobRateHourly * ((item.actualEndtime - item.actualStartTime) / 100);
                                    obj.dailyLoacl = 'Daily Loacl';
                                    obj.totalHours = ((item.actualEndtime - item.actualStartTime) / 100);
                                    obj.hourlyWage = item.jobRateHourly;
                                    obj.locationValue = item.locationName;
                                    
                                    obj.locations = [];
                                    var location = {};
                                    location.name = item.locationName;
                                    
                                    
                                    var work = {};
                                    work.jobtitle = item.jobName;
                                    work.workStation = item.station;
                                    work.Time = ((item.actualEndtime - item.actualStartTime) / 100);
                                    work.rate = item.jobRateHourly;
                                    work.id = item.id;
                                    
                                    location.workDetails = [];
                                    location.workDetails.push(work);
                                    
                                    obj.locations.push(location);
                                    
                                    obj.prefered = '12:30 PM - 6:00 PM';
                                    obj.notAvailable = '6:00 PM - 8:00 PM';
                                    
                                    var found = false;
                                    var index = -1;
                                    for (var i = 0; i < formattedCurrentWeekDetails.length; i++)
                                    {
                                        if(formattedCurrentWeekDetails[i].startDate === obj.startDate){
                                            found = true;
                                            index = i;
                                            break;
                                        } 
                                    }
                                    if(found === true){
                                        var alreadyObj = formattedCurrentWeekDetails[index];
                                        var locationVals = alreadyObj.locations;
                                        
                                        var locationAlreadyExist = false;
                                        var locationIndex = -1;
                                        
                                        for (var j = 0; j < locationVals.length; j++)
                                        {
                                            if(locationVals[j].name === obj.locationValue){
                                                locationAlreadyExist = true;
                                                locationIndex = j;
                                                break;
                                            } 
                                        }
                                        if(locationAlreadyExist === true){
                                            var workDetailValues = locationVals[locationIndex].workDetails;
                                            workDetailValues.push(obj.locations[0].workDetails);
                                            locationVals[locationIndex].workDetails = workDetailValues;
                                            formattedCurrentWeekDetails[index].locations = locationVals;
                                        } else{
                                            
                                            locationVals.push(obj.locations[0]);
                                            formattedCurrentWeekDetails[index].locations = locationVals;
                                        }
                                    } else{
                                        formattedCurrentWeekDetails.push(obj);
                                    }
                                    return formattedCurrentWeekDetails;
                                    
                                });
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
                            
                            $("#empBasicDialogWindow").ojDialog("open");
                           
                            setTimeout(function(){$( "#filmStrip" ).ojFilmStrip( "option", "maxItemsPerPage", 4)}, 1000);
                            $("#filmStrip").ojFilmStrip("refresh");
                            resolve(true);
                        }).fail(function (error) {
                            console.log('Error: ' + error.message);
                            resolve(false);
                        });
                    });
            
        };
        
        //Employee Hire Staus Dialog
        self.empHireStatusOpen =  function(emp) {
            self.basicEmpInfo(emp);
            return new Promise(function(resolve, reject) {
                        data.fetchData("js/data/employee" + emp.empId + ".json").then(function (person) {
                            self.personProfile(person);
                            self.hiredateprev(oj.IntlConverterUtils.dateToLocalIso(new Date(
                                    new Date(self.basicEmpInfo().hireDate).getFullYear(),
                                    new Date(self.basicEmpInfo().hireDate).getMonth(),
                                    new Date(self.basicEmpInfo().hireDate).getDate())));
                                    
                            $("#hireStatusDialog").ojDialog("open");
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
            self.filteredAllPeopleAdvance();
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
        //Search form observables
        self.payrollIdSearch = ko.observable('');
        self.firstNameSearch = ko.observable('');
        self.advFirstNameSearch = ko.observable('');
        self.lastNameSearch = ko.observable('');
        self.homeStoreSearch = ko.observable('');
        self.awayStoreSearch = ko.observable('');
        self.jobSearch = ko.observable('');
        self.payrollIdSearch = ko.observable('');
        
        

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
                                 if (r.firstName.toLowerCase().indexOf(token) === 0 ||
                                         r.lastName.toLowerCase().indexOf(token) === 0 ||
                                         r.homeStore.toLowerCase().indexOf(token) === 0 ||
                                         r.title.toLowerCase().indexOf(token) === 0) {
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
    
        self.layoutOptionChangedHandler = function(event, data){
            if(data.value[0] === 'grid'){
                
            } else{
                
            }
        };
        var searchHistory = [
            {id: 1, searchname: 'John Smith', datehire: '01/28/14', hirestatus: 'Inactive-Suspended'},
            {id: 2, searchname: 'Patty Smith', datehire: '02/28/14', hirestatus: 'Inactive-Suspended'},
            {id: 3, searchname: 'Bob Smith', datehire: '03/28/14', hirestatus: 'Inactive-Suspended'},
            {id: 4, searchname: 'Jim Smith', datehire: '04/28/14', hirestatus: 'Inactive-Suspended'},
            {id: 5, searchname: 'Jane Smith', datehire: '05/28/14', hirestatus: 'Inactive-Suspended'},
            {id: 6, searchname: 'Larry Smith', datehire: '06/28/14', hirestatus: 'Inactive-Suspended'},
            {id: 7, searchname: 'Fish Smith', datehire: '07/28/14', hirestatus: 'Inactive-Suspended'},
            {id: 8, searchname: 'Brian Smith', datehire: '08/28/14', hirestatus: 'Inactive-Suspended'},
        ];
        self.resultSearchHistory = ko.observableArray(searchHistory);
        //pass all employee data into an array
        self.listViewDataSource = ko.computed(function () {
            return new oj.PagingTableDataSource(
                    new oj.ArrayTableDataSource(self.filteredAllPeople(),
                    {idAttribute: 'empId'}));
        });
        self.getPhoto = function (empId) {
            var src;
            if (empId < 188) {
                src = 'css/images/people/' + empId + '.png';
            } else {
                src = 'css/images/people/nopic.png';
            }
            return src;
        };

        self.loadPersonPage = function () {
            var emp = self.basicEmpInfo();
            if (emp.empId) {
                // Temporary code until go('profile/' + emp.empId); is checked in 1.1.2
                history.pushState('null', '', 'index.html?root=profile&emp=' + emp.empId);
                  //  $("#profileDetails").css({"background-color":"red"}); 
                
                oj.Router.sync();
            } else {
                // Default id for profile is 100 so no need to specify.
                oj.Router.rootInstance.go('profile');
             
            }
        };
        
        self.empHireStatusClose =  function() {
            var a=self.hireStatusChanges();
            var found = false;
            for (var i = 0; i < a.length; i++) {
                if (a[i].empid === self.basicEmpInfo().empId) {
                    found = true;
                    if(self.selectedTab() === 't1'){
                        a[i].newhiredate = self.reHireDate();
                        a[i].newhirestatus = 'Active';
                    } else if(self.selectedTab() === 't2'){
                        a[i].newhiredate = self.terminationdate();
                        a[i].newhirestatus = 'Inactive-Terminated';
                    } else if(self.selectedTab() === 't3'){
                        a[i].newhiredate = self.leavestartdate();
                        a[i].newhirestatus = 'Inactive-Leave Of Absence';
                    }
                    break;
                }
            }
            if(found === false){
                if(self.selectedTab() === 't1'){
                a.push({
                'empid': self.basicEmpInfo().empId,
                'newhiredate' : self.reHireDate(),
                'newhirestatus' : 'Active'
                });
            } else if(self.selectedTab() === 't2'){
                a.push({
                'empid': self.basicEmpInfo().empId,
                'newhiredate' : self.terminationdate(),
                'newhirestatus' : 'Inactive-Terminated'
                });
            } else if(self.selectedTab() === 't3'){
                a.push({
                'empid': self.basicEmpInfo().empId,
                'newhiredate' : self.leavestartdate(),
                'newhirestatus' : 'Inactive-Leave Of Absence'
                });
            }

            }
                        
            self.hireStatusChanges(a);
            console.log("length of hireStatusChanges = "+self.hireStatusChanges().length);
            $("#hireStatusDialog").ojDialog("close");
            //self.filteredAllPeople();
        };
        self.getBasicFormattedDate = function (oldDate) {
            var dischargeDate = [oldDate];
            var dateOptions = {formatStyle: 'date', dateFormat: 'medium'};
            var dateConverter = oj.Validation.converterFactory("datetime").createConverter(dateOptions);
            var startDate = oj.IntlConverterUtils.dateToLocalIso(moment(dischargeDate).toDate());
            oldDate = dateConverter.format(startDate);
            return oldDate;
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
        this._HELP_SOURCE = "http://www.oracle.com";
        this._HELP_DEF = "your custom help definition here";
        this.helpSource = ko.observable(this._HELP_SOURCE);
        this.helpDef = ko.observable(this._HELP_DEF);
        //Selection Observable Default
        this.val = ko.observableArray(["CH"]);
        //Check Box Observable Default
        self.currentStatus = ko.observable();
        self.currentMoreOptions = ko.observable();

        //current visible state of section, either true or false
        self.sectionsState = ko.observable(false);

        //Toggles visibility of sections
        self.toggleSections = function () {
            self.sectionsState(!self.sectionsState());
        };
    }

    return peopleContentViewModel;

});
