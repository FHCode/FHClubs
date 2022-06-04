// returns a dictionary of HTTP parameters & values

const getHttpParam = () => {
  const siteUrl = window.location.href;
  const paramStartPos = siteUrl.indexOf("?");
  let result = {};
  
  if (paramStartPos == -1) return result;
  
  const paramStr = siteUrl.slice( paramStartPos + 1 );
  const paramArr = paramStr.split("&");
  
  for (const parameter of paramArr) {
    const sepPos = parameter.indexOf("=");
    if(sepPos != -1) {
      const keyStr = parameter.slice(0, sepPos);
      const valueStr = parameter.slice(sepPos + 1);
      
      result[keyStr] = valueStr;
    }
  }

  return result;
}

const httpParams = getHttpParam();

$(document).ready(() => {
  console.log(httpParams);
});

// // Get Json
// jQuery.getJSON("./info.json", data => {
//     console.log(data);
// });

// // Checks if a folder exists
// pathExists("./data/clubs/coding", (result) => {
//     console.log("res: " + result);
// });
