define([
    'ojs/ojcore', 
    'knockout', 
    'hammerjs',
    'ojs/ojknockout'
  
], function (oj, ko) {
    
    
    function homeContentViewModel() {
        var self = this;

        
        self.pageHeading = ko.observable("Gift Loyalty");


    }

    return homeContentViewModel;

});
