define(['ojs/ojcore' ,'knockout'
   ], function(oj, ko) {
            function inventoryContentViewModel() {
                var self = this;
                self.something = ko.observable("Hello World");
            }
            
   return inventoryContentViewModel;
});