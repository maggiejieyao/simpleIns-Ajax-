//store input username in localstorage
$('#submitBtn').click(function(e) {
    var username = $('#username').val();
    //input exist
    if(username.length > 0 && username.length < 50){
        //alert(username);
        $('#alertMess1').hide();
        $('#alertMess2').hide();
        //save the username to localstorage
        localStorage.setItem('user', username);
        //alert(localStorage.getItem('user'));
        window.location.href = "profilePage.html"
    //add username limit
    }else if(username.length > 50){
        $('#username').val('');
        $('#alertMess1').show();
        $('#alertMess2').hide();
    }else if(username.length <= 0){
        $('#alertMess2').show();
        $('#alertMess1').hide();
    }
    //console.log(username);
    e.preventDefault();
    e.stopPropagation();
});

