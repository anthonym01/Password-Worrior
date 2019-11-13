window.addEventListener('load',()=>{
    document.getElementById('email_put').focus();
    login.initalize();


    close_loading();
});

function close_loading(){
    document.getElementById('page_shade').style.backgroundColor="rgba(0,0,0,0)";
    setTimeout(()=>{
        document.getElementById('login_screen').style.transform="translate(0,105vh)";
        document.getElementById('page_shade').style.display="none";
    },1000);
}

let login = {
    initalize:function(){
        document.getElementById('login_btn').addEventListener('click',()=>{
            document.getElementById('login_btn').className="swapbtn_active";
            document.getElementById('signup_btn').className="swapbtn";
        });
        document.getElementById('signup_btn').addEventListener('click',()=>{
            document.getElementById('login_btn').className="swapbtn";
            document.getElementById('signup_btn').className="swapbtn_active";
        });
    },
}
