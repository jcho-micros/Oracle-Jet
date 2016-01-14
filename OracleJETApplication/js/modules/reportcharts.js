define(['ojs/ojcore' ,'knockout'
   ], function(oj, ko) {
            function reportschartsContentViewModel() {
                var self = this;
                self.something = ko.observable("Hello World");
            }
            
   return reportschartsContentViewModel;
});