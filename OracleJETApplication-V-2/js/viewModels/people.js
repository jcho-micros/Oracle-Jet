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
    'ojs/ojmenu'
], function (oj, ko, data, $, Hammer) {
    
    
    function peopleContentViewModel() {
        var self = this;
        self.ready = ko.observable(false);
        self.pageHeading = ko.observable("People");

        //where the all employee info will be stored
        self.allPeople = ko.observableArray([]);
        self.basicEmpInfo = ko.observableArray([]);
        
        //Employee Basic Info Dialog
        self.empBasicInfoOpen =  function(emp) {
            self.basicEmpInfo(emp);
            $("#empBasicDialogWindow").ojDialog("open");
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
        //Search form observables
        self.payrollIdSearch = ko.observable('');
        self.firstNameSearch = ko.observable('');
        self.lastNameSearch = ko.observable('');

        self.filteredAllPeople = ko.computed({
             read: function(){
                 var peopleFilter = new Array();
                 if (self.allPeople().length !== 0) {
                     if (self.firstNameSearch().length === 0) {
                         peopleFilter = self.allPeople();
                     } else {
                         ko.utils.arrayFilter(self.allPeople(),
                             function (r) {
                                 var token = self.firstNameSearch().toLowerCase();
                                 if (r.firstName.toLowerCase().indexOf(token) === 0) {
                                     peopleFilter.push(r);
                                 }
                             });
                     }
                 }
                 return peopleFilter;
             },
             write: function(){
             }
        });
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
            return new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.filteredAllPeople(), {idAttribute: 'empId'}));
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
                oj.Router.sync();
            } else {
                // Default id for profile is 100 so no need to specify.
                oj.Router.rootInstance.go('profile');
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
        self.organizationName = ko.observable("Micros");
        self.level1 = ko.observable("level1");
        self.level2 = ko.observable("level2");
        self.location = ko.observable("North East");
        self.formats = ko.observableArray();
        self.pageSubNavigation = ko.computed(function () {
            return self.organizationName() + " | " + self.level1() + " | " + self.level2() + " | " + self.location();
        }, self);

        self.buttonClick = function (data, event) {
            self.clickedButton(event.currentTarget.id);
            return true;
        }
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

        //current visible state of section, either true or false
        self.sectionsState = ko.observable(false);

        //Toggles visibility of sections
        self.toggleSections = function () {
            self.sectionsState(!self.sectionsState());
        };

    }

    return peopleContentViewModel;

});
