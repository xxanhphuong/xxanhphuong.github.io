var swiper = new Swiper('.index-swiper', {
    effect: 'coverflow',
    autoplay: {
        delay: 5000
    },
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflow: {
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
    },
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});
var swiper = new Swiper('.list-movie', {
    slidesPerView: 8,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});
$(document).ready(function () {
    var seats = 80;
    var booked = [1, 2, 32, 5, 12, 45];
    var total = 0;
    var price = 0;
    var defaulPrice = 50;
    var arrSelected = [];
    for (i = 0; i <= seats; i++) {
        if (booked.indexOf(i) === -1) {
            $('.seats').append('<div id="S' + i + '"class="seat"></div');
        }
        else {
            $('.seats').append('<div id="S' + i + '"class="seat active-seat"></div');
        }
    }
    $('.seat:not(.active-seat)').click(function () {
        if ($(this).hasClass("selected-seat")) {
            $(this).removeClass("selected-seat");
            total--;
            arrSelected.splice($.inArray($(this).attr('id'), arrSelected), 1);
        }
        else {
            $(this).addClass("selected-seat");
            total++;
            // selected = selected + $(this).attr('id');
            arrSelected.push($(this).attr('id').toString());
        }
        price = defaulPrice * total;

        console.log(arrSelected);
        $('#total').empty().append(total);
        $('#price').empty().append(price + ' USD');
        $('#seat').empty().append(arrSelected + ',');
    });
});

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function fillerFunction() {
    var input, div;
    input = document.getElementById('input-search');
    filter = input.value.toUpperCase();
    div = document.getElementById('live-search-select');
    data = div.getElementsByTagName('option');

    for (i = 0; i < data.length; i++) {
        value = data[i].value;
        if (value.toUpperCase().indexOf(filter) > -1) {
            data[i].removeAttribute("disabled", "");;
        } else {
            data[i].setAttribute("disabled", "");
        }
    }
}

//typing text effect
var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};