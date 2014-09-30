/// <reference path="../jquery-1.7.1.js" />
/// <reference path="../knockout-3.2.0.js" />
/// <reference path="../Common/CommonFunctions.js" />
/// <reference path="../Model/CallRecord.js" />
/// <reference path="../Common/AjaxCalls.js" />
var common = new CommonFunctions();
var selectedApp;
function CallRecordsViewModel() {
    this.CallRecords = ko.observableArray();
    var parentObj = this;
    this.LoadCalls = function (id) {
        parentObj.CallRecords.removeAll();
        var url = common.webServiceUrl + "/CallAnalytics?id=" + id;
        var AjaxObj = new AjaxCalls(url, "GET", AJAXSuccessFunction_GetCallRecords, AJAXDisplayError_GetCallRecords, null, null);
        AjaxObj.Ajax();
    };

    function AJAXDisplayError_GetCallRecords(status, error) {
        console.log("Status: " + status + ". Error: " + error);
        alert("Exception occured while retrieving call records. Status: " + status + ". Error: " + error);
    }

    function AJAXSuccessFunction_GetCallRecords(data) {
        if (!data.responseCode) {            
            for (var i = 0; i < data.callRecords.length; i++) {
                var callrec = new CallRecord();
                callrec.id = data.callRecords[i].id;
                callrec.phNumber = data.callRecords[i].phNumber;
                callrec.callType = data.callRecords[i].callType;
                if (data.callRecords[i].callDate == undefined)
                    callrec.callDate = "";
                else {
                    var date = new Date(parseInt(data.callRecords[i].callDate));
                    var yyyy = date.getFullYear().toString();
                    var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
                    var dd = date.getDate().toString();
                    var hh = date.getHours().toString();
                    var min = date.getMinutes().toString();
                    var sec = date.getSeconds().toString();
                    callrec.callDate = yyyy+"-"+mm+"-"+dd+" "+hh+":"+min+":"+sec;
                }
                callrec.callDuration = data.callRecords[i].callDuration;
                var temp = data.callRecords[i].account;
                if (temp == undefined)
                    callrec.accountId = "";
                else
                    callrec.accountId = temp.id;
                parentObj.CallRecords.push(callrec);
            }
        }
        else {
            alert("Exception occured retrieving call records. Message: " + data.responseMessage);
        }
    }
}