require("dotenv").config();
const express = require("express");
const request = require("request");
const app = express();
var CryptoJS = require("crypto-js");

app.use(express.json())

var salt = CryptoJS.lib.WordArray.random(12);
var timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString();
var access_key = process.env.ACCESS_KEY;
var secret_key = process.env.SECRET_KEY;



// Creating A Wallet
app.post("/ewallet", function (req, res) {
    var { first_name, last_name, ewallet_reference_id, type, phone_number, email } = req.body;
    var body = {
        "first_name": first_name,
        "last_name": last_name,
        "ewallet_reference_id": ewallet_reference_id,
        "type": type,
        "phone_number": phone_number,
        "email": email
    }
    body = JSON.stringify(body)
    var to_sign = 'post' + '/v1/user' + salt + timestamp + access_key + secret_key + body;
    var signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(to_sign, secret_key));
    signature = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(signature));

    request({
        headers: {
            'access_key': access_key,
            'signature': signature,
            'salt': salt,
            'timestamp': timestamp,
            'Content-Type': "application/\json",

        },
        uri: 'https://sandboxapi.rapyd.net/v1/user',
        method: 'POST',
        body: body
    }, function (err, res, body) {
        response = JSON.parse(res.body)
        console.log(response)
    });
})


// Money Transfer Between Wallet
app.post("/transfer", function (req, res) {
    var { source_ewallet, amount, currency, destination_ewallet } = req.body;

    var body = {
        "source_ewallet": source_ewallet,
        "amount": amount,
        "currency": currency,
        "destination_ewallet": destination_ewallet,
    }

    body = JSON.stringify(body)
    var to_sign = 'post' + '/v1/account/transfer' + salt + timestamp + access_key + secret_key + body;
    var signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(to_sign, secret_key));
    signature = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(signature));

    var headers = {
        'access_key': access_key,
        'signature': signature,
        'salt': salt,
        'timestamp': timestamp,
        'Content-Type': "application/\json",
    }
    request({
        headers: headers,
        uri: 'https://sandboxapi.rapyd.net/v1/account/transfer',
        method: 'POST',
        body: body
    }, function (err, res, body) {
        response = JSON.parse(res.body)
        console.log(response)
    });
})

// Money Transfer Confirmation
app.post("/confirmation", function (req, res) {
    var { id } = req.body;
    var body = {
        "id": id,
        "status": "accept"
    }

    body = JSON.stringify(body)
    var to_sign = 'post' + '/v1/account/transfer/response' + salt + timestamp + access_key + secret_key + body;
    var signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(to_sign, secret_key));
    signature = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(signature));

    var headers = {
        'access_key': access_key,
        'signature': signature,
        'salt': salt,
        'timestamp': timestamp,
        'Content-Type': "application/\json",
    }
    request({
        headers: headers,
        uri: 'https://sandboxapi.rapyd.net/v1/account/transfer/response',
        method: 'POST',
        body: body
    }, function (err, res, body) {
        response = JSON.parse(res.body)
        console.log(response)
    });
})


// List Transactions of a particular e-wallet
app.get("/list", function (req, res) {
    // var {id, status } = req.body;
    var body = ""
    var to_sign = 'get' + '/v1/user/ewallet_8a695b403979fb788f59acf134b7e30b/transactions' + salt + timestamp + access_key + secret_key + body;
    var signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(to_sign, secret_key));
    signature = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(signature));

    var headers = {
        'access_key': access_key,
        'signature': signature,
        'salt': salt,
        'timestamp': timestamp,
        'Content-Type': "application/\json",
    }
    request({
        headers: headers,
        uri: 'https://sandboxapi.rapyd.net/v1/user/ewallet_8a695b403979fb788f59acf134b7e30b/transactions',
        method: 'GET',
        body: body
    }, function (err, res, body) {
        // console.log(res.body)
        response = JSON.parse(res.body)
        console.log(response.data)
    });
})



app.get("/", (req, res) => {
    res.send("Hey There !! Welcome to the server")
})


app.listen(3000, () => console.log("The serving is running"));
