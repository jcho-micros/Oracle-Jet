define(['ojs/ojcore' ,'knockout'
   ], function(oj, ko) {
            function inventoryContentViewModel() {
                var self = this;
                self.something = ko.observable("Hello World");
                $("#buttonOpener").click(function() {
                    $("#modalDialog1").ojDialog("open"); });

                $("#okButton").click(function() {
                    $("#modalDialog1").ojDialog("close"); });
            }
            
   return inventoryContentViewModel;
});