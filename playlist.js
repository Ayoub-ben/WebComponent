
import lottieWeb from 'https://cdn.skypack.dev/lottie-web';





class myComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.src = this.getAttribute('src');
  }

  connectedCallback() {

    this.shadowRoot.innerHTML = `
      <style>
      #play-icon {
        margin: 20px 2.5% 20px 2.5%;
        padding: 0;
        border: 0;
        background: inherit;
        cursor: pointer;
        outline: none;
        width: 140px;
        height: 140px;
        }

        path {
          stroke: red;
          }
      </style>


    <button id="aug" class="button-1">+10</button>
        <button id="red" class="button-1">-10</button>
        <button id="change" class="button-1">Changer de son</button>
        <button id="play-icon" class="button-1"></button>


        <style>
      
.button-1 {
  margin-bottom:5%;
  background-color: red;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  list-style: none;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-1:hover,
.button-1:focus {
  background-color: #F082AC;
}
        </style>
    `;
    document.getElementById("audio1").hidden = true;
    document.getElementById("audio2").hidden = true;
    this.audio = document.getElementById('audio1');
    this.audio2 = document.getElementById('audio2');
    this.playIconContainer =  this.shadowRoot.getElementById('play-icon');

    this.change();
    this.pause();
  }


  buildGraph() {
   
  }

  fixRelativeURLs() {
    
  }

change(){
    var a = 1;
    this.tab = []
    this.tab.push(this.audio2,this.audio);
    var c=0;
    var songs = ["./myComponents/assets/La blue.mp3", "./myComponents/assets/Brasil.mp3", "./myComponents/assets/La blue.mp3"];
  var index = Math.floor((Math.random() * this.tab.length))+1;

    this.shadowRoot.querySelector('#aug').addEventListener('click', () => {
        this.audio.currentTime += 10;
      });
      this.shadowRoot.querySelector('#red').addEventListener('click', () => {
        this.audio.currentTime -= 10;
      });
      this.shadowRoot.querySelector('#change').addEventListener('click', () => {
        //this.audio.src = "./myComponents/assets/Brasil.mp3";
       this.audio.pause();
       this.audio.currentTime = 0;
        
       // this.tab[index].play();
       // index++;


      
       // var songs = ["A.mp3", "B.mp3", "C.mp3"];
        //var a=document.getElementById("au");
       
        this.audio =this.tab[c];
          this.audio.play();
          console.log(c);
          c++;
          if(c>=this.tab.length){
              c=0;
          }
        

      });
   
}



pause(){
let state = 'play';

const animation = lottieWeb.loadAnimation({
  container: this.playIconContainer ,
  path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json',
  renderer: 'svg',
  loop: false,
  autoplay: false,
  name: "Demo Animation",
});

animation.goToAndStop(14, true);

this.playIconContainer .addEventListener('click', () => {
    if(state === 'play') {
        animation.playSegments([14, 27], true);
        this.audio.play();
        state = 'pause';
    } else {
        animation.playSegments([0, 14], true);
        state = 'play';
        this.audio.pause();
    }
});

}

  defineListeners() {
    
  }
  
  
}

customElements.define("play-list", myComponent);