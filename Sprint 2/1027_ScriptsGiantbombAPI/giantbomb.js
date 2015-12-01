var GiantBomb = {

    // properties
    api: 'e86cb04e348e93cdc104424662c3e3a032306b8f',
    url: 'http://giantbomb.com/api/game/',


    // methods of functions
    getGameData : function(id) {

        var start = this.url + id + '?api_key=' + this.api + '&format=jsonp&json_callback=?';

        return $.ajax({
            url : start,
            dataType: 'json',
            beforeSend: function() {
                $('body').html('loading.......');
            }
        });
    }

}