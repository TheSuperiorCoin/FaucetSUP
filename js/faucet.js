var succes = true; //variable to handle the timer

function getBalance(){
    
    if(!!Cookies.get('session'))
        var address = localStorage.getItem("walle");

    $.post('./getBalance.php',
    {
        user_address : address
    }).done(function(data){
        //var user = JSON.parse(data);
        if(data.status == 404)
        {
            alert(data.message);
        }
        else{
            $("#balance").text(data.wallet_balance);
            $("#unlock-balance").text(data.wallet_unlock);
            $("#total").text(data.wallet_total);
            
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
            if(succes)
            {
                $('#spnTimer').timer({
                    countdown: true,
                    duration: '1m',
                    callback: function() {
                        $("#aClaim").css("color", "orange");
                        $("#btnClaim").css("visibility", "visible");
                    },
                    repeat: true //repeatedly calls the callback you specify
                });
                
                succes = false; //this is not worcking propetly
            }
        }
    });
    
    alert(succes);
}

function getPaid(e){
    $("#btnClaim").click(function(){
        
    });
    
    $("#btnWithdraw").click(function(){
        
    });
}


$(document).ready(function(){
    //start once page is load
    getBalance();
});