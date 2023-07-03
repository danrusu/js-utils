const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:1112' }));

const TEST_USER = {
  name: 'testUser',
  password: 'passw0rd',
  token: 1111,
};

// routes
app
  .get('/health', healthCheck)
  .post('/auth', authenticate)
  .get('/user', getUser);

const port = process.env.PORT || 1113;

app.listen(port, () => console.log(`Server listening on port: ${port}`));

function healthCheck(req, res) {
  res
    .status(200)
    .send(`Server running on: ${req.protocol}://${req.get('Host')}`);
}

function authenticate(req, res) {
  const { user, password } = req.body;
  console.log(user, password);
  if (user == TEST_USER.name && password == TEST_USER.password) {
    res.json({ token: TEST_USER.token });
  } else {
    res.sendStatus(401);
  }
}

function getUser(req, res) {
  const headers = req.headers;
  if (headers.authorization == `Bearer ${TEST_USER.token}`) {
    res.json({ name: TEST_USER.name });
  } else {
    res.sendStatus(401);
  }
}
