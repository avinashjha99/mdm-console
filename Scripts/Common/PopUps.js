function PopUps()
{
    this.LogOutPopUp = function (AJAXSuccessFunction_LogOut, AJAXDisplayError_LogOut) {
        $("#logOutDialogBox").dialog({
            autoOpen: true,
            height: 130,
            width: 350,
            title: "Log out",
            modal: true,
            buttons: {
                Yes: function () {
                    var url = common.webServiceUrl + "/Logout";
                    var AjaxObj = new AjaxCalls(url, "GET", AJAXSuccessFunction_LogOut, AJAXDisplayError_LogOut, null, null);
                    AjaxObj.Ajax();
                    $(this).dialog("close");
                },
                No: function () {
                    $(this).dialog("close");
                }
            }

        });
    };

    this.AppPackagesPopUp = function ()
    {
        $("#appData").dialog({
            autoOpen: true,
            height: 900,
            width: 900,
            modal: true,
            title: "User Apps",
            buttons: {
                Ok: function () {
                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }

        });
    }

    this.CallRecordsPopUp = function () {
        $("#callRecordsDialogBox").dialog({
            autoOpen: true,
            height: 800,
            width: 700,
            modal: true,
            title: "Call Records",
            buttons: {
                Ok: function () {
                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }

        });
    }

    this.lockPhonePopUps = function (curritem, AJAXSuccessFunction_LockPhone, AJAXDisplayError_LockPhone)
    {
        $("#lockPhoneDialogBox").dialog({
            autoOpen: true,
            height: 130,
            width: 400,
            modal: true,
            title: "Lock phone",
            buttons: {
                Yes: function () {
                    selectedUser = curritem;
                    var ctrlObj = new Control();
                    ctrlObj.accountId = curritem.id;                    
                    ctrlObj.commandType = common.CommandTypeConstants.LOCK_PHONE_CONTROL;
                    var url = common.webServiceUrl + "/Control";
                    var AjaxObj = new AjaxCalls(url, "POST", AJAXSuccessFunction_LockPhone, AJAXDisplayError_LockPhone, ko.toJSON(ctrlObj), null);
                    AjaxObj.Ajax();
                    $(this).dialog("close");
                },
                No: function () {
                    $(this).dialog("close");
                }
            }

        });
    }

    this.wipeDataPopUp = function (curritem, AJAXSuccessFunction_WipeData, AJAXDisplayError_WipeData) {
        $("#wipeDataDialogBox").dialog({
            autoOpen: true,
            height: 130,
            width: 400,
            modal: true,
            title: "Wipe phone",
            buttons: {
                Yes: function () {
                    selectedUser = curritem;
                    var ctrlObj = new Control();
                    ctrlObj.accountId = curritem.id;                    
                    ctrlObj.commandType = common.CommandTypeConstants.WIPE_PHONE_CONTROL;
                    var url = common.webServiceUrl + "/Control";
                    var AjaxObj = new AjaxCalls(url, "POST", AJAXSuccessFunction_WipeData, AJAXDisplayError_WipeData, ko.toJSON(ctrlObj), null);
                    AjaxObj.Ajax();
                    $(this).dialog("close");
                },
                No: function () {
                    $(this).dialog("close");
                }
            }

        });
    }
    
}
$(function () {
    $("#logOutDialogBox").hide();
    $("#appData").hide(); 
    $("#lockPhoneDialogBox").hide();
    $("#callRecordsDialogBox").hide(); 
    $("#wipeDataDialogBox").hide();
})