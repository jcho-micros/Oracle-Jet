define([
    'knockout',
    'ojs/ojcore',
    'ojs/ojaccordion',
    'ojs/ojcollapsible',
    'ojs/ojbutton',
    'ojs/ojcheckboxset',
    'ojs/ojinputtext',
    'ojs/ojselectcombobox',
    'ojs/ojradioset',
    'promise', 'ojs/ojlistview', 'ojs/ojdatacollection-common', 'ojs/ojmenu'
], function (ko, oj) {

    function peopleContentViewModel() {
        var self = this;
        //current visible state of section, either true or false
        self.sectionsState = ko.observable(false);

        //Toggles visibility of sections
        self.toggleSections = function () {
            self.sectionsState(!self.sectionsState());
        };

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

        var data = [{
                firstName: 'Kathryn',
                lastName: 'Jone',
                homeStore: 'Home Store',
                hireDate: '4/15/2015',
                status: 'Active'
            },
            {
                firstName: 'John',
                lastName: 'Doe',
                homeStore: 'Home Store',
                hireDate: '4/15/2015',
                status: 'Active'
            },
            {
                firstName: 'Eric',
                lastName: 'Gordon',
                homeStore: 'Home Store',
                hireDate: '4/15/2015',
                status: 'Active'
            },
            {
                firstName: 'Kathryn',
                lastName: 'Jone',
                homeStore: 'Home Store',
                hireDate: '4/15/2015',
                status: 'Active'
            },
            {
                firstName: 'Kathryn',
                lastName: 'Jone',
                homeStore: 'Home Store',
                hireDate: '4/15/2015',
                status: 'Active'
            }
               ]
        self.selectedMenuItem = ko.observable("(None selected yet)");

        self.menuItemSelect = function (event, ui) {
            var item = $('#listview').ojListView('option', "currentItem");
            self.selectedMenuItem("Action performed on " + item);
        };
        self.dataSource = new oj.ArrayTableDataSource(data, {
            idAttribute: 'name'
        });
    }

    return peopleContentViewModel;

});
