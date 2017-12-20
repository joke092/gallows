<?php
        $hasla = array(
        "Fantomas",
        "Super Szamson",
        "Hasło"
        );

        shuffle($hasla); //mieszamy tablicę


        if ($_POST['action']=='startGame') {
        echo $hasla[array_rand($hasla, 1)];  //wypisujemy randomowe hasło
        }
        ?>