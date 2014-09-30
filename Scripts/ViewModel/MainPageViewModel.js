/// <reference path="../jquery-1.7.1.intellisense.js" />
/// <reference path="../jquery-1.7.1.js" />
/// <reference path="../jquery.cookie.js" />
/// <reference path="../Common/CommonFunctions.js" />
/// <reference path="../jquery-ui-1.8.20.js" />
/// <reference path="../Common/PopUps.js" />
/// <reference path="AppPackagesViewModel.js" />
/// <reference path="../Common/PopUps.js" />
/// <reference path="RegisterViewModel.js" />
var common = new CommonFunctions();
var selectedUser = null;
var popUp = new PopUps();
function MainPageViewModel(loggedinUser,users) {
    this.loggedinUser = loggedinUser;
    this.users = users;
    this.onLogOut = function () {
        popUp.LogOutPopUp(AJAXSuccessFunction_LogOut, AJAXDisplayError_LogOut);
    };
    this.appPackagesviewmodel = new AppPackagesViewModel();
    this.callRecordsViewModel = new CallRecordsViewModel();
    var parentObj = this;
    this.showApps = function (curritem) {
        console.log("In click event." + curritem.id);
        parentObj.appPackagesviewmodel.LoadApps(curritem.id);
        popUp.AppPackagesPopUp();
    };
    this.lockPhone = function (curritem) {
        popUp.lockPhonePopUps(curritem, AJAXSuccessFunction_LockPhone, AJAXDisplayError_LockPhone);
    }
    this.wipePhoneData = function (curritem) {
        popUp.wipeDataPopUp(curritem, AJAXSuccessFunction_WipeData, AJAXDisplayError_WipeData);
    }
    this.showCallRecords = function (curritem) {
        parentObj.callRecordsViewModel.LoadCalls(curritem.id);
        popUp.CallRecordsPopUp();
        //alert(ko.toJSON(curritem));
    }
    
    function AJAXDisplayError_LogOut(status, error) {
        console.log("Status: " + status + ". Error: " + error);
        alert("Exception occured while logging out. Status: " + status + ". Error: " + error);
    }
    function AJAXSuccessFunction_LogOut(data) {
        if (!data.responseCode) {
            var cookies = $.cookie();
            for (var cookie in cookies) {
                $.removeCookie(cookie);
            }
            common.navigate(common.pages.Login);
        }
        else {
            alert("Exception occured while logging out. Message: " + data.responseMessage);
        }
    }

    function AJAXDisplayError_LockPhone(status, error) {
        console.log("Status: " + status + ". Error: " + error);
        alert("Exception occured while locking the device. Status: " + status + ". Error: " + error);
    }

    function AJAXSuccessFunction_LockPhone(data) {
        if (!data.responseCode) {
            alert("Locked the device successfully!!");            
        }
        else {
            alert("Error occured while locking the device. Error message.: " + data.responseMessage);
        }
    }

    function AJAXDisplayError_WipeData(status, error) {
        console.log("Status: " + status + ". Error: " + error);
        alert("Exception occured while wiping the device. Status: " + status + ". Error: " + error);
    }

    function AJAXSuccessFunction_WipeData(data) {
        if (!data.responseCode) {
            alert("Factory reset operation performed on the device successfully successfully!!");
        }
        else {
            alert("Error occured while wiping the device data. Error message.: " + data.responseMessage);
        }
    }
}
