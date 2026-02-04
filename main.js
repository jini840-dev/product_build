
class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .wrapper {
          text-align: center;
          background-color: #2c2c31;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        }
        h1 {
          color: var(--primary-color);
          margin-bottom: 1.5rem;
        }
        .numbers {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        .number {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          background-color: var(--accent-color);
          color: white;
          border-radius: 50%;
          font-size: 1.5rem;
          font-weight: bold;
          box-shadow: 0 0 10px var(--accent-color);
        }
        button {
          background-color: var(--accent-color);
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-size: 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s, box-shadow 0.3s;
          box-shadow: 0 0 15px rgba(76, 175, 80, 0.5);
        }
        button:hover {
          background-color: #45a049;
          box-shadow: 0 0 25px rgba(76, 175, 80, 0.8);
        }
      </style>
      <div class="wrapper">
        <h1>Lotto Number Generator</h1>
        <div class="numbers"></div>
        <button>Generate Numbers</button>
      </div>
    `;

    this.shadowRoot.querySelector('button').addEventListener('click', () => this.generateNumbers());
    this.generateNumbers();
  }

  generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const numbersContainer = this.shadowRoot.querySelector('.numbers');
    numbersContainer.innerHTML = '';
    [...numbers].sort((a,b) => a-b).forEach(number => {
        const numberElement = document.createElement('div');
        numberElement.classList.add('number');
        numberElement.textContent = number;
        numbersContainer.appendChild(numberElement);
    });
  }
}

customElements.define('lotto-generator', LottoGenerator);
