/**
 * Returns the maxium number of dispositions in an array, for example given the array [1, 2] and minium length of 1, maxium length of 2 it will return 6
 *
 * @param {Array | string} array
 * @param { number } maxLength
 * @param {number} minLength If not specified, will be defaulted to 1
 * @returns { number }
 */
function getDispositionsNumber(array, maxLength, minLength) {
  if (!minLength) minLength = 1;

  let finalNum = 0;
  let elementsNum = array.length;

  for (let i = maxLength; i > minLength - 1; i--) {
    finalNum += elementsNum ** i;
  }

  return finalNum;
}

/**
 *
 * @param {Object} options
 * @param {Array | String} options.data [Mandatory] The array / string where to do the iterations. Array format: ["a", "b", "c"]; String format: "abc"
 * @param {function} options.step [Mandatory] Function to run for every step of the iteration. Must always return true or false
 * @param {function} options.finish [Non-mandatory] Function to run when the iteration is done (not triggered when the function in the 'step' key returns false)
 * @param {number} options.maxLength [Mandatory] The maxium length of the password
 * @param {number} options.minLength [Non-mandatory] Minium length of the password. Default: 1
 * @exports
 */
function runSync(options) {
  if (options.data) {
    if (typeof options.data != "string" && !Array.isArray(options.data)) {
      throw new TypeError("'options.data' must be an array or a string");
    }
  } else {
    throw new SyntaxError("'data' is not specified in the options object");
  }
  // -----
  if (options.step) {
    if (typeof options.step != "function") {
      throw new TypeError("'options.step' must be a functin");
    }
  } else {
    throw new SyntaxError("'step' is not specified in the options object");
  }
  // ------
  if (options.maxLength) {
    if (typeof options.maxLength != "number") {
      throw new TypeError("'options.maxLength' must be a number");
    } else if (options.maxLength < 1) {
      throw new Error("'options.maxLength' must be equal or greater than 1");
    }
  } else {
    throw new SyntaxError("'maxLength' is not specified in the options object");
  }
  // ----
  if (options.minLength) {
    if (typeof options.minLength != "number") {
      throw new TypeError("'options.minLength' must be a number");
    }
    if (options.minLength < 1) {
      throw new Error("'options.minLength' must be equal or greater than 1");
    }
  } else {
    options.minLength = 1;
  }

  // ----
  if (options.finish && typeof options.finish != "function") {
    throw new TypeError("'options.finish' must be a function");
  }
  // ---
  if (options.minLength > options.maxLength) {
    throw new Error(
      "'options.minLength' should not be greater than 'options.maxLength'"
    );
  }

  options.maxLength = Math.floor(options.maxLength);
  options.minLength = Math.floor(options.minLength);

  /*
  Credits: 
  https://www.npmjs.com/package/js-combinatorics
   */
  let mustStop = false;
  function baseN(seed, size = 1) {
    if (size < 1) throw new RangeError(`${sisze} is out of range`);

    const length = BigInt(seed.length) ** BigInt(size);

    function* iterator() {
      for (let i = 0n; i < length; i++) {
        if (mustStop) return;
        yield at(i);
      }
    }

    function check(n) {
      if (n < 0) {
        if (length < -n) throw new RangeError(`${n} is out of range`);
        return BigInt(length) + BigInt(n);
      }
      if (length <= n) throw new RangeError(`${n} is out of range`);
      return n;
    }

    function at(n) {
      n = check(n);
      if (n === undefined) return undefined;
      let bn = BigInt(n);
      const bb = BigInt(seed.length);
      let result = [];
      for (let i = 0; i < size; i++) {
        let bd = bn % bb;
        result.push(seed[Number(bd)]);
        bn -= bd;
        bn /= bb;
      }
      // here happens the magik
      mustStop = options.step(result.join(""));
      return result;
    }

    return {
      [Symbol.iterator]: iterator,
      at,
    };
  }

  for (let i = options.maxLength; i > options.minLength - 1; i--) {
    [...baseN(options.data, i)];
  }
  if (!mustStop) {
    if (options.finish) {
      options.finish();
    }
  }
}
module.exports = { getDispositionsNumber, runSync };
