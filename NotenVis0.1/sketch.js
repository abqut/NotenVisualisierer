let A3;
let Ab3;
let B3;
let Bb3;
let C3;
let D3;
let C4;
let Db3;
let E3;
let Eb3;
let F3;
let G3;
let Gb3;
var notes;

function preload() {
 // A3 = loadSound("assets/A3.ogg");
  //Ab3=loadSound("assets/Ab3.ogg");
  //B3=loadSound("assets/B3.ogg"); 
  //Bb3=loadSound("assets/Bb3.ogg");
  //C3=loadSound("assets/C3.ogg");
  //D3=loadSound("assets/D3.ogg");
  //C4=loadSound("assets/C4.ogg");
  //Db3=loadSound("assets/Db3.ogg");
  //E3=loadSound("assets/E3.ogg");
  //Eb3=loadSound("assets/Eb3.ogg");
  //F3=loadSound("assets/F3.ogg");
  //G3=loadSound("assets/G3.ogg");
  //Gb3=loadSound("assets/Gb3.ogg");
  A3 = loadSound("A3.ogg");
  Ab3=loadSound("Ab3.ogg");
  B3=loadSound("B3.ogg"); 
  Bb3=loadSound("Bb3.ogg");
  C3=loadSound("C3.ogg");
  D3=loadSound("D3.ogg");
  C4=loadSound("C4.ogg");
  Db3=loadSound("Db3.ogg");
  E3=loadSound("E3.ogg");
  Eb3=loadSound("Eb3.ogg");
  F3=loadSound("F3.ogg");
  G3=loadSound("G3.ogg");
  Gb3=loadSound("Gb3.ogg");
}

let freq = [32.703,34.648,36.708,38.891,41.203,43.654,46.249,48.999,51.913,55.0,58.270,61.735,32.703*2];


function miniFFT(re, im) {
    var N = re.length;
    for (var i = 0; i < N; i++) {
        for(var j = 0, h = i, k = N; k >>= 1; h >>= 1)
            j = (j << 1) | (h & 1);
        if (j > i) {
            re[j] = [re[i], re[i] = re[j]][0]
            im[j] = [im[i], im[i] = im[j]][0]
        }
    }
    for(var hN = 1; hN * 2 <= N; hN *= 2)
        for (var i = 0; i < N; i += hN * 2)
            for (var j = i; j < i + hN; j++) {
                var cos = Math.cos(Math.PI * (j - i) / hN),
                    sin = Math.sin(Math.PI * (j - i) / hN)
                var tre =  re[j+hN] * cos + im[j+hN] * sin,
                    tim = -re[j+hN] * sin + im[j+hN] * cos;
                re[j + hN] = re[j] - tre; im[j + hN] = im[j] - tim;
                re[j] += tre; im[j] += tim;
            }
}

function setup() {
  soundFormats('ogg');
  notes = [C3,Db3,D3,Eb3,E3,F3,Gb3,G3,Ab3,A3,Bb3,B3,C4];
  createCanvas(1920, 1080);


}


function getGraph(keys,size){
  let points = [];
  for(let i =0; i<size[0];i++){
    let x_inc=PI/(size[0]*7);
    let y_inc=2/(size[1]);
    let dx=x_inc*i;
    let dy=0;
    for(let t = 0; t<keys.length;t++){
      dy+=(0.75/keys.length)*sin(dx*(freq[keys[t]]*PI*2));
    }
    let j=min(Number((dy+1)/(y_inc)),size[1]);
    append(points,[i,j]);
  
  }
 return points;
}
function getF(keys,Samples){
  let y=[];
  let _=[];
  for(let i =0; i<Samples;i++){
    let x_inc=Samples/(10);
    let dx=x_inc*i;
    let dy=0;
    for(let t = 0; t<keys.length;t++){
      dy+=sin(dx*(freq[keys[t]]*PI*2));
    }
    append(y,dy);
    append(_,0);
  }
 return [y,_];
}

let keys = [];
function draw() {

  background(220);

  let graph = getGraph(keys,[1800,500]);

  for (let i = 0; i<graph.length-1;i++){
    stroke(79,121,66)
    line(graph[i][0],graph[i][1],graph[i+1][0],graph[i+1][1]);
  }
    for (let i = 0; i<graph.length-1;i++){
    stroke(79,121,66)
    line(graph[i][0],graph[i][1],graph[i+1][0],graph[i+1][1]);
  }
  if (keyIsPressed == false ){
    keys = [];
}

  }


function keyPressed() {
  let keyIndex = -1;
  if (key >= 'a' && key <= 'z') {
    keyIndex = key.charCodeAt(0) - 'a'.charCodeAt(0);
  }
  if (keyIndex === -1) {
    if (Number(key)==0){
      notes[9].play();
       append(keys,9);
    }
    else{
    notes[Number(key)-1].play();
    append(keys,Number(key)-1);
    }
  }
  if (key=="i") {
    notes[Number(10)].play();
    append(keys,10);
  }
  if (key=="o") {
    notes[Number(11)].play();
    append(keys,11);
  }
  if (key=="p") {
    notes[Number(12)].play();
    append(keys,12);
  }  
}
