
$(window).mousemove(function (e) {
    setTimeout(callParallax.bind(null, e), 0);
});

function callParallax(e) {
    if(parallax){
        parallaxIt(e, '.para-speed-1', -100);
        parallaxIt(e, '.para-speed-2', -200);
        parallaxIt(e, '.para-speed-3', -300);
        parallaxIt(e, '.para-speed-4', -400);
        parallaxIt(e, '.para-speed-5', -500);
        parallaxIt(e, '.para-speed-6', -600);
        parallaxIt(e, '.para-speed-7', -700);
        parallaxIt(e, '.para-speed-8', -800);
        parallaxIt(e, '.para-speed-9', -900);
        parallaxIt(e, '.para-speed-10', -1000);
    }
}

function parallaxIt(e, target, movement) {
    var $this = $('.parallax-container');
    var relX = e.pageX - $this.offset().left;
    var relY = e.pageY - $this.offset().top;

    TweenMax.to(target, 1, {
        x: (relX - $this.width() / 2) / $this.width() * movement,
        y: (relY - $this.height() / 2) / $this.height() * movement,
        ease: Power2.easeOut
    })
}