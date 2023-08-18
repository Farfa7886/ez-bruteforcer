const bruteforce = require("ez-bruteforcer");

const charactersList = "oh!sle";
const secretPassword = "hello!";
bruteforce.runSync({
  data: charactersList,
  step: (attempt) => {
    console.log(`Trying password: ${attempt}`);
    if (attempt == secretPassword) {
      console.log(`> Found password: ${attempt}`);
      return true;
    } else return false;
  },
  finish: () => {
    console.log("> Nothing has been found:(");
  },
  maxLength: 6,
  minLength: 1,
});
console.log(
  "> Total possible combinations: " +
    bruteforce.getDispositionsNumber(charactersList, 6, 1)
);
console.log("CJS");
