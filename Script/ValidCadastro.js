const fields = document.querySelectorAll("[required]") 

const ValidateField = field => {
    // logica para verificar se existem erros
    const verifyErrors = () => {
        let foundError = false;
        
        for(let error in field.validity){
            // se não for customError
            // entrão verifica se tem erro
            if(field.validity[error] && !field.validity.valid){
                foundError = error
            }
        }

        return foundError
    }

    function customMessage(typeError){
        const messages = {
            text:{
               valueMissing: "Por favor, preencha este campo"
            },
            email: {
                valueMissing: "Email é obrigatório",
                typeMismatch: "Por favor, preencha um email válido"
            },
            password:{
                valueMissing: "Digite Sua senha"
            }
        }
        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error")

        if (message) {
            spanError.classList.add("active");
            spanError.innerHTML = message;
        } else {
            spanError.classList.remove("active");
            spanError.innerHTML = "";
        }
     }

      return () => {

        const error = verifyErrors()
        

        if(error){
            const message = customMessage(error)

            field.style.borderColor = "red"
            setCustomMessage(message)
        }else{
            field.style.borderColor = "green"
            setCustomMessage()
        }
    }
}






const customValidation = event => {

    const field = event.target // ouvir o evento clicado
    const validation = ValidateField(field)

    validation()
}

// para cada field que estiver no fields
for ( let field of fields) {
    field.addEventListener("invalid", event => {
        // elminar o bubble
        event.preventDefault()
        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}

document.querySelector('form')
.addEventListener("submit", event => {
    console.log('enviar o formulario')

    event.preventDefault()
})