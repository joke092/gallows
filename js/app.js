(function() {
    var aktualneHaslo = '';
    var dostepneProby = 5;

    //startujemy gre po kliknięciu na przycisk
    function startGame() {
        $.ajax({
            type     : "POST",
            url      : "hangman_server.php",
            data     : {
                action : 'startGame'
            },
            success : function(msg) {
                dostepneProby = 5;
                ustawHaslo(msg);
                pokazProby();
                ustawLiterki();
            }
        });
    }

    //ustawiamy przyciski z literkami
    function ustawLiterki() {
        var $literki = $('.literki li');
        $literki.unbind().removeClass('disabled');
        $literki.bind('click',function() {
            var litera = $(this).text();
            check_letter(litera);
            disableButtons($(this));
        })
    }

    //wylaczamy wszystkie przyciski
    function disableButtons($guziki) {
        $guziki.addClass('disabled').unbind();
    }

    //ustawiamy haslo
    function ustawHaslo(haslo) {
        aktualneHaslo = haslo.toUpperCase();
        var $hasloList = $('.haslo');
        $hasloList.empty();
        var letters = aktualneHaslo.split('');
        for (var i=0; i<letters.length; i++) {
            if (letters[i]==' ') {
                $hasloList.append('<li class="space"></li>')
            } else {
                $hasloList.append('<li></li>')
            }
        }
    }

    function pokazProby() {
        $('.proby').text(dostepneProby);
    }

    function gameOver() {
        alert("Niestety nie udało ci się odgadnąć chasła. Ps: brzmi ono: \n\n" + aktualneHaslo);
        disableButtons($('.literki li'));
    }

    function completeGame() {
        alert('Udało ci się zgadnąć hasło :)');
        disableButtons($('.literki li'));
    }

    function isMissingLetterExists() {

        if ($('.haslo li').filter(function() {return ( !$(this).hasClass('space') && $(this).is(':empty') )? true: false}).length) {
            return true;

        } else {
            return false;
        }
    }

    function check_letter(litera) {
        var literka = litera.toUpperCase();
        if (aktualneHaslo.indexOf(literka)!=-1) {
            for (var i=0; i<aktualneHaslo.length; i++) {
                if (aktualneHaslo[i] == literka) {
                    $('.haslo li').eq(i).html(litera)
                }
            }
            if (!isMissingLetterExists()) {
                completeGame();
            }
        } else {
            //nie ma takiej litery
            dostepneProby--;
            pokazProby();

            if (dostepneProby <= 0) {
                gameOver();
            }
        }
    }

//###########################################################
    $(document).ready(function() {
        $('#startGry').click(function() {
            startGame();
        })

    })
})();