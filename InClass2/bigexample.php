<!DOCTYPE html>
<html>
	<head>
		<title>Example PHP Page! With Methods!</title>
		<style>
			span
			{
				color: blue;
				background-color: lightgrey;
			}
			body
			{
				background-color: lightblue;
				color: olivedrab;
			}
		</style>
	</head>
	<body>
		<h1>This webpage will contain examples of a variety of PHP calls and methods!</h1>
		<span>This is here to demonstrate a span structure!</span>
		<span style="color:red">Another span demonstrations!</span>
		<?php
			// In this code we define several functions of PHP
			// We also demonstrate a variety of control structures.

			// This function takes as input a variable (string) and outputs it inside a styled paragraph tag
			$x = "This is my sentence";
			function print_center($var)
			{
			  echo "<p style=\"text-align:center;color:red\">$var</p>";
			}

			// This function will take as input a variable (int) and output a sentence that specified number of times
			$y = 6;
			function print_love($var)
			{
			  for($count = 0; $count < $var; $count++)
			  {
				echo "<p style=\"color:darksalmon\">We love to code!</p>";
				for($count2 = 0; $count2 < $count; $count2++)
				{
					echo "<br>";
				}
			  }
			}

			// This function performs basic math operations with two input variables (numbers)
			$a = 6;
			$b = 7.54;
			function print_math($var1, $var2)
			{
			  $sum = $var1 + $var2;
			  $diff = $var1 - $var2;
			  $prod = $var1 * $var2;
			  $mod = $var1 % $var2;
			  echo "<span>$sum<br>$diff<br>$prod<br>$mod<br><br></span>";
			}

			// This function determines the mean and median of an input array
			$c = array(6,1,3,15,16,12,10,8,9);
			function mean_median($var)
			{
			  $avg = 0;
			  for($i = 0; $i < count($var); $i++)
			  {
				$avg+=$var[$i];
			  }
			  $avg/=count($var);
			  echo "<span style=\"background-color:green\">The average of the array elements is: $avg<br><span>";
			  $median = 0;
			  if(count($var) % 2 == 0)
			  {
				$median = ($var[count($var) / 2] + $var[(count($var) / 2) - 1]) / 2;
			  }
			  else
			  {
				$median = $var[count($var) / 2];
			  }
			  echo "<span>The median is: $median <br><span>";
			}

			// This function takes as input an array with a sentence stored inside it, and will print it out in a variety of locations
			$d = array("This", "is", "a", "very", "simple", "sentence", "that", "is", "stored", "as", "an", "array. Big yeet", "testing", "more");
			function print_tabs($var1)
			{
			  for($i=0; $i < count($var1); $i++)
			  {
				//echo $i."<br>";
				$y = $i % 3;
				switch($y)
				{
				  case 0:
					echo "<p style=\"text-align:left\">$var1[$i]</p>";
					break;
				  case 1:
					echo "<p style=\"text-align:center\">$var1[$i]</p>";
					break;
				  case 2:
					echo "<p style=\"text-align:right\">$var1[$i]</p>";
					break;
				}
			  }
			}

			// This function will take as input an array size. It will generate an array of random integers, and then create a single contiguous span of the numbers, with their colors changing depending on the value.
			$e = 10;
			function print_nums($var)
			{
				$my_array = array();
				for($i= 0; $i < $var; $i++)
				{
					$my_array[$i] = rand(0,29);
				}
				//var_dump($my_array);
				$i = 0;
				while($i < $var)
				{
					if($my_array[$i] < 10)
					{
						echo "<span style=\"color:navy\">$my_array[$i] </span>";
					}
					elseif($my_array[$i] < 20)
					{
						echo "<span style=\"color:peru;background-color:peachpuff\">$my_array[$i] </span>";
					}
					else
					{
						echo "<span style=\"background-color:steelblue;color:lime\">$my_array[$i] </span>";
					}
					$i++;
				}
			}

			print_center($x);
			print_love($y);
			print_math($a, $b);
			mean_median($c);
			print_tabs($d);
			print_nums($e);
		?>
	</body>
</html>
