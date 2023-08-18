import bruteforce from "ez-bruteforcer";

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

/*
...
Trying password: lsllo!
Trying password: esllo!
Trying password: olllo!
Trying password: hlllo!
Trying password: !lllo!
Trying password: slllo!
Trying password: llllo!
Trying password: elllo!
Trying password: oello!
Trying password: hello!
> Found password: hello!
> Total possible combinations: 55986
*/
