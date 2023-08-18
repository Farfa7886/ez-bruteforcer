# ez-bruteforcer

Easy to use package for bruteforce attacks, with support for ECMAScript and CJS<br />
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Table of contents

- [Import](#import)
- [API Reference](#api-reference)
  - [getDispositionsNumber()](#getdispositionsnumber)
  - [runSync()](#runsync)
- [Usage / Examples](#usageexamples)
- [Credits](#credits)
- [Authors](#authors)

## Import

#### Import with CommonJS...

```javascript
const bruteforce = require("ez-bruteforcer");
```

#### ...or with ECMAScript!

```javascript
import bruteforce from "ez-bruteforcer";
```

## API Reference

### getDispositionsNumber()

#### Calculate all the dispositions

> Will calculate all the avaiable dispositions without finding them

```javascript
bruteforce.getDispositionsNumber("oh!sle", 6, 1);
```

| Parameter   | Type                | Description                                                                |
| :---------- | :------------------ | :------------------------------------------------------------------------- |
| `array`     | `array \|\| string` | **Required**. The array where you want to calculate the dispositions       |
| `maxLength` | `number`            | **Required**. The maxium length of the password                            |
| `minLength` | `number`            | **Optional**. The minium length of the password, if null will default to 1 |

### runSync()

#### Find all dispositions

> Will start the bruteforce attack

```javascript
bruteforce.runSync({
    data: [],
    step: (value) => return false,
    finish: () => { console.log('finished') },  // Optional
    maxLength: 2,
    minLength: 1 // Optional
})
```

This function only takes one _options_ argument

- `data` [**ARRAY** / **STRING**] _(required)_ - The characters list to perform the attack, you can use an array or a string.
- `step` [**FUNCTION**] _(required)_ - This function will be called every time a new iteration is found, and it will pass as argument the current iteration value. It acts as a "validator" and must always return _true_ or _false_.<br /> If it returns **_true_** it will stop searching, if instead returns **_false_** it will continue to iterate.
- `finish` [**FUNCTION**] _(optional)_ - This function will be called when all the iteration will be done. **NOTE:** It will _only_ be executed when the script finishes the iteration, this means that if a function in the **_step_** key will return _true_ before it finishes everything this function will not be triggered.
- `maxLength` [**NUMBER**] _(required)_ - The maxium length of the password.
- `minLength` [**NUMBER**] _(optional)_ - The minium length of the password, if not specified, will be defaulted to 1

## Usage/Examples

```javascript
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
```

## Credits

- I "stole" the code to find the dispositions from the class "BaseN" in the package [js-combinatorics](https://www.npmjs.com/package/js-combinatorics) to then modify it to make it work for a bruteforce attack

## Authors

- [@Farfa7886](https://github.com/Farfa7886)
