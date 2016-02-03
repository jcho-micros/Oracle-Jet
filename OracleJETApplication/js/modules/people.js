define([
    'ojs/ojcore',
    'knockout',
    'data/data',
    'ojs/ojrouter',
    'ojs/ojknockout',
    'ojs/ojlistview',
    'ojs/ojmodel',
    'ojs/ojnavigationlist',
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
], function (oj, ko, data) {

    function peopleContentViewModel() {
        var self = this;

        //where the all employee info will be stored
        self.allPeople = ko.observableArray([]);

        //self.ready = ko.observable(false);
        data.fetchData('js/data/employees.json').then(function (people) {
            self.allPeople(people.employees);
        }).fail(function (error) {
            console.log('Error in getting People data: ' + error.message);
        });

        //pass all employee data into an array
        self.listViewDataSource = ko.computed(function () {
            return new oj.ArrayTableDataSource(self.allPeople(), {idAttribute: 'empId'});
        });

        self.loadPersonPage = function (emp) {
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
    }

    return peopleContentViewModel;

});
