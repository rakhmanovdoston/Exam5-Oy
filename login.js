const usernameInput =document.getElementsByName("username")[0];
const passwordInput =document.getElementsByName("password")[0];
const form =document.querySelector("form");
const loginButton =document.querySelector("button[type='submit']");

let username,password;
init();

function init(){

    redirect();

    usernameInput.oninput =function(event){
        username =event.target.value.trim();
        toggleBUtton();
    };

    passwordInput.oninput =function(){
        password =event.target.value.trim();
        toggleBUtton();
    };

    form.onsubmit =async function(event){
        event.preventDefault();
        console.log(username.length);
        
        const result =await login();
        saveToken(result.token);
        redirect();
    }
}

function toggleBUtton(){
    if(username && password){
        loginButton.disabled =false;
    } else {
        loginButton.disabled =true;
    }
}

async function login(){
    const response = await fetch("https://fakestoreapi.com/auth/login",{
        method:"POST",
        body:JSON.stringify({
            username,
            password,
        }),
        headers: {
            "Content-Type":"application/json"
        }
    })

    const result =await response.json();

    return result
}

function saveToken(token){
    localStorage.setItem("token" , token);
};

function redirect (){
    const token =localStorage.getItem("token");

    if(token){
        window.location.href ="http://127.0.0.1:5500/homePage.html"
    }
}

function resetInputValues(){
    username ="";
    password ="";
}