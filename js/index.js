// CONSTANTS
const CLUB_CARD_CONTAINER = $("#club-cards");

// Global Variables
let CLUB_LIST = [];
let CLUB_LIST_ALPH = []; // alphabetical copy of club_list
let RAW_SEARCH_DATA = {}; // json file containing search info

// Local Variables
let _filteredClubList = [];
let _displayedClubs = [];
let _filterSettings = {};

// Sets all the filters back to default values
const resetFilters = () => {
    $(".filter-checkbox").each(function () {
        $(this).prop("checked", true);
    });

    $("#filter-dropdown").text("Random");

    updateFilterSettings();
    sortClubList("Random");

    _filteredClubList = CLUB_LIST;
}

// Syncs '_currentSettings' object with filters
const updateFilterSettings = () => {
    _filterSettings = {    
        "days" : {
            mon: $("#mon-cb").prop("checked"),
            tues: $("#tues-cb").prop("checked"),
            wed: $("#wed-cb").prop("checked"),
            thur: $("#thur-cb").prop("checked"),
            fri: $("#fri-cb").prop("checked"),
            dayOther: $("#day-other-cb").prop("checked")
        },
    
        "types" : {
            academic: $("#aca-cb").prop("checked"),
            human: $("#hum-cb").prop("checked"),
            social: $("#soc-cb").prop("checked"),
            clubTypeOther: $("#type-other-cb").prop("checked")
        },
    
        "times" : {
            lunch: $("#lunch-cb").prop("checked"),
            afterSchool: $("#after-school-cb").prop("checked"),
            meetingTimeOther: $("#time-other-cb").prop("checked")
        }
    }
}

// querys through filtered lists for search keyword and displays results
const queryAndSearch = () => {
    const searchValue = $("#search-box").prop("value");

    const filteredClubs = [];
    for (club of _filteredClubList) {
        if (!failsSearch(club, searchValue)) {
            filteredClubs.push(club);
        }
    }

    if(_displayedClubs.toString() != filteredClubs.toString()) {
        listClubs(filteredClubs);
    }
}

// returns true if query isn't a substring of club
const failsSearch = (club, query = "") => {
    club = club.toLowerCase();
    query = query.toLowerCase();
    return !(club).includes(query);
}

// filters through CLUB_LIST and sets _filteredClubList as result
const filterClubList = () => {
    if(!CLUB_LIST) return;
    
    const result = [];

    for (let club of CLUB_LIST) {
        const clubData = RAW_SEARCH_DATA[club];

        // filter through club days
        let passesDaysFilter = false;
        for (let day in _filterSettings.days) {
            if(_filterSettings.days[day] && clubData[day]) {
                passesDaysFilter = true;
                break;
            }
        }

        if(!passesDaysFilter) {
            continue;
        }

        // filter through club type
        let passesTypeFilter = false;
        for (let type in _filterSettings.types) {
            if(_filterSettings.types[type] && clubData[type]) {
                passesTypeFilter = true;
                break;
            }
        }

        if(!passesTypeFilter) {
            continue;
        }


        // filter through club times
        let passesTimesFilter = false;
        for (let time in _filterSettings.times) {
            if(_filterSettings.times[time] && clubData[time]) {
                passesTimesFilter = true;
                break;
            }
        }

        if(!passesTimesFilter) {
            continue;
        }
        
        result.push(club);
    }

    _filteredClubList = result;
}

// given list of clubs, displays their cards on screen
const listClubs = (clubs) => {
    CLUB_CARD_CONTAINER.empty();

    for (club of clubs) {
        CLUB_CARD_CONTAINER.append(newCard(club));
    }

    _displayedClubs = clubs;

    // fade in animation
    $(".club-card").each(function() {
        $(this).fadeIn().removeClass("hidden");
    });
}

// creates and returns a new card
const newCard = (club) => {
    const clubData = RAW_SEARCH_DATA[club];
    const card = document.createElement("div");

    card.classList.add("col-lg-4", "col-md-6", "club-card","hidden");

    // add thumbnail
    card.innerHTML = 
    `<div class="card-hover">
        <a href="./club.html?q=${clubData.link}" class="no-url-effects">
            <div class="card mb-4 box-shadow-light">
                <div class="thumbnail-placeholder-outer">
                    <div class="thumbnail-placeholder"></div>
                </div>
                <div class="card-body">
                    <h4 class="club-title title-crop">${club}</h4>
                    <p class="club-text text-muted text-crop"> ${clubData.desc}</p>
                </div>
            </div>
        </a>
    </div>`;

    const imgDiv = card.getElementsByClassName("thumbnail-placeholder")[0];

    $(imgDiv).css("background-image", `url(${clubData.thumbnail})`);

    return card;
}

// Sets CLUB_LIST to targeted mode
const sortClubList = (mode) => {
    if(mode == "Alphabetical") {
        CLUB_LIST = CLUB_LIST_ALPH;
    } else {
        CLUB_LIST = randomizedList(CLUB_LIST_ALPH);
    }

    filterClubList();
    queryAndSearch();
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
jQuery.getJSON(`./data/club-cards.json?noCache=${Math.random()}`, data => {
    RAW_SEARCH_DATA = data;
    CLUB_LIST_ALPH = Object.keys(data);

    CLUB_LIST = randomizedList(CLUB_LIST_ALPH);
    _filteredClubList = CLUB_LIST;
    listClubs(CLUB_LIST);
})
// If file doesn't exist, throw error.
.fail( () => {
    $(".title-heading").html("Sorry, the website isn't working. <br> Please come back later.");
});

// EVENTS

$("#search-box").keyup(e => {
    queryAndSearch();
});

$(".dropdown-item").click(function() {
    const sortMode = $(this).text();
    $("#filter-dropdown").text(sortMode);
    sortClubList(sortMode);
});

$("#reset-filter-btn").click(function() {
    resetFilters();
    updateFilterSettings();
    queryAndSearch();
});

$(".filter-checkbox").click(function() {
    updateFilterSettings();
    filterClubList();
    queryAndSearch();
});

$(".curious-btn").click(function() {
    if (CLUB_LIST.length === 0) return; 
    const randClubLink = RAW_SEARCH_DATA[randChoice(CLUB_LIST)].link;
    window.location.href = `./club.html?q=${randClubLink}`;
});

$(document).ready(() => {
    resetFilters();
});