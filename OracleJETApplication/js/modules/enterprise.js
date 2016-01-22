define(['ojs/ojcore' ,'knockout'
   ], function(oj, ko) {
            function enterpriseContentViewModel() {
                var self = this;
                self.something = ko.observable("Hello World");
            }

   return enterpriseContentViewModel;
});
