// Starting Document.Ready Function

jQuery(document).ready(function() {

    $ = jQuery;

    function insertParam(key, value) {
        key = encodeURI(key);
        value = encodeURI(value);

        var kvp = document.location.search.substr(1).split('&');

        var i = kvp.length;
        var x;
        while (i--) {
            x = kvp[i].split('=');

            if (x[0] == key) {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }

        if (i < 0) {
            kvp[kvp.length] = [key, value].join('=');
        }

        //this will reload the page, it's likely better to store this until finished
        document.location.search = kvp.join('&');
    }

    $('#recipe-sorting').on('change', function() {
        var key = 'orderby';
        var value = $(this).val();
        insertParam( key, value );
    });

    $('#advance-search').on('submit', function() {

        var params = {};

        if (location.search) {
            var parts = location.search.substring(1).split('&');

            for (var i = 0; i < parts.length; i++) {
                var nv = parts[i].split('=');
                if (!nv[0]) continue;
                params[nv[0]] = nv[1] || true;
            }
        }

// Now you can get the parameters you want like so:
        var abc = params.abc;
        console.log(abc);

    });


    //=========== Necessary CSS Targets

    $('.nav li:first-child').css('background','none');
    $('#home-infos .news .list li:last-child').css('padding','0px').css('margin','0px').css('background','none');
    $('.tabed .block li:last-child').css('padding','0px').css('margin','0px').css('background','none');
    $('#bottom > li:last-child').css('margin','0px');
    $('#bottom li ul li:last-child').css('background','none').css('padding','0px');
    //$( "#nav-wrap .social-nav li a" ).empty();

    var nut_elements_count = $('#left-area .info-right .nutritional ul li').length;

    if( (nut_elements_count % 2) == 0 )
    {
        $('#left-area .info-right .nutritional ul li:last-child').css('border','none').css('padding-bottom','0px');
        $('#left-area .info-right .nutritional ul li:last-child').prev('li').css('border','none').css('padding-bottom','0px');
    }
    else
    {
        $('#left-area .info-right .nutritional ul li:last-child').css('border','none').css('padding-bottom','0px');
    }
    $('.thumb-slider-wrap').closest('#slider').addClass('thumb_slider');

    $(".widget_displaytweetswidget h2, .wpfp_users_favorites_widget_view h2").html(function (_, html) {
        return html.replace(html.split(' ')[0], '<span>' + html.split(' ')[0] + '</span>');
    });

    //==================================

    // Hover effects for Header and Footer Logos

    $('#header .logo, .footer-logo').hover(function(){
        $(this).stop(true, true).animate({opacity: 0.5},300);
    },function(){
        $(this).stop(true, true).animate({opacity: 1},300);
    });

    // Width Counter for Navigation

    var navWidthCounter = function(){
        var itemsCount = $('.nav > li').size();
        var allListWidth = 0;
        i = 0;
        while(i <= itemsCount){
            allListWidth += $('.nav > li:nth-child(' + i + ')').width();
            i++;
        }
        return allListWidth;
    }

    var navWidth = navWidthCounter(),
        windowWidth = $(window).width(),
        navLimit = 780;
    if(windowWidth > 1000){
        navLimit = 780;
    } else if (windowWidth > 748) {
        navLimit = 600;
    }
    if(navWidth > navLimit){
        //$('.nav').after('<span class="nav-more"><a>More</a><ul></ul></span>');
        $('.nav').prepend('<li class="more"><a>More</a><ul></ul></li>');
        while(navWidth > navLimit){
            var lastoneis = $('.nav > li:last-child').html();
            $('.nav > li:last-child').remove();
            $('.more ul').prepend('<li>' + lastoneis + '</li>');
            navWidth = navWidthCounter();
        }
        var shiftnav = $('.nav > li:first-child');
        $('.more').remove();
        $('.nav').append(shiftnav);
    }

    //==================================


    // Navigation Hover

    $('#nav-wrap ul > li, .nav-more').hover(function(){
        $(this).stop(true, true).children('a').animate({color: "#B3C897" }, 200);
        $(this).children('ul').fadeIn(350);
    }, function(){
        $(this).stop(true, true).children('a').animate({color: "#fff"}, 200);
        $(this).children('ul').hide();
    });

    //==================================

    /* Pretty Photo Lightbox */

    if( jQuery().prettyPhoto ){

        $(".pretty-photo").prettyPhoto({
            deeplinking: false,
            social_tools: false
        });

        $('a[data-rel]').each(function() {
            $(this).attr('rel', $(this).data('rel'));
        });

        $("a[rel^='prettyPhoto']").prettyPhoto({
            deeplinking: false,
            social_tools: false
        });
    }

    //==================================


    // Image hover effect for whole site

    $('.img-box img, .single-img-box img, .img-box-serv img').not('.single-slider img').hover(function(){
        $(this).stop().animate({opacity:0.7},300);
    }, function(){
        $(this).stop().animate({opacity:1},300);
    });

    //==================================


    // Buttons and Pagination hover effects

    $('.readmore, #pagination a').hover(function(){
        $(this).stop().animate({color: "#ccc" }, 650);
    }, function(){
        $(this).stop().animate({color: "#fff" }, 650);
    });


    //==================================


    /*-----------------------------------------------------------------------------------*/
    /*	Responsive Nav for Header
     /*-----------------------------------------------------------------------------------*/


    var $mainNav    = $('.inn-nav').children('.nav');
    var optionsList = '<option value="" selected>Go to...</option>';

    $mainNav.find('li').each(function() {
        var $this   = $(this),
            $anchor = $this.children('a'),
            depth   = $this.parents('ul').length - 1,
            indent  = '';
        if( depth ) {
            while( depth > 0 ) {
                indent += ' - ';
                depth--;
            }
        }
        optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
    }).end().last()
        .after('<select class="responsive-nav">' + optionsList + '</select>');

    $('.responsive-nav').on('change', function() {
        window.location = $(this).val();
    });


    // Image Hr Effect for Slider Thumbs

    $('.sliderThumbs li a img').hover(function(){
        $(this).stop().animate({opacity:0.7},300);
    }, function(){
        $(this).stop().animate({opacity:1},300);
    });

    //==================================


    //NIVO SLIDER

    $('.nivo-slides').nivoSlider({
        effect:'boxRain,fold,fade', // Specify sets like: fold,fade,sliceDown,boxRain,random
        slices:25, // For slice animations
        boxCols: 16, // For box animations
        boxRows: 8, // For box animations
        animSpeed:600, // Slide transition speed
        pauseTime:6000, // How long each slide will show
        startSlide:0, // Set starting Slide (0 index)
        directionNav:true, // Next & Prev navigation
        directionNavHide:true, // Only show on hover
        controlNav:true, // circles navigation
        captionOpacity: 0.7
    });

    //==================================


    // Tabs Code for whole site

    $('.tabed .tabs li:first-child').addClass('current');
    $('.tabed .block:first').addClass('current');

    $('.tabed .tabs li').click(function(){
        var tabNumber = $(this).index();
        $(this).parent('ul').siblings('.block').removeClass('current');
        $(this).siblings('li').removeClass('current');
        $(this).addClass('current');
        $(this).parent('ul').parent('.tabed').children('.block:eq('+ tabNumber +')').addClass('current');
    });

    //==================================


    // Accordion for Whole Site

    $('.accordion h5').click(function(){
        if(!$(this).hasClass('current')){
            var tabNumber = $(this).index();
            $('.accordion .pane.current').slideUp(700, function(){ $(this).removeClass('current'); });
            $(this).next('.pane').show('blind',700,function(){ $(this).addClass('current'); });
            $('.accordion h5.current').removeClass('current');
            $(this).addClass('current');
        }
    });

    //==================================


    // Toggle Box Code for Whole Site

    $('.toggle-box ul li p').slideUp('slow');
    $('.toggle-box ul li h5').click(function(){
        if($(this).parent('li').hasClass('active')){
            $(this).stop(true, true).siblings('p').slideUp('slow');
            $(this).parent('li').removeClass('active');
        } else {
            $(this).stop(true, true).siblings('p').show('blind', 500);
            $(this).parent('li').addClass('active');
        }
    });

    //==================================


    // FAQ list counter for FAQ page

    var setFaqCount = function(){
        $('.faq-list li').each(function(index, element) {
            $(this).children('.number').prepend(index+1);
        });
    };
    setFaqCount();

    //==================================


    // FAQ Toggle Effect for FAQ Page
    $('.faq-list li').children('p').slideUp();
    $('.faq-list li.active').children('p').show('blind',300);

    $('.faq-list li h3').click(function(){
        $(this).siblings('p').stop().slideToggle(200);
        $(this).parent('li').toggleClass('active');
    });

    //==================================


    // Recipe Single Carousel Code for Recipe Single Full Width Page

    var pieceWidth = $('#horiz_container li').width() + parseInt($('#horiz_container li').css('padding-left')) + parseInt($('#horiz_container li').css('margin-left'));
    var pieceCount = $('#horiz_container li').length;
    if(pieceCount%2 != 0){
        var outerWidth = pieceCount/2*pieceWidth+pieceWidth;
    } else {
        var outerWidth = (pieceCount/2)*pieceWidth;
    }
    $('#horiz_container').css('width',outerWidth);
    var carStatus = 0;
    $('#horiz_container_outer .right').click(function(){
        if(carStatus < (pieceCount/2)*pieceWidth-(pieceWidth+pieceWidth)){
            $('#horiz_container').animate({left: "-="+pieceWidth},500);
            carStatus += pieceWidth;
        }
    });
    $('#horiz_container_outer .left').click(function(){
        if(carStatus > 0){
            $('#horiz_container').animate({left: "+="+pieceWidth},500);
            carStatus -= pieceWidth;
        }
    });

    //==================================


    // Recipe Single Full Width Page Image Switch Code from Carousel

    $('#horiz_container li').click(function(){
        var thisImgSrc = $(this).children('a').data('rel');
        var thisImgPPSrc = $(this).children('a').data('ppurl');
        var thisImgCaption = $(this).children('a').data('ppcaption');
        var targetImgSrc = $('.single-img-box img').attr('src');
        var targetImgPrtHref = $('.single-img-box a').data('rel');
        if(thisImgSrc != targetImgSrc)
        {
            $('.single-img-box img').fadeOut(200,function(){
                $('.recipe-single-img').addClass('withbg');
                $(this).attr('src',thisImgSrc);
                $(this).parent('a').attr('title',thisImgCaption);
                if(targetImgPrtHref != 'none'){
                    $(this).parent('a').attr('href',thisImgPPSrc);
                }
                $(this).load(function(){
                    $(this).fadeIn(200,function(){ $('.recipe-single-img').removeClass('withbg'); });
                });
            });
        }
    });


    //==================================


    // Slider Call for Accordion Slider

    if($('#accordion-slider').length > 0){
        slideMenu.build('accordion-slider',740,10,5,2);
    }

    // Quick Connect Form AJAX validation and submition
    // Validation Plugin : http://bassistance.de/jquery-plugins/jquery-plugin-validation/
    // Form Ajax Plugin : http://www.malsup.com/jquery/form/
    var contact_options = {
        target: '#message-sent',
        beforeSubmit: function(){
            $('#contact-loader').fadeIn('fast');
            $('#message-sent').fadeOut('fast');
        },
        success: function(){
            $('#contact-loader').fadeOut('fast');
            $('#message-sent').fadeIn('fast');
            $('#contact-form').resetForm();
        }
    };

    //==================================


    // Contact Form AJAX Function for Contact Page

    $('#contact-form').validate({
        submitHandler: function(form) {
            $(form).ajaxSubmit(contact_options);
        },
        errorLabelContainer: $("#search-error-container")
    });

    //==================================

    // Recipe submit form
    $('#recipe-form').validate();

    $('.more-ingre').click(function(){
        var thisparent = $(this).parent('fieldset');
        thisparent.find('input:first').clone(true).val('').appendTo(thisparent);
        thisparent.find('textarea:first').clone(true).appendTo(thisparent);
    });


    //==================================

    $('h4.me-steps').click(function(){
        var stepcheck = $(this).children('.stepcheck');
        if(stepcheck.hasClass('finished')){
            stepcheck.removeClass('finished');
            stepcheck.parent('h4').css('text-decoration','none');
            stepcheck.parent('h4').next('p').css('text-decoration','none');
        } else {
            stepcheck.addClass('finished');
            stepcheck.parent('h4').css('text-decoration','line-through');
            stepcheck.parent('h4').next('p').css('text-decoration','line-through');
        }
    });

    //==================================
    (function($) {
        $.fn.checkFileType = function(options) {
            var defaults = {
                allowedExtensions: [],
                success: function() {},
                error: function() {}
            };
            options = $.extend(defaults, options);

            return this.each(function() {

                $(this).on('change', function() {
                    var value = $(this).val(),
                        file = value.toLowerCase(),
                        extension = file.substring(file.lastIndexOf('.') + 1);

                    if ($.inArray(extension, options.allowedExtensions) == -1) {
                        options.error();
                        $(this).focus();
                    } else {
                        options.success();

                    }

                });

            });
        };

    })(jQuery);

    //==================================
    $(function() {
        $('#photo').checkFileType({
            allowedExtensions: ['jpg', 'jpeg', 'png'],
            success: function() {
                //alert('Success');
            },
            error: function() {
                alert('Unsupported Image File Type! Please upload image file of jpeg or png format');
            }
        });

    });

    if( jQuery().select2 ) {
        $('#advance-search select').select2();
        $('#recipe-sorting').select2();
        window.onresize = function(){
            $('#advance-search select').select2();
            $('#recipe-sorting').select2();
        }
    }
    //==================================
    if( jQuery().plupload ) {
        $("#uploader").plupload({
            // General settings
            url: 'wp-admin/admin-ajax.php',
            chunk_size: '1mb',
            unique_names: true,
            max_file_count: 10,

            filters: {
                // Maximum file size
                max_file_size: '3mb',
                // Specify what files to browse for
                mime_types: [
                    {title: "Image files", extensions: "jpg,png"}
                ]
            },

            // Sort files
            sortable: true,

            // Enable ability to drag'n'drop files onto the widget (currently only HTML5 supports that)
            dragdrop: true,

            // Views to activate
            views: {
                list: true,
                thumbs: true, // Show thumbs
                active: 'thumbs'
            },

            init: {
                BeforeUpload: function (up, file) {
                    // Called right before the upload for a given file starts, can be used to cancel it if required
                    up.settings.multipart_params = {action: 'submit_recipe_images'}
                },

                FileUploaded: function (up, file, info) {
                    var obj = JSON.parse(info.response);
                    $('#recipe-images input').attr( "value", function( i, val ) {
                        return val + obj.id+ ', ' ;
                    });
                }
            }
        });
    }



});