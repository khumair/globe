AOS.init({
    offset: 0,
    duration: 1000,
    anchorPlacement: 'top-bottom',
});
var typed = new Typed('#typed', {
    stringsElement: '#typed-strings',
    typeSpeed: 70,

});
var typed = new Typed('#typeda', {
    stringsElement: '#typeda-strings',
    typeSpeed: 70,
    loop: true
});
let image = document.querySelector(".laptop");
let images = ['images/screen1lap.png', 'images/screen2lap.png'];
var count = 0;
setInterval(function() {
    if (count == 2) {
        count = 0
    }
    // image.src=images[count]
    if (count == 0) {
        // image.setAttribute("class","img-fluid innerOne animate__animated animate__zoomInUp")
        document.getElementById("innerTwo").style.display = "none"
        document.getElementById("innerFour").style.display = "none"
        document.getElementById("innerOne").style.display = "block"
        document.getElementById("innerThree").style.display = "block"
    } else {
        // image.setAttribute("class","img-fluid innerTwo animate__animated animate__slideInUp")
        document.getElementById("innerTwo").style.display = "block"
        document.getElementById("innerFour").style.display = "block"
        document.getElementById("innerOne").style.display = "none"
        document.getElementById("innerThree").style.display = "none"
    }
    count++
}, 2000)