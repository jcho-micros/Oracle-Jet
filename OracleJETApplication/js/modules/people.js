define(['ojs/ojcore' ,'knockout'
   ], function(oj, ko) {
            function peopleContentViewModel() {
                var self = this;
                self.something = ko.observable("Hello World");
            }
            
   return peopleContentViewModel;
});