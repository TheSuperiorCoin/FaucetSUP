<?php 
include ("./connex.php"); //include db connection. import $cnn variable.

    $user_name    = $_POST['user_name'];
    $user_email   = $_POST['user_email'];
    $user_pw      = $_POST['user_pw'];
    $user_address = $_POST['user_address'];
    $response= array();
    $type    = 0; //user_type will be 0 by default as player 1 will be donate member
//  $cnn     = include
 if($user_name != null && $user_email != null && $user_pw != null && $user_address != null)   
 {
	$query = "SELECT * FROM users WHERE user_email = '$user_email' or user_address = '$user_address'";
	if (!$result = mysqli_query($cnn, $query))
        exit(mysqli_error($conn));
    if(mysqli_num_rows($result) > 0)
    {
    	while($row = mysqli_fetch_assoc($result))
    	{
    		$response = $row;
    	}
    }
    else
    {
    	$salted = "4566654jyttgdjgghjygg".$user_pw."yqwsx6890d"; //encryptin pw
        $hashed = hash("sha512", $salted); //encryptin pw
    	$query = "INSERT INTO users(user_name, user_email, user_pw, user_address, user_type) VALUES('$user_name','$user_email','$hashed','$user_address','$type')";

    	if(!$result = mysqli_query($cnn,$query)) 
    	{
    		exit(mysqli_error($cnn));
    	}else{
            $query2 = "SELECT id_user FROM users WHERE user_address = '$user_address'";
            if(!$result = mysqli_query($cnn,$query2)) 
            {
                exit(mysqli_error($cnn));
            }
            
            $response = mysqli_fetch_row($result);
            $query3 = "INSERT INTO wallet(wallet_balance,wallet_unlock,balance_total,user_id)VALUES(0, 0, 0, '$response')";
    
        }

         $response['status'] = 200;
         $response['message'] = "Succes !";

    }
    header('Content-type: application/json; charset=utf8');
    echo json_encode($response);
}
else
{
	$response['status'] = 404;
	$response['message'] = "Invalid Request !";
}

 ?>