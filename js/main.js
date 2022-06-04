function pathExists(url, callback){
    jQuery.ajax({
        type: 'HEAD',
        url: url,
        success: () => callback(true),
        error: () => callback(false)
    });
}

pathExists("./partials", bool = () => {
    if(bool == true) {
        $("#header-container").load("/partials/header.html");
        $("#footer-container").load("/partials/footer.html");
    } else {
        $("#header-container").load("/FHClubs/partials/header.html");
        $("#footer-container").load("/FHClubs/partials/footer.html");        
    }
});
