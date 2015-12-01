(function(GB){

    var luftrausers = GB.getGameData('3030-39474')
        .done( function(data) {
            var data = data.results;
            $('#game-title').html(data.description);
        });

})(GiantBomb);
