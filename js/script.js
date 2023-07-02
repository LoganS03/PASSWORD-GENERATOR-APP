let inputLength = document.querySelector("input[type='range']")
let returnLength = document.querySelector("p.length")
let sliderColor = document.querySelector(".fill")
let strengthDegree = document.querySelector(".score > p")
let strengthIndicator = document.querySelectorAll(".scale")
let checkbox = document.querySelectorAll("input[type='checkbox'")
let custom_checkbox = document.querySelectorAll(".custom_checkbox")

let button = document.querySelector("button[type='button'")
let copied = document.querySelector(".copied")
let copyButton = document.querySelector(".copy_button")
let password = document.querySelector("p.password")

let characters = ["QWERTYUIOPASDFGHJKLZXCVBNM", "qwertyuiopasdfghjklzxcvbnm", "0123456789", "~!@#$%^&*()/*-+№[]{}:;<>?.,"]

let choosenCharacters = 0
let randomCharacter = 0
let color = ""
let checked = []
let checkedCheckbox = 0

inputLength.addEventListener("input", () =>{
    sliderColor.style.width = `${((inputLength.value - inputLength.min) / (inputLength.max - inputLength.min)) * 100}%`
    returnLength.innerText = inputLength.value
})

for(let i of checkbox){
    i.addEventListener("input", () => {
        checked = [checkbox[0].checked, checkbox[1].checked, checkbox[2].checked, checkbox[3].checked]
        checkedCheckbox = checked.filter(function(value){
            return value == true
        })
        indicator(checkedCheckbox.length)
    })
}

function indicator(strength){
    if(strength == 0){
        strengthDegree.innerText = "";
        color = "transparent"
    }
    else{
        for(let i = 0; i < strength; i++){
            if(strength == 1){
                strengthDegree.innerText = "TOO WEAK!";
                color =  "#F64A4A";
            }
            else if(strength == 2){
                strengthDegree.innerText = "WEAK";
                color = "#FB7C58";
            }
            else if(strength == 3){
                strengthDegree.innerText = "MEDIUM";
                color = "#F8CD65";
            }
            else{
                strengthDegree.innerText = "STRONG";
                color = "#A4FFAF";
            }
    
            strengthIndicator[i].style.cssText = `
                border: none;
                background: ${color};
            `;
        }
        
        for(let i = strength; i < 4; i++){
            strengthIndicator[i].style.cssText = `
            border: 2px solid #E6E5EA;
            background: transparent;
            `
        }
    }
}

function createPassword(elements){
    if(checked.includes(true)){
        password.innerText = ""
        password.style.color = "#E6E5EA"
        
        for(let i = 1; i <= inputLength.value; i++){    
            
            choosenCharacters = elements[Math.trunc(Math.random() * elements.length)]
            randomCharacter = choosenCharacters[Math.trunc(Math.random() * choosenCharacters.length)]
            password.innerText += randomCharacter
            if(window.innerWidth <= 600){
                if(inputLength.value > 19){
                    if(inputLength.value > 22){
                        password.style.fontSize = "18px"
                    }
                    else{
                        password.style.fontSize = "20px"
                    }
                }
                else{
                    password.style.fontSize = "24px"
                }
            }
            else{
                if(inputLength.value > 22){
                    password.style.fontSize = "28px"
                }
                else{
                    password.style.fontSize = "32px"
                }
            }
        }
    }
    else{
        password.innerText = "P4$5W0rD!"
        password.style.color = "#817D92"
        alert("You must choose one of the options!")
    }
}

button.addEventListener("click", () => {
    let charactersPassed = []

    for(let i = 0; i < 4; i++){
        if(checkbox[i].checked == true){
            charactersPassed.push(characters[i])
        }
    }
    
    copied.style.display = "none";
    createPassword(charactersPassed)
})

copyButton.addEventListener("click", () => {
    if(navigator.clipboard){
        copied.style.display = "block";
        navigator.clipboard.writeText(password.innerText)
    }
})