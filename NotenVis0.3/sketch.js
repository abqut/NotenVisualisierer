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

let freq = [32.703,34.648,36.708,38.891,41.200,43.654,46.249,49,51.913,55.0,58.27,61.735,32.703*2];


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
  colorPress = ('#FF0000')
  color0 = (302)
  color1 = (302)
  color2 = (302)
  color3 = (302)
  color4 = (302)
  color5 = (302)
  color6 = (302)
  color7 = (302)
  color8 = (302)
  colorBlack = ('#000000')
  colorBlack1 = ('#000000')
  colorBlack2 = ('#000000')
  colorBlack3 = ('#000000')
  colorBlack4 = ('#000000')
  colorBlack5 = ('#000000')
  


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
function getF(keys,Samples,T){
  let y=[];
  let _=[];
  for(let i =0; i<Samples;i++){
    let x_inc=T/Samples;
    let dx=x_inc*i;
    let dy=0;
    for(let t = 0; t<keys.length;t++){
      dy+=(0.75/keys.length)*sin(dx*(freq[keys[t]]*PI*2));
    }
    append(y,dy);
    append(_,0);
  }
 return [y,_];
}

function toFreq(re,im,N,Hz,dx,dy,r,T){
  let out=[];
  for(let n=0; n<N/2; n++){
    append(out,[((2*r/N)*(n*Hz/N)+dx),max(1080-(Math.pow(re[n],2)+Math.pow(im[n],2))-dy,0)]);
  }
  return out;
}

let Samples = 512;
let T = 3;
let Hz = Samples/T;
let keys = [];
function draw() {

  background(220);
  stroke(255/3,255/3,255);
  line(1236,0,1236,1080);
  stroke(0,0,0);
  line(1300,615,1830,615)
  line(1300,615,1300,40)
  
  let graph = getGraph(keys,[1236,500]);
  let test = getF(keys,Samples,T);
  miniFFT(test[0],test[1]);
  let graph2 = toFreq(test[0],test[1],Samples,Hz,1300,1080-615,1600);
  //console.log(graph2);
  
  for (let i = 0; i<graph.length-1;i++){
    stroke(79,121,66)
    line(graph[i][0],graph[i][1],graph[i+1][0],graph[i+1][1]);
  }
  for (let i = 0; i<Samples/2-1;i++){
    stroke(255,20,10)
    line(graph2[i][0],graph2[i][1],graph2[i+1][0],graph2[i+1][1]);
  }

  
  for(let i=0; i<Samples/(2*T)/5-1;i++){
    stroke(0);
    textSize(10);
    let p = i*5;
    text(p,i*(530/(Samples/(2*T)/5-1))+1300,635);
  }
  
  text("Frequenz \n [Hz]",1850,635);
  stroke(300);
  fill(300);
  text("Michal & Noah", 1840,1040);
  stroke(255/3,255/3,255);
  if (keyIsPressed == false ){
    keys = [];
}
 {
  if (keyIsPressed && key == 'i') {
    colorBlack5 = colorPress;
  }
  if (keyIsPressed && key == 'o') {
    color7 = colorPress;
  }
  if (keyIsPressed && key == 'p') {
    color8 = colorPress;
  }
  if (keyIsPressed && key == '1') {
    color1 = colorPress;
  }
  if (keyIsPressed && key == '2') {
    colorBlack1 = colorPress;
  }
  if (keyIsPressed && key == '3') {
    color2 = colorPress;
  }
  if (keyIsPressed && key == '4') {
    colorBlack2 = colorPress;
  }
  if (keyIsPressed && key == '6') {
    color4 = colorPress;
  }
  if (keyIsPressed && key == '7') {
    colorBlack3 = colorPress;
  }
  if (keyIsPressed && key == '5') {
    color3 = colorPress;
  }
  if (keyIsPressed && key == '9') {
    colorBlack4 = colorPress;
  }
  if (keyIsPressed && key == '8') {
    color5 = colorPress;
  }
   if (keyIsPressed && key == '0') {
    color6 = colorPress;
  }
   
  fill(color1);
  rect(0, 680, 154.57, 400);
  fill(color2);
  rect(154.57, 680, 154.57, 400);
  fill(color3);
  rect(308.57, 680, 154.57, 400);
  fill(color4);
  rect(462.85, 680, 154.57, 400);
  fill(color5);
  rect(617.14, 680, 154.57, 400);
  fill(color6);
  rect(771.42, 680, 154.57, 400);
  fill(color7);
  rect(925.71, 680, 154.57, 400);
  fill(color8);
  rect(1080, 680, 156, 400);
  
  
  fill(colorBlack1);
  rect(120, 680, 60, 275);
  fill(colorBlack2);
  rect(274.57,680, 60, 275);

  fill(colorBlack3);
  rect(582.85, 680, 60, 275);
  fill(colorBlack4);
  rect(737, 680, 60, 275);
  fill(colorBlack5);
  rect(891.42, 680, 60, 275);
 }
}


function keyReleased() {
  if (key == 'i') {
    colorBlack5 = colorBlack;
  } 
  if (key == 'o') {
    color7 = color0;
  } 
  if (key == 'p') {
    color8 = color0;
  } 
  if (key == '1') {
    color1 = color0;
  } 
  if (key == '2') {
    colorBlack1 = colorBlack;
  } 
  if (key == '3') {
    color2 = color0;
  } 
  if (key == '4') {
    colorBlack2 = colorBlack;
  } 
  if (key == '5') {
    color3 = color0;
  } 
  if (key == '6') {
    color4 = color0;
  } 
  if (key == '7') {
    colorBlack3 = colorBlack;
  } 
  if (key == '8') {
    color5 = color0;
  } 
  if (key == '9') {
    colorBlack4 = colorBlack;
  } 
  if (key == '0') {
    color6 = color0;
  } 
  return false; // prevent any default behavior

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
