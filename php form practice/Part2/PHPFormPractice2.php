<!DOCTYPE html>
<html lang="en" dir="ltr">
  <body>
    Welcome <?php echo $_POST["name"];?> <br>
    Oh, you prefer <?php echo $_POST["mname"], "? How pretty";?>
    Really? The <?php echo $_POST["cars"], "? Loooooser"; ?>
    Your totally real email: <?php echo $_POST["email"]; ?>
    And the number I stole from you <?php echo $_POST["phone"]; ?>
  </body>
</html>
