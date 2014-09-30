function CommonFunctions() {
    this.are_cookies_enabled = function () {
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;
        if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
            document.cookie = "testcookie";
            cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
        }
        return (cookieEnabled);
    }

    this.navigate = function (navigatePage) {
        if (navigatePage == this.pages.Login) {
            window.location.href = "Login.html";
        }
        else if (navigatePage == this.pages.Main) {
            window.location.href = "Welcome.html";
        }
    }
    
    this.pages = {
        Login: 0,
        Main: 1,
    }
    this.CommandTypeConstants = {
        UNINSTALL_APP_CONTROL: 1000,
        INSTALL_APP_CONTROL: 1001,
        LOCK_PHONE_CONTROL: 1002,
        WIPE_PHONE_CONTROL:1003
    }
    this.webServiceUrl = "/mdm";
}
