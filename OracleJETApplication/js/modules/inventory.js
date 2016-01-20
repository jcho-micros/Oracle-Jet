define(['ojs/ojcore' ,'knockout'
   ], function(oj, ko) {
            function inventoryContentViewModel() {
                var self = this;
                self.something = ko.observable("Hello World");
                $(document).on('click', '#buttonOpener', function() {
                    $("#modalDialog1").ojDialog("open"); 
                });

                $(document).on('click', '#okButton', function() {
                    $("#modalDialog1").ojDialog("close"); 
                });
            }
            
   return inventoryContentViewModel;
});