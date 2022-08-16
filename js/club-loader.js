// returns a dictionary of HTTP parameters & values
const getHttpParams = () => {
  let result = {};
  
  let href = window.location.href;
  
  if(href.slice(-1) == "#") {
    href = href.slice(0, -1);
  }

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

const newCarouselItem = (imgSrc) => {
  return `<div class="carousel-item">
    <img class="d-block w-100 carousel-image" src="${imgSrc}" width="100%" height="100%">
  </div>`;
}

const generateCarousel = (imgArr) => {
  let result = "";
  for(let img of imgArr) {
    result += newCarouselItem(img);
  }
  // makes first item active
  const firstItemIndex = result.search("carousel-item");
  if(firstItemIndex != -1) {
    result = result.slice(0, firstItemIndex) + "active " + result.slice(firstItemIndex);
  }
  return result;
}

const generateCarouselBtns = (imgArr) => {
  let result = "";
  for(let i in imgArr) {
    result += `<button type="button" data-bs-target="#club-carousel" data-bs-slide-to="${i}" aria-label="Slide ${i}"></button>`
  }
  const firstItemIndex = result.search("aria-label");
  if(firstItemIndex != -1) {
    result = result.slice(0, firstItemIndex) + `class="active" aria-current="true" `+ result.slice(firstItemIndex);
  }
  return result;
}

const insertClubInfo = (data) => {
  $("#club-title").text(data.title);
  $("#room-num").text(data.room);
  $("#teachers-name").text(data.teacher);
  $("#schedule-desc").text(data.schedule);
  $("#club-imgs-container").html(generateCarousel(data.carousel))
  $("#car-indicator-cont").html(generateCarouselBtns(data.carousel));
  $("#purpose-para").text(data.purpose);
  $("#typical-para").text(data.typicalWeek);
}

// Get Data Json File
jQuery.getJSON(`./data/clubs/${CLUB}/info.json`, data => {
  console.log(data);
  insertClubInfo(data);
})
.fail( () => {
  console.log("club doesnt exist!");
});
