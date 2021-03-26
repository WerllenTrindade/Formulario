const fields = document.querySelectorAll("[required]")

function ValidateField(field){
    // logica para verificar se existem erros
    function verificarErros(){
        let erroEncontrado = false

        for(let PegarErros in field.validity){
           //se não for customError
           //então verirficar se tem error
           if(field.validity[PegarErros] && !field.validity.valid){
                erroEncontrado = PegarErros
           }
        }
        return erroEncontrado
    }

    function customMessage(typeError){
        const messags = {
            text: {
                valueMissing: "Por favor, digite seu Login"
            },
            password: {
                valueMissing: "Por favor, digite sua Senha"
            }
        }
        return messags[field.type][typeError]
    }

    function setCustomMessage(message){
        const spanError = field.parentNode.querySelector('span.error')

        if(message){
            spanError.classList.add("active")
            spanError.innerHTML = message
        } else {
        spanError.classList.remove("active")
        spanError.innerHTML = ""
    }
    }

    return () => {
        const error = verificarErros()
        if(error){
            const message = customMessage(error)
            field.style.borderColor = "red"
            setCustomMessage(message)
        }else{
            setCustomMessage()
            field.style.borderColor = "green"
        }
    }
}

// vai executar a função de cima aqui
function customValidation(event){
    const field = event.target

    const validation = ValidateField(field)
    validation()
}


for ( let field of fields ){
    field.addEventListener("invalid", event => {
       //eliminar o buble
        event.preventDefault()
        customValidation(event)
    })
    field.addEventListener("blur", customValidation) // blur sempre que sair do foco vai sair o campo invalido
}

















document.querySelector('form')
.addEventListener('submit', event => {
    event.preventDefault()  
})