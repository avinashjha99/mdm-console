/// <reference path="knockout-3.2.0.js" />
/// <reference path="../jquery-1.7.1.js" />
/// <reference path="../jquery-ui-1.8.20.js" />
/// <reference path="../jquery.cookie.js" />
/// <reference path="../Model/Login.js" />
/// <reference path="../Common/AjaxCalls.js" />
/// <reference path="../Common/CommonFunctions.js" />
/// <reference path="../knockout-3.2.0.js" />

/// <reference path="../jquery-1.7.1.intellisense.js" />
var common = new CommonFunctions();
if (!common.are_cookies_enabled()) {
    alert("Cookies are not enabled. Please enable the cookies.");
}
function loginViewModel () {    
    this.loginObj = new login();
    var parent=this;
    this.loginSubmit = function () {
        var elem = $("#frmId1");
        elem.validate();
        if (elem.valid()) {                        
            var url = common.webServiceUrl + "/Login";
            var AjaxObj = new AjaxCalls(url, "POST", AJAXSuccessFunction, AJAXDisplayError, ko.toJSON(this.loginObj), null);
            AjaxObj.Ajax();
        }
    };
    $("#Password").keyup(function (event) {
        if (event.keyCode == 13) {
            loginViewModel.loginSubmit();
        }
    });    

    function AJAXDisplayError(status, error) {
        console.log("Status: " + status + ". Error: " + error);
        alert("Exception occured while logging in. Status: " + status + ". Error: " + error);
    }
    function AJAXSuccessFunction(data) {
        if (!data.responseCode) {
            // Set Cookies
            $.cookie("emailId", parent.loginObj.emailId());            
            //navigate to main page
            common.navigate(common.pages.Main);
        }
        else {
            alert(data.responseMessage);
        }
    }

}
$(function () {
    var vm = new loginViewModel();
    ko.applyBindings(vm);
});



