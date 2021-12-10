var preloader = document.querySelector("#preloader");
var nav = document.querySelector("nav");
var navtxt = document.querySelector(".nav-container");
var Text =  document.querySelector("h1");
var btn = document.querySelector(".new");

var strText = Text.textContent;
var splitText = strText.split("");
console.log(splitText);
Text.textContent = "";
//Text animation
for(let i=0;i<splitText.length;i++){
    let char = (splitText[i] === " ") ? "&nbsp;" : splitText[i];
    Text.innerHTML += '<span class="letter">' + char + '</span>';
}
setTimeout(function(){
    let it = 0;
    let timer = setInterval(ontick,50);

    function ontick(){
        const span = Text.querySelectorAll('span')[it];
        span.classList.add('fade');
        it++;
    
        if(it === splitText.length){
            complete();
            return;
        }
    }
    
    function complete(){
        clearInterval(timer);
        timer = null;
    }
},2000)

// Preloader terminator
function wave(){
    setTimeout(function(){
        preloader.style.opacity = 0;
    },500)
    setTimeout(function(){
        preloader.style.display = 'none';
        nav.style.opacity = 1;
        btn.classList.add('animate');
    },1500)
}

// Styling nav while scrolled
window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    nav.classList.add('shadow');
  } else {
    nav.classList.remove('shadow');
  }

}
