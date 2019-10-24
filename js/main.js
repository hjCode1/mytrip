$(function(){

    var _w = $(window);
    var _header = $('#header');

    _w.scroll(function(){
        Header.move();
    });

    var Header = {
        move: function(){
            var top = _w.scrollTop();
            //console.log(top)
            (top > 0) ? _header.addClass('inverted') : _header.removeClass('inverted');
        }
    }

    _w.trigger('scroll');

});