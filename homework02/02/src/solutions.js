module.exports = {
  /**
   * Returns an empty object without prototype. There is object creation type that creates object without prototype
   */
  createPrototypelessObject() {
    const obj = Object.create(null);
    return obj;
  },

  /**
   * Returns an object with prototype set to given `proto`.
   * @param {Object} proto Prototype object
   */
  createObjectWithPrototype(proto) {
    const obj = Object.create(proto);
    return obj;
  },

  /**
   * Returns an object with `value` property set to the given `value` and `getValue` method.
   * Be careful, if `value` changes, `getValue` should return changed `value`.
   * @param {any} value
   */
  createObjectWithMethod(value) {
    const obj = {
      value : value,
      getValue : function() {
        return this.value;
      }
    }
    return obj;
  },

  /**
   * Returns an object with the `getValue` and `setValue` methods, having `value` hidden from the outside.
   */
  createEncapsulatedObject() {
    let value; 
    return {
      getValue: function() {
        return value; 
      },
      setValue: function(newValue) {
        value = newValue; 
      }
    };
  },

  /**
   * Returns the shallow copy of the given `obj`. HINT: This **operator** will be used later.
   * @param {Object} obj
   */
  shallowCopy(obj) {
    const newObj = {... obj};
    return newObj;
  },

  /**
   * Returns the deep copy of the given `obj`.
   * @param {Object} obj
   */
  deepCopy(obj) {
    const newObj = JSON.parse(JSON.stringify(obj));
    return newObj;
  },

  /**
   * Returns an array containing 2 elements which are
   * loosely equal, but strictly unequal.
   */
  looselyTrue() {
    let array = [1, "1"];
    return array;
  },

  /**
   * Returns a string that is loosely equal to boolean `true`. This one is tricky :)
   */
  stringLooselyEqualToTrue() {
    return '1';
  },
  /**
   * Returns correct sum of a and b.
   */
  safeSum(a, b) {
    if(typeof a === 'string' || typeof b === 'string') {
      a = Number(a);
      b = Number(b);
    }

    return a + b;
  },

  /**
   * Returns formatted string for the given date.
   * Format should be `{day}-{month}-{fullYear}` (all numbers).
   * @param {Date} date
   */
  formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return day + '-' + month + '-' + year;
  },

  /**
   * Sorts the given `numberArray` in ascending order.
   * Use array `.sort` method. Sort is done in place so there is no need to return anything.
   * @param {number[]} numberArray
   */
  sortNumberArray(numberArray) {
    numberArray.sort((a, b) => a - b);
  },

  /**
   * Multiplies all the elements in the array by 2 _in place_
   * (edits the given array) and returns it.
   * @param {number[]} numberArray
   */
  multiplyArrayByTwo(numberArray) {
    for(let i = 0; i < numberArray.length; i++) {
      numberArray[i] = numberArray[i] * 2;
    }

    return numberArray;
  },

  /**
   * Multiplies all the elements in the array by 2 and returns them
   * in a new array.
   * @param numberArray
   */

  multiplyArrayByTwoNew(numberArray) {
    let newArray = [];
    for(let i = 0; i < numberArray.length; i++) {
      newArray[i] = numberArray[i] * 2;
    }

    return newArray;
  },

  /**
   * Returns first `n` Fibonacci numbers in an array. https://en.wikipedia.org/wiki/Fibonacci_sequence
   * If the n is <= 0, return `undefined`
   * @param n
   */

  fibonacciNumbers(n) {
    let fib = [];
    if(n <= 0) {
      return undefined;
    }

    if(n >= 1) {
      fib[0] = 0;
    }

    if(n > 1) {
      fib[1] = 1;
      for(let i = 2; i < n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
      }
    }
    return fib;
  },

  /**
   *
   * EXTRA CREDIT TASK (no points):
   *
   * Create two classes: `Person` and `Programmer`. `Programmer` class extends `Person`.
   * Person class has `name` property (set via constructor) and `getName` method (calls `callGetName` with name`).
   * Programmer class has `language` property provided to constructor (and `name` inherited from `Person`) and `getLanguage` method (calls `callGetLanguage` with `language`)
   * Return object with created classes, `return { Person, Programmer }`.
   *
   * NOTE: class methods should use `bind`, function expression syntax might not work here because code isn't transpiled.
   *
   * @param {Function} callGetName
   * @param {Function} callGetLanguage
   */

  classInheritance(callGetName, callGetLanguage) {
    class Person {
      constructor(name) {
          this.name = name;
          this.getName = this.getName.bind(this);
      }

      getName() {
          return callGetName(this.name);
      }
  }

  class Programmer extends Person {
      constructor(name, language) {
          super(name);
          this.language = language;
          this.getLanguage = this.getLanguage.bind(this);
      }

      getLanguage() {
          return callGetLanguage(this.language);
      }
  }

  return { Person, Programmer };
  },

  /**
   * **This is variant of probably most common "big firm" interview question with closures.**
   *
   * If you can't find a solution yourself, you can Google and paste it, and try to understand why it works like that.
   * We will also explain it in the nearest lecture.
   *
   * This task has easier solutions (e.g. using `let` instead of `var`), but desired solutions included Closures.
   *
   * Call the `consumer` function once every second three times giving it loop iterator as argument.
   * Use the provided for loop, do not change for loop, but feel free to modify setTimeout.
   * @param {Function} consumer
   */

  // Ovaj zadatak nisam znala :(
  // Ali sam nabacila copy-paste s Google-a jer me smetalo sto mi baca jedan krivi test :D
  // Obecajem da sam shvatila zasto je to tako!!
  timeoutIncrement(consumer) {
    for (var i = 1; i <= 3; i += 1) {
      setTimeout(((i) => () => consumer(i))(i), i * 1000);
    }
  },
}