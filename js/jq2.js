var error = false;
$(document).ready(function() {
    
    var lim = 15;
    var username = localStorage.getItem('user');
    $("#title").append(username);
    changeLimit(lim, username);
    
    $("#limitNum").change(function(e){
        if($("#limitNum").val() > 0 && error==false){
            lim = $("#limitNum").val();
            //alert(lim);
            //clear current images
            $(".profileCon").html('');
            $(".context").html('');
            $("#clearBtn").remove();
            changeLimit(lim, username);
            if(e.keyCode == 13){
                e.preventDefault();
            }
        }
    }) 
});

//function load ajax
function changeLimit(limit, username){
    var user = 'https://api.lityapp.com/instagrams/' + username + '?limit=';
    user = user + limit
    $.ajax({
        url:user,
        beforeSend:function(){
            $('.loading').show();
        },
        complete:function(){
            $('.loading').hide();
        },
        
        success: function(data){
            var insData = JSON.parse(data)
            console.log(insData.photoUrlHD)
            //add profile image
            var profileCon = $('.profileCon');
            $('<img>').attr('src', insData.photoUrlHD).css({
                'width':150,
                'height':150,
                'border-radius': '50%'
            }).appendTo(profileCon);
            
            //add username
            var userFullName = '<p id="u">' + insData.fullName + '</p>';
            $(userFullName).appendTo($('.profileCon')).css({
                'font-size':'2em',
                'color':'gray',
                'marginTop':'5px'
            });
            
            var postList = insData.posts;
            //add following and posts
            var fp = '<p>' + postList.length + ' posts   |   ' + insData.followedBy + ' follows   |   ' + insData.following + ' following</p>';
            $(fp).appendTo($('.profileCon')).css({
                'font-size':'1.1em',
                'color':'darkgray',
                'marginTop':'-20px'
            });
            
            //add images to context
            var photoCon = $('.context');
            var carClass = $('<div class="card">');
            
            if(postList.length > 0){
                for(var i = 0; i < postList.length; i++){
                $('<img>').attr('src', postList[i].photoUrl).addClass("card-img-top").css({
                    'width': 300,
                    'height': 300,
                    'border-radius':'5px'
                }).appendTo(carClass).appendTo(photoCon);
                }
                ($(".proContainer")).append($('<input type="button" class="btn btn-light" id = "clearBtn" value="Clear All"/>')).css({
                    'text-align':'center',
                    'font-family': "'Nanum Brush Script', cursive",
                });
            }else{
                photoCon.html("This account is private").css({
                    'font-family': "'Nanum Brush Script', cursive",
                    'font-size':'1.5em'
                });
            }

            //clear all button
            $("#clearBtn").click(function(){
                $(".context").html('<a href="index.html">Click to back to Index page</a>');
                $("#clearBtn").remove();})

            },error: function(){
                //alert("err");
                $(".profileCon").html('<a href="index.html">This account not exist click back to front page</a>').css({
                    'font-family': "'Nanum Brush Script', cursive",
                    'font-size':'1.5em'
                });
                error = true;
            }
        
    });
}
