<?php 
include("./connex.php");

$user_address = $_POST['user_address'];
$payment_balance = $_POST['wallet_balance'];
$status = "pending"; //seting a default status
$response = array();
//$cnn  =  include variable

if ($user_address != null && $wallet_balance != null) 
{

	$query = "SELECT id_user FROM users WHERE user_address = '$user_address'";
	if (!$result = mysqli_query($cnn, $query))
		exit(mysqli_error($cnn));
	if (mysqli_num_rows($result) > 0) 
	{
		$data = mysqli_fetch_row($result);
		$userid = (int) $data[0];
		$query2 = "INSERT INTO vf_payments (payments_balance, payments_status, payments_wallet, payments_date) VALUES ('$payment_balance', '$status', '$user_address',now()) ";
		if (!$result = mysqli_query($cnn, $query2))
		 exit(mysqli_error($cnn));	
	}
	
	//Update the Balance

	$query3 = "SELECT wallet_unlock FROM wallet WHERE user_id = '$userid'";
	if (!$result = mysqli_query($cnn, $query3)) 
		exit(mysqli_error($cnn));

		$data2 = mysqli_fetch_row(!$result);
		$old_balance = (int) $data2[0];
		$new_balance = $old_balance + $payment_balance;

	$query4 = "SELECT wallet_withdraws FROM wallet WHERE user_id = '$userid'";
	if (!$result = mysqli_query($cnn, $query4)) 
		exit(mysqli_error($cnn));

		$data3 = mysqli_fetch_row(!$result);
		$old_withdraws = (int) $data3[0];
		$new_withdraws = $old_withdraws + 1;

	$query5 = "UPDATE wallet SET wallet_balance = 0, wallet_unlock = '$new_balance', wallet_withdraws = '$new_withdraws' WHERE user_id = '$userid'";
	if (!$result = $mysqli_query($query5)) 
		exit(mysqli_error($cnn));
	else{
			$response['status'] = 200;
	        $response['message'] = "Succes !";
	        $succes = true;
	}

	header('Content-type: application/json; charset=utf8');
	echo json_encode($response);
	
}else{
			$response['status'] = 404;
	        $response['message'] = "Invalid Request !";
}

 ?>