define(['ojs/ojcore' ,'knockout'
   ], function(oj, ko) {
            function homeContentViewModel() {
                var self = this;
                self.something = ko.observable("Hello World");
            }
            
   return homeContentViewModel;
});