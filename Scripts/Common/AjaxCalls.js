function AjaxCalls(webserviceurl, requestType, SuccessFunction, DisplayError, data,header) {
    this.Ajax = function () {        
        $.ajax(
                  {                      
                      url: webserviceurl,                      
                      crossdomain : true,
                      type: requestType,
                      datatype: 'json',
                      data: data,
                      contentType: "application/json",
                      success: function (data) {
                          SuccessFunction(data);

                      },
                      error: function (xhr, status, error) {
                          DisplayError(status, error);
                      }
                  });
    }
}