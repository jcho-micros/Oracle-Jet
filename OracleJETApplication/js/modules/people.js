define([
    'knockout',
    'ojs/ojcore',
    'ojs/ojknockout',
    'data/data',
    'ojs/ojrouter',
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
    'ojs/ojmodel'
], function (ko, oj, data, jsonData) {

    function peopleContentViewModel() {
        var self = this;
        //where the all employee info will be stored
        self.allPeople = ko.observableArray([]);

        //where a single employee's info will be stored
        self.personProfile = ko.observableArray([]);

        //Child Router
        self.handleActivated = function (info) {
            var parentRouter = info.valueAccessor().params;

            // Retrieve the childRouter instance created in main.js
            self.empRouter = parentRouter.currentState().value;

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

        // canEnter requires a promise that resolve as true or false
        self.loadData = function (id) {
            return new Promise(function(resolve, reject) {
                jsonData.fetchData(getEmpURL(id)).then(function (person) {
                    self.personProfile(person);
//                    self.directReports(person.reports);
//                    loadPerfandPotenialData();
                    resolve(true);
                }).fail(function (error) {
                    console.log('Error: ' + error.message);
                    resolve(false);
                });
            });
        };


        jsonData.fetchData('js/data/employees.json').then(function (people) {
            self.allPeople(people.employees);
        }).fail(function (error) {
            console.log('Error in getting People data: ' + error.message);
        });

        self.loadPersonPage = function (emp) {
            if (emp.empId) {
                // Temporary code until go('person/' + emp.empId); is checked in 1.1.2
                 history.pushState(null, '', 'index.html?root=people&emp=' + emp.empId);
                oj.Router.sync();
            } else {
                // Default id for person is 100 so no need to specify.
                oj.Router.rootInstance.go('people');
            }
        };


        //pass all employee data into an array
        self.listViewDataSource = ko.computed(function () {
            return new oj.ArrayTableDataSource(self.allPeople(), {idAttribute: 'empId'});
        });

        self.pageHeading = ko.observable("iCare");
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
