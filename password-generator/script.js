/** @format */

const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;
  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select(); // "The select() method selects the entire contents of a text area." (or an <input> element that includes a text field, per MSN)
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied to clipboard');
});

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;
  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';
  const typesCount = lower + upper + number + symbol; // true becomes 1, false 0
  if (typesCount == 0) return ''; // he has it below the below
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  // "The Object.values() method returns an array of a given object's own enumerable property values" So, for each array element, uses content (boolean) as filter value

  /* My code */
  for (let i = 0; i < length; i++) {
    const funcName = Object.keys(
      typesArr[Math.floor(Math.random() * typesCount)]
    )[0];
    generatedPassword += randomFunc[funcName]();
  }
  return generatedPassword;
  /* End my code */

  /* His code. Rather than randomizing, goes thru types in order until done 
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length); // He has to do this because method goes in steps of # types
  return finalPassword;
  /* End his code */
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
}
function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

/* ASCII:

lower case: 97-122
upper case: 65-90
numbers: 48-57
symbols: 33-47 (39 is apostrophe, 34 is quotation mark)
more symbols: 58-64 
*/
