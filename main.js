
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
          background-color: var(--card-background-color); /* Changed to CSS variable */
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
          transition: background-color 0.3s ease, color 0.3s ease;
          border: 1px solid var(--card-border-color);
        }
        h1 {
          color: var(--primary-text-color); /* Changed to CSS variable */
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
          color: var(--button-text-color); /* Changed to CSS variable */
          border-radius: 50%;
          font-size: 1.5rem;
          font-weight: bold;
          box-shadow: 0 0 10px var(--accent-color);
          transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
        }
        button {
          background-color: var(--button-background-color); /* Changed to CSS variable */
          color: var(--button-text-color); /* Changed to CSS variable */
          border: none;
          padding: 1rem 2rem;
          font-size: 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s, box-shadow 0.3s, color 0.3s ease;
          box-shadow: 0 0 15px rgba(76, 175, 80, 0.5); /* This might need adjustment with a variable */
        }
        button:hover {
          background-color: var(--accent-color); /* Hover effect using accent */
          box-shadow: 0 0 25px var(--accent-color); /* Adjusted shadow for hover */
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

// Theme switching logic and Disqus dynamic loading
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggleButton.textContent = 'Toggle Light Mode';
        } else {
            document.body.classList.remove('dark-mode');
            themeToggleButton.textContent = 'Toggle Dark Mode';
        }
        localStorage.setItem('theme', theme);
    };

    const toggleTheme = () => {
        const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
    };

    // Apply theme on load
    if (currentTheme) {
        applyTheme(currentTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // System preference is dark, set dark mode
        applyTheme('dark');
    } else {
        // Default to light mode if no preference found
        applyTheme('light');
    }

    themeToggleButton.addEventListener('click', toggleTheme);

    // Function to load Disqus
    const loadDisqus = () => {
        const disqusWrapper = document.getElementById('disqus-wrapper');
        const disqusThreadDiv = document.createElement('div');
        disqusThreadDiv.id = 'disqus_thread';
        disqusWrapper.appendChild(disqusThreadDiv);

        // Configure Disqus
        window.disqus_config = function () {
            this.page.url = window.location.href;
            this.page.identifier = 'lotto-generator-page';
            this.page.title = document.title;
        };

        // Load Disqus script
        const d = document, s = d.createElement('script');
        s.src = 'https://product-build-2.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    };

    // Load Disqus automatically on page load
    loadDisqus();
});

