<?php
  $name = $_POST["name"];
  $nname = $_POST["nname"];
  $class = $_POST["class"];
  $major = $_POST["major"];
  $email = $_POST["email"];
  $phone = $_POST["phone"];
  echo "Welcome: $name<br>", 
  "Your nickname is: $nname <br>",
  "You are in: $class<br>", 
  "Your major is: $major <br>", 
  "Your email is: $email <br>",
  "Your phone number is: $phone <br>";
?>
