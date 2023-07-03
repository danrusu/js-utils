class Service {
  NOT_AUTHENTICATED_TOKEN = 'not-authenticated';
  baseUrl;
  authToken;
  authError;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;

    this.authToken = this.fetchAuthToken();
  }

  async fetchAuthToken() {
    return fetch(`${this.baseUrl}/auth`, {
      method: 'POST',
      body: JSON.stringify({
        user: 'testUser1',
        password: 'passw0rd',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status != 200) {
          throw new Error(
            `Authentication failed: ${res.status} | ${res.statusText}`,
          );
        }
        return res;
      })
      .then(res => res.json())
      .then(json => json.token)
      .catch(error => {
        this.authError = error;
        return this.NOT_AUTHENTICATED_TOKEN; // cannot throw here; getAuthToken will verify if authenticated
      });
  }

  // workaround to prevent rejecting from constructor
  async getAuthToken() {
    const authToken = await this.authToken;
    if (authToken == this.NOT_AUTHENTICATED_TOKEN) {
      throw this.authError;
    }
    return authToken;
  }

  async getUserInfo(userName) {
    const authToken = await this.getAuthToken();
    return fetch(`${this.baseUrl}/user?name=${userName}`, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    }).then(res => res.json());
  }
}

module.exports = { Service };
