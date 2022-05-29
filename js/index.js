$(window).resize(function () { 
    $(".card-img").each(makeRatio16By9);
    $(".card-img-bg").each(function () {
        console.log(this.width);
    });
});

$(document).ready(function () {
    $(".card-img").each(makeRatio16By9);
})

// Scales element's height to maintain a 16:9 ratio
function makeRatio16By9() { 
    $(this).css("height", 9/16 * this.width);
}
