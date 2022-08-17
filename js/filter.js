let fullClubListAlphabetical = [];
let fullClubList = [];
let displayedClubs = [];
let currentSettings;
let fullClubData = {};

const resetFilters = () => {
    $(".filter-checkbox").each(function () {
        $(this).prop("checked", true);
    });

    $("#filter-dropdown").text("Random");

    updateFilterSettings();
    
    sortCards("Random");
}

// ? Could be optimized by optional param, which would tell function which property has been changed.
const updateFilterSettings = () => {
    currentSettings = {    
        // Day
        mon: $("#mon-cb").prop("checked"),
        tues: $("#tues-cb").prop("checked"),
        wed: $("#wed-cb").prop("checked"),
        thur: $("#thur-cb").prop("checked"),
        fri: $("#fri-cb").prop("checked"),
        dayOther: $("#day-other-cb").prop("checked"),
    
        // Club Type
        academic: $("#aca-cb").prop("checked"),
        human: $("#hum-cb").prop("checked"),
        social: $("#soc-cb").prop("checked"),
        clubTypeOther: $("#type-other-cb").prop("checked"),
    
        // Meeting Time:
        lunch: $("#lunch-cb").prop("checked"),
        afterSchool: $("#after-school-cb").prop("checked"),
        meetingTimeOterh: $("#time-other-cb").prop("checked")
    }
}

$(document).ready(() => {
    resetFilters();
});

$(".dropdown-item").click(function() {
    const sortMode = $(this).text();
    $("#filter-dropdown").text(sortMode);
    
    sortCards(sortMode);
});

$("#reset-filter-btn").click(function() {
    resetFilters();
    updateFilterSettings();
});

$(".filter-checkbox").click(function() {
    updateFilterSettings();
});

// Get file containing club data
jQuery.getJSON(`./data/club-to-link.json`, data => {
    fullClubData = data;
    fullClubListAlphabetical = Object.keys(data);
    fullClubList = randomizedList(fullClubListAlphabetical);
    listClubs(fullClubList);
})
.fail( () => { // If file doesn't exist, throw error.
    $(".title-heading").html("Sorry, the website isn't working. <br> Please come back later.");
});



$("#search-box").keyup(e => {
    filterSearch();
});

const filterSearch = () => {
    const searchValue = $("#search-box").prop("value");

    const filteredClubs = [];

    for (club of fullClubList) {
        if (!failsFilter(club, searchValue)) {
            filteredClubs.push(club);
        }
    }
    if(displayedClubs.toString() != filteredClubs.toString()) {
        listClubs(filteredClubs);
    }
    
}

const failsFilter = (club, query = "") => {
    club = club.toLowerCase();
    query = query.toLowerCase();
    return !(club).includes(query);
}

const listClubs = (clubs) => {
    const clubDiv = $("#club-cards");
    clubDiv.empty();

    for (club of clubs) {
        const card = document.createElement("div");
        card.classList.add("col-lg-4", "col-md-6", "club-card","hidden");
        fillCard(card, club);
        clubDiv.append(card);
    }

    displayedClubs = clubs;

    $(".club-card").each(function() {
        $(this).fadeIn().removeClass("hidden");
    });
}

const fillCard = (
    card, 
    club
) => {
    const clubData = fullClubData[club];
    src = "./data/clubs/template/img/thumbnail0.png";

    card.innerHTML = 
    `<div class="card-hover">
        <a href="./club.html?q=${clubData.link}" class="no-url-effects">
            <div class="card mb-4 box-shadow-light">
                <!-- <div class="card-img"></div> -->
                    <img class="card-img" src="${src}" alt="-"> <div class="card-body">
                    <h4 class="club-title title-crop">${club}</h4>
                    <p class="club-text text-muted text-crop"> ${clubData.desc}</p>
                </div>
            </div>
        </a>
    </div>`;
}

const sortCards = (mode) => {
    if(mode == "Alphabetical") {
        fullClubList = fullClubListAlphabetical;
    } else {
        fullClubList = randomizedList(fullClubListAlphabetical);
    }
    filterSearch();
}

// Returns a randomized version of a list
const randomizedList = list => {
    list = list.slice(); 
    // copies list

    for (let i = 0; i < list.length; i++) {
        let j = Math.floor(Math.random() * list.length);
        let temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }

    return list;
}