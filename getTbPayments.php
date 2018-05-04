<?php 
include("./connex.php");
//$cnn = include 

$query = "SELECT * FROM vf_paymetns";
$result = mysqli_query($cnn, $query)
$table = "";

while ( $row = mysqli_fetch_array($result)) 
{
	$table.='{
				"amount":"'.$row['paymets_balance'].'",
				"status":"'.$row['paymets_status'].'",
				"address":"'.$row['paymets_address'].'",
				"date":"'.$row['paymets_date'].'",
			},';

}
	//dele the last coma JSON catching error		
	$table = substr($table,0, strlen($table) - 1);

	header('Content-type: application/json; charset=utf8');
	echo json_encode($table);

 ?>