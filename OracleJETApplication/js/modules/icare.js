define(['ojs/ojcore' ,'knockout'
   ], function(oj, ko) {
            function icareContentViewModel() {
                var self = this;
                self.something = ko.observable("Hello World");
            }
            
   return icareContentViewModel;
});