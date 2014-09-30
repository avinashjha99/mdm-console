/// <reference path="../jquery-1.7.1.js" />
/// <reference path="../knockout-3.2.0.js" />
/// <reference path="../Common/CommonFunctions.js" />
/// <reference path="../Model/AppPackages.js" />
/// <reference path="../Model/Control.js" />
/// <reference path="../Common/AjaxCalls.js" />
var common = new CommonFunctions();
var selectedApp;
function AppPackagesViewModel() {
    this.Apps = ko.observableArray();
    var parentObj = this;
    this.LoadApps = function (id) {
        this.Apps.removeAll();
        var url = common.webServiceUrl + "/AppAnalytics?id=" + id;
        var AjaxObj = new AjaxCalls(url, "GET", AJAXSuccessFunction_GetApps, AJAXDisplayError_GetApps, null, null);
        AjaxObj.Ajax();
    };
    this.uninstall = function (curritem) {
        selectedApp = curritem;        
        var ctrlObj = new Control();
        ctrlObj.accountId = curritem.accountId;
        ctrlObj.data = curritem.packageName;
        ctrlObj.commandType = common.CommandTypeConstants.UNINSTALL_APP_CONTROL;
        var url = common.webServiceUrl + "/Control";
        var AjaxObj = new AjaxCalls(url, "POST", AJAXSuccessFunction_Uninstall, AJAXDisplayError_Uninstall, ko.toJSON(ctrlObj), null);
        AjaxObj.Ajax();
    };        

    function AJAXDisplayError_GetApps(status, error) {
        console.log("Status: " + status + ". Error: " + error);
        alert("Exception occured while retrieving app info. Status: " + status + ". Error: " + error);
    }

    function AJAXSuccessFunction_GetApps(data) {
        if (!data.responseCode) {            
            for (var i = 0; i < data.appPackages.length; i++) {
                var appload = new AppPackage();
                appload.id = ko.observable(data.appPackages[i].id);
                appload.packageName = ko.observable(data.appPackages[i].packageName);
                appload.version = ko.observable(data.appPackages[i].version);
                console.log(appload.packageName());
                appload.displayName = ko.observable(getDisplayName(appload.packageName()));
                var temp = data.appPackages[i].account;
                if (temp == undefined)
                    appload.accountId = ko.observable("");
                else
                    appload.accountId = ko.observable(temp.id);
                parentObj.Apps.push(appload);                
            }
        }
        else {
            alert("Exception occured retrieving app info. Message: " + data.responseMessage);
        }
    }

    function AJAXDisplayError_Uninstall(status, error)
    {
        console.log("Status: " + status + ". Error: " + error);
        alert("Exception occured while retrieving app info. Status: " + status + ". Error: " + error);
    }

    function AJAXSuccessFunction_Uninstall(data)
    {
        if (!data.responseCode) {
            alert("App registered for Uninstallation")            
            parentObj.Apps.remove(selectedApp);
        }
        else {
            alert("Error occured while uninstalling the app. Error message.: "+data.responseMessage);
        }
    }
    var getDisplayName = function (packageName) {
        var res = packageName.split(".");        
        if (res.length > 1) {
            var str = res[res.length - 1];            
            return str.capitalize();
        }
        else {            
            return res[0];
        }        
    };
}