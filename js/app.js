var aktualneHaslo = ''; //aktualnie pobrane hasło
var dostepneProby = 5; //ile prób zostało dla aktualnej gry

//startujemy gre po kliknięciu na przycisk
function startGame() {
    $.ajax({
        type     : "POST",
        url      : "hangman_server.php",
        data     : {
            action : 'startGame'
        },
        success : function(return) {
        dostepneProby = 5;
        ustawHaslo(return);
        pokazProby();
        ustawLiterki();
    }
});
}