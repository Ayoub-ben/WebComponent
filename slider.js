


const getBaseURL = () => {
  return new URL('.', import.meta.url);
  };
  
  class myComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.src = this.getAttribute('src');
      this.ctx = new AudioContext();
      this.audioCtx = new AudioContext();

    }
  
    connectedCallback() {
      console.log("ouais oauis");
      this.shadowRoot.innerHTML = `
     
   <div class="buffered">
   <span id="buffered-amount"></span>
 </div>
 <div class="progress">
   <span id="progress-amount"></span>
 </div>
 
      <input type="range" id="panner" class="control-panner" list="pan-vals" min="-1" max="1" value="0" step="0.01" data-action="panner" />
      <datalist id="pan-vals">
       <option value="-1" label="left">
       <option value="1" label="right">
   </datalist>
   <label for="panner">EGALISEUR</label>



   <input type="range" min="0" max="100" value="0" id="duration_slider" class="duration_slider" >


  <style>
  body {

    margin: 100px auto;
    text-align: center;
  }
  
  h1 {
    color: #fff;
    margin-bottom: 60px;
    font-family: helvetica;
    font-size: 56px;
    font-style: italic;
    letter-spacing: 2px;
  }
  
  .control-panner {
    -webkit-appearance: none;
    width: 50%;
    height: 15px;
    background: #000;
    outline: none;
    border: 5px solid lawngreen;
    border-radius: 8px;
  }
  
  
  /* for chrome/safari */
  .control-panner::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 60px;
    background: #000;
    cursor: pointer;
    border: 5px solid lawngreen;
    border-radius: 4px;
  }
  
  /* for firefox */
  .slider::-moz-range-thumb {
    width: 20px;
    height: 60px;
    background: #000;
    cursor: pointer;
    border: 5px solid lawngreen;
    border-radius: 4px;
  }
  </style>
  

      `;
      this.pannerControl =  this.shadowRoot.querySelector('[data-action="panner"]');
      let index_no = 0;
      this.slider = this.shadowRoot.querySelector('#duration_slider');
      this.sliderval = this.shadowRoot.querySelector('#duration_slider').value;

      console.log(this.sliderval);
      
      this.fixRelativeURLs()
      this.slider.addEventListener('click',function(){
      console.log(this.sliderval);
       // slider_position = audio1.duration * (this.slider.value / 100);
       // audio1.currentTime = slider_position; 
        }
     )
        this.sliders();
       this.defineListeners();
       this.animate()
    }

    changeGain(nbFilter, sliderVal) {
      filters[nbFilter].gain.value = parseFloat(sliderVal);

  }

    buildGraph() {
      this.audioContext = new AudioContext();
      let track = this.audioContext.createMediaElementSource(audio1);
      source.connect(this.audioContext.destination);
      this.audioNodes = [source];
    }
    sliders() {
  
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const track = this.audioCtx.createMediaElementSource(audio1);
        const gainNode = this.audioCtx.createGain();
        const pannerOptions = {pan: 0};
        const panner = new StereoPannerNode(this.audioCtx, pannerOptions);
        
        this.pannerControl.addEventListener('input', function() {
            panner.pan.value = this.value;	
        }, false);
        
        track.connect(gainNode).connect(panner).connect(this.audioCtx.destination);
        var filters = [];

 




audio1.onplay = () => {
 
 audioSource = this.audioCtx.createMediaElementSource(audio1);
 console.log(track)

 analyser = this.audioCtx.createAnalyser();
 audioSource.connect(analyser);
 analyser.connect(this.audioCtx.destination);

 analyser.fftSize = 128;
 const bufferLength = analyser.frequencyBinCount;
 const dataArray = new Uint8Array(bufferLength);
 audio1.play();

 

 
}
    }


animate(){
  const barWidth = 15;
 let barHeight;
 let x;
 let WIDTH = 3600;
 let HEIGHT = 100;
  x = 0;
  this.audioCtx.clearRect(0, 0, canvas.width, canvas.height);
  analyser.getByteFrequencyData(dataArray);
  analyser.getByteTimeDomainData(dataArray);
  console.log("mamy")
  drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
  draw(dataArray,WIDTH,HEIGHT,bufferLength);
  requestAnimationFrame(animate);
}


    
   
  



fixRelativeURLs() {
  const baseURL = getBaseURL();
  console.log('baseURL', baseURL);

  const knobs = this.shadowRoot.querySelectorAll('webaudio-knob');

  for (const knob of knobs) {
    console.log("fixing " + knob.getAttribute('src'));

    const src = knob.src;
    knob.src =  baseURL  + src;

    console.log("new value : " + knob.src);
  }
}


   
  }
  
  customElements.define("sli-der", myComponent);