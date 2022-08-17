// when 'feeling curioug' button is clicked
$(".curious-btn").click(function() {
    // window.location.href = "";
    // todo go to random club
});

// Scales element's height to maintain a 16:9 ratio
function resizeCardImg() { 
    $(this).css("height", 9/16 * this.width);
    console.log($(this).css("width"));
}

// resize club cards when window is adjusted
$(window).resize(function () { 
    $(".card-img").each(resizeCardImg);
});
