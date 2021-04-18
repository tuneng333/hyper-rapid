const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();


// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5000", "https://hyper-rapid.com","https://www.hyper-rapid.com","http://hyper-rapid.com","http://www.hyper-rapid.com"],
    credentials: true,
}))


// Signup Route
app.post('/signup', (req, res) => {
  const { email } = req.body;


  // Construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
      }
    ]
  };

  const postData = JSON.stringify(data);

  fetch('https://us1.api.mailchimp.com/3.0/lists/5e0a042add', {
    method: 'POST',
    headers: {
      Authorization: 'auth 6ecaed397158f719805346aa9177225e-us1'
    },
    body: postData
  })
    .then(res.statusCode === 200 ?
      res.redirect('/success.html') :
      res.redirect('/fail.html'))
    .catch(err => console.log(err))
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
