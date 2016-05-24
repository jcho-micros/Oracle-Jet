define([
    'ojs/ojcore', 
    'knockout', 
    'data/data',
    'hammerjs',
    'ojs/ojknockout', 
    'ojs/ojrouter', 
    'ojs/ojnavigationlist', 
    'ojs/ojconveyorbelt', 
    'ojs/ojbutton', 
    'ojs/ojinputtext',
    'ojs/ojselectcombobox',
    'ojs/ojinputnumber',
    'ojs/ojdialog',
    'ojs/ojaccordion', 'ojs/ojcollapsible'
], function (oj, ko, data) {
    
    
    function laborContentViewModel() {
        var self = this;
        //Child Router
        this.router = undefined;
        
        self.sectionsState = ko.observable(false);
        self.personSchedules = ko.observableArray([]);
        self.jobSchedules = ko.observableArray([]);
        self.personLocationSchedules = ko.observableArray([]);
        self.selectedTab = ko.observable('Job');
        
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
        
        self.empBasicInfoOpen = function(){
            
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
            
    }

    return laborContentViewModel;

});
