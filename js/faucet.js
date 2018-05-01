
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
            
            
            if(data.wallet_unlock >= 50)
                {
                    $("#spnPaidMsg").text("You are avialable to windraw your SUPs now !");
                    $("#btnWithdraw").css("visibility", "visible");
                }
            else{
                $("#spnPaidMsg").text("You need 50-SUP or more to get paid ! Keep playing");
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

function setTimer(){
	 $('#spnTimer').timer({
                    countdown: true,
                    duration: '10s',
                    callback: function() {
                        $("#aClaim").css("color", "orange");
                        $("#btnClaim").css("visibility", "visible");
                    },
                    repeat: true //repeatedly calls the callback you specify
                });
}


$(document).ready(function(){
    //start once page is load
    getBalance();

    $("#btnClaim").click(function(){
    	setPaid();
    })

    $("#btnWithdraw").click(function(){

    })

    $("#btnLogOut").click(function(){
    	Cookies.remove('session');
    	window.location.href = "index.html";
    })
});
