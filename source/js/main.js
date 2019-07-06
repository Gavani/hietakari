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
    function menu() {
      $('.nav-item__grand-menu-open a').on('click', function (e) {
        e.preventDefault();
        $('.wrapper').toggleClass('menu-open');
        $('.nav-item__grand-menu-open').toggleClass('nav-item_active');
        $('.grand-menu').toggleClass('grand-menu_open');
      })
      $('.grand-menu__close-icon a').on('click', function (e) {
        e.preventDefault();
        $('.wrapper').removeClass('menu-open');
        $('.nav-item__grand-menu-open').removeClass('nav-item_active');
        $('.grand-menu').removeClass('grand-menu_open');
      })
    }

    function hamburger() {
      var hamburgerIcon = $('.hamburger-icon');
      var drilldown = $('.drilldown');
      // var drilldownTrigger = $('.nav-item__grand-menu-open');
      // var drilldownBack = $('.drilldown .navigate-back');
      // var drilldownMain = $('.drilldown-main');
      // var drilldownSecond = $('.drilldown-second');

      // Hamburger Icon toggle
      $(hamburgerIcon).on('click', function () {
        $(this).toggleClass('open');
        $(drilldown).fadeToggle();
        $('.wrapper').toggleClass('hamburger-open');
      });

      // // Drilldown Menu
      // $(drilldownTrigger).on('click', function(){
      //   $(drilldownMain).addClass('drilldown-main_hide');
      //   $(drilldownSecond).removeClass('drilldown-second_hide');
      // });
      // $(drilldownBack).on('click', function(){
      //   $(drilldownMain).removeClass('drilldown-main_hide');
      //   $(drilldownSecond).addClass('drilldown-second_hide');
      // })
    }

    menu();
    if ($(window).outerWidth() > 991) {
      if ($('.parallax').length) {

        skrollr.init();
      }
      if ($('.wrapper').hasClass('hamburger-open')) {
        $('.wrapper').removeClass('hamburger-open');
        $('.drilldown').fadeOut();
        $('.hamburger-icon').removeClass('open');
      }
    } else {
      hamburger();
    }
    $(window).on('resize', function () {
      if ($(window).outerWidth() > 991) {
        if ($('.wrapper').hasClass('hamburger-open')) {
          $('.hamburger-icon').removeClass('open');
          $('.drilldown').fadeOut();
          $('.wrapper').removeClass('hamburger-open');
        }
      }
    })


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
  (function () {
    $('#date').datepicker({
      format: 'dd.mm.yyyy',
      startDate: '-3d',
      orientation: "bottom",
      autoclose: true
    });
    $('#date').datepicker("setDate", new Date())
  })();


  //Filter select Grand Menu
  (function () {
    var filterLink = $('.grand-menu__filter-body-item a'),
      filterImg = $('.grand-menu__filter-body-item-img'),
      filterColor = $('.grand-menu__filter-body-item-color');
    $(filterLink).on('click', function (e) {
      e.preventDefault();
      $(this).toggleClass('active');
    });
    $(filterImg).on('click', function (e) {
      e.preventDefault();
      $(this).addClass('grand-menu__filter-body-item-img_active')
        .siblings()
        .removeClass('grand-menu__filter-body-item-img_active');
    });
    $(filterColor).on('click', function (e) {
      e.preventDefault();
      $(this).addClass('grand-menu__filter-body-item-color_active')
        .siblings()
        .removeClass('grand-menu__filter-body-item-color_active');
    });
  })();

  //___________________/tabs/___________________//
  (function () {
    flag = true;
    $('.tabs__link').on('click', function (e) {
      e.preventDefault();

      var
        $this = $(this),
        item = $this.closest('.tabs__item'),
        container = $this.closest('.tabs'),
        content = container.find('.tabs__content-item')
      ndx = item.index(),
        reqItem = content.eq(ndx),
        activeItem = content.filter('.tabs__content-item_active'),
        duration = 600;

      if (flag) {
        flag = false
        item.addClass('nav-item_active')
          .siblings()
          .removeClass('nav-item_active');

        activeItem.fadeOut(duration, function () {
          reqItem.fadeIn(duration, function () {
            $(this).addClass('tabs__content-item_active')
              .siblings()
              .removeClass('tabs__content-item_active');
            flag = true;
          });
        });
      }
    });
  }());
})(jQuery);

mapboxgl.accessToken = 'pk.eyJ1IjoibW9udGVzcSIsImEiOiJjanhqaDdpazMwNXhnM29vN3hjbjNmN2dnIn0.QNzx7xy4-KNOeTeyoznoNw';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [27.702352186520898, 62],
  zoom: 5.2,
});
map.scrollZoom.disable();
var geojson = {
  type: 'FeatureCollection',
  features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [24.10371227120379, 62.55478658261214]
      },
      properties: {
        title: 'ÄHTÄRI',
        description: 'K-Rauta Ähtäri' + '<br>' + 'Mäkelän Rauta Oy',
        address: '<span>Jokenkuja 4 </span>' + '<br>' + '<span>63700 ÄHTÄRI</span>'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [25.70233072883184, 62.60146453141701]
      },
      properties: {
        title: 'ÄÄNEKOSKI',
        description: 'K-Rauta Äänekoski' + '<br>' + 'Rautakumppani Oy',
        address: '<span>Rahastajantie 1</span>' + '<br>' + '<span>44100 ÄÄNEKOSKI</span>'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [30.12182072881967, 62.10213149000643]
      },
      properties: {
        title: 'KITEE',
        description: 'K-Rauta K-Maatalous Kitee' + '<br>' + 'Hurri Ky',
        address: '<span>Puhoksentie 3 </span>' + '<br>' + '<span>82500 KITEE</span>'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [24.9528299999547, 60.19006766678888]
      },
      properties: {
        title: 'HELSINKI',
        description: 'Alppi-Rauta Oy',
        address: '<span>Fleminginkatu 30</span>' + '<br>' + '<span>00510 HELSINKI</span>'
      }
    }
  ]
};


// add markers to map
geojson.features.forEach(function (marker) {
  var el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({
        offset: 25
      })
      .setHTML('<h3>' + marker.properties.title + '</h3><h4>' + marker.properties.description + '</h4><p>' + marker.properties.address + '</p>'))
    .addTo(map);
});
$('.map__zoom-in').on('click', function () {
  map.zoomIn();
});
$('.map__zoom-out').on('click', function () {
  map.zoomOut();
});