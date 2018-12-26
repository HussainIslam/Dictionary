var inputText = document.querySelector("#inputText");
var submitButton = document.querySelector("#submitButton");
var result = document.querySelector("#result");
submitButton.addEventListener("click", submitQuery);

function submitQuery(){
  var valid = inputValidation(inputText);
  if(valid){
    var ajax = new XMLHttpRequest();
    var url = "https://www.dictionaryapi.com/api/v3/references/learners/json/" +inputText.value +"?key=f93f7531-3f72-4d6d-8cdb-661896923b6c";
    ajax.open("GET", url);
    ajax.send();
    ajax.addEventListener("readystatechange", function(){
      if(ajax.readyState ===4){
        var response = JSON.parse(ajax.responseText);
        for(let i = 0; i < response.length; i++){
          manipulation(response[i]);
        }
      }
    });
  } else {
    alert("Please enter a valid word!");
  }

}

function inputValidation(input){
  let valid;
  let regText = /^[a-z]{1,}$/i;
  if(input.value == "") valid = false;
  else if(regText.test(input.value)) valid = true;
  else valid = false;
  return valid;
}

function stringCleaner(text){
  let regDef = /\{.{0,}\}/;
  let finalString = text.replace(regDef.exec(text),"");
  return finalString;
}

function manipulation(response){
  console.log(response);
  let divMain = document.createElement('div');
  divMain.classList = "divMain";
  result.appendChild(divMain);

  let theWord = document.createElement('h3');
  theWord.innerText = response.meta.id;
  theWord.id = "theWord";
  divMain.appendChild(theWord);

  let functionalLabel = document.createElement("p");
  functionalLabel.innerText = response.fl;
  divMain.appendChild(functionalLabel);

  let pronunciation = document.createElement("p");
  if(response.hwi.prs != null || response.hwi.prs != undefined){
    pronunciation.innerText = response.hwi.prs[0].ipa;
  } else {
    pronunciation.innerText = "N/A";
  }
  divMain.appendChild(pronunciation);

  let definition = document.createElement("p");
  definition.innerText = stringCleaner(response.meta["app-shortdef"].def[0]);
  
  //definition.innerText = response.meta["app-shortdef"].def[0];
  divMain.appendChild(definition);

}