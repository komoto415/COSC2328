<?php

$my_data =  json_decode($_POST["my_data"]);
$my_data->name = "Default User";
$my_data->status = "hahahaha! You were changed to a default account!";
echo json_encode($my_data);
?>
