/// <reference path="Common/AjaxCalls.js" />

/// <reference path="knockout-3.2.0.js" />
/// <reference path="CommonFunctions.js" />
/// <reference path="protectedObservable.js" />
$(function () {
    
    //var viewmodel = {
    //    name: ko.observable("Bob"),
    //    changeName: function () {
    //        this.name("Steve");
    //        console.log("inside changeName function")
    //    },
    //    nameVisible: ko.observable(true),
    //    computedLog: "Log",
    //    displayName: ko.pureComputed(function () {
    //        var temp = viewmodel.name() + "123";
    //        return temp;
    //    }, viewmodel)
    //};
    var data = [{ Id: 1, name: "Bob" }, { Id: 2, name: "Joe" }, { Id: 3, name: "Test" }]

    
    //var listtemp = function () {
    //    return ko.utils.arrayMap(data, function (item) {
    //        return new GetProtectedObservableForData(item.name, item.Id);
    //    });
    //};
    //viewmodel.list = ko.observableArray(listtemp());
    //viewmodel.Count = viewmodel.list().length;
    //viewmodel.SelectedItem = ko.observable("");
    //if (viewmodel.Count == undefined)
    //    viewmodel.Count = 0;
    //viewmodel.TagsToAdd = ko.observable("Vinod");
    //viewmodel.AddItem = function () {
    //    viewmodel.list.push({name: viewmodel.TagsToAdd(), Id: viewmodel.list().length + 1 });
    //}
    //viewmodel.DeleteItem = function () {
    //    viewmodel.list.pop();
    //    viewmodel.SelectTag = function () {
    //        console.log("Inside Select tag");
    //        viewmodel.SelectedItem(this);
    //    }
    //}
    ////var x = document.getElementById("tagDialog");    
    //$(document).on("click", "#samplePopup", function () {
    //    $("#tagDialog").dialog(
    //    {
    //        buttons: {
    //            Save: function () { $(this).dialog("close"); },
    //            Cancel: function () { $(this).dialog("close"); }
    //        }
    //    }
    //);
    //});

    
        ko.components.register('message-editor', {
            viewModel: function(params) {
                this.text = ko.observable(params && params.initialText || '');
            },
            template: 'Message: <input data-bind="value: text" /> '
                    + '(length: <span data-bind="text: text().length"></span>)'
        });
        var viewmodel = {            
            arrdata: ko.observableArray(data)
        }
        viewmodel.ShowDialog=function (curritem)
        {
            alert(curritem.Id);
        }
    ko.applyBindings(viewmodel);
}
        )