function app() {
    const form = document.querySelector('.formularios')
    const resultadoImc = document.querySelector('.resultado_imc')
    
    function recebeEventoForm(evento) {
        evento.preventDefault()
        const peso = form.querySelector('.peso').value
        const altura = form.querySelector('.altura').value
        const imc = peso / (altura*altura)

        if (Number.isNaN(imc)){
            console.log('Peso inválido')
            resultadoImc.innerHTML = `Peso inválido`
            resultadoImc.classList.remove('background-azul')
            resultadoImc.classList.add('background-vermelho')
        } else{
            if (imc < 18.5) {
                console.log(`Seu IMC é ${imc.toFixed(2)} (Abaixo do peso)`)
                resultadoImc.innerHTML = `Seu IMC é ${imc.toFixed(2)} (Abaixo do peso)`
                resultadoImc.classList.add('background-azul')
            } else if (imc >= 18.5 && imc <= 24.9){
                console.log(`Seu IMC é ${imc.toFixed(2)} (Peso normal)`)
                resultadoImc.innerHTML = `Seu IMC é ${imc.toFixed(2)} (Peso normal)`
                resultadoImc.classList.add('background-azul')
            } else if (imc >= 25 && imc <= 29.9){
                console.log(`Seu IMC é ${imc.toFixed(2)} (Sobrepeso)`)
                resultadoImc.innerHTML = `Seu IMC é ${imc.toFixed(2)} (Sobrepeso)`
                resultadoImc.classList.add('background-azul')
            } else if (imc >= 30 && imc <= 34.9){
                console.log(`Seu IMC é ${imc.toFixed(2)} (Obesidade grau 1)`)
                resultadoImc.innerHTML = `Seu IMC é ${imc.toFixed(2)} (Obesidade grau 1)`
                resultadoImc.classList.add('background-azul')
            } else if (imc >= 35 && imc <= 39.9){
                console.log(`Seu IMC é ${imc.toFixed(2)} (Obesidade grau 2)`)
                resultadoImc.innerHTML = `Seu IMC é ${imc.toFixed(2)} (Obesidade grau 2)`
                resultadoImc.classList.add('background-azul')
            } else if (imc >= 40){
                console.log(`Seu IMC é ${imc.toFixed(2)} (Obesidade grau 3)`)
                resultadoImc.innerHTML = `Seu IMC é ${imc.toFixed(2)} (Obesidade grau 3)`
                resultadoImc.classList.add('background-azul')
            }
        
        }

    }

    form.addEventListener('submit', recebeEventoForm)
}

app()