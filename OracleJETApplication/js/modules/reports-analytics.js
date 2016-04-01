define([
    'ojs/ojcore', 
    'knockout', 
    'data/data', 
    'moment', 
    'hammerjs',
    'ojs/ojknockout', 
    'ojs/ojrouter', 
    'ojs/ojnavigationlist', 
    'ojs/ojconveyorbelt'],
    function (oj, ko, jsonData, moment) {
            function reportsChartsContentViewModel() {
                var self = this;
                self.something = ko.observable("Hello World");
                self.pageHeading = ko.observable("Reporting & Analytics");
                
                //General Dialog Reusable
                self.handleOpen =  function(dialog) {
                    $(dialog).ojDialog("open");
                };
            }

   return reportsChartsContentViewModel;
});
