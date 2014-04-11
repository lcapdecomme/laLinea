'use strict';

var numeroImage;
var delai;
var canvas;
var context;
var myInterval;
var playAnimation=false;

// Récupération du canvas
function getCanvas(nom) {
    var canvas = document.getElementById(nom);
    if(!canvas) {
        alert("Impossible de récupérer le canvas");
        return;
    }
    return canvas;
}

function getContext(canvas) {
    var context = canvas.getContext('2d');
    if(!context)
    {
        alert("Impossible de récupérer le context du canvas");
        return;
    }
    return context;
}


function init()
{
    canvas  = getCanvas('canvasLaLineaMarche');
    context = getContext(canvas);

    var w = canvas.width, h = canvas.height;
    numeroImage=1;
    delai=100;

     //Efface background
    context.fillStyle = "#30416A";
    // fillRect(x, y, largeur, hauteur);
    context.fillRect(0, 0, w, h);
    //Ajoute une bordure
    context.strokeStyle = "#040811";
    context.lineWidth = "5";
    // strokeRect(x, y, largeur, hauteur);
    context.strokeRect(0, 0, w, h);
    // Dessine le trait du sol
    context.strokeStyle = "#BDC0C8";
    context.moveTo(0, 126);
    context.lineTo(w, 128);
    context.lineWidth = 4;
    context.stroke();

    toggleBoutonsPlayPause();
}

function toggleBoutonsPlayPause() {
    console.log("Etat Animation : "+playAnimation);
    if (!playAnimation)
    {
        var boutonPlay  = document.getElementById("boutonr").style.display ="block";
        var boutonPause = document.getElementById("boutonp").style.display ="none";
    }
    else
    {
        var boutonPlay  = document.getElementById("boutonr").style.display ="none";
        var boutonPause = document.getElementById("boutonp").style.display ="block";
    }
}


function addListener()
{
    // Add listener -
    var boutonm = document.getElementById("bouton-");
    boutonm.addEventListener("click", function()
    {
        if (delai <= 300)
        {
            delai=delai+25;
            runAnimation();
        }
    });
    // Add listener Play
    var boutonr = document.getElementById("boutonr");
    boutonr.addEventListener("click", function()
    {
            runAnimation();
            toggleBoutonsPlayPause();
    });
    // Add listener Pause
    var boutonr = document.getElementById("boutonp");
    boutonr.addEventListener("click", function()
    {
            stopAnimation();
            toggleBoutonsPlayPause();
    });
    // Add listener +
    var boutonp = document.getElementById("bouton+");
    boutonp.addEventListener("click", function()
    {
        if (delai >= 50)
        {
            delai=delai-25;
            runAnimation();
        }
    });
}

function animate()
{
    var w = canvas.width, h = canvas.height;
    var mon_image = new Image();
    var posImage = ('0' + numeroImage).slice(-2);
    mon_image.src = "img/frame-"+posImage+".png";
    context.drawImage(mon_image, 61, 10);
    context.restore();
    numeroImage+=1;
    if (numeroImage>12) {
        numeroImage=1;
    }
} 

function runAnimation() {
    playAnimation=true;
    console.log(delai);
    console.log(myInterval);
    if (myInterval)
    {
        clearInterval(myInterval);
        console.log('clear interval');
    }
    myInterval = setInterval(function() { animate(); }, delai);
}

function stopAnimation() {
    playAnimation=false;
    console.log(delai);
    console.log(myInterval);
    if (myInterval)
    {
        clearInterval(myInterval);
        console.log('clear interval');
    }
}

function start() {
    init();
    addListener();
}

document.addEventListener('DOMContentLoaded', function(){
    start();
});
