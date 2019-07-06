(function ($) {

  // masonry layout
  $(window).on('load', function () {
    (function () {
      $('.grid').masonry({
        columnWidth: '.grid-sizer',
        itemSelector: '.grid-item',
        percentPosition: true
      });
    })();
  });

  // Grand menu 
  //  Mobile menu
  (function () {
    function menu(){
      $('.nav-item__grand-menu-open a').on('click', function (e) {
        e.preventDefault();
        $('.wrapper').addClass('menu-open');
        $('.nav-item__grand-menu-open').addClass('nav-item_active');
        $('.grand-menu').addClass('grand-menu_open');
      })
      $('.grand-menu__close-icon a').on('click', function (e) {
        e.preventDefault();
        $('.wrapper').removeClass('menu-open');
        $('.nav-item__grand-menu-open').removeClass('nav-item_active');
        $('.grand-menu').removeClass('grand-menu_open');
      })
    }
    function hamburger(){
      var hamburgerIcon = $('.hamburger-icon');
      var drilldown = $('.drilldown');
      var drilldownTrigger = $('.nav-item__grand-menu-open');
      var drilldownBack = $('.drilldown .navigate-back');
      var drilldownMain = $('.drilldown-main');
      var drilldownSecond = $('.drilldown-second');

      // Hamburger Icon toggle
      $(hamburgerIcon).on('click', function(){
        $(this).toggleClass('open');
        $(drilldown).fadeToggle();
        $('.wrapper').toggleClass('menu-open');
      });

      // Drilldown Menu
      $(drilldownTrigger).on('click', function(){
        $(drilldownMain).addClass('drilldown-main_hide');
        $(drilldownSecond).removeClass('drilldown-second_hide');
      });
      $(drilldownBack).on('click', function(){
        $(drilldownMain).removeClass('drilldown-main_hide');
        $(drilldownSecond).addClass('drilldown-second_hide');
      })
    }

    $(window).resize(function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if ($(window).outerWidth() > 991) {
          menu();
        } else {
          hamburger();
        }
      }, 500);
    })

    if ($(window).outerWidth() > 991) {
      menu();
      if($('.parallax').length){

        skrollr.init();
      }
    } else {
      hamburger();
    }

  
  })();

  //lang menu
  (function () {
    $('.language__open-icon').on('click', function () {
      $('.language').fadeIn(150);
    });
    $('.language__close-icon').on('click', function () {
      $('.language').fadeOut(150);
    });
  })();

  // scroll top
  (function () {
    $('.navigate-top').on('click', function () {
      $("html, body").animate({
        scrollTop: 0
      }, "slow");
      return false;
    })
  })();

  // Categories show product sliders
  (function () {

    var arrow_left = '<img src="assets/img/icons/arrow-left.svg">';
    var arrow_right = '<img src="assets/img/icons/arrow-right.svg">';
    var arrow_black_left = '<img src="assets/img/icons/arrow-black-left.svg">';
    var arrow_black_right = '<img src="assets/img/icons/arrow-black-right.svg">';

    $('.product-show__gallery').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      asNavFor: '.product-show__gallery-thumbs',
      adaptiveHeight: true,
      prevArrow: '<button type="button" class="slider-prev btn-style-none outline" alt="Go to previous slide">' + arrow_left + '</button>',
      nextArrow: '<button type="button" class="slider-next white btn-style-none outline" alt="Go to next slide">' + arrow_right + '</button>',
    });
    $('.product-show__gallery-thumbs').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.product-show__gallery',
      arrows: false,
      variableWidth: true,
      focusOnSelect: true,
    });

    $('.product-show__similar-slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      prevArrow: '<button type="button" class="slider-prev btn-style-none outline" alt="Go to previous slide">' + arrow_black_left + '</button>',
      nextArrow: '<button type="button" class="slider-next white btn-style-none outline" alt="Go to next slide">' + arrow_black_right + '</button>',
      responsive: [{
        breakpoint: 575,
        settings: {
          centerMode: true,
          slidesToShow: 2,
        }
      }]
    });

  })();

  // Appends
  (function () {
    // Product show categories appends
    function appendCategoriesPhone() {
      var appendContainer = $('.product-show__append-wrapper');
      var appendToContainer = $('.product-show__append_phone');
      $(appendContainer).appendTo(appendToContainer);
    }
    function appendCategoriesDesktop() {
      var appendContainer = $('.product-show__append-wrapper');
      var appendToContainer = $('.product-show__append_desktop');
      $(appendContainer).appendTo(appendToContainer);
    }

    // Back to cart appends
    function appendBackPhone() {
      var appendContainer = $('.back-to-cart');
      var appendToContainer = $('.back-to-cart__phone-append');
      $(appendContainer).appendTo(appendToContainer);
    }
    function appendBackDesktop() {
      var appendContainer = $('.back-to-cart');
      var appendToContainer = $('.back-to-cart__desktop-append');
      $(appendContainer).appendTo(appendToContainer);
    }


    $(window).resize(function () {
      if ($(window).outerWidth() < 767) {
        appendCategoriesPhone();
        appendBackPhone();
      } else {
        appendCategoriesDesktop();
        appendBackDesktop();
      }
    })

    if ($(window).outerWidth() < 767) {
      appendCategoriesPhone();
      appendBackPhone();
    } else {
      appendCategoriesDesktop();
      appendBackDesktop();
    }
  })();


  // sticky element
  (function () {
    function sticky() {
      var $sticky = $('.sticky');
      var $stickyrStopper = $('.sticky-stopper');
      if ($sticky.length) { // make sure ".sticky" element exists
        var generalSidebarHeight = $sticky.innerHeight();
        var stickyTop = $sticky.offset().top;
        var stickOffset = 0;
        var stickyStopperPosition = $stickyrStopper.offset().top;
        var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
        var diff = stopPoint + stickOffset;

        $(window).scroll(function () { // scroll event
          var windowTop = $(window).scrollTop(); // returns number

          if (stopPoint < windowTop) {
            $sticky.css({
              position: 'absolute',
              top: diff
            });
          } else if (stickyTop < windowTop + stickOffset) {
            $sticky.css({
              position: 'fixed',
              top: stickOffset
            });
          } else {
            $sticky.css({
              position: 'absolute',
              top: 'initial'
            });
          }
        });
      }
    }
    $(window).on('load', function () {
      sticky();
    });

    if ($(window).outerWidth() > 1200) {
      $('.cart__order-wrapper').addClass('sticky');
      $('.sticky-stopper_delete').addClass('sticky-stopper');
    } else {
      $('.cart__order-wrapper').removeClass('sticky');
      $('.sticky-stopper_delete').removeClass('sticky-stopper');
    }

    $(window).resize(function () {
      sticky();
      if ($(window).outerWidth() > 1200) {
        $('.cart__order-wrapper').addClass('sticky');
        $('.sticky-stopper_delete').addClass('sticky-stopper');
      } else {
        $('.cart__order-wrapper').removeClass('sticky');
        $('.sticky-stopper_delete').removeClass('sticky-stopper');
      }
    })

  })();

  // Input value clear
  (function () {
    var input = $('.cart__product-footer-field input');
    var button = $('.cart__product-footer-field button');
    $(button).on('click', function () {
      $(input).val('');
    })
  })();

  // Custom select
  (function () {
    var x, i, j, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select-container");
    for (i = 0; i < x.length; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      /*for each element, create a new DIV that will act as the selected item:*/
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /*for each element, create a new DIV that will contain the option list:*/
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < selElmnt.length; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
          /*when an item is clicked, update the original select box,
          and the selected item:*/
          var y, i, k, s, h;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          h = this.parentNode.previousSibling;
          for (i = 0; i < s.length; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              for (k = 0; k < y.length; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function (e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }

    function closeAllSelect(elmnt) {
      /*a function that will close all select boxes in the document,
      except the current select box:*/
      var x, y, i, arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i)
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < x.length; i++) {
        x[i].classList.add("select-hide-list");
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);
  })();

  // Datepicker
  (function(){
    $('#date').datepicker({
      format: 'dd.mm.yyyy',
      startDate: '-3d',
      orientation: "bottom",
      autoclose: true
    });
    $('#date').datepicker("setDate", new Date())
  })();

})(jQuery);


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCQpIHtcclxuXHJcbiAgLy8gbWFzb25yeSBsYXlvdXRcclxuICAkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKCcuZ3JpZCcpLm1hc29ucnkoe1xyXG4gICAgICAgIGNvbHVtbldpZHRoOiAnLmdyaWQtc2l6ZXInLFxyXG4gICAgICAgIGl0ZW1TZWxlY3RvcjogJy5ncmlkLWl0ZW0nLFxyXG4gICAgICAgIHBlcmNlbnRQb3NpdGlvbjogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH0pKCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIEdyYW5kIG1lbnUgXHJcbiAgLy8gIE1vYmlsZSBtZW51XHJcbiAgKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIG1lbnUoKXtcclxuICAgICAgJCgnLm5hdi1pdGVtX19ncmFuZC1tZW51LW9wZW4gYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJy53cmFwcGVyJykuYWRkQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG4gICAgICAgICQoJy5uYXYtaXRlbV9fZ3JhbmQtbWVudS1vcGVuJykuYWRkQ2xhc3MoJ25hdi1pdGVtX2FjdGl2ZScpO1xyXG4gICAgICAgICQoJy5ncmFuZC1tZW51JykuYWRkQ2xhc3MoJ2dyYW5kLW1lbnVfb3BlbicpO1xyXG4gICAgICB9KVxyXG4gICAgICAkKCcuZ3JhbmQtbWVudV9fY2xvc2UtaWNvbiBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnLndyYXBwZXInKS5yZW1vdmVDbGFzcygnbWVudS1vcGVuJyk7XHJcbiAgICAgICAgJCgnLm5hdi1pdGVtX19ncmFuZC1tZW51LW9wZW4nKS5yZW1vdmVDbGFzcygnbmF2LWl0ZW1fYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnLmdyYW5kLW1lbnUnKS5yZW1vdmVDbGFzcygnZ3JhbmQtbWVudV9vcGVuJyk7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBoYW1idXJnZXIoKXtcclxuICAgICAgdmFyIGhhbWJ1cmdlckljb24gPSAkKCcuaGFtYnVyZ2VyLWljb24nKTtcclxuICAgICAgdmFyIGRyaWxsZG93biA9ICQoJy5kcmlsbGRvd24nKTtcclxuICAgICAgdmFyIGRyaWxsZG93blRyaWdnZXIgPSAkKCcubmF2LWl0ZW1fX2dyYW5kLW1lbnUtb3BlbicpO1xyXG4gICAgICB2YXIgZHJpbGxkb3duQmFjayA9ICQoJy5kcmlsbGRvd24gLm5hdmlnYXRlLWJhY2snKTtcclxuICAgICAgdmFyIGRyaWxsZG93bk1haW4gPSAkKCcuZHJpbGxkb3duLW1haW4nKTtcclxuICAgICAgdmFyIGRyaWxsZG93blNlY29uZCA9ICQoJy5kcmlsbGRvd24tc2Vjb25kJyk7XHJcblxyXG4gICAgICAvLyBIYW1idXJnZXIgSWNvbiB0b2dnbGVcclxuICAgICAgJChoYW1idXJnZXJJY29uKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAkKGRyaWxsZG93bikuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgICQoJy53cmFwcGVyJykudG9nZ2xlQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIERyaWxsZG93biBNZW51XHJcbiAgICAgICQoZHJpbGxkb3duVHJpZ2dlcikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKGRyaWxsZG93bk1haW4pLmFkZENsYXNzKCdkcmlsbGRvd24tbWFpbl9oaWRlJyk7XHJcbiAgICAgICAgJChkcmlsbGRvd25TZWNvbmQpLnJlbW92ZUNsYXNzKCdkcmlsbGRvd24tc2Vjb25kX2hpZGUnKTtcclxuICAgICAgfSk7XHJcbiAgICAgICQoZHJpbGxkb3duQmFjaykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKGRyaWxsZG93bk1haW4pLnJlbW92ZUNsYXNzKCdkcmlsbGRvd24tbWFpbl9oaWRlJyk7XHJcbiAgICAgICAgJChkcmlsbGRvd25TZWNvbmQpLmFkZENsYXNzKCdkcmlsbGRvd24tc2Vjb25kX2hpZGUnKTtcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHJlc2l6ZVRpbWVyKTtcclxuICAgICAgcmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCh3aW5kb3cpLm91dGVyV2lkdGgoKSA+IDk5MSkge1xyXG4gICAgICAgICAgbWVudSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBoYW1idXJnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDUwMCk7XHJcbiAgICB9KVxyXG5cclxuICAgIGlmICgkKHdpbmRvdykub3V0ZXJXaWR0aCgpID4gOTkxKSB7XHJcbiAgICAgIG1lbnUoKTtcclxuICAgICAgaWYoJCgnLnBhcmFsbGF4JykubGVuZ3RoKXtcclxuXHJcbiAgICAgICAgc2tyb2xsci5pbml0KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGhhbWJ1cmdlcigpO1xyXG4gICAgfVxyXG5cclxuICBcclxuICB9KSgpO1xyXG5cclxuICAvL2xhbmcgbWVudVxyXG4gIChmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcubGFuZ3VhZ2VfX29wZW4taWNvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgJCgnLmxhbmd1YWdlJykuZmFkZUluKDE1MCk7XHJcbiAgICB9KTtcclxuICAgICQoJy5sYW5ndWFnZV9fY2xvc2UtaWNvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgJCgnLmxhbmd1YWdlJykuZmFkZU91dCgxNTApO1xyXG4gICAgfSk7XHJcbiAgfSkoKTtcclxuXHJcbiAgLy8gc2Nyb2xsIHRvcFxyXG4gIChmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcubmF2aWdhdGUtdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtcclxuICAgICAgICBzY3JvbGxUb3A6IDBcclxuICAgICAgfSwgXCJzbG93XCIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KVxyXG4gIH0pKCk7XHJcblxyXG4gIC8vIENhdGVnb3JpZXMgc2hvdyBwcm9kdWN0IHNsaWRlcnNcclxuICAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBhcnJvd19sZWZ0ID0gJzxpbWcgc3JjPVwiYXNzZXRzL2ltZy9pY29ucy9hcnJvdy1sZWZ0LnN2Z1wiPic7XHJcbiAgICB2YXIgYXJyb3dfcmlnaHQgPSAnPGltZyBzcmM9XCJhc3NldHMvaW1nL2ljb25zL2Fycm93LXJpZ2h0LnN2Z1wiPic7XHJcbiAgICB2YXIgYXJyb3dfYmxhY2tfbGVmdCA9ICc8aW1nIHNyYz1cImFzc2V0cy9pbWcvaWNvbnMvYXJyb3ctYmxhY2stbGVmdC5zdmdcIj4nO1xyXG4gICAgdmFyIGFycm93X2JsYWNrX3JpZ2h0ID0gJzxpbWcgc3JjPVwiYXNzZXRzL2ltZy9pY29ucy9hcnJvdy1ibGFjay1yaWdodC5zdmdcIj4nO1xyXG5cclxuICAgICQoJy5wcm9kdWN0LXNob3dfX2dhbGxlcnknKS5zbGljayh7XHJcbiAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgZmFkZTogdHJ1ZSxcclxuICAgICAgYXNOYXZGb3I6ICcucHJvZHVjdC1zaG93X19nYWxsZXJ5LXRodW1icycsXHJcbiAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlLFxyXG4gICAgICBwcmV2QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWRlci1wcmV2IGJ0bi1zdHlsZS1ub25lIG91dGxpbmVcIiBhbHQ9XCJHbyB0byBwcmV2aW91cyBzbGlkZVwiPicgKyBhcnJvd19sZWZ0ICsgJzwvYnV0dG9uPicsXHJcbiAgICAgIG5leHRBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpZGVyLW5leHQgd2hpdGUgYnRuLXN0eWxlLW5vbmUgb3V0bGluZVwiIGFsdD1cIkdvIHRvIG5leHQgc2xpZGVcIj4nICsgYXJyb3dfcmlnaHQgKyAnPC9idXR0b24+JyxcclxuICAgIH0pO1xyXG4gICAgJCgnLnByb2R1Y3Qtc2hvd19fZ2FsbGVyeS10aHVtYnMnKS5zbGljayh7XHJcbiAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgIGFzTmF2Rm9yOiAnLnByb2R1Y3Qtc2hvd19fZ2FsbGVyeScsXHJcbiAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgIHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcbiAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcucHJvZHVjdC1zaG93X19zaW1pbGFyLXNsaWRlcicpLnNsaWNrKHtcclxuICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgcHJldkFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGlkZXItcHJldiBidG4tc3R5bGUtbm9uZSBvdXRsaW5lXCIgYWx0PVwiR28gdG8gcHJldmlvdXMgc2xpZGVcIj4nICsgYXJyb3dfYmxhY2tfbGVmdCArICc8L2J1dHRvbj4nLFxyXG4gICAgICBuZXh0QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWRlci1uZXh0IHdoaXRlIGJ0bi1zdHlsZS1ub25lIG91dGxpbmVcIiBhbHQ9XCJHbyB0byBuZXh0IHNsaWRlXCI+JyArIGFycm93X2JsYWNrX3JpZ2h0ICsgJzwvYnV0dG9uPicsXHJcbiAgICAgIHJlc3BvbnNpdmU6IFt7XHJcbiAgICAgICAgYnJlYWtwb2ludDogNTc1LFxyXG4gICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgIH1cclxuICAgICAgfV1cclxuICAgIH0pO1xyXG5cclxuICB9KSgpO1xyXG5cclxuICAvLyBBcHBlbmRzXHJcbiAgKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIFByb2R1Y3Qgc2hvdyBjYXRlZ29yaWVzIGFwcGVuZHNcclxuICAgIGZ1bmN0aW9uIGFwcGVuZENhdGVnb3JpZXNQaG9uZSgpIHtcclxuICAgICAgdmFyIGFwcGVuZENvbnRhaW5lciA9ICQoJy5wcm9kdWN0LXNob3dfX2FwcGVuZC13cmFwcGVyJyk7XHJcbiAgICAgIHZhciBhcHBlbmRUb0NvbnRhaW5lciA9ICQoJy5wcm9kdWN0LXNob3dfX2FwcGVuZF9waG9uZScpO1xyXG4gICAgICAkKGFwcGVuZENvbnRhaW5lcikuYXBwZW5kVG8oYXBwZW5kVG9Db250YWluZXIpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYXBwZW5kQ2F0ZWdvcmllc0Rlc2t0b3AoKSB7XHJcbiAgICAgIHZhciBhcHBlbmRDb250YWluZXIgPSAkKCcucHJvZHVjdC1zaG93X19hcHBlbmQtd3JhcHBlcicpO1xyXG4gICAgICB2YXIgYXBwZW5kVG9Db250YWluZXIgPSAkKCcucHJvZHVjdC1zaG93X19hcHBlbmRfZGVza3RvcCcpO1xyXG4gICAgICAkKGFwcGVuZENvbnRhaW5lcikuYXBwZW5kVG8oYXBwZW5kVG9Db250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEJhY2sgdG8gY2FydCBhcHBlbmRzXHJcbiAgICBmdW5jdGlvbiBhcHBlbmRCYWNrUGhvbmUoKSB7XHJcbiAgICAgIHZhciBhcHBlbmRDb250YWluZXIgPSAkKCcuYmFjay10by1jYXJ0Jyk7XHJcbiAgICAgIHZhciBhcHBlbmRUb0NvbnRhaW5lciA9ICQoJy5iYWNrLXRvLWNhcnRfX3Bob25lLWFwcGVuZCcpO1xyXG4gICAgICAkKGFwcGVuZENvbnRhaW5lcikuYXBwZW5kVG8oYXBwZW5kVG9Db250YWluZXIpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYXBwZW5kQmFja0Rlc2t0b3AoKSB7XHJcbiAgICAgIHZhciBhcHBlbmRDb250YWluZXIgPSAkKCcuYmFjay10by1jYXJ0Jyk7XHJcbiAgICAgIHZhciBhcHBlbmRUb0NvbnRhaW5lciA9ICQoJy5iYWNrLXRvLWNhcnRfX2Rlc2t0b3AtYXBwZW5kJyk7XHJcbiAgICAgICQoYXBwZW5kQ29udGFpbmVyKS5hcHBlbmRUbyhhcHBlbmRUb0NvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAoJCh3aW5kb3cpLm91dGVyV2lkdGgoKSA8IDc2Nykge1xyXG4gICAgICAgIGFwcGVuZENhdGVnb3JpZXNQaG9uZSgpO1xyXG4gICAgICAgIGFwcGVuZEJhY2tQaG9uZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFwcGVuZENhdGVnb3JpZXNEZXNrdG9wKCk7XHJcbiAgICAgICAgYXBwZW5kQmFja0Rlc2t0b3AoKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBpZiAoJCh3aW5kb3cpLm91dGVyV2lkdGgoKSA8IDc2Nykge1xyXG4gICAgICBhcHBlbmRDYXRlZ29yaWVzUGhvbmUoKTtcclxuICAgICAgYXBwZW5kQmFja1Bob25lKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhcHBlbmRDYXRlZ29yaWVzRGVza3RvcCgpO1xyXG4gICAgICBhcHBlbmRCYWNrRGVza3RvcCgpO1xyXG4gICAgfVxyXG4gIH0pKCk7XHJcblxyXG5cclxuICAvLyBzdGlja3kgZWxlbWVudFxyXG4gIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBzdGlja3koKSB7XHJcbiAgICAgIHZhciAkc3RpY2t5ID0gJCgnLnN0aWNreScpO1xyXG4gICAgICB2YXIgJHN0aWNreXJTdG9wcGVyID0gJCgnLnN0aWNreS1zdG9wcGVyJyk7XHJcbiAgICAgIGlmICgkc3RpY2t5Lmxlbmd0aCkgeyAvLyBtYWtlIHN1cmUgXCIuc3RpY2t5XCIgZWxlbWVudCBleGlzdHNcclxuICAgICAgICB2YXIgZ2VuZXJhbFNpZGViYXJIZWlnaHQgPSAkc3RpY2t5LmlubmVySGVpZ2h0KCk7XHJcbiAgICAgICAgdmFyIHN0aWNreVRvcCA9ICRzdGlja3kub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgIHZhciBzdGlja09mZnNldCA9IDA7XHJcbiAgICAgICAgdmFyIHN0aWNreVN0b3BwZXJQb3NpdGlvbiA9ICRzdGlja3lyU3RvcHBlci5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgdmFyIHN0b3BQb2ludCA9IHN0aWNreVN0b3BwZXJQb3NpdGlvbiAtIGdlbmVyYWxTaWRlYmFySGVpZ2h0IC0gc3RpY2tPZmZzZXQ7XHJcbiAgICAgICAgdmFyIGRpZmYgPSBzdG9wUG9pbnQgKyBzdGlja09mZnNldDtcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7IC8vIHNjcm9sbCBldmVudFxyXG4gICAgICAgICAgdmFyIHdpbmRvd1RvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTsgLy8gcmV0dXJucyBudW1iZXJcclxuXHJcbiAgICAgICAgICBpZiAoc3RvcFBvaW50IDwgd2luZG93VG9wKSB7XHJcbiAgICAgICAgICAgICRzdGlja3kuY3NzKHtcclxuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICB0b3A6IGRpZmZcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0aWNreVRvcCA8IHdpbmRvd1RvcCArIHN0aWNrT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICRzdGlja3kuY3NzKHtcclxuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgICB0b3A6IHN0aWNrT2Zmc2V0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJHN0aWNreS5jc3Moe1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgIHRvcDogJ2luaXRpYWwnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHN0aWNreSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCQod2luZG93KS5vdXRlcldpZHRoKCkgPiAxMjAwKSB7XHJcbiAgICAgICQoJy5jYXJ0X19vcmRlci13cmFwcGVyJykuYWRkQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICAkKCcuc3RpY2t5LXN0b3BwZXJfZGVsZXRlJykuYWRkQ2xhc3MoJ3N0aWNreS1zdG9wcGVyJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKCcuY2FydF9fb3JkZXItd3JhcHBlcicpLnJlbW92ZUNsYXNzKCdzdGlja3knKTtcclxuICAgICAgJCgnLnN0aWNreS1zdG9wcGVyX2RlbGV0ZScpLnJlbW92ZUNsYXNzKCdzdGlja3ktc3RvcHBlcicpO1xyXG4gICAgfVxyXG5cclxuICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xyXG4gICAgICBzdGlja3koKTtcclxuICAgICAgaWYgKCQod2luZG93KS5vdXRlcldpZHRoKCkgPiAxMjAwKSB7XHJcbiAgICAgICAgJCgnLmNhcnRfX29yZGVyLXdyYXBwZXInKS5hZGRDbGFzcygnc3RpY2t5Jyk7XHJcbiAgICAgICAgJCgnLnN0aWNreS1zdG9wcGVyX2RlbGV0ZScpLmFkZENsYXNzKCdzdGlja3ktc3RvcHBlcicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJy5jYXJ0X19vcmRlci13cmFwcGVyJykucmVtb3ZlQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICAgICQoJy5zdGlja3ktc3RvcHBlcl9kZWxldGUnKS5yZW1vdmVDbGFzcygnc3RpY2t5LXN0b3BwZXInKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgfSkoKTtcclxuXHJcbiAgLy8gSW5wdXQgdmFsdWUgY2xlYXJcclxuICAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGlucHV0ID0gJCgnLmNhcnRfX3Byb2R1Y3QtZm9vdGVyLWZpZWxkIGlucHV0Jyk7XHJcbiAgICB2YXIgYnV0dG9uID0gJCgnLmNhcnRfX3Byb2R1Y3QtZm9vdGVyLWZpZWxkIGJ1dHRvbicpO1xyXG4gICAgJChidXR0b24pLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgJChpbnB1dCkudmFsKCcnKTtcclxuICAgIH0pXHJcbiAgfSkoKTtcclxuXHJcbiAgLy8gQ3VzdG9tIHNlbGVjdFxyXG4gIChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgeCwgaSwgaiwgc2VsRWxtbnQsIGEsIGIsIGM7XHJcbiAgICAvKmxvb2sgZm9yIGFueSBlbGVtZW50cyB3aXRoIHRoZSBjbGFzcyBcImN1c3RvbS1zZWxlY3RcIjoqL1xyXG4gICAgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjdXN0b20tc2VsZWN0LWNvbnRhaW5lclwiKTtcclxuICAgIGZvciAoaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHNlbEVsbW50ID0geFtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNlbGVjdFwiKVswXTtcclxuICAgICAgLypmb3IgZWFjaCBlbGVtZW50LCBjcmVhdGUgYSBuZXcgRElWIHRoYXQgd2lsbCBhY3QgYXMgdGhlIHNlbGVjdGVkIGl0ZW06Ki9cclxuICAgICAgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XHJcbiAgICAgIGEuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzZWxlY3Qtc2VsZWN0ZWRcIik7XHJcbiAgICAgIGEuaW5uZXJIVE1MID0gc2VsRWxtbnQub3B0aW9uc1tzZWxFbG1udC5zZWxlY3RlZEluZGV4XS5pbm5lckhUTUw7XHJcbiAgICAgIHhbaV0uYXBwZW5kQ2hpbGQoYSk7XHJcbiAgICAgIC8qZm9yIGVhY2ggZWxlbWVudCwgY3JlYXRlIGEgbmV3IERJViB0aGF0IHdpbGwgY29udGFpbiB0aGUgb3B0aW9uIGxpc3Q6Ki9cclxuICAgICAgYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XHJcbiAgICAgIGIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzZWxlY3QtaXRlbXMgc2VsZWN0LWhpZGVcIik7XHJcbiAgICAgIGZvciAoaiA9IDE7IGogPCBzZWxFbG1udC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIC8qZm9yIGVhY2ggb3B0aW9uIGluIHRoZSBvcmlnaW5hbCBzZWxlY3QgZWxlbWVudCxcclxuICAgICAgICBjcmVhdGUgYSBuZXcgRElWIHRoYXQgd2lsbCBhY3QgYXMgYW4gb3B0aW9uIGl0ZW06Ki9cclxuICAgICAgICBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcclxuICAgICAgICBjLmlubmVySFRNTCA9IHNlbEVsbW50Lm9wdGlvbnNbal0uaW5uZXJIVE1MO1xyXG4gICAgICAgIGMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAvKndoZW4gYW4gaXRlbSBpcyBjbGlja2VkLCB1cGRhdGUgdGhlIG9yaWdpbmFsIHNlbGVjdCBib3gsXHJcbiAgICAgICAgICBhbmQgdGhlIHNlbGVjdGVkIGl0ZW06Ki9cclxuICAgICAgICAgIHZhciB5LCBpLCBrLCBzLCBoO1xyXG4gICAgICAgICAgcyA9IHRoaXMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2VsZWN0XCIpWzBdO1xyXG4gICAgICAgICAgaCA9IHRoaXMucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmc7XHJcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAocy5vcHRpb25zW2ldLmlubmVySFRNTCA9PSB0aGlzLmlubmVySFRNTCkge1xyXG4gICAgICAgICAgICAgIHMuc2VsZWN0ZWRJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgaC5pbm5lckhUTUwgPSB0aGlzLmlubmVySFRNTDtcclxuICAgICAgICAgICAgICB5ID0gdGhpcy5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzYW1lLWFzLXNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCB5Lmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICB5W2tdLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2FtZS1hcy1zZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaC5jbGljaygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGIuYXBwZW5kQ2hpbGQoYyk7XHJcbiAgICAgIH1cclxuICAgICAgeFtpXS5hcHBlbmRDaGlsZChiKTtcclxuICAgICAgYS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvKndoZW4gdGhlIHNlbGVjdCBib3ggaXMgY2xpY2tlZCwgY2xvc2UgYW55IG90aGVyIHNlbGVjdCBib3hlcyxcclxuICAgICAgICBhbmQgb3Blbi9jbG9zZSB0aGUgY3VycmVudCBzZWxlY3QgYm94OiovXHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBjbG9zZUFsbFNlbGVjdCh0aGlzKTtcclxuICAgICAgICB0aGlzLm5leHRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoXCJzZWxlY3QtaGlkZVwiKTtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoXCJzZWxlY3QtYXJyb3ctYWN0aXZlXCIpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZUFsbFNlbGVjdChlbG1udCkge1xyXG4gICAgICAvKmEgZnVuY3Rpb24gdGhhdCB3aWxsIGNsb3NlIGFsbCBzZWxlY3QgYm94ZXMgaW4gdGhlIGRvY3VtZW50LFxyXG4gICAgICBleGNlcHQgdGhlIGN1cnJlbnQgc2VsZWN0IGJveDoqL1xyXG4gICAgICB2YXIgeCwgeSwgaSwgYXJyTm8gPSBbXTtcclxuICAgICAgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWxlY3QtaXRlbXNcIik7XHJcbiAgICAgIHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2VsZWN0LXNlbGVjdGVkXCIpO1xyXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgeS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChlbG1udCA9PSB5W2ldKSB7XHJcbiAgICAgICAgICBhcnJOby5wdXNoKGkpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHlbaV0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdC1hcnJvdy1hY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgeFtpXS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0LWhpZGUtbGlzdFwiKTtcclxuICAgICAgICBpZiAoYXJyTm8uaW5kZXhPZihpKSkge1xyXG4gICAgICAgICAgeFtpXS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0LWhpZGVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvKmlmIHRoZSB1c2VyIGNsaWNrcyBhbnl3aGVyZSBvdXRzaWRlIHRoZSBzZWxlY3QgYm94LFxyXG4gICAgdGhlbiBjbG9zZSBhbGwgc2VsZWN0IGJveGVzOiovXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VBbGxTZWxlY3QpO1xyXG4gIH0pKCk7XHJcblxyXG4gIC8vIERhdGVwaWNrZXJcclxuICAoZnVuY3Rpb24oKXtcclxuICAgICQoJyNkYXRlJykuZGF0ZXBpY2tlcih7XHJcbiAgICAgIGZvcm1hdDogJ2RkLm1tLnl5eXknLFxyXG4gICAgICBzdGFydERhdGU6ICctM2QnLFxyXG4gICAgICBvcmllbnRhdGlvbjogXCJib3R0b21cIixcclxuICAgICAgYXV0b2Nsb3NlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgICQoJyNkYXRlJykuZGF0ZXBpY2tlcihcInNldERhdGVcIiwgbmV3IERhdGUoKSlcclxuICB9KSgpO1xyXG5cclxufSkoalF1ZXJ5KTtcclxuXHJcbiJdfQ==
