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

var btn = document.querySelector('.footer__sale-title');
btn.addEventListener('click', function(e) {
    e.preventDefault();
    var target = e.target;
    var arrow = target.firstElementChild;
    if(target.classList.contains('footer__sale-title')) {
        var content = target.nextElementSibling;
        var item = target.parentNode;
        console.log(content);
        console.log(item);
        if(!content.classList.contains('is-active')) {
            content.classList.add('is-active');
            content.style.height = content.scrollHeight + 'px';
            arrow.style.transform = 'rotate(180deg)';
        } else {
            content.classList.remove('is-active');
            content.style.height = 0;
            arrow.style.transform = 'rotate(0deg)';
        }
    }
});

