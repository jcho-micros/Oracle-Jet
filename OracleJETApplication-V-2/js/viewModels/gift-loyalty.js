define([
    'ojs/ojcore', 
    'knockout', 
    'hammerjs',
    'ojs/ojknockout'
  
], function (oj, ko) {
    
    
    function homeContentViewModel() {
        var self = this;

        self.sectionsState = ko.observable(false);
        self.pageHeading = ko.observable("Gift Loyalty");
        //Child Router
        this.router = undefined;

        self.handleActivated = function (data) {
            var parentRouter = oj.Router.rootInstance;

            self.router = parentRouter.createChildRouter('giftloyaltytab').configure({
                'profile': {label: 'Profile', value: 'profile', isDefault: true},
                'schedules-timecards': {label: 'Schedules & Timecards', value: 'schedules-timecards'},
                'jobs-compensation': {label: 'Jobs & Compensation', value: 'jobs-compensation'},
                'payroll': {label: 'Payroll', value: 'payroll'},
                'metrics': {label: 'Metrics', value: 'metrics'},
                'permissions': {label: 'Permissions', value: 'permissions'}
            });
            // Now that the router for this view exist, synchronise it with the URL
            oj.Router.sync();
        };
        self.selectHandler = function (event, ui) {
            if ('gift-LoyaltyTabs' === event.target.id && event.originalEvent) {
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

    }

    return homeContentViewModel;

});
