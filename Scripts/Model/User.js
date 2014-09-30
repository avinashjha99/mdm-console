/// <reference path="../knockout-3.2.0.js" />
function User() {
    this.id = ko.observable("");
    this.emailId = ko.observable("");
    this.password = ko.observable("");    
    this.accounttype = ko.observable("");
    this.firstName = ko.observable("");
    this.lastName = ko.observable("");
    //this.fullName = ko.pureComputed(function () {
    //    return this.firstName() + " " + this.lastName();
    //}, this);
}