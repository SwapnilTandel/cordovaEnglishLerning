$(document).on('pageinit', '#home', function(){
  var url = 'https://api.themoviedb.org/3/',
     mode = 'search/movie?',
     movieName = '&query=Batman',
     key = 'api_key=15e0b039102ad3deb32fd12cbe96d0f1'
     language = '&language=en-US';

    $.ajax({
        url: url + mode + key + movieName ,
        dataType: "jsonp",
        async: true,
        success: function (result) {
            //debugger;
            console.log(JSON.stringify(result));
            data=JSON.parse(data);
            ajax.parseJSONP(data);
        },
        error: function (request,error) {
            alert('Network error has occurred please try again!');
        }
    });
});

$(document).on('pagebeforeshow', '#headline', function(){
    $('#movie-data').empty();
    $.each(movieInfo.result, function(i, row) {
        //debugger;
        if(row.id == movieInfo.id) {
            var video_embeded = 'p38g-cy6MxA';
            var tmp = '<object><param name="movie" value="https://www.youtube.com/v/';
                tmp+=  video_embeded+'&hl=en_US&feature=player_embedded&version=3"></param>';
                tmp+= '<param name="allowFullScreen" value="true"></param><param  name="allowScriptAccess" value="always"></param><embed '
                tmp+= 'src="https://www.youtube.com/v/'+video_embeded+'?suggestedQuality=medium&hl=en_US&feature=player_embedded&version=3'
                tmp+= 'type="application/x-shockwave-flash" allowfullscreen="true"';
                tmp+= 'allowScriptAccess="always"></embed></object>';

            //$('#movie-data').append(tmp);
            var width = window.screen.width * window.devicePixelRatio;
            var url = "https://www.youtube.com/v/p38g-cy6MxA&hl=en_US&feature=player_embedded&version=3";
            $('#movie-data').append('<center><iframe align="center" frameborder="0" allowfullscreen="" src="http://www.youtube.com/embed/' + row.videoid + '"></iframe></center>');

            //$('#movie-data').append('<object width="100%" height="auto" type="application/x-shockwave-flash" value="' + url + '"><param name="movie" value="' + url + '"></param></object>');
            //$('#movie-data').append('<li><iframe width="'+ width +'" height="400" src="http://www.youtube.com/embed/' + row.videoid + '?html5=1" allowfullscreen></iframe></li>');
            //$('#movie-data').append('<iframe width="640" height="360" src="http://www.youtube.com/embed/p38g-cy6MxA?feature=player_embedded" frameborder="0" allowfullscreen></iframe>');
            $('#movie-data').append('<li>'+ row.titlemarathi +'</li>');

            $('#movie-data').append('<li>इंग्रजी शीर्षक: '+row.title+'</li>');
            $('#movie-data').append('<li>दृश्य: '+row.views+'</li>');
            $('#movie-data').append('<li>सारखे: '+row.likes+'</li>');
            $('#movie-data').append('<li>तिरस्कार करणे: '+row.dislike+'</li>');
            $('#movie-data').listview('refresh');
        }
    });
});

$(document).on('vclick', '#movie-list li a', function(){
    movieInfo.id = $(this).attr('data-id');
    $.mobile.changePage( "#headline", { transition: "slide", changeHash: false });
});

var movieInfo = {
    id : null,
    result : null
}

var ajax = {
    parseJSONP:function(result){
        //debugger;
        movieInfo.result = result.results;

        for(var i = 0; i < movieInfo.result.length; ++i)
            {
                $('#movie-list').append('<li><a href="" data-id="' + 
                    movieInfo.result[i].id + '"><img src="https://img.youtube.com/vi/' + movieInfo.result[i].videoid + '/0.jpg' + '"/><h3>' + 
                    movieInfo.result[i].titlemarathi + '</h3><p>' + 
                    movieInfo.result[i].title + '</p></a></li>');
            }
            /*
        $.each(result.results, function(i, row) {
            //console.log(JSON.stringify(row));
            $('#movie-list').append('<li><a href="" data-id="' + 
                                        row.id + '"><img src="https://img.youtube.com/vi/' + row.videoid + '/0.jpg' + '"/><h3>' + 
                                        row.title + '</h3><p>' + 
                                        row.views + '</p></a></li>');
        });
        */
        $('#movie-list').listview('refresh');
    }
}
