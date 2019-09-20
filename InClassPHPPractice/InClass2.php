<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Practice PHP</title>
  </head>

  <body>
    <h1>
      Mah Name is Jeffrey
    </h1>

    <?php
    // Function #1
    // Take in two strings and compare
    // if string1 longer: right align and red text
    // if string2 longer: center align and blue test
    // if even length: left align and black text
    $string1 = "Jeffrey"; $string2 = "Bob";
    function compareStringsToFormat($string1, $string2) {
      if (strlen($string1) > strlen($string2)) {
      echo "<p style=\"text-align:right;color:red\">$string1<br>$string2</p>";
      }
      elseif (strlen($string1) < strlen($string2)){
      echo "<p style=\"text-align:center;color:blue\">$string1<br>$string2</p>";
      }
      else {
      echo "<p style=\"text-align:left;color:black\">$string1<br>$string2</p>";
      }
    }
    compareStringsToFormat($string1, $string2);
    compareStringsToFormat($string2, $string1);

    // Function #2
    // Find biggest int out of 3 ints
    // Which ever int is the largest, set its font size to 42
    $x = 14; $y = 12; $z = 10;
    function whichIstheBiggest($int1, $int2, $int3) {
      $greatestNum = max(array($int1, $int2, $int3));
      if ($greatestNum == $int1) {
        echo "<p style=\"font-size=42px\">The greatest integer is: $int1</p>";
        echo "<p> $int2 $int3</p>";
      }
      elseif ($greatestNum == $int2) {
        echo "<p style=\"font-size=42px\">The greatest integer is: $int2</p>";
        echo "<p> $int1 $int3</p>";
      }
      else {
        echo "<p style=\"font-size=42px\">The greatest integer is: $int3</p>";
        echo "<p> $int1 $int2</p>";
      }
    }
    whichIstheBiggest($x,$y,$z);
    whichIstheBiggest($y,$z,$x);
    whichIstheBiggest($z,$x,$y);


    // Function #3
    // Take a string of an image reference and create and image tag to display on page
    $image1 = "https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Eminem_Killshot.jpg/220px-Eminem_Killshot.jpg";
    $image2 = "https://images.genius.com/4a6058e1375a29d250945d7c9d47ee9d.1000x1000x1.jpg";
    function takeImageFileNameAndTagIt($string1) {
      <img src = "$string1">
    }
    takeImageFileNameAndTagIt($image1);
    takeImageFileNameAndTagIt($image2);


    // Function 4
    // Takes two ints, first one being the array size, the second the upperbound of a random num gen
    // Populate the array with the random int
    // Generate and output the average of array
    $test1_size = 10; $test1_integer = 50;
    $test2_size = ; $test2_integer = ;
    function generateFunArray($arraySize, $integerUpperBound) {
      $funArray = array();
      $arraySum = 0;
      $arrayAverage = 0;
      for ($i = 0; $i < $arraySizel; $i++) {
        $insertMe = rand(0,$integerUpperBound);
        $funArray[$i] = $insertMe;
        $arrayAverageDomi += $insertMe;
      }
      $arrayAverage = $arraySum / $arraySize;
      echo "<p style=\"text-alight:center\"> $arrayAverage</p>";
    }

  ?>
  </body>

</html>
