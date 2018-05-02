

/*main JS*/
$(document).ready(function() {
  $('.classes-carousel').owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });

  $('.trainers-carousel').owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });

  $('.testimonials-carousel').owlCarousel({
    loop: true,
    margin: 40,
    items: 1,
    animateOut: 'fadeOut',
    autoplay: true,
    mouseDrag: false,
    autoplayTimeout: 12000,
    autoplayHoverPause: true,
  });

  // Устанавливаем обработчик потери фокуса для всех полей ввода текста
  $('input#full_name, input#phone').unbind().blur(function() {

    // Для удобства записываем обращения к атрибуту и значению каждого поля в переменные
    var id = $(this).attr('id');
    var val = $(this).val();

    // После того, как поле потеряло фокус, перебираем значения id, совпадающие с id данного поля
    switch (id) {
        // Проверка поля "Имя"
      case 'full_name':
        var rv_name = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/; // используем регулярное выражение

        // Eсли длина имени больше 2 символов, оно не пустое и удовлетворяет рег. выражению,
        // то добавляем этому полю класс .not_error,

        if (val.length > 2 && val != '' && rv_name.test(val)) {
          $(this).removeClass('error');
          $(this).addClass('not_error');
          $(this).next('.error-box').text(' ');
        }

        // Иначе, мы удаляем класс not-error и заменяем его на класс error, говоря о том
        // что поле содержит ошибку валидации,
        // и ниже в наш контейнер выводим сообщение об ошибке и параметры для верной валидации
        else {
          $(this).removeClass('not_error').addClass('error');
          $(this).next('.error-box').html(`required, only letters`);

        }
        break;

        // Проверка email
      case 'phone':
        var rv_email = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
        if (val != '' && rv_email.test(val)) {
          $(this).removeClass('error');
          $(this).addClass('not_error');
          $(this).next('.error-box').text(' ');
        }
        else {
          $(this).removeClass('not_error').addClass('error');
          $(this).next('.error-box').html(`required`);

        }
        break;

    } // end switch(...)

  }); // end blur()

  $('nav .navbar-nav').on('click', 'a', function(event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();
    //забираем идентификатор бока с атрибута href
    var id = $(this).attr('href'),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
        top;
    //анимируем переход на расстояние - top за 1100 мс

    if ($(window).outerWidth() < 769) {
      $('nav .navbar-toggle').click();
      top = $(id).offset().top;
      $('body,html').animate({scrollTop: top}, 1000);
    } else {
      if ($(this).parents('.stiky-nav').length) {
        top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
      } else {
        top = $(id).offset().top - 80;
        $('body,html').animate({scrollTop: top}, 1000);
      }
    }

  });

  $(window).scroll(function() {
    headerStiky();
    lincActive();

  });

  function headerStiky() {
    if ($(this).scrollTop() > 136) {
      $('.header').addClass('stiky navbar-dark');
      $('.light-logo').css('display', 'none')
      $('.darck-logo').css('display', 'block')
    } else {
      $('.light-logo').css('display', 'block')
      $('.darck-logo').css('display', 'none')
      if($(window).outerWidth() < 991){
        $('.header').addClass('stiky')
      }else {
        $('.header').removeClass('stiky navbar-dark');
      }

    }
  }

  function lincActive() {
    let $sections = $('section');
    $sections.each(function(i, el) {
      let top = $(el).offset().top - 200,
          bottom = top + $(el).height(),
          scroll = $(window).scrollTop(),
          id = $(el).attr('id');

      if (scroll > top && scroll < bottom) {
        $('a.active').removeClass('active');
        $('a[href="#' + id + '"]').addClass('active');

      }
    });
  }

  headerStiky();
  lincActive();


  if($(window).outerWidth() < 991){
    $('.header').addClass('navbar-dark')
  }

});

//google-map
$(document).ready(function() {

  let el = $('#location').attr('data-lat-lng').split(',')
  let uluru = {lat: +el[0], lng: +el[1]};
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: uluru,
    disableDefaultUI: true,
    styles:[
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e9e9e9"
          },
          {
            "lightness": 17
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          },
          {
            "lightness": 20
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "lightness": 17
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "lightness": 29
          },
          {
            "weight": 0.2
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "lightness": 18
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          },
          {
            "lightness": 21
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dedede"
          },
          {
            "lightness": 21
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#ffffff"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "saturation": 36
          },
          {
            "color": "#333333"
          },
          {
            "lightness": 40
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f2f2f2"
          },
          {
            "lightness": 19
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#fefefe"
          },
          {
            "lightness": 20
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#fefefe"
          },
          {
            "lightness": 17
          },
          {
            "weight": 1.2
          }
        ]
      }
    ]
  });

  let iconBase = './img/marker.png';
  let marker = new google.maps.Marker({
    position: uluru,
    icon: iconBase,
    map: map,
  });

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuLyptYWluIEpTKi9cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgJCgnLmNsYXNzZXMtY2Fyb3VzZWwnKS5vd2xDYXJvdXNlbCh7XHJcbiAgICBsb29wOiB0cnVlLFxyXG4gICAgbWFyZ2luOiAzMCxcclxuICAgIG5hdjogdHJ1ZSxcclxuICAgIG5hdlRleHQ6IFsnJywgJyddLFxyXG4gICAgcmVzcG9uc2l2ZToge1xyXG4gICAgICAwOiB7XHJcbiAgICAgICAgaXRlbXM6IDEsXHJcbiAgICAgIH0sXHJcbiAgICAgIDYwMDoge1xyXG4gICAgICAgIGl0ZW1zOiAyLFxyXG4gICAgICB9LFxyXG4gICAgICAxMDAwOiB7XHJcbiAgICAgICAgaXRlbXM6IDMsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICAkKCcudHJhaW5lcnMtY2Fyb3VzZWwnKS5vd2xDYXJvdXNlbCh7XHJcbiAgICBsb29wOiB0cnVlLFxyXG4gICAgbWFyZ2luOiAwLFxyXG4gICAgbmF2OiB0cnVlLFxyXG4gICAgbmF2VGV4dDogWycnLCAnJ10sXHJcbiAgICByZXNwb25zaXZlOiB7XHJcbiAgICAgIDA6IHtcclxuICAgICAgICBpdGVtczogMixcclxuICAgICAgfSxcclxuICAgICAgNjAwOiB7XHJcbiAgICAgICAgaXRlbXM6IDMsXHJcbiAgICAgIH0sXHJcbiAgICAgIDEwMDA6IHtcclxuICAgICAgICBpdGVtczogNSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gICQoJy50ZXN0aW1vbmlhbHMtY2Fyb3VzZWwnKS5vd2xDYXJvdXNlbCh7XHJcbiAgICBsb29wOiB0cnVlLFxyXG4gICAgbWFyZ2luOiA0MCxcclxuICAgIGl0ZW1zOiAxLFxyXG4gICAgYW5pbWF0ZU91dDogJ2ZhZGVPdXQnLFxyXG4gICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICBtb3VzZURyYWc6IGZhbHNlLFxyXG4gICAgYXV0b3BsYXlUaW1lb3V0OiAxMjAwMCxcclxuICAgIGF1dG9wbGF5SG92ZXJQYXVzZTogdHJ1ZSxcclxuICB9KTtcclxuXHJcbiAgLy8g0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0L/QvtGC0LXRgNC4INGE0L7QutGD0YHQsCDQtNC70Y8g0LLRgdC10YUg0L/QvtC70LXQuSDQstCy0L7QtNCwINGC0LXQutGB0YLQsFxyXG4gICQoJ2lucHV0I2Z1bGxfbmFtZSwgaW5wdXQjcGhvbmUnKS51bmJpbmQoKS5ibHVyKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8vINCU0LvRjyDRg9C00L7QsdGB0YLQstCwINC30LDQv9C40YHRi9Cy0LDQtdC8INC+0LHRgNCw0YnQtdC90LjRjyDQuiDQsNGC0YDQuNCx0YPRgtGDINC4INC30L3QsNGH0LXQvdC40Y4g0LrQsNC20LTQvtCz0L4g0L/QvtC70Y8g0LIg0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuICAgIHZhciBpZCA9ICQodGhpcykuYXR0cignaWQnKTtcclxuICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuICAgIC8vINCf0L7RgdC70LUg0YLQvtCz0L4sINC60LDQuiDQv9C+0LvQtSDQv9C+0YLQtdGA0Y/Qu9C+INGE0L7QutGD0YEsINC/0LXRgNC10LHQuNGA0LDQtdC8INC30L3QsNGH0LXQvdC40Y8gaWQsINGB0L7QstC/0LDQtNCw0Y7RidC40LUg0YEgaWQg0LTQsNC90L3QvtCz0L4g0L/QvtC70Y9cclxuICAgIHN3aXRjaCAoaWQpIHtcclxuICAgICAgICAvLyDQn9GA0L7QstC10YDQutCwINC/0L7Qu9GPIFwi0JjQvNGPXCJcclxuICAgICAgY2FzZSAnZnVsbF9uYW1lJzpcclxuICAgICAgICB2YXIgcnZfbmFtZSA9IC9eW2EtekEtWiddW2EtekEtWi0nIF0rW2EtekEtWiddPyQvOyAvLyDQuNGB0L/QvtC70YzQt9GD0LXQvCDRgNC10LPRg9C70Y/RgNC90L7QtSDQstGL0YDQsNC20LXQvdC40LVcclxuXHJcbiAgICAgICAgLy8gRdGB0LvQuCDQtNC70LjQvdCwINC40LzQtdC90Lgg0LHQvtC70YzRiNC1IDIg0YHQuNC80LLQvtC70L7Qsiwg0L7QvdC+INC90LUg0L/Rg9GB0YLQvtC1INC4INGD0LTQvtCy0LvQtdGC0LLQvtGA0Y/QtdGCINGA0LXQsy4g0LLRi9GA0LDQttC10L3QuNGOLFxyXG4gICAgICAgIC8vINGC0L4g0LTQvtCx0LDQstC70Y/QtdC8INGN0YLQvtC80YMg0L/QvtC70Y4g0LrQu9Cw0YHRgSAubm90X2Vycm9yLFxyXG5cclxuICAgICAgICBpZiAodmFsLmxlbmd0aCA+IDIgJiYgdmFsICE9ICcnICYmIHJ2X25hbWUudGVzdCh2YWwpKSB7XHJcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xyXG4gICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnbm90X2Vycm9yJyk7XHJcbiAgICAgICAgICAkKHRoaXMpLm5leHQoJy5lcnJvci1ib3gnKS50ZXh0KCcgJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQmNC90LDRh9C1LCDQvNGLINGD0LTQsNC70Y/QtdC8INC60LvQsNGB0YEgbm90LWVycm9yINC4INC30LDQvNC10L3Rj9C10Lwg0LXQs9C+INC90LAg0LrQu9Cw0YHRgSBlcnJvciwg0LPQvtCy0L7RgNGPINC+INGC0L7QvFxyXG4gICAgICAgIC8vINGH0YLQviDQv9C+0LvQtSDRgdC+0LTQtdGA0LbQuNGCINC+0YjQuNCx0LrRgyDQstCw0LvQuNC00LDRhtC40LgsXHJcbiAgICAgICAgLy8g0Lgg0L3QuNC20LUg0LIg0L3QsNGIINC60L7QvdGC0LXQudC90LXRgCDQstGL0LLQvtC00LjQvCDRgdC+0L7QsdGJ0LXQvdC40LUg0L7QsSDQvtGI0LjQsdC60LUg0Lgg0L/QsNGA0LDQvNC10YLRgNGLINC00LvRjyDQstC10YDQvdC+0Lkg0LLQsNC70LjQtNCw0YbQuNC4XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdub3RfZXJyb3InKS5hZGRDbGFzcygnZXJyb3InKTtcclxuICAgICAgICAgICQodGhpcykubmV4dCgnLmVycm9yLWJveCcpLmh0bWwoYHJlcXVpcmVkLCBvbmx5IGxldHRlcnNgKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAvLyDQn9GA0L7QstC10YDQutCwIGVtYWlsXHJcbiAgICAgIGNhc2UgJ3Bob25lJzpcclxuICAgICAgICB2YXIgcnZfZW1haWwgPSAvXihcXHMqKT8oXFwrKT8oWy0gXygpOj0rXT9cXGRbLSBfKCk6PStdPyl7MTAsMTR9KFxccyopPyQvO1xyXG4gICAgICAgIGlmICh2YWwgIT0gJycgJiYgcnZfZW1haWwudGVzdCh2YWwpKSB7XHJcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xyXG4gICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnbm90X2Vycm9yJyk7XHJcbiAgICAgICAgICAkKHRoaXMpLm5leHQoJy5lcnJvci1ib3gnKS50ZXh0KCcgJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnbm90X2Vycm9yJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XHJcbiAgICAgICAgICAkKHRoaXMpLm5leHQoJy5lcnJvci1ib3gnKS5odG1sKGByZXF1aXJlZGApO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgfSAvLyBlbmQgc3dpdGNoKC4uLilcclxuXHJcbiAgfSk7IC8vIGVuZCBibHVyKClcclxuXHJcbiAgJCgnbmF2IC5uYXZiYXItbmF2Jykub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgLy/QvtGC0LzQtdC90Y/QtdC8INGB0YLQsNC90LTQsNGA0YLQvdGD0Y4g0L7QsdGA0LDQsdC+0YLQutGDINC90LDQttCw0YLQuNGPINC/0L4g0YHRgdGL0LvQutC1XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgLy/Qt9Cw0LHQuNGA0LDQtdC8INC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGAINCx0L7QutCwINGBINCw0YLRgNC40LHRg9GC0LAgaHJlZlxyXG4gICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKCdocmVmJyksXHJcbiAgICAgICAgLy/Rg9C30L3QsNC10Lwg0LLRi9GB0L7RgtGDINC+0YIg0L3QsNGH0LDQu9CwINGB0YLRgNCw0L3QuNGG0Ysg0LTQviDQsdC70L7QutCwINC90LAg0LrQvtGC0L7RgNGL0Lkg0YHRgdGL0LvQsNC10YLRgdGPINGP0LrQvtGA0YxcclxuICAgICAgICB0b3A7XHJcbiAgICAvL9Cw0L3QuNC80LjRgNGD0LXQvCDQv9C10YDQtdGF0L7QtCDQvdCwINGA0LDRgdGB0YLQvtGP0L3QuNC1IC0gdG9wINC30LAgMTEwMCDQvNGBXHJcblxyXG4gICAgaWYgKCQod2luZG93KS5vdXRlcldpZHRoKCkgPCA3NjkpIHtcclxuICAgICAgJCgnbmF2IC5uYXZiYXItdG9nZ2xlJykuY2xpY2soKTtcclxuICAgICAgdG9wID0gJChpZCkub2Zmc2V0KCkudG9wO1xyXG4gICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHRvcH0sIDEwMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCQodGhpcykucGFyZW50cygnLnN0aWt5LW5hdicpLmxlbmd0aCkge1xyXG4gICAgICAgIHRvcCA9ICQoaWQpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHRvcH0sIDEwMDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvcCA9ICQoaWQpLm9mZnNldCgpLnRvcCAtIDgwO1xyXG4gICAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogdG9wfSwgMTAwMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfSk7XHJcblxyXG4gICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICBoZWFkZXJTdGlreSgpO1xyXG4gICAgbGluY0FjdGl2ZSgpO1xyXG5cclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gaGVhZGVyU3Rpa3koKSB7XHJcbiAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDEzNikge1xyXG4gICAgICAkKCcuaGVhZGVyJykuYWRkQ2xhc3MoJ3N0aWt5IG5hdmJhci1kYXJrJyk7XHJcbiAgICAgICQoJy5saWdodC1sb2dvJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKVxyXG4gICAgICAkKCcuZGFyY2stbG9nbycpLmNzcygnZGlzcGxheScsICdibG9jaycpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKCcubGlnaHQtbG9nbycpLmNzcygnZGlzcGxheScsICdibG9jaycpXHJcbiAgICAgICQoJy5kYXJjay1sb2dvJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKVxyXG4gICAgICBpZigkKHdpbmRvdykub3V0ZXJXaWR0aCgpIDwgOTkxKXtcclxuICAgICAgICAkKCcuaGVhZGVyJykuYWRkQ2xhc3MoJ3N0aWt5JylcclxuICAgICAgfWVsc2Uge1xyXG4gICAgICAgICQoJy5oZWFkZXInKS5yZW1vdmVDbGFzcygnc3Rpa3kgbmF2YmFyLWRhcmsnKTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGxpbmNBY3RpdmUoKSB7XHJcbiAgICBsZXQgJHNlY3Rpb25zID0gJCgnc2VjdGlvbicpO1xyXG4gICAgJHNlY3Rpb25zLmVhY2goZnVuY3Rpb24oaSwgZWwpIHtcclxuICAgICAgbGV0IHRvcCA9ICQoZWwpLm9mZnNldCgpLnRvcCAtIDIwMCxcclxuICAgICAgICAgIGJvdHRvbSA9IHRvcCArICQoZWwpLmhlaWdodCgpLFxyXG4gICAgICAgICAgc2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgaWQgPSAkKGVsKS5hdHRyKCdpZCcpO1xyXG5cclxuICAgICAgaWYgKHNjcm9sbCA+IHRvcCAmJiBzY3JvbGwgPCBib3R0b20pIHtcclxuICAgICAgICAkKCdhLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKCdhW2hyZWY9XCIjJyArIGlkICsgJ1wiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaGVhZGVyU3Rpa3koKTtcclxuICBsaW5jQWN0aXZlKCk7XHJcblxyXG5cclxuICBpZigkKHdpbmRvdykub3V0ZXJXaWR0aCgpIDwgOTkxKXtcclxuICAgICQoJy5oZWFkZXInKS5hZGRDbGFzcygnbmF2YmFyLWRhcmsnKVxyXG4gIH1cclxuXHJcbn0pO1xyXG5cclxuLy9nb29nbGUtbWFwXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cclxuICBsZXQgZWwgPSAkKCcjbG9jYXRpb24nKS5hdHRyKCdkYXRhLWxhdC1sbmcnKS5zcGxpdCgnLCcpXHJcbiAgbGV0IHVsdXJ1ID0ge2xhdDogK2VsWzBdLCBsbmc6ICtlbFsxXX07XHJcbiAgbGV0IG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XHJcbiAgICB6b29tOiAxMSxcclxuICAgIGNlbnRlcjogdWx1cnUsXHJcbiAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxyXG4gICAgc3R5bGVzOltcclxuICAgICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZTllOWU5XCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDE3XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZjVmNWY1XCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDIwXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogMTdcclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDI5XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBcIndlaWdodFwiOiAwLjJcclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5hcnRlcmlhbFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDE4XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiAxNlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBcImNvbG9yXCI6IFwiI2Y1ZjVmNVwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiAyMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kucGFya1wiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZGVkZWRlXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDIxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LnN0cm9rZVwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDE2XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBcInNhdHVyYXRpb25cIjogMzZcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMzMzMzMzXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDQwXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZjJmMmYyXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDE5XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZlZmVmZVwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiAyMFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZVwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZlZmVmZVwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiAxN1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJ3ZWlnaHRcIjogMS4yXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfSk7XHJcblxyXG4gIGxldCBpY29uQmFzZSA9ICcuL2ltZy9tYXJrZXIucG5nJztcclxuICBsZXQgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICBwb3NpdGlvbjogdWx1cnUsXHJcbiAgICBpY29uOiBpY29uQmFzZSxcclxuICAgIG1hcDogbWFwLFxyXG4gIH0pO1xyXG5cclxufSk7Il0sImZpbGUiOiJtYWluLmpzIn0=
