//Acciones (borrar,clear,operaciones..)
class Calculadora{
    constructor(operacionPreviaTextElement,operacionActualTextElement){
        this.operacionPreviaTextElement = operacionPreviaTextElement
        this.operacionActualTextElement = operacionActualTextElement
        this.clear()
    }

    clear(){
        this.operacionActual = ''
        this.operacionPrevia = ''
        this.operacion = undefined
    }
    delete(){
        this.operacionActual = this.operacionActual.toString().slice(0, -1)
    }
    addNumber(numero){
        if (numero === '.' && this.operacionActual.includes('.')) return
        this.operacionActual = this.operacionActual.toString() + numero.toString()
    }
    chooseOperation(operacion){
        if(this.operacionActual === '') return
        if(this.operacionPrevia !== ''){
            this.compute()
        }
        this.operacion = operacion
        this.operacionPrevia = this.operacionActual
        this.operacionActual = ''
    }
    compute(){
        let computation 
        const prev = parseFloat(this.operacionPrevia)
        const actual = parseFloat(this.operacionActual)
        if (isNaN(prev) || isNaN(actual)) return
        switch (this.operacion){
            case '+':
                computation=prev + actual
                break
            case '-':
                computation=prev - actual
                break
            case '*':
                computation=prev * actual
                break
            case '/':
                computation=prev / actual
                break
            default:return
        }
        this.operacionActual = computation
        this.operacion = undefined
        this.operacionPrevia = ''
    }
    getDisplayNumber(numero){
        const stringNumber = numero.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay 
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null){
            return`${integerDisplay}.${decimalDigits}`
        }
        else{
            return integerDisplay
        }

    }
    updateDisplay(){
        this.operacionActualTextElement.innerText = this.getDisplayNumber
            (this.operacionActual)
        if(this.operacion != null){
            this.operacionPreviaTextElement.innerText = `${ this.getDisplayNumber(this.operacionPrevia)}${this.operacion}${this.operacionActual}`
        } else {
            this.operacionPreviaTextElement.innerText = ''
        }

    }

}

//constantes

const numeroButtons = document.querySelectorAll('[data-numero]')
const operacionButtons = document.querySelectorAll('[data-operacion]')
const igualButton = document.querySelector('[data-igual]')
const delButton = document.querySelector('[data-del]')
const allcButton = document.querySelector('[data-allc]')
const operacionPreviaTextElement = document.querySelector('[data-previo]')
const operacionActualTextElement = document.querySelector('[data-actual]')

// Calculadora interacción
const calculadora = new Calculadora (operacionPreviaTextElement,operacionActualTextElement)

numeroButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculadora.addNumber(button.innerText)
        calculadora.updateDisplay()
    })
})
operacionButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculadora.chooseOperation(button.innerText)
        calculadora.updateDisplay()
    })
})
igualButton.addEventListener('click', button =>{
    calculadora.compute()
    calculadora.updateDisplay()
})
allcButton.addEventListener('click', button =>{
    calculadora.clear()
    calculadora.updateDisplay()
})
delButton.addEventListener('click', button =>{
    calculadora.delete()
    calculadora.updateDisplay()
})