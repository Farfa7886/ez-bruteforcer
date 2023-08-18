const bruteforce = require("ez-bruteforcer");

const charactersList = "abcdefghijkl!mnopqrstuvwxyz ";
const secretPassword = "hello world!";
const totalCombs = bruteforce.getDispositionsNumber(charactersList, 6, 1);
let currentIndex = 0;
bruteforce.runSync({
  data: charactersList,
  step: (attempt) => {
    currentIndex++;
    console.log(`Trying password (${currentIndex}/${totalCombs}): ${attempt}`);
    if (attempt == secretPassword) {
      console.log(`> Found password: ${attempt}`);
      return true;
    } else return false;
  },
  finish: () => {
    console.log("> Nothing has been found:(");
  },
  maxLength: 12,
  minLength: 12,
});
console.log("CJS");
