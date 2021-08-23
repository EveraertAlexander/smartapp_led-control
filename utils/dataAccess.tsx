export const handleData = (
  url: string,
  callbackFunctionName: Function,
  callbackErrorFunctionName?: Function,
  method: string = "GET",
  body: any = null
) => {
  console.info(`>> Attempting to fetch data from ${url}`);

  const controller = new AbortController();

  // 5 second timeout:
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  fetch(url, {
    method: method,
    body: body,
    signal: controller.signal
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

export const APIError = (error: any) => {
  console.log(error);
};
