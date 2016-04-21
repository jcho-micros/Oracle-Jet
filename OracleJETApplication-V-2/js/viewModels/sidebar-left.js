define(['knockout', 'ojs/ojcore', 'ojs/ojknockout'
], function (ko, oj) {

function sideBarLeftContentViewModel() {
    var self = this;

    self.username = ko.observable('System Admin');
    self.property = 'Mike Rose Cafe';

    var appSideNavData = [
        {name: 'Charts', id: 'charts', url: '#'},
        {name: 'Reports', id: 'reports', url: '#'},
        {name: 'Links', id: 'links', url: '#'},
        {name: 'iCare', id: 'icare', url: '#'},
        {name: 'MyInventory', id: 'myinventory', url: '#'},
        {name: 'Forecasting', id: 'forecasting', url: '#'},
        {name: 'Dashboards', id: 'dashboards', url: '#'},
        {name: 'myLabor', id: 'mylabor', url: '#'},
        {name: 'Admin', id: 'admin', url: '#'}
        ];
    self.handleActivated = function () {
        self.dataSideSource = ko.observableArray(appSideNavData);
        
    };
}

return sideBarLeftContentViewModel;
});
