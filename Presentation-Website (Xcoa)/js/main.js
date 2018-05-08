(function($){
	$(window).load(function(){
		
        /*	FlexSlide text
        /*----------------------------------------------------*/
		$('.flexslider').flexslider({
			animation: "slide",
			selector: ".flex-slogan > li",
			controlNav: false,
			directionNav: false,
			direction: "vertical",
			slideshowSpeed: 4000,
			keyboard: true,
			touch: false,
         });
        
		
        /*	countdown
        /*----------------------------------------------------*/
        var dateFinal = '2019/11/01';

        $('.countdown').countdown(dateFinal, function(event) {

            var $this = $(this)

            //$this.find('span.weeks').html(event.strftime('%w'));
            $this.find('span.days').html(event.strftime('%D'));
            $this.find('span.hours').html(event.strftime('%H'));
            $this.find('span.minutes').html(event.strftime('%M'));
            $this.find('span.seconds').html(event.strftime('%S'));
        });
        
	});
    
    /*	slideshow1 ( nivo Slider )
    /*----------------------------------------------------*/
    $(function(){

            startSlideshow();

        })

        function startSlideshow() {

            $('#nivoSlider').nivoSlider({
                effect: 'slideInRight'
            });

        }
    
})(jQuery);

/*timeline
/*----------------------------------------------------*/
jQuery(document).ready(function($){
    var timelineBlocks = $('.cd-timeline-block'),
        offset = 0.8;

    //hide timeline blocks which are outside the viewport
    hideBlocks(timelineBlocks, offset);

    //on scolling, show/animate timeline blocks when enter the viewport
    $(window).on('scroll', function(){
        (!window.requestAnimationFrame) 
            ? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
            : window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
    });

    function hideBlocks(blocks, offset) {
        blocks.each(function(){
            ( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        });
    }

    function showBlocks(blocks, offset) {
        blocks.each(function(){
            ( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
        });
    }
});