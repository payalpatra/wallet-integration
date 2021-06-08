const request = require("request");
const CryptoJS = require("crypto-js");
const getHeaders = require("../functions/headers");
const getRequestData = require("../functions/requestData");
const getHelpers = require("../functions/helpers");

const helpers = getHelpers();

module.exports = function (req, res) {
    // Request Data Parameters
    const uri = 'https://sandboxapi.rapyd.net/v1/checkout';
    const http_method = 'post'
    const path = '/v1/checkout'

    // Body Data
    let { amount, country, currency } = req.body;
    let body = {
        "amount": amount,
        "country": country,
        "currency": currency
    }

    body = JSON.stringify(body)
    console.log(body)


    let to_sign = http_method + path + helpers.salt + helpers.timestamp + helpers.access_key + helpers.secret_key + body;
    let signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(to_sign, helpers.secret_key));
    signature = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(signature));

    // Request Details
    const headers = getHeaders(helpers.access_key, signature, helpers.salt, helpers.timestamp)
    const requestData = getRequestData(headers, uri, http_method, body)

    // Request Function
    request(requestData, function (err, res, body) {
        response = JSON.parse(res.body)
        console.log("Redirect The User To This Url", response.data.redirect_url);
    });
}
