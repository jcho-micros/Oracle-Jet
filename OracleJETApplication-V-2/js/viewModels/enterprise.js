define([
    'ojs/ojcore', 
    'knockout', 
    'hammerjs',
    'ojs/ojknockout'
  
], function (oj, ko) {
    
    
    function homeContentViewModel() {
        var self = this;

        self.sectionsState = ko.observable(false);
        self.pageHeading = ko.observable("Enterprise");
        //Child Router
        this.router = undefined;

        self.handleActivated = function (data) {
            var parentRouter = oj.Router.rootInstance;
            this.router = parentRouter.createChildRouter('enterprisetabs').configure({
                'overview': {label: 'Overview', value: 'overview', isDefault: true},
                'labor-management': {label: 'Labor Management', value: 'labor-management'},
                'inventory-management': {label: 'Inventory Management', value: 'inventory-management'},
                'gift-loyalties': {label: 'Gift & Loyalty', value: 'gift-loyalty'},
                'reporting-analytics': {label: 'Reporting & Analytics', value: 'reporting-analytics'},
                'locations': {label: 'Location',value: 'locations'},
                'levels': {label: 'Levels', value: 'levels'},
                'roles': {label: 'Roles', value: 'roles'},
                'users': {label: 'Users', value: 'users'}
            });
            // Now that the router for this view exist, synchronise it with the URL
            oj.Router.sync();
        }
        self.selectHandler = function (event, ui) {
            if ('enterpriseTabs' === event.target.id && event.originalEvent) {
                // Invoke go() with the selected item.
                self.router.go(ui.key);
            }
        }
        self.dispose = function () {
            this.router.dispose();
            this.router = null;
        }
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
