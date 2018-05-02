
function getBalance(){
    
    if(!!Cookies.get('session'))
        var address = localStorage.getItem("walle");

    $.post('./getBalance.php',
    {
        user_address : address
    }).done(function(data){
        
        if(data.status == 404)
        {
            alert(data.message);
        }
        else{
            $("#balance").text(data.wallet_balance);
            $("#unlock-balance").text(data.wallet_unlock);
            
            
            if(data.wallet_balance >= 50)
                {
                    $("#spnPaidMsg").text("You are avialable to windraw your SUPs now !");
                    $("#btnWithdraw").css("visibility", "visible");
                }
            else{
                $("#spnPaidMsg").text("You need 50-SUPs or more to get paid ! Keep playing");
                $("#btnWithdraw").css("visibility", "hidden");
            }
            
            //START TIMER
            setTimer();

        }
    });

}

function setPaid(){
	var address        = localStorage.getItem("walle");

        $.post('./setPaid.php',
        {
        	user_address : address
        }).done(function(data){
        	if(data.status == 404)
        		alert(data.message);
        	else{
        		$("#btnClaim").css("visibility", "hide");
        		$("#aClaim").css("color", "white");
        		$("#modal1").modal("hide");
        		window.location.reload();
        	}

        });
}

function setWithdraws(){
    var address     = localStorage.getItem("walle");

    $.post('./setPayments.php',
    {
        user_address   : address
    }).done(function(data){
        if (data.status == 404)
            alert(data.message);
        else{
                alert("your Payment had a Successfully process")
                $("#btnClaim").css("visibility", "hide");
                $("#aClaim").css("color", "white");
                $("#modal1").modal("hide");
                window.location.reload();
        }
    });

}

function setTimer(){
	 
     $('#spnTimer').timer({
            countdown: true,
            duration: '1m',      // This will start the countdown from 3 mins 40 seconds
            callback: function() 
            {  // This will execute after the duration has elapsed
                $("#aClaim").css("color", "orange");
                $("#btnClaim").css("visibility", "visible");
            },
            repeat: false
    });
}


$(document).ready(function(){
    //start once page is load
    getBalance();

    $("#btnClaim").click(function(){
        alert("This could an Add-On");
        window.open("https://www.youtube.com/watch?v=coVJIoQJx9Q", "Diseño Web", "width=300, height=200");
    	setPaid();
    })

    $("#btnWithdraw").click(function(){
        alert("This could an Add-On");
        window.open("https://www.youtube.com/watch?v=coVJIoQJx9Q", "Diseño Web", "width=300, height=200");
        setWithdraws();
    })

    $("#btnLogOut").click(function(){
    	Cookies.remove('session');
    	window.location.href = "index.html";
    })
});