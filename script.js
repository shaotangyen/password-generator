// Assignment Code
var generateBtn = document.querySelector("#generate");

var lowercaseArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var uppercaseArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var numericArray = ['0','1','2','3','4','5','6','7','8','9'];
var specialArray = ['!','@','#','$','%','^','&','*','_','+','-','=','?'];

function generatePassword(){
  var generatedPassword; //final password
  var passwordLength = 0;
  
  //ask for password length 
  while (true) {
    passwordLength = prompt("Please enter a password length between 8 and 128.");
    //check passwordLength's conition
    if(passwordLength===null){
      return '';
    } else if(isNaN(passwordLength)){
      alert(passwordLength + " is not a number.");
    } else if(passwordLength < 8 || passwordLength > 128){
      alert("The number needs to be between 8 and 128.");
    } else {
      break;
    }
  }

  //ask for a type
  var pickedLowercase, pickedUppercase, pickedNumeric, pickedSpeical;
  var mergedArray = [];
  while(true){
  pickedLowercase = confirm("Would you like lowercases?");
  pickedUppercase = confirm("Would you like uppercases?");
  pickedNumeric = confirm("Would you like numbers?");
  pickedSpeical = confirm("Would you like special characters?");
    //if at least one is true, combine them into a merged array, then break out the loop
    if(pickedLowercase || pickedUppercase || pickedNumeric || pickedSpeical){
      if(pickedLowercase){
        mergedArray = mergedArray.concat(lowercaseArray);
      }
      if(pickedUppercase){
        mergedArray = mergedArray.concat(uppercaseArray);
      }
      if(pickedNumeric){
        mergedArray = mergedArray.concat(numericArray);
      }
      if(pickedSpeical){
        mergedArray = mergedArray.concat(specialArray);
      }
      break;
    }else{
      alert("You need at least one type. Please pick again.");
    }
  }

  //generate a random password from the merged array
  while(true){
    generatedPassword ='';
    for(i=0;i<passwordLength;i++){
      generatedPassword += mergedArray[Math.floor(Math.random()*mergedArray.length)];
    }

    //check if it includes all seleted type(s)
    var hasLosercase = typeIsIncluded(generatedPassword,pickedLowercase, lowercaseArray);
    var hasUppercase = typeIsIncluded(generatedPassword,pickedUppercase, uppercaseArray);
    var hasNumeric = typeIsIncluded(generatedPassword,pickedNumeric, numericArray);
    var hasSpecial = typeIsIncluded(generatedPassword,pickedSpeical, specialArray);
    
    /* Logs for double checking
    console.log("User pickedLowercase:"+pickedLowercase+", PW hasLosercase:"+hasLosercase);
    console.log("UserpickedUppercase:"+pickedUppercase+", PW hasUppercase:"+hasUppercase);
    console.log("UserpickedNumeric:"+pickedNumeric+", PW hasNumeric:"+hasNumeric);
    console.log("UserpickedSpeical:"+pickedSpeical+", PW hasSpecial:"+hasSpecial);
    */

    //only return if the generated password meets all selected types
    if((pickedLowercase===hasLosercase) &&
       (pickedUppercase===hasUppercase) &&
       (pickedNumeric===hasNumeric) &&
       (pickedSpeical===hasSpecial)){
      /*console.log("Yes! The generated password "+generatedPassword+ " meets the requirement.")*/
      return generatedPassword;
    } else {
      /*console.log("No! The generated password "+generatedPassword+ " does not meet the selected types. Will generate again.")*/
    }
  }
}

//a function to check if a password has included the user picked type, provided an array list
function typeIsIncluded(generatedPassword, pickedType, arrayToCheck){
  if(pickedType){
    for(i=0;i<arrayToCheck.length;i++){
      if(generatedPassword.includes(arrayToCheck[i])){
        return true;
      }
    }
  }
  return false;
}
    

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
