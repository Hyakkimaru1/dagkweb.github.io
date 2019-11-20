$(function(){ /* to make sure the script runs after page load */
    $('a.read').click(function(event){ /* find all a.read_more elements and bind the following code to them */
        event.preventDefault(); /* prevent the a from changing the url */
        if($(this).attr('class') === 'read'){
            $(this).text("Read less");
            $(this).toggleClass('less');
            $(this).parents('.item').find('.more_text').show(); /* show the .more_text span */
        }
        else{
            $(this).text("Read more");
            $(this).toggleClass('less');
            $('a.read').parents('.item').find('.more_text').hide(); /* hide the .more_text span */
        }
    });
});