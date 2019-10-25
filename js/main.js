$(function(){

    var _w = $(window);
    var _header = $('#header');
    var _from = $('#from');
    var _to = $('#to');

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

    var dpFrom = _from.datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: 0
    });
    dpFrom.datepicker('setDate', new Date());

    var dpTo = _to.datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: 0,
        onSelect: function(){
            dpTo.datepicker('option', 'minDate', dpFrom.datepicker('getDate'));
        }
    });
    dpTo.datepicker('setDate', 4);

    function search(from, to){
        var url = 'https://javascript-basic.appspot.com/searchLocation';

        $.getJSON(url,{
            from: from,
            to: to
        }, function(r){
            //console.log(r, from, to)
            var $list = $('#list-panel');

            for( var i = 0; i < r.length; i++ ){
                var data = r[i];
                var $item = createListItem(data);
                //console.log( $item )
                $list.append($item)
            }

            $('#list-bg').show();
        });
    }

    $('#form-search').submit(function(e){
        e.preventDefault(); // ajax로 페이지 이동없이 폼을 전송해야하므로 기본동작 방지

        var from = _from.val();
        var to = _to.val();

        search(from, to);
    });

    function createListItem(data){
        var $tmpl = $('#list-item-template').clone().removeAttr('id');

        $tmpl.find('.list-item-image').attr('src', data.titleImageUrl);
        $tmpl.find('.list-item-name').html(data.name);
        $tmpl.find('.list-item-city-name').html(data.cityName);

        $tmpl.click(function(e){
            var url = 'detail.html?id=' + data.id;
            window.location = url;
        });

        return $tmpl;
    }



});