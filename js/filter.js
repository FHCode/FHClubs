const orginalSettings = {
    // Sort by
    sort: "Random",

    // Day
    mon: true,
    tues: true,
    wed: true,
    thur: true,
    fri: true,
    dayOther: true,

    // Club Type
    academic: true,
    human: true,
    social: true,
    clubTypeOther: true,

    // Meeting Time:
    lunch: true,
    afterSchool: true,
    meetingTimeOther: true
}

let currentSettings = orginalSettings;

const resetFilters = () => {
    $(".filter-checkbox").each(function () {
        $(this).prop("checked", true);
    });

    $("#filter-dropdown").text("Random");
}

const updateFilterSettings = () => {
    currentSettings = {
        // Sort by
        sort: $("#filter-dropdown").text(),
    
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

$(".dropdown-item").click(function() {
    $("#filter-dropdown").text($(this).text());
    updateFilterSettings();
});

$("#reset-filter-btn").click(function() {
    resetFilters();
    updateFilterSettings();
});

$(".filter-checkbox").click(function() {
    console.log($(this).prop("checked"));
    updateFilterSettings();
});

resetFilters();