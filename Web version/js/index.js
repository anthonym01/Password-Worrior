window.addEventListener('load',()=>{
    document.getElementById('email_put').focus();
    login.initalize();
});

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