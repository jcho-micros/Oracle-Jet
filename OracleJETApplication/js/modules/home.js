define([
    'ojs/ojcore', 
    'knockout', 
    'data/data', 
    'moment', 
    'hammerjs',
    'ojs/ojknockout'
  
], function (oj, ko, jsonData, moment) {
    
    
    function homeContentViewModel() {
        var self = this;
        self.locationCity = ko.observableArray([]);
        
        self.pageHeading = ko.observable("Home");
        
        
    }

    return homeContentViewModel;

});
