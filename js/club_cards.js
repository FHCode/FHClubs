$(window).resize(function () { 
    $(".card-img").each(makeRatio16By9);
});

$(document).ready(function () {
    $(".card-img").each(makeRatio16By9);
})

// Scales element's height to maintain a 16:9 ratio
function makeRatio16By9() { 
    $(this).css("height", 9/16 * this.width);
}

$(".curious-btn").click(function() {
    // window.location.href = "";
    // todo go to random club
});