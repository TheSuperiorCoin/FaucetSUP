function logIn(){
    var address = $("#txtWallet").val();

    if(address == '')
        {
            $("#alert_msg").text("You need enter a Walled/Email Address");
            $("#alert_modal").modal("show");
        }
    else
    {
        $.post('./getUser.php',
               {
                user_address : address
               }).done(function(data)
                       {
                            if(data.status == 404)
                                {
                                    $("#alert_msg").text("This Address does not exist, please Sign-Up first");
                                    $("#alert_modal").modal("show");
                                }
                            else
                                {	
                                    localStorage.setItem("walle", data.user_address);
                                	setCookie();
                                	window.location.href = "faucet.html";
                                }
        });
    }
}


function verifyUser(){
        
        var name   = $('#user_name').val();
		var email  = $('#user_email').val();
		var pw     = $('#user_pw').val(); 
		var cpass  = $('#cpass').val();
		var wallet = $('#user_address').val();
		var msg    = $('#msg');
		var result = validate();

		if (name == '') 
		{ 
            $("#msg").css("visibility", "visible");
			msg.text("Your Name is Requiered! Please enter your Name or Username");
			$('#user_name').focus();
		}
		else if(email == '')
		{
            $("#msg").css("visibility", "visible");
			msg.text("Your Email is Requiered! Please enter a valid Email");
			$('#user_email').focus();
		}
		else if(!result)
		{
            $("#msg").css("visibility", "visible");
			msg.text("Enter a valid email!");
        	$("#user_email").focus();	
		}
		else if(pw == '')
		{
            $("#msg").css("visibility", "visible");
			msg.text("Password is Requiered! Please enter your Password this will be encrypted");
			$('#user_pw').focus();
		}
		else if(cpass == '' || pw != cpass)
		{
            $("#msg").css("visibility", "visible");
			msg.text("Please enter the same Password");
			$('#cpass').focus();
		}
		else if(wallet == '')
		{
            $("#msg").css("visibility", "visible");
			msg.text("Please a Wallet Address is Requiered");
			$('#user_address').focus();
		}
		else if(wallet.length != 95)
		{
            $("#msg").css("visibility", "visible");
			msg.text("Please enter a Valid Wallet Address");
			$('#user_address').focus();
		}
		else
		{ 
            /*reCaptcha request is not worcking properly
            $.ajax({
                    type: 'POST',
                    url: 'https://www.google.com/recaptcha/api/siteverify',
                    headers: 
                    {
                        'Access-Control-Allow-Origin' : "https://www.google.com/recaptcha/api/siteverify",
                    },
                    data : "6LdKHlcUAAAAANNw_Dbvb5oxQ7cFvwUcrNfKV0J1"  
                }).success(function(data) 
                {
                    if (data == "g-recaptcha-response") 
                    {
                    */
                        $.post('./newUser.php',
                            {
                                user_name    : name,
                                user_email   : email,
                                user_pw      : pw,
                                user_address : wallet
                            }).done(function(data)
                            {    

                                if(data.user_email == email)
                                {
                                    $("msg").css("visibility", "visible");
                                    $("#msg").text("There is an account registered whith this email");
                                    $("#user_email").focus();
                                }
                                else if(data.user_address == wallet)
                                {
                                    $("#msg").css("visibility", "visible");
                                    $("#msg").text("There is an account registered with this wallet address");
                                    $("#user_address").focus();
                                }         
                                else if(data.status == 404)
                                {
                                    $("#msg").css("visibility", "visible");
                                    $("#msg").text(data.message);  
                                }
                                else
                                {   
                                        
                                    //Cookie
                                    localStorage.setItem("walle", wallet);
                                    setCookie();

                                    $("#msg").text("");
                                    $("#user_address").val(wallet);
                                    $("#user_name").val("");
                                    $("#user_email").val("");
                                    $("#user_pw").val("");
                                    $("#cpass").val("");
                                    $("#user_address").val("");
                             
                                    //open modal alert
                                    $("#succes_signup_modal").modal("show");
                                    $("#spnUser").text(name);
                                    
                                }
                            });
                        
                    }
                    /*
                    else{

                         msg.text("Are you a robot? Then select the reCaptcha !!");
                         msg.focus();
                    }
                });
		}
                */
}

function validateEmail(email) {

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validate(){
    var email = $("#user_email").val();
    if (validateEmail(email))
        return true;
	else
      	return false;
} 

function setCookie(){

    var date = new Date();
    var minutes = 30;
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    Cookies.set("session", "foo", {expires : date});
}


$(document).ready(function(){
    
    $("#btnLogIn").click(function(){
        logIn();
    })
    
    $("#submit").click(function(){
        verifyUser();
    })
    
    $("#btnRedirect").click(function(){
        alert("This Could be an Add-on")
    	window.location.href = "faucet.html";
        window.open("https://www.youtube.com/watch?v=coVJIoQJx9Q", "Diseño Web", "width=300, height=200");
    })
    
    $("btnSignAlert").click(function(){
        $("#alert_modal").modal("hide");
        $("#succes_signup_modal").modal("show");
    })
});