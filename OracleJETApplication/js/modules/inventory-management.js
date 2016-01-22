define(['ojs/ojcore' ,'knockout'
   ], function(oj, ko) {
            function inventoryContentViewModel() {
                var self = this;
                self.something = ko.observable("Hello World");
                self.handleAttached = function() {
                    self.handleOpen = $("#buttonOpener").click(function() {
                        $("#modalDialog1").ojDialog("open"); });

                    self.handleOKClose = $("#okButton").click(function() {
                        $("#modalDialog1").ojDialog("close"); });
                };
            }

   return inventoryContentViewModel;
});
