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

function pathExists(url, callback){
  jQuery.ajax({
    type: 'HEAD',
    url: url,
    success: () => callback(true),
    error: () => callback(false)
  });
}

// Get Json
jQuery.getJSON("./info.json", data => {
    console.log(data);
});

// get club list
jQuery.get("./data/club-list", data => {
    const clubList = data.split("\r\n");
    console.log(clubList);
});

pathExists("./data/clubs/coding", (result) => {
    console.log("res: " + result);
});
