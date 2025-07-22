// Load saved code on page load
window.onload = () => {
  if(localStorage.getItem('htmlCode')) {
    document.getElementById('html-code').value = localStorage.getItem('htmlCode');
  }
  if(localStorage.getItem('cssCode')) {
    document.getElementById('css-code').value = localStorage.getItem('cssCode');
  }
  if(localStorage.getItem('jsCode')) {
    document.getElementById('js-code').value = localStorage.getItem('jsCode');
  }
};

// Auto-save on typing
['html-code', 'css-code', 'js-code'].forEach(id => {
  const textarea = document.getElementById(id);
  textarea.addEventListener('input', () => {
    localStorage.setItem(id === 'html-code' ? 'htmlCode' : id === 'css-code' ? 'cssCode' : 'jsCode', textarea.value);
  });
});

function runCode() {
  const html = document.getElementById('html-code').value;
  const css = document.getElementById('css-code').value;
  const js = document.getElementById('js-code').value;

  const output = `
    <html>
      <head><style>${css}</style></head>
      <body>
        ${html}
        <script>${js}<\/script>
      </body>
    </html>
  `;

  const iframe = document.getElementById('preview-frame');
  iframe.srcdoc = output;
}

function loadContent(part) {
  fetch(`${part}.html`)
    .then(res => res.text())
    .then(data => {
      document.getElementById('tutorial').innerHTML = data;
    })
    .catch(() => {
      document.getElementById('tutorial').innerHTML = '<p>কনটেন্ট লোড করা যায়নি।</p>';
    });
}
// ডার্ক মোড টগল
const darkModeToggle = document.getElementById('darkModeToggle');

// পেজ লোডে লোকালস্টোরেজ থেকে মুড লোড
window.addEventListener('load', () => {
  if(localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
  }
});

// টগল করার সময় ক্লাস যোগ/বিয়োগ ও লোকালস্টোরেজে সেভ করা
darkModeToggle.addEventListener('change', () => {
  if(darkModeToggle.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
  }
});
