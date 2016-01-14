define(['ojs/ojcore' ,'knockout'
   ], function(oj, ko) {
            function enterpriseeContentViewModel() {
                var self = this;
                self.something = ko.observable("Hello World");
            }
            
   return enterpriseeContentViewModel;
});