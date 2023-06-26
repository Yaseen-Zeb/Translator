// VARIABLES----------->>>
let selectors = document.querySelectorAll("select");
let translate_btn = document.querySelector(".translate_btn");
let texts = document.querySelectorAll("textarea");


selectors.forEach((selector,i)=>{
   let options;
   let selected = "";
  for (let lang of Object.keys(countries)) {
   if (i == 0 && lang == "en-GB") {
      selected = "selected";
   }else if(i == 1 && lang=="ur-PK"){
      selected = "selected";
   }else{
      selected = '';
   }
 options += `<option value="${lang}" ${selected} >${countries[lang]}</option>`;
  }
  selector.innerHTML= options;
  options = "";
});

translate_btn.addEventListener("click",async ()=>{

 let error = document.querySelector(".error");
let text = texts[0].value;
let translate_from = selectors[0].value;
let translate_to = selectors[1].value;
if (text == "") {
   error.textContent = "Text feild is empty.";
   error.style.display = "block";
   setTimeout(() => {
      error.textContent = "";
   error.style.display = "none";
   }, 3000);
}else{
   translate_btn.textContent = "Wait..."
   let res = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${translate_from}|${translate_to}`);
   let data = await res.json()
   if (data.responseData.translatedText != "") {
     texts[1].value = data.responseData.translatedText;
     translate_btn.textContent = "Translate";
   }else{
      error.textContent = "Please wite correct text.";
      error.style.display = "block";
      setTimeout(() => {
         error.textContent = "";
      error.style.display = "none";
      }, 3000);
   }
}
})

document.querySelector(".exg").addEventListener("click",()=>{
   let text = texts[0].value;
   texts[0].value = texts[1].value
   texts[1].value = text

   let lang = selectors[0].value;
   selectors[0].value = selectors[1].value
   selectors[1].value = lang
   
})

function copy(from) {
   // document.querySelector(".t"+from).value.select()
    navigator.clipboard.writeText(document.querySelector(".t"+from).value);
   
}
     
function voice(from) {
  let speach = new SpeechSynthesisUtterance(document.querySelector(".t"+from).value)
  speach.lang = document.querySelector(".l"+from).value;
   speechSynthesis.speak(speach);
}


