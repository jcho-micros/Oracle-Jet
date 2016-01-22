define(['ojs/ojcore' ,'knockout'
   ], function(oj, ko) {
            function reportsChartsContentViewModel() {
                var self = this;
                self.something = ko.observable("Hello World");
            }

   return reportsChartsContentViewModel;
});
