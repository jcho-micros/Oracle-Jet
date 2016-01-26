define([
    'knockout',
    'ojs/ojcore',
    'ojs/ojaccordion',
    'ojs/ojcollapsible',
    'ojs/ojbutton',
    'ojs/ojcheckboxset',
    'ojs/ojinputtext',
    'ojs/ojselectcombobox',
    'ojs/ojradioset', 'promise', 'ojs/ojlistview'
], function (ko, oj) {

    function peopleContentViewModel() {
        var self = this;
        self.buttonClick = function (data, event) {
            self.clickedButton(event.currentTarget.id);
            return true;
        }

        self._HELP_SOURCE = "http://www.oracle.com";
        self._HELP_DEF = "your custom help definition here";
        self.helpSource = ko.observable(self._HELP_SOURCE);
        self.helpDef = ko.observable(self._HELP_DEF);
        //Selection Observable Default
        self.val = ko.observableArray(["CH"]);
        //Check Box Observable Default
        self.currentStatus = ko.observable();
    }

    return peopleContentViewModel;

});
