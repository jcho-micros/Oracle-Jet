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
    'ojs/ojtabs'],
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
//            YPA doesnt work!!
            self.handleAttached = function(){
                    //Adds class to people parent router when profile is active and is removed in the main.js file on exit of the page.
                    $('#people').addClass('oj-selected');

                    console.log($('#people').length);
            };
        };

        return addEmpContentViewModel;
    });
