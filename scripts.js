const backgruond = document.querySelector('.background')
const dino = document.querySelector('.dino');

let isJumping = false;
let dinoPosition = 0;
let cactusV = 10;
let score = 0;

document.addEventListener( 'keypress', (event) => {
  if(event.keyCode == 32){
    if(!isJumping) jump();
  }
});

function jump(){
  isJumping = true;

  let upInterveral = setInterval( () =>{    
    if(dinoPosition == 120){
      clearInterval(upInterveral);
      let downInterval = setInterval( () =>{
        if(dinoPosition == 0){
          clearInterval(downInterval);
          isJumping = false;
        }else{
          dinoPosition -= 10;
          dino.style.bottom = dinoPosition+'px';
        }
      });

    }else{
      dinoPosition += 10;
      dino.style.bottom = dinoPosition+'px';
    }
  }, 20);
}

function createCactus(){
  const cactus = document.createElement('div');
  let cactusPosition = 1000; 

  cactus.classList.add('cactus');
  cactus.style.left = cactusPosition+'px';

  backgruond.appendChild(cactus);

  let leftInterval = setInterval( () => {
    if(cactusPosition < -60){
      clearInterval(leftInterval);
      backgruond.removeChild(cactus);
      score++;
      document.getElementById('valor-score').innerText = score;
      if(score%4 == 0) cactusV += 5;console.log(cactusV);

    }else if(cactusPosition > 0 && cactusPosition < 60 && dinoPosition < 60){
      clearInterval(leftInterval);
      document.body.innerHTML = `<div class='game-over'><h1>Game Over!</h1><h2>Score: ${score}</h2></div>`;

    }else{
      cactusPosition -= cactusV;
      cactus.style.left = cactusPosition+'px';
    }
  }, 20);

  let randomTime = Math.random() * 6000;
  while(randomTime < 1000 || randomTime > 4000) {
    randomTime = Math.random() * 6000;    
  }

  setTimeout(createCactus, randomTime);
}

createCactus();