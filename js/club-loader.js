// returns a dictionary of HTTP parameters & values
const getHttpParams = () => {
  let result = {};
  
  const href = window.location.href;
  const paramStartIndex = href.indexOf("?");
  
  if (paramStartIndex == -1) return result;
  
  const httpParamsStr = href.slice( paramStartIndex + 1 );
  const httpParamsArr = httpParamsStr.split("&");
  
  for (const parameter of httpParamsArr) {
    const sepPos = parameter.indexOf("=");
    if(sepPos != -1) {
      const keyStr = parameter.slice(0, sepPos);
      const valueStr = parameter.slice(sepPos + 1);
      
      result[keyStr] = valueStr;
    }
  }

  return result;
}

const HTTP_PARAMS_HASH = getHttpParams();

const CLUB = HTTP_PARAMS_HASH.q;

// Get Data Json File
jQuery.getJSON(`./data/clubs/${CLUB}/info.json`, data => {
    console.log(data);
})
.fail( _ => {
  console.log("club doesnt exist!");
});

// // Checks if a folder exists
pathExists(`./data/clubs/${CLUB}`, (result) => {
    console.log("res: " + result);
});


$("#purpose-para") 