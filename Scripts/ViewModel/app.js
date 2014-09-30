/// <reference path="knockout-3.2.0.js" />
/// <reference path="../jquery-1.7.1.js" />
/// <reference path="../jquery-ui-1.8.20.js" />
/// <reference path="../jquery.cookie.js" />
/// <reference path="../Model/Login.js" />
/// <reference path="../Common/CommonFunctions.js" />
/// <reference path="MainPageViewModel.js" />
/// <reference path="../jquery-1.7.1.intellisense.js" />

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

if (!common.are_cookies_enabled()) {
    alert("Cookies are not enabled. Please enable the cookies.");
}
var common = new CommonFunctions();
var Options = ko.observableArray();
var users = ko.observableArray();
var loggedinUser = $.cookie("emailId");
if (loggedinUser == null)
{
    alert("No User logged in.");
    common.navigate(common.pages.Login);
}
$(function () {    
    var common = new CommonFunctions();
    var url = common.webServiceUrl + "/UserList";    
    var AjaxObj = new AjaxCalls(url, "GET", AJAXSuccessFunction, AJAXDisplayError, null, null);
    AjaxObj.Ajax();
    var vm = {        
        mainPageViewModel: new MainPageViewModel(loggedinUser, users),
        };
    ko.applyBindings(vm);    
    ko.bindingHandlers.tablerowBinding = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // This will be called when the binding is first applied to an element
            // Set up any initial state, event handlers, etc. here      
            var value = valueAccessor();
            if (value==true)
            {
                $(element).addClass("odd");                
                $(element).click(function () {
                    $(this).next("tr").toggle();
                    $(this).find(".arrow").toggleClass("up");
                    //$(this).find(".arrow").image('/Images/arrow_up.png');
                });
            }
            else
            {
                $(element).hide();
            }
            
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // This will be called once when the binding is first applied to an element,
            // and again whenever any observables/computeds that are accessed change
            // Update the DOM element based on the supplied values here.
        }
    };
   
}
);
function AJAXDisplayError(status, error) {
    console.log("Status: " + status + ". Error: " + error);
    alert("Status: " + status + ". Error: " + error);
}
function AJAXSuccessFunction(data) {
    if (!data.responseCode) {        
        for (var i = 0; i < data.accounts.length; i++) {
            var us=new User();
            us.id = data.accounts[i].id;
            us.emailId = data.accounts[i].emailId;
            us.accounttype = data.accounts[i].accounttype;
            us.firstName = data.accounts[i].firstName;
            us.lastName = data.accounts[i].lastName;
            users.push(us);
        }
    }
    else {        
        alert("Error occured while getting the users." + data.responseMessage);
        common.navigate(common.pages.Login);
    }
}



function AJAXSuccessFunction_GetUsers(data) {
    if (!data.errorCode) {
        for (var i = 0; i < data.userDetails.length; i++) {
            var user = new User();
            user.userId = data.userDetails[i].userId;
            user.emailId = data.userDetails[i].emailId;
            user.cloudId = data.userDetails[i].cloudId;
            user.firstName = data.userDetails[i].firstName;
            user.lastName = data.userDetails[i].lastName;
            user.password = data.userDetails[i].password;
            user.userType = data.userDetails[i].userType;
            users.push(user);
        }
    }
    else {
        alert("Error occured while getting the users." + data.errorMessage);
        common.navigate(common.pages.Login);
    }
}