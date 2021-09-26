statuss = "";
boxox = "";
objs = [];
found = false;
spech = window.speechSynthesis;
utter = new SpeechSynthesisUtterance("Object Detected");

function setup(){
canvas = createCanvas(480,480);
canvas.center();

video = createCapture(VIDEO);
    video.size(500,500);
    video.position(175,275);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects...";
}
function draw(){
    image(video, 0, 0, 480, 480);

    if(statuss != ""){
        objectDetector.detect(video, gotResult);
        for(c = 0; c < objs.length; c++){
            document.getElementById("status").innerHTML = "Status: object identified";
    
            fill(255, 0, 0);
            percent = floor(objs[c].confidence*100);
            text(objs[c].label + " " + percent + "%", objs[c].x + 15, objs[c].y + 15);
            noFill();
            stroke(255, 0, 0);
            rect(objs[c].x, objs[c].y, objs[c].width, objs[c].height);
            if(objs[c].label == boxox){
                found = true;
            }
            if(found == true){
                utter = new SpeechSynthesisUtterance("Object Detected");
                spech.speak(utter);
                document.getElementById("found").innerHTML = "Object Detected";
            }else{
                utter = new SpeechSynthesisUtterance("Object Not Detected");
                spech.speak(utter);
                document.getElementById("found").innerHTML = "Object Detected";
            }
        }
        
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects...";
    boxox = document.getElementById("idkwhatthisis").value;
    found = false;
    statuss = true;
}
function modelLoaded(){
    console.log("model has been loaded");
}
function gotResult(error, results){
if(error){
    console.error(error)
}
objs = results;
console.log(results);
}