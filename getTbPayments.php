<?php 
include("./connex.php");
$request = $_REQUEST;
$col = array(
	0 => 'id_payments',
	1 => 'paymets_balance',
	2 => 'paymets_status',
	3 => 'paymets_wallet',
	4 => 'paymets_date',
); //create column like table in db
//$cnn = include 

$query = "SELECT * FROM vf_paymetns";
$result = mysqli_query($cnn, $query);

$totalData = mysqli_num_rows($result);

$totalFilter = $totalData;

$data = array();

while($row = mysqli_fetch_array($result))
{
	$subdata = array();
	$subdata[] = $row[0]; // id
	$subdata[] = $row[1]; // balance
	$subdata[] = $row[2]; // status
	$subdata[] = $row[3]; // wallet
	$subdata[] = $row[4]; // date
	$data[] = $subdata;
}

$json_data = array(
	"draw" 				=> intval($request['draw']),
	"recordsTotal"		=> intval($totalData),
	"recordsFiltered" 	=> intval($totalFilter),
	"data" 				=> $data
);

header('Content-type: application/json; charset=utf8');
 json_encode($json_data);


/*
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
*/

 ?>