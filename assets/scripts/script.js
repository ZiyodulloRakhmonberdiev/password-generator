const lengthSlider = document.querySelector(".pass-length input"),
      generateBtn = document.querySelector(".generate-btn"),
      passInput = document.querySelector(".input-box input"),
      copyIcon = document.querySelector(".input-box span"),
      passIndicator = document.querySelector(".pass-indicator"),
      options = document.querySelectorAll(".option input");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+{}|[]"
}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong"
}


const generatePassword = () => {
    let staticPass = "",
     passLength = lengthSlider.value,
     randomPass = "",
     excludeDuplicate = false;

    options.forEach(option => {
        if(option.checked){
            // if checkbox id isn't exc-duplicate && spaces
            if(option.id !== "exc-duplicate" && option.id !== "spaces"){
                // adding particular key value from character object to to staticPass 
                staticPass += characters[option.id]
            } else if (option.id === "spaces"){ //if checkbox id is spaces                                                                    
                staticPass += `    ${staticPass}    `
            } else { // else pass true value to excludeDuplicate
                excludeDuplicate = true
            }
        }
    })
    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPass[Math.floor(Math.random() * staticPass.length)]
        if (excludeDuplicate){
            !randomPass.includes(randomChar) || randomChar == " " ? randomPass += randomChar : i--;
        } else {
            randomPass += randomChar
        }        
    }
    passInput.value = randomPass
}


const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword()
    updatePassIndicator()
}

updateSlider()

const copyPassword = () => {
    navigator.clipboard.writeText(passInput.value);
    copyIcon.innerText = "check"
    setTimeout(() => {
        copyIcon.innerText = "copy_all"
    }, 1500)
}

copyIcon.addEventListener("click", copyPassword)
lengthSlider.addEventListener("input", updateSlider)
generateBtn.addEventListener("click", generatePassword)