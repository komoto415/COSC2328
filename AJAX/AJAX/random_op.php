<?php
    $num1 = mt_rand(0,100);
    $num2 = mt_rand(0, 100);
    $choice = mt_rand(0, 100);
    
    if($choice < 25)
    {
        $num3= $num1 + $num2;
        echo $num1.' + '.$num2.' = '.$num3.'<br>';
    }
    elseif($choice < 50)
    {
        $num3 = $num1 - $num2;
        echo $num1.' - '.$num2.' = '.$num3.'<br>';
    }
    elseif($choice < 75)
    {
        $num3 = $num1 * $num2;
        echo $num1.' * '.$num2.' = '.$num3.'<br>';
    }
    else
    {
        $num3 = $num1 / $num2;
        echo $num1.' / '.$num2.' = '.$num3.'<br>';
    }
?>