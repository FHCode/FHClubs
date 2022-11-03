// returns a hash of HTTP parameters & values
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

// gets the parameter value related to club name
const CLUB = HTTP_PARAMS_HASH.q;

// returns html for new carousel image
const generateCarouselItem = (imgSrc) => {
  return `<div class="carousel-item">
    <img class="d-block w-100 carousel-image" src="${imgSrc}" width="100%" height="100%">
  </div>`;
}

// given an array of image urls, returns returns html for carousel filled with images
const generateCarousel = (imgArr) => {
  let result = "";
  for(let img of imgArr) {
    result += generateCarouselItem(img);
  }
  // makes first item active
  const firstItemIndex = result.search("carousel-item");
  if(firstItemIndex != -1) {
    result = result.slice(0, firstItemIndex) + "active " + result.slice(firstItemIndex);
  }
  return result;
}

// returns html for carousel indicator buttons
const generateCarouselIndicators = (imgArr) => {
  let result = "";
  if(imgArr.length <= 1) return result;

  for(let i in imgArr) {
    result += `<button type="button" data-bs-target="#club-carousel" data-bs-slide-to="${i}" aria-label="Slide ${i}"></button>`
  }
  const firstItemIndex = result.search("aria-label");
  if(firstItemIndex != -1) {
    result = result.slice(0, firstItemIndex) + `class="active" aria-current="true" `+ result.slice(firstItemIndex);
  }
  return result;
}

// binds the socials buttons to urls IF they exist
const loadSocials = (data) => {
  if(data.socials.instagram) {
    $("#insta-icon").wrap(`<a href="${data.socials.instagram}" target="_blank">`).addClass("has-link");
  }

  if(data.socials.teams) {
    $("#teams-icon").wrap(`<a href="${data.socials.teams}" target="_blank">`).addClass("has-link");
  }

  if(data.socials.discord) {
    $("#discord-icon").wrap(`<a href="${data.socials.discord}" target="_blank">`).addClass("has-link");
  }
}

// replaces elements on page with club info
const loadClubInfo = (data) => {
  $("#club-title").text(data.title);
  $("title").text(data.title);
  $("#room-num").text(data.room);
  $("#teachers-name").text(data.teacher);
  $("#schedule-desc").text(data.schedule);
  $("#club-imgs-container").html(generateCarousel(data.carousel))
  $("#car-indicator-cont").html(generateCarouselIndicators(data.carousel));
  $("#purpose-para").text(data.purpose);
  $("#typical-para").text(data.typicalWeek);
  $("#purpose-img").html(`<img src="${data.purposeImg}" class="img-fluid rounded" alt="-">`);
  $("#meeting-img").html(`<img src="${data.meetingImg}" class="img-fluid rounded" alt="-">`);

  if(data.carousel.length > 1) {
    $(".carousel-control-prev").removeClass("visually-hidden");
    $(".carousel-control-next").removeClass("visually-hidden");
  }
  loadSocials(data);
}


$(document).ready(function() {
  $.ajaxSetup({ cache: false });

  // If club data file exists, load club
  jQuery.getJSON(`./data/clubs/${CLUB}/info.json`, data => {
    loadClubInfo(data);
  })
  .fail( () => { // otherwise, give error
    $("#club-title").text("Sorry, this club doesn't exist!");
  });

});
