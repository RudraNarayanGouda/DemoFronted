let captchaText="";

function generateCaptcha(){
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    captchaText="";
    for(let i=0;i<5;i++){
        captchaText+=chars.charAt(Math.floor(Math.random()*chars.length));
    }
    document.getElementById("captcha").innerText=captchaText;
}

generateCaptcha();

function register(){

let name=document.getElementById("name").value;
let mobile=document.getElementById("mobile").value;
let email=document.getElementById("email").value;
let captchaInput=document.getElementById("captchaInput").value;
let message=document.getElementById("message");

if(name=="" || mobile=="" || email==""){
    message.innerText="Please fill all fields";
    return;
}

if(captchaInput!==captchaText){
    message.innerText="Captcha incorrect!";
    generateCaptcha();
    return;
}

message.style.color="green";
message.innerText="Registration Successful!";

}
document.getElementById('name').addEventListener('input',(e)=>{
    let name=e.target.value;
})
document.getElementById('pas').addEventListener('input',(e)=>{
    let paswd=e.target.value;
})
function myFun(){
    let name=document.getElementById("name").value
    let message=document.getElementById("msg");
    let mob=document.getElementById("mobile").value;
    message.style.color="red";
    if(name =="" || name==null){
        document.getElementById("msg").innerHTML="**Please Enter you'r name";
        return false;
    }
    var namepattern=/^[A-Z a-z /s]+$/;
    if(!namepattern.test(name)){
        document.getElementById("msg").innerHTML="**Name should contain only character and space";
        return false;
    }
    if(name[0]!==name[0].toUpperCase()){
         document.getElementById("msg").innerHTML="**First latter of name should be capital";
        return false;
    }
    if(mob==""){
        document.getElementById("nummsg").innerHTML="**Enter your number"
        return false;
    }
    let x=mob.length;
    if(x<10 || x>10){
        document.getElementById("nummsg").innerHTML="**Mobile number should be contain 10 digits"
        return false;
    }
    if(isNaN(mob)){
        document.getElementById("nummsg").innerHTML="**Mobile number should contain only digit"
        return false;
    }
    if(mob.charAt(0)!=9 && mob.charAt(0)!=7 && mob.charAt(0)!=8){
        document.getElementById("nummsg").innerHTML="**Mobile number must be started with 7,8,9"
        return false;
    }
}

