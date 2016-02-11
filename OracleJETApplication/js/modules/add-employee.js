define([
    'ojs/ojcore',
    'knockout',
    'data/data',
    'jquery',
    'ojs/ojknockout',
    'ojs/ojrouter',
    'ojs/ojnavigationlist',
    'ojs/ojpagingcontrol',
    'ojs/ojbutton',
    'ojs/ojinputtext',
    'ojs/ojselectcombobox',
     'ojs/ojinputnumber',
    'ojs/ojdialog',
    'ojs/ojtabs',
    'ojs/ojtable',
    'ojs/ojtrain',
    'ojs/ojcheckboxset',
    'ojs/ojselectcombobox'],
    function (oj, ko, data) {
        function addEmpContentViewModel() {
            var self = this;

            //Setup Observables
            self.allPeople = ko.observableArray([]);

            self.pageHeading = ko.observable("Add Employee");
            self.pageHeadingIconClass = ko.observable('fa fa-briefcase');

            self.firstName = ko.observable('Shelley');
            self.lastName = ko.observable('Jones');
            self.dob = ko.observable('1/2/13');
            self.language = ko.observableArray([""]);

            //Schedule & Times section
            self.districts = ko.observableArray(["none"]);

            //Featch json data
            data.fetchData('js/data/employees.json').then(function (people) {
                self.allPeople(people.employees);
            }).fail(function (error) {
                console.log('Error in getting People data: ' + error.message);
            });

//          ***Need to update to filter by all fields
            self.filteredAllPeople = ko.computed({
                 read: function(){
                     var peopleFilter = new Array();
                     if (self.allPeople().length !== 0) {
                         if (self.firstName().length === 0) {
                             peopleFilter = self.allPeople();
                         } else {
                             ko.utils.arrayFilter(self.allPeople(),
                                 function (r) {
                                     var token = self.firstName().toLowerCase();
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
            //train
            self.selected = ko.observable('stp1');
            self.stepArray = ko.observableArray([
                {label:'Employee Search', id:'stp1'},
                {label:'Profile', id:'stp2'},
                {label:'Schedule & Timecards', id:'stp3'},
                {label:'Jobs & Compensation', id:'stp4'},
                {label:'Payroll', id:'stp5'},
                {label:'Permissions', id:'stp6'},
                {label:'Analytics', id:'stp7'}
            ]);

            self.nextStep = function() {
              var next = $("#train").ojTrain("nextSelectableStep");
              if(next!=null)
                  self.selected(next);
            };

            self.previousStep = function() {
              var prev = $("#train").ojTrain("previousSelectableStep");
              if(prev!=null)
                  self.selected(prev);
            };

            self.selectedText = function() {
                return ($("#train").ojTrain("getStep", self.selected())).id;
            };

            //get photos
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
            //Toggles visibility of Employee listview sections
            //jquery toggle, there may be a way to use visible ko however not sure how atm
            self.toggleSections = function (empId, toggleSection) {
                $('#' + empId).children(toggleSection).toggle();
            };

            //YPA doesnt work!!
            self.handleAttached = function(){
                //Adds class to people parent router when profile is active and is removed in the main.js file on exit of the page.
                $('#people').addClass('oj-selected');
                //console.log($('#people').length);
            };
        };

        return addEmpContentViewModel;
    });
