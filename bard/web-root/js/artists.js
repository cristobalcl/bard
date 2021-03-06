var artistsOffset = 0;
var page_size = 500;

function artistImage( result )
{
    if (result.has_image)
        return "/api/v1/artist/image?id=" + result.id

    switch (result.artist_type) {
        case 1:
        case 4:
            switch (result.gender) {
                case 1:
                    return "/static/images/artist-male.png";
                case 2:
                    return "/static/images/artist-female.png";
                default:
                    return "/static/images/artist-unknown.png";
            }
            break;
        case 2:
            return "/static/images/artist-group.png"
        case 3:
            return "/static/images/artist-unknown.png"
        case 5:
            return "/static/images/artist-orchestra.png"
        case 6:
            return "/static/images/artist-choir.png"
        default:
            return "/static/images/artist-unknown.png";
    }
}

function artistsReceived( result )
{
    r="";
    for (i=0 ; i< result.length; i++)
    {
        r+="<li><a onclick=\"openArtist('" + result[i].id + "')\"><img src=\"" + artistImage(result[i]) + "\"><p class=\"name\">" + result[i].locale_name + "</p></a></li>";
    };
    $( "#artistsList" ).append( r );
    artistsOffset += result.length;
}

function requestArtists(offset, count)
{
    $.ajax({
        url: "/api/v1/artists/list",
        data: {
            offset: offset,
            page_size: count},
        success: artistsReceived,
        error: function( jqXHR, textStatus, errorThrown) {
            alert(textStatus + "\n" + errorThrown);
        }
    });
}

function fillArtists()
{
    requestArtists(artistsOffset, page_size);
    $('#artistsContent').on('scroll', function() {
        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            requestArtists(artistsOffset, page_size);
        }
    });
}

function fillIndex()
{
    alphabet="0ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    r="";
    for (i=0; i< alphabet.length; i++)
    {
        r+="<li><a onclick=\"goToLetter('" + alphabet[i] + "')\">" + alphabet[i] + "</li>";
    }
    $( "#alphabetIndex" ).append(r);
}

function letterOffsetReceived( result )
{
    console.log(result.offset);
    $("#artistsList").empty();
    artistsOffset = result.offset;
    requestArtists(result.offset, page_size);
}

function goToLetter(letter, push_to_history=true)
{
    if (push_to_history)
        window.history.pushState({page: 'openComponent', component: 'artists', data: {letter: letter}}, "", "/");

    $.ajax({
        url: "/api/v1/artists/letterOffset",
        data: {
            letter: letter},
        success: letterOffsetReceived,
        error: function( jqXHR, textStatus, errorThrown) {
            alert(textStatus + "\n" + errorThrown);
        }
    });

}
