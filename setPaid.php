<?php 
include ("./connex.php"); //include db connection. import $cnn variable.
$user_address   =  $_POST['user_address'];
$claim = 10;
$response       =  array();
//  $cnn     = include

if ($user_address != null)
{
    $query = "SELECT id_user FROM users WHERE user_address = '$user_address'";
    if (!$result = mysqli_query($cnn,$query)) 
        exit(mysqli_error($cnn));

    if (mysqli_num_rows($result) > 0) 
    {
        $data = mysqli_fetch_row($result);
        $userid = (int) $data[0];
    }

    $query2 = "SELECT * FROM wallet WHERE user_id = '$userid'";
    if (!$result = mysqli_query($cnn,$query2)) 
        exit(mysqli_error($cnn));

    if(mysqli_num_rows($result)>0)
    {
        $query3 = "SELECT wallet_balance FROM wallet WHERE user_id = '$userid'";
        if (!$result = mysqli_query($cnn,$query3)) 
            exit(mysqli_error($cnn));
    }

    $data2 = mysqli_fetch_row($result);
    $old_balance = (int) $data2[0];
    $new_balance = $old_balance + $claim;

    if(mysqli_num_rows($result)>0)
    {
        $query3 = "SELECT wallet_paids FROM wallet WHERE user_id = '$userid'";
        if (!$result = mysqli_query($cnn,$query3)) 
            exit(mysqli_error($cnn));
    }

    $data3 = mysqli_fetch_row($result);
    $wallet_paids = (int) $data3[0];
    $new_paids = $wallet_paids + 1;

	    $query4 = "UPDATE wallet SET wallet_balance = '$new_balance', wallet_paids = '$new_paids' WHERE user_id ='$userid'";
	    if (!$result = mysqli_query($cnn, $query4)) 
	    {
	        exit(mysqli_error($cnn));
	    }else{
	        $response['status'] = 200;
	        $response['message'] = "Succes !";
	        $succes = true;
	    }
	

	if (!$succes) {
	        $response['status'] = 404;
	        $response['message'] = "Invalid Request !";
	    }
	
	header('Content-type: application/json; charset=utf8');
	echo json_encode($response);

}else{
	$response['status'] = 404;
	$response['message'] = "Invalid Request !";	
}

 ?>