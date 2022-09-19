// JavaScript source code

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-clear]')
// const percentButton = document.querySelector('[data-percent]')
const changeSignButton = document.querySelector('[data-change]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const divideByZeroTextElement = document.getElementById("divideByZero")

class Calculator
{

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
        divideByZeroTextElement.innerHTML=''
        this.resetCalc = false
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        //this.error=''
        this.operation = undefined
    }

    appendNumber(number) {
        /*if (this.error) {
            this.clear();
        }*/
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
        divideByZeroTextElement.innerHTML = ''
        if (this.resetCalc === true) {
            this.currentOperand = ''
            //divideByZeroTextElement.innerHTML = ''
            this.resetCalc = false

        }
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        //divideByZeroTextElement.innerHTML = ''
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

    selectedOperation(operation) {
        
        
            if (this.currentOperand === '') return
            if (this.previousOperand !== '') {
                this.calculate()
            }
        
        
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

        
    }

    calculate() {
        let result
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        divideByZeroTextElement.innerHTML=''
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                result = prev + current
                break
            case '-':
                result = prev - current
                break
            case '*':
                result = prev * current
                break
            case '/':
                if (current == 0) {
                    
                    result = "Can't Divide By 0"
                    
                }
                else {
                    result = prev / current
                }
                //result = prev / current
                break
            case '%':
                //alert(prev)
                //alert(current)
                if (current == '') {
                    current = 1
                    result = prev * (current / 100)
                } else {
                    result = prev * (current / 100)
                }
                //alert(result)
                break
            default:
                return
        }

        if (result === "Can't Divide By 0") {
            divideByZeroTextElement.innerHTML = result
            //currentOperandTextElement.innerText=result
            this.currentOperand=''


        } else
        {
            this.currentOperand = result
            this.resetCalc = true
        }
        
        this.operation = undefined
        this.previousOperand = ''
        
        
    }

   /* calculatePercent() {

        let mod
        const prev = this.previousOperand
        const curr = this.currentOperand
        alert(prev);
        alert(curr);

        if (isNaN(prev) || isNaN(curr)) return

        mod = prev * (curr / 100)



        this.currentOperand = mod

        if (this.previousOperand === '') {
            //this.resetCalc = true
        }

    }*/

    changeSign() {
        if (this.currentOperand.includes('-')) {
            this.currentOperand = this.currentOperand.slice(1)
        }
        else {
            this.currentOperand = '-' + this.currentOperand
        }

    }
}

const calc = new Calculator(previousOperandTextElement, currentOperandTextElement)


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNumber(button.innerText)
        calc.updateDisplay()
    })
})

allClearButton.addEventListener('click', button => {
    calc.clear()
    calc.updateDisplay()
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.selectedOperation(button.innerText)
        calc.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calc.calculate()
    calc.updateDisplay()
})

/*percentButton.addEventListener('click', button => {
    calc.calculatePercent()
    calc.updateDisplay()
})*/

changeSignButton.addEventListener('click', button => {
    calc.changeSign()
    calc.updateDisplay()
})
