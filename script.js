function site() {
    const form = document.querySelector('.formularios')

    form.addEventListener('submit', e => { 
        e.preventDefault()
        const inputPeso = form.querySelector('.peso')
        const inputAltura = form.querySelector('.altura')
        const peso = parseFloat(inputPeso.value.replace(',', '.'));
        const altura = parseFloat(inputAltura.value.replace(',', '.'));
        const imc = getImc(peso, altura)
        const nivelPeso = getNivelPeso(imc)

        function getImc (peso, altura) {
            const imc = peso / altura ** 2
            return imc.toFixed(2)
        }

        if (!peso) {
            setResultadoImc('Peso inválido', false)
            return
        }
        if (!altura) {
            setResultadoImc('Altura inválida', false)
            return
        }

        const msg = `Seu IMC é ${imc} (${nivelPeso}) `
        setResultadoImc(msg, true)
    })
    
    function getNivelPeso(imc) {
       const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1', 'Obesidade grau 2', 'Obsideade grau 3']

       if (imc >= 39.9) return nivel[5]
       
       if (imc >= 34.9) return nivel[4]

       if (imc >= 29.9) return nivel[3]

       if (imc >= 24.9) return nivel[2]

       if (imc >= 18.5) return nivel[1]

       if (imc < 18.5) return nivel[0]

    }

    function criarP () {
        const p = document.createElement('p')
        return p
    }
    
    function setResultadoImc(msg, isValid) {
        const resultadoImc = document.querySelector('.resultado_imc')
        const p = criarP()

        resultadoImc.innerHTML = '';
        p.innerHTML = msg
        p.classList.add('background-azul')
        resultadoImc.appendChild(p)

        if (isValid) {
            p.classList.remove('background-vermelho')
            p.classList.add('background-azul')
        }
        else {
            p.classList.remove('background-azul')
            p.classList.add('background-vermelho')
        }
    }
}

site()
