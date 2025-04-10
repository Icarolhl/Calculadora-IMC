document.addEventListener('DOMContentLoaded', () => {
  const pesoInput = document.querySelector('#peso');
  const alturaInput = document.querySelector('#altura');
  const resultadoMsg = document.querySelector('#mensagem-resultado');
  const listaHistorico = document.querySelector('#lista-historico');
  const toggleBtn = document.querySelector('#toggle-theme');
  const resultadoSection = document.querySelector('.resultado');
  const calcularBtn = document.querySelector('#btn-calcular');

  if (localStorage.getItem('tema') === 'dark') {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('tema', isDark ? 'dark' : 'light');
  });

  function calcularIMC(peso, altura) {
    return peso / (altura * altura);
  }

  function classificarIMC(imc) {
    if (imc >= 40) return 'Obesidade grau 3';
    if (imc >= 35) return 'Obesidade grau 2';
    if (imc >= 30) return 'Obesidade grau 1';
    if (imc >= 25) return 'Sobrepeso';
    if (imc >= 18.5) return 'Peso normal';
    return 'Abaixo do peso';
  }

  function atualizarPreview() {
    const peso = parseFloat(pesoInput.value.replace(',', '.'));
    const altura = parseFloat(alturaInput.value.replace(',', '.'));

    const pesoValido = peso && peso > 0;
    const alturaValida = altura && altura > 0;

    if (!pesoValido || !alturaValida) {
      resultadoMsg.textContent = 'Digite valores válidos para peso e altura.';
      resultadoSection.classList.add('error');
      resultadoSection.classList.add('preview');
      return;
    }

    const imc = calcularIMC(peso, altura).toFixed(2);
    const classificacao = classificarIMC(imc);
    const mensagem = `IMC: ${imc} (${classificacao})`;

    resultadoMsg.textContent = mensagem;
    resultadoSection.classList.remove('error');
    resultadoSection.classList.add('preview');
  }

  function calcularFinal() {
    const peso = parseFloat(pesoInput.value.replace(',', '.'));
    const altura = parseFloat(alturaInput.value.replace(',', '.'));

    const pesoValido = peso && peso > 0;
    const alturaValida = altura && altura > 0;

    if (!pesoValido || !alturaValida) return;

    const imc = calcularIMC(peso, altura).toFixed(2);
    const classificacao = classificarIMC(imc);
    const mensagem = `IMC: ${imc} (${classificacao})`;

    resultadoMsg.textContent = mensagem;
    resultadoSection.classList.remove('error', 'preview');
    adicionarAoHistorico(mensagem);
  }

  function adicionarAoHistorico(entry) {
    let historico = JSON.parse(localStorage.getItem('historico-imc')) || [];
    historico.unshift(entry);
    if (historico.length > 5) historico.pop();
    localStorage.setItem('historico-imc', JSON.stringify(historico));
    renderHistorico();
  }

  function renderHistorico() {
    const historico = JSON.parse(localStorage.getItem('historico-imc')) || [];
    listaHistorico.innerHTML = '';
    historico.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      listaHistorico.appendChild(li);
    });
  }

  pesoInput.addEventListener('input', atualizarPreview);
  alturaInput.addEventListener('input', atualizarPreview);
  calcularBtn.addEventListener('click', calcularFinal);

  renderHistorico();
});
