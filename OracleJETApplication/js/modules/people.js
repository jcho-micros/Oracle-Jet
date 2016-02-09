define([
    'ojs/ojcore',
    'knockout',
    'data/data',
    'ojs/ojrouter',
    'ojs/ojknockout',
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
    'ojs/ojradioset'
], function (oj, ko, data) {

    function peopleContentViewModel() {
        var self = this;
        self.ready = ko.observable(false);

        //where the all employee info will be stored
        self.allPeople = ko.observableArray([]);
        self.basicEmpInfo = ko.observableArray([]);

        //Employee Basic Info Dialog
        self.empBasicInfoOpen =  function(emp) {
            self.basicEmpInfo(emp);
            $("#empBasicDialog").ojDialog("open");
        };

        self.empBasicInfoClose =  function() {
            $("#empBasicDialog").ojDialog("close");
        };

        //self.ready = ko.observable(false);
        data.fetchData('js/data/employees.json').then(function (people) {
            self.allPeople(people.employees);
        }).fail(function (error) {
            console.log('Error in getting People data: ' + error.message);
        });

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

        self.pageHeading = ko.observable("People");
        self.pageHeadingIconClass = ko.observable('fa fa-gift');
        self.organizationName = ko.observable("Micros");
        self.level1 = ko.observable("level1");
        self.level2 = ko.observable("level2");
        self.location = ko.observable("North East");

        self.pageSubNavigation = ko.computed(function () {
            return self.organizationName() + " | " + self.level1() + " | " + self.level2() + " | " + self.location();
        }, self);

        self.buttonClick = function (data, event) {
            self.clickedButton(event.currentTarget.id);
            return true;
        }

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
