var close = document.querySelector(".cross");
var alert = document.querySelector(".alert");

close.addEventListener("click",function(){
    alert.classList.add("fade-off");
    setTimeout(function(){
        alert.style.display = "none";
    },500);
})

