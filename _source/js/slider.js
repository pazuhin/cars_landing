function cycleSlider(){

    var imagesHolder = $('.banner__img-pic'),
        imagesHolderLength = imagesHolder.length,
        i = 0;

    imagesHolder.each(function(z){
        $(this).css('z-index', -z);
    });

    var initSlider = function() {

        if(i == imagesHolderLength) i = 0;

        imagesHolder.eq(i).fadeOut(300, function(){
            imagesHolder.each(function(j){
                $(this).css('z-index', (((imagesHolderLength - j)) + i) %  imagesHolderLength);
            });
            i++;
            $(this).show();
        });
    }

    setInterval(initSlider, 3000);

}

cycleSlider();