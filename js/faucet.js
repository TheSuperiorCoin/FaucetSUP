
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
            $("#destination").val(address);

        }
    });

    //GET POOL BALANCE
    var xhttp = new XMLHttpRequest(); 
    //CHECK STATUS VALUES -IF-ADD TEXT TO DIV -ELSE-NO CONNECTION MESSAGE
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                $("#spnPoolAmount").text(this.response);
            }
            else{
            	$("#spnPoolAmount").text("INVALID CONNECTION");
            }
        };
    xhttp.open("GET","pool-show.php", true); //(METHOD,URL,BOOLEAN)
    xhttp.send();// SEND THE REQUEST

}

function setPaid(){
	var address        = localStorage.getItem("walle");

        $.post('./checkClaims.php',
        {
        	user_address : address
        }).done(function(data){
        	var values  = JSON.parse(data);
                value  = values[0];
            var     m  = parseInt(value);

            if(data.status == 404)
                alert(data.message);
            else if ( m < 1) 
            {
                $wait = (1 - m);
                alert("You have to wait "+$wait+" minutes to claim!")
            }
        	else{

                $.post('./setPaid.php',
                {
                    user_address : address
                }).done(function(data){

        		$("#btnClaim").css("visibility", "hide");
        		$("#aClaim").css("color", "white");
        		$("#modal1").modal("hide");
        		window.location.reload();
                });
        	}

        });
}

function setPayments(){
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

function getTbPayments(){
   
    $("#tb-payments").DataTable({
        "bDeferRender"    : true,
        "sPaginationType" : "full_numbers",
        "ajax" : {"url" : "./getTbPayments.php", "type" : "POST"},
        "columns" : [
                    {"data" : "amount"},
                    {"data" : "status"},
                    {"data" : "address"},
                    {"data" : "date"}
                    ],
        "sLengthMenu" : 'Show <select>'+
            '<option value="10">10</optnion>'+
            '<select> records',
        "sLoadingRecords" : "Please wait records are coming....",
        "oPaginate" : {
                        "sFirst"    : "1",
                        "sLast"     : "10",
                        "sNext"     : "next",
                        "sPrevious" : "back"
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
    //getTbPayments();
    
    $("#btnClaim").click(function(){
        alert("This could an Add-On");
        window.open("https://www.youtube.com/watch?v=coVJIoQJx9Q", "Diseño Web", "width=300, height=200");
    	setPaid();
    })

    $("#btnWithdraw").click(function(){
        alert("This could an Add-On");
        window.open("https://www.youtube.com/watch?v=coVJIoQJx9Q", "Diseño Web", "width=300, height=200");
        setPayments();
    })

    $("#btnLogOut").click(function(){
    	Cookies.remove('session');
    	window.location.href = "index.html";
    })
});