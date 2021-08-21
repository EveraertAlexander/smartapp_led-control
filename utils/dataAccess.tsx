export const handleData = (
    url: string,
    callbackFunctionName: Function,
    callbackErrorFunctionName?: Function,
    method: string = "GET",
    body: any = null
  ) => {
    console.info(`>> Attempting to fetch data from ${url}`);
  
    var headers: Headers = new Headers({
      "content-type": "application/json",
    });
  
    if (process.env.ENV) 
      headers.set("x-api-key", process.env.ENV);
  
      fetch(url, {
        method: method,
        body: body,
        headers: headers,
      })
        .then(function (response) {
          if (!response.ok) {
            console.warn(`>> Problem in fetch() Statuscode: ${response.status}`);
            if (callbackErrorFunctionName) {
              console.warn(
                `>> Callback error function ${callbackErrorFunctionName.name}(response) being called`
              );
              callbackErrorFunctionName(response);
            } else {
              console.warn(">> There is no callback error function");
            }
          } else {
            console.info(">> Got response from server");
            return response.json();
          }
        })
        .then(function (jsonObject) {
          if (jsonObject) {
            console.info(">> JSONobject created");
            console.info(
              `>> Callbackfunction ${callbackFunctionName.name}(response) being called`
            );
            callbackFunctionName(jsonObject);
          }
        })
        .catch(function (error) {
          console.warn(`>>Error while processing JSON: ${error}`);
          if (callbackErrorFunctionName) {
            callbackErrorFunctionName(undefined);
          }
        });
  };
  