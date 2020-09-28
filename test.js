const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser');
const port = 8080
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/test2", async (req, res) => {
    let nameserver = "https://grade-api.reg.cmu.ac.th"
    let wsfunction = "/studentgrade"
    let headerAuthReg = {
        'Content-Type': 'application/json',
        'Authorization':
        'QIyMbeGXkkIO3YyEv3oJq2FIPoktFVEgHEvxSN0VWnpM6yHqj7hA0njy4cof1yTI'
    }
    let dataBody = req.body
    let getUrl = nameserver + wsfunction
    var config = {
      method: 'post',
      url: getUrl,
      headers: headerAuthReg,
      data : dataBody
    };
    let resp = await axios(config)
    .then(function (response) {
      return JSON.stringify(response.data)
    })
    .catch(function (error) {
      return error
    });
    res.send(JSON.parse(JSON.stringify(resp)))
});

app.listen(port, () => {
    console.log('Service Online : listening on port ' + port)
})
