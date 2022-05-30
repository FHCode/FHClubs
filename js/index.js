// returns a dictionary of HTTP parameters & values
const getHttpParam = () => {
    const siteUrl = window.location.href;
    const paramStartPos = siteUrl.indexOf("?");
    let result = {};
    
    if (paramStartPos == -1) return result;
    
    const paramString = siteUrl.slice( paramStartPos + 1 );
    const paramArr = paramString.split("&");
    
    for (const parameter of paramArr) {
      const sepPos = parameter.indexOf("=");
      if(sepPos != -1) {
        const keyStr = parameter.slice(0,sepPos);
        const valueStr = parameter.slice(sepPos + 1);
        
        result[keyStr] = valueStr;
      }
    }
  
    return result;
  }
  
// Get Json
jQuery.getJSON("./info.json", data => {
    console.log(data);
});


// get Text file
jQuery.get("./club-data/club-list.txt", data => {
    const clubList = data.split("\r\n");
    console.log(clubList);
});


pathExists("./club-data/coding", (result) => {
    console.log("res: " + result);
});
