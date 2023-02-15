//const fetch = require('node-fetch');

class SmartFetch {
  #active;
  #total;
  #errors;

  constructor() {
    this.#active = 0;
    this.#total = 0;
    this.#errors = [];
  }

  async fetch(url, options) {
    this.#total++;
    this.#active++;
    return fetch(url, options)
      .then(res => {
        this.#active--;
        return res;
      })
      .catch(err => {
        this.#errors.push(err);
        this.#active--;
      });
  }

  getActive() {
    return this.#active;
  }

  getTotal() {
    return this.#total;
  }

  getErrors() {
    return this.#errors;
  }
}

module.exports = { SmartFetch };
