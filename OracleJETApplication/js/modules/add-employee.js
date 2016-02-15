define(['ojs/ojcore', 'knockout', 'data/data', 'moment', 'jquery', 'ojs/ojknockout',
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
    'ojs/ojselectcombobox',
    'ojs/ojaccordion',
    'ojs/ojcollapsible',
    'ojs/ojradioset',
    'ojs/ojdatetimepicker'],
    function (oj, ko, data, moment) {
        function addEmpContentViewModel() {
            var self = this;

            //hides side and top menu
            $('.app-header-desktop').addClass('hideMenus');
            $('#sidebar-left').addClass('hideMenus');

            //Setup Observables
            self.resultSectionState = ko.observable(false);
            self.continueBtnSectionState = ko.observable(true);

            self.allPeople = ko.observableArray([]);

            self.pageHeading = ko.observable("Add Employee");
            self.pageHeadingIconClass = ko.observable('fa fa-plus');

            self.enterpriseLevel = ko.observable('Mike Rose Cafe');
            self.firstName = ko.observable('');
            self.lastName = ko.observable('');
            self.dob = ko.observable('');
            //Formats the date for text display
            self.dobFormatted = ko.pureComputed(function(){
                if(self.dob() !== ''){
                    var date = new Date(self.dob());
                    var newDate = ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
                }
                return newDate;
            });
            self.posCheckNameSelected = ko.observable("false");
            self.language = ko.observableArray(["english"]);
            self.timeZone = ko.observableArray(["CST"]);
            self.ethnicity = ko.observableArray(["white"]);
            self.genderCurrentSelected = ko.observable("");
            self.veteranCurrentSelected = ko.observable("");
            self.phone = ko.observable('');
            self.country = ko.observable("USA");

            //Schedule & Times section
            self.districts = ko.observableArray(["none"]);

            //add-employee Availaibilty fields
            self.minSun = ko.observable(0);
            self.minMon = ko.observable(0);
            self.minTues = ko.observable(0);
            self.minWed = ko.observable(0);
            self.minThurs = ko.observable(0);
            self.minFri = ko.observable(0);
            self.minSat = ko.observable(0);

            self.maxSun = ko.observable(0);
            self.maxMon = ko.observable(0);
            self.maxTues = ko.observable(0);
            self.maxWed = ko.observable(0);
            self.maxThurs = ko.observable(0);
            self.maxFri = ko.observable(0);
            self.maxSat = ko.observable(0);

            self.minWeekTotal = ko.computed(function(){
                return Math.max(Math.round((Number(self.minSun()) + Number(self.minMon()) + Number(self.minTues()) + Number(self.minWed()) + Number(self.minThurs()) + Number(self.minFri()) + Number(self.minSat())) * 10) / 10).toFixed(1);;
            });
            self.maxWeekTotal = ko.computed(function(){
                return Math.max(Math.round((Number(self.maxSun()) + Number(self.maxMon()) + Number(self.maxTues()) + Number(self.maxWed()) + Number(self.maxThurs()) + Number(self.maxFri()) + Number(self.maxSat())) * 10) / 10).toFixed(1);;
            });

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
                console.log(emp);
                if (emp.empId) {
                    // Temporary code until go('profile/' + emp.empId); is checked in 1.1.2
                    //Add in &trueUpdateEmp to url to use work around to load Hire Status modal
                    history.pushState('null', '', 'index.html?root=profile&emp=' + emp.empId + '&trueUpdateEmp');
                    oj.Router.sync();
                } else {
                    // Default id for profile is 100 so no need to specify.
                    oj.Router.rootInstance.go('profile');
                }
            };
            //train
            //Train section not being used ATM 2/11/16
//            self.selected = ko.observable('stp1');
//            self.stepArray = ko.observableArray([
//                {label:'Employee Search', id:'stp1'},
//                {label:'Profile', id:'stp2'},
//                {label:'Schedule & Timecards', id:'stp3'},
//                {label:'Jobs & Compensation', id:'stp4'},
//                {label:'Payroll', id:'stp5'},
//                {label:'Permissions', id:'stp6'},
//                {label:'Analytics', id:'stp7'}
//            ]);
//
//            self.nextStep = function() {
//              var next = $("#train").ojTrain("nextSelectableStep");
//              if(next!=null)
//                  self.selected(next);
//            };
//
//            self.previousStep = function() {
//              var prev = $("#train").ojTrain("previousSelectableStep");
//              if(prev!=null)
//                  self.selected(prev);
//            };

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
            self.empToggleSections = function (empId, toggleSection) {
                $('#' + empId).children(toggleSection).toggle();
            };

            //Basic toggle
            self.toggleSection = function (toggleSection) {
                $(toggleSection).toggle();
            };

            //Resets observable fields for Getting started section
            self.resetSearchFields = function(){
                self.resultSectionState(false);
                self.continueBtnSectionState(true);
                self.firstName('');
                self.lastName('');
                self.dob('');
            };

            //function for start over link on Getting Started area
            self.gettingStartedStartOver = function(){
                self.resetSearchFields();
                $('#startFirstName, #startLastName').ojInputText({"disabled": false});
                $('#startDob').ojInputDate({"disabled": false});
            };

            //function for start over link
            self.startOver = function(){
                self.resetSearchFields();
                $('#startFirstName, #startLastName').ojInputText({"disabled": false});
                $('#startDob').ojInputDate({"disabled": false});
                self.toggleSection('#newEmpAccordionSection');
                self.toggleSection('#searchEmpSection');

                //Resets New employee form
                $('#accordionSection').find('.editMode').show();
                $('#accordionSection').find('.textMode').hide();
                self.collapseArea('#c2, #c3, #c4, #c5, #c6');
            };

            //for the search button under Getting Started form
            self.gettingStartedSearch = function(){
                self.continueBtnSectionState(false);
                $('#startFirstName, #startLastName').ojInputText({"disabled": true});
                $('#startDob').ojInputDate({"disabled": true});
                self.filteredAllPeople();
                self.resultSectionState(true);
            };

            //Expands collapsed ID
            self.expandCollapsedArea = function(accordionId){
                $(accordionId).ojCollapsible("option", "expanded", true);
            };

            //Collapse a specific area
            self.collapseArea = function(accordionId){
                $(accordionId).ojCollapsible("option", "expanded", false);
            };

            //Toggles visibility for a section from edit to text mode
            self.editSectionMode = function(accordionId){
                $(accordionId).find('.editMode').show();
                $(accordionId).find('.textMode').hide();
            };

            self.textSectionMode = function(accordionId){
                $(accordionId).find('.editMode').hide();
                $(accordionId).find('.textMode').show();
            };

        };

        return addEmpContentViewModel;
    });
