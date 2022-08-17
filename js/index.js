// Global Variables
let CLUB_LIST_ALPHABETICAL = [];
let CLUB_LIST = [];
let CLUB_DATA = {};

// Local Variables
let _filteredClubList = [];
let _displayedClubs = [];
let _currentSettings;

// Sets all the filters back to default values
const resetFilters = () => {
    $(".filter-checkbox").each(function () {
        $(this).prop("checked", true);
    });

    $("#filter-dropdown").text("Random");

    updateFilterSettings();
    
    sortClubList("Random");
}

// Syncs '_currentSettings' object with filters
const updateFilterSettings = () => {
    _currentSettings = {    
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

const filterSearch = () => {
    const searchValue = $("#search-box").prop("value");

    const filteredClubs = [];

    for (club of CLUB_LIST) {
        if (!failsFilter(club, searchValue)) {
            filteredClubs.push(club);
        }
    }
    if(_displayedClubs.toString() != filteredClubs.toString()) {
        listClubs(filteredClubs);
    }
    
}

const failsFilter = (club, query = "") => {
    club = club.toLowerCase();
    query = query.toLowerCase();
    return !(club).includes(query);
}

const applyFilters = () => {
    const result = []

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

    _displayedClubs = clubs;

    $(".club-card").each(function() {
        $(this).fadeIn().removeClass("hidden");
    });
}

const fillCard = (card, clubName) => {
    const clubData = CLUB_DATA[clubName];

    card.innerHTML = 
    `<div class="card-hover">
        <a href="./club.html?q=${clubData.link}" class="no-url-effects">
            <div class="card mb-4 box-shadow-light">
                <div class="thumbnail-placeholder-outer">
                    <div class="thumbnail-placeholder"></div>
                </div>
                <div class="card-body">
                    <h4 class="club-title title-crop">${clubName}</h4>
                    <p class="club-text text-muted text-crop"> ${clubData.desc}</p>
                </div>
            </div>
        </a>
    </div>`;

    const imgDiv = card.getElementsByClassName("thumbnail-placeholder")[0];

    $(imgDiv).css("background-image", `url(${clubData.thumbnail})`);
}

const sortClubList = (mode) => {
    if(mode == "Alphabetical") {
        CLUB_LIST = CLUB_LIST_ALPHABETICAL;
    } else {
        CLUB_LIST = randomizedList(CLUB_LIST_ALPHABETICAL);
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

// Get file containing club data
jQuery.getJSON(`./data/club-to-link.json`, data => {
    CLUB_DATA = data;
    CLUB_LIST_ALPHABETICAL = Object.keys(data);
    CLUB_LIST = randomizedList(CLUB_LIST_ALPHABETICAL);
    _filteredClubList = CLUB_LIST;
    listClubs(CLUB_LIST);
})
// If file doesn't exist, throw error.
.fail( () => {
    $(".title-heading").html("Sorry, the website isn't working. <br> Please come back later.");
});

$("#search-box").keyup(e => {
    filterSearch();
});

$(".dropdown-item").click(function() {
    const sortMode = $(this).text();
    $("#filter-dropdown").text(sortMode);
    
    sortClubList(sortMode);
});

$("#reset-filter-btn").click(function() {
    resetFilters();
    updateFilterSettings();
});

$(".filter-checkbox").click(function() {
    updateFilterSettings();
});

$(".curious-btn").click(function() {
    if (CLUB_LIST.length === 0) return;
    const randClub = randChoice(CLUB_LIST);
    window.location.href = `./club.html?q=${CLUB_DATA[randClub].link}`;
});

$(document).ready(() => {
    resetFilters();
});