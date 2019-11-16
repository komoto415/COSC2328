<?php
	$result = "";
	$skip = false;
	$op = $_POST["op"];
	$num1 = $_POST["num1"];
	$num2 = $_POST["num2"];
	if($_POST["op"] == "No Op")
	{
		$result .= "No Operation Selected. ";
		$skip = true;
	}
	if($_POST["num1"] == "")
	{
		$result .= "No Num1 Entered. ";
		$skip = true;
	}
	if($_POST["num2"] == "")
	{
		$result .= "No Num2 Entered ";
		$skip = true;
	}
	if(!$skip)
	{
		$op = $_POST["op"];
		$num1 = $_POST["num1"];
		$num2 = $_POST["num2"];
		if($op == "plus")
		{
			$val = $num1 + $num2;
			$result = "$num1 + $num2 = $val";
		}
		elseif($op == "subt")
		{
			$val = $num1 - $num2;
			$result = "$num1 - $num2 = $val";
		}
		elseif($op == "mult")
		{
			$val = $num1 * $num2;
			$result = "$num1 * $num2 = $val";
		}
		else
		{
			$val = $num1 / $num2;
			$result = "$num1 / $num2 = $val";
		}
	}
	echo $result;
?>