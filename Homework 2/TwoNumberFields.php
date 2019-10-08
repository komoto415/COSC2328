<!DOCTYPE html>
<html lang="en" dir="ltr">
  <body>
    You want to do the operation <?php echo $_POST["num1"],$_POST["operation"],$_POST["num2"];?>
    <!-- // Calculator Function -->
    <?php
    $num1 = $_POST["num1"];
    $num2 = $_POST["num2"];
    $op = $_POST["operation"];
    if ($op == "+") {
      echo ($num1 + $num2);
    }
    else if ($op == "-") {
      echo ($num1 - $num2);
    }
    else if ($op == "*") {
      echo (>$num1 * $num2);
    }
    elseif ($op == "/") {
      echo ($num1 / $num2);
    }
     ?>
  </body>
</html>
