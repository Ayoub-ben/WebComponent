import './lib/webaudio-controls.js';

const getBaseURL = () => {
  console.log(new URL('.', import.meta.url))
	return new URL('.', import.meta.url);
};

class myComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.src = this.getAttribute('src');
  }

  connectedCallback() {
    // Do something
    this.shadowRoot.innerHTML = `
        <style>
            h1 {
                color:red;
            }
        </style>
        <h1>lecteur audio amélioré</h1>
        <audio id="player" src="${this.src}" controls></audio>
        <br>
        <button id="play">Play</button>
        <button id="pause">Pause</button>
        <button id="stop">Stop</button>
        <br>
        <label>Volume 
          <input id="volumeSlider" 
          type="range" min=0 max=2 step=0.1 value="1">
        </label>
        <br>
        <webaudio-knob 
        id="volumeKnob" 
        src="./assets/knobs/vernier.png" 
        value="1" max="2" step="0.1" diameter="128" sprites="50" 
        valuetip="0" tooltip="Volume">
      </webaudio-knob>

      

        
    `;

    this.fixRelativeURLs();

    this.player = this.shadowRoot.querySelector('#player');

    this.defineListeners();
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

  defineListeners() {
    this.shadowRoot.querySelector('#play').addEventListener('click', () => {
      this.player.play();
    });

    this.shadowRoot.querySelector('#pause').addEventListener('click', () => {
      this.player.pause();
    });
    this.shadowRoot.querySelector('#stop').addEventListener('click', () => {
      this.player.pause();
      this.player.currentTime = 0;
    });
    this.shadowRoot.querySelector('#volumeSlider').addEventListener('input', (evt) => {
      this.player.volume = evt.target.value;
    });
  }
}

customElements.define("my-balance", myComponent);