// Global Variables
let CLUB_LIST_ALPH = [];
let CLUB_LIST = [];
let RAW_SEARCH_DATA = {};

// Local Variables
let _filteredClubList = [];
let _displayedClubs = [];
let _currentSettings = {};

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
    _currentSettings = {    
        // Day
        "days" : {
            mon: $("#mon-cb").prop("checked"),
            tues: $("#tues-cb").prop("checked"),
            wed: $("#wed-cb").prop("checked"),
            thur: $("#thur-cb").prop("checked"),
            fri: $("#fri-cb").prop("checked"),
            dayOther: $("#day-other-cb").prop("checked")
        },
    
        // Club Type
        "types" : {
            academic: $("#aca-cb").prop("checked"),
            human: $("#hum-cb").prop("checked"),
            social: $("#soc-cb").prop("checked"),
            clubTypeOther: $("#type-other-cb").prop("checked")
        },
    
        // Meeting Time:
        "times" : {
            lunch: $("#lunch-cb").prop("checked"),
            afterSchool: $("#after-school-cb").prop("checked"),
            meetingTimeOther: $("#time-other-cb").prop("checked")
        }
    }

    console.log(_currentSettings);
}

const SearchFilteredList = () => {
    const searchValue = $("#search-box").prop("value");

    const filteredClubs = [];
    for (club of _filteredClubList) {
        if (!failsSearch(club, searchValue)) {
            filteredClubs.push(club);
        }
    }
    
    listClubs(filteredClubs);
}

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
        for (let day in _currentSettings.days) {
            if(_currentSettings.days[day] && clubData[day]) {
                passesDaysFilter = true;
                break;
            }
        }

        if(!passesDaysFilter) {
            console.log(club + " failed passesDays");
            console.log(clubData);
            continue;
        }

        // filter through club type
        let passesTypeFilter = false;
        for (let type in _currentSettings.types) {
            if(_currentSettings.types[type] && clubData[type]) {
                passesTypeFilter = true;
                break;
            }
        }

        if(!passesTypeFilter) {
            console.log(club + " failed passesTypes");
            continue;
        }


        // filter through club times
        let passesTimesFilter = false;
        for (let time in _currentSettings.times) {
            if(_currentSettings.times[time] && clubData[time]) {
                passesTimesFilter = true;
                break;
            }
        }

        if(!passesTimesFilter) {
            console.log(club + " failed passesTimes");
            continue;
        }
        
        result.push(club);
    }

    _filteredClubList = result;
    console.log(_filteredClubList);
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
    const clubData = RAW_SEARCH_DATA[clubName];

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
        CLUB_LIST = CLUB_LIST_ALPH;
    } else {
        CLUB_LIST = randomizedList(CLUB_LIST_ALPH);
    }

    filterClubList();
    SearchFilteredList();
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
jQuery.getJSON(`./data/club-cards.json`, data => {
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

$("#search-box").keyup(e => {
    SearchFilteredList();
});

$(".dropdown-item").click(function() {
    const sortMode = $(this).text();
    $("#filter-dropdown").text(sortMode);
    
    sortClubList(sortMode);
});

$("#reset-filter-btn").click(function() {
    resetFilters();
    updateFilterSettings();
    SearchFilteredList();
});

$(".filter-checkbox").click(function() {
    updateFilterSettings();
    filterClubList();
    SearchFilteredList();
});

$(".curious-btn").click(function() {
    if (CLUB_LIST.length === 0) return; 
    window.location.href = `./club.html?q=${RAW_SEARCH_DATA[randChoice(CLUB_LIST)].link}`;
});

$(document).ready(() => {
    resetFilters();
});