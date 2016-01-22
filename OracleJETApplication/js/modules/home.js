define(['knockout', 'ojs/ojcore'
], function (ko, oj) {
    function homeContentViewModel() {
        var self = this;

        self.pageHeading = ko.observable("Home");
        self.pageHeadingIconClass = ko.observable('fa fa-home');
        self.organizationName = ko.observable("Micros");
//        self.level1 = ko.observable("level1");
//        self.level2 = ko.observable("level2");
        self.location = ko.observable("North East");
        self.subLocation = ko.observable("Atlanta");

        self.pageSubNavigation = ko.computed(function () {
            return self.organizationName() + " | " + self.location() + " | " + self.subLocation();
        }, self);

    }

    return homeContentViewModel;

});
