<?php 
include("./connex.php");

$request=$_REQUEST;
$col =array(
    0   =>  'id_payments',
    1   =>  'payments_balance',
    2   =>  'payments_status',
    3   =>  'payments_wallet',
    4   =>  'payments_date'
);  //create column like table in database
$sql ="SELECT * FROM vf_payments";
$query=mysqli_query($con,$sql);
$totalData=mysqli_num_rows($query);
$totalFilter=$totalData;
//Search
$sql ="SELECT * FROM vf_payments WHERE 1=1";
if(!empty($request['search']['value'])){
    $sql.=" AND (idid_payments Like '".$request['search']['value']."%' ";
    $sql.=" OR payments_status Like '".$request['search']['value']."%' ";
    $sql.=" OR payments_wallet Like '".$request['search']['value']."%' ";
    $sql.=" OR payments_date Like '".$request['search']['value']."%' )";
}
$query=mysqli_query($con,$sql);
$totalData=mysqli_num_rows($query);
//Order
$sql.=" ORDER BY ".$col[$request['order'][0]['column']]."   ".$request['order'][0]['dir']."  LIMIT ".
    $request['start']."  ,".$request['length']."  ";
$query=mysqli_query($con,$sql);
$data=array();
while($row=mysqli_fetch_array($query)){
    $subdata=array();
    $subdata[]=$row[0]; //id
    $subdata[]=$row[1]; //amount
    $subdata[]=$row[2]; //status
    $subdata[]=$row[3]; //wallet
    $subdata[]=$row[4]; //date      
    $data[]=$subdata;
}
$json_data=array(
    "draw"              =>  intval($request['draw']),
    "recordsTotal"      =>  intval($totalData),
    "recordsFiltered"   =>  intval($totalFilter),
    "data"              =>  $data
);
echo json_encode($json_data);


/*
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

if (!$result = mysqli_query($cnn, $query))
	exit(mysqli_error($cnn));

$totalData = mysqli_fetch_rows($result);

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