require("dotenv").config();
const express = require("express");
const app = express();

const createWallet = require("./controllers/createWallet");
const transfer = require("./controllers/transfer")
const confirmation = require("./controllers/confirmation");
const walletDetails = require("./controllers/walletDetails");
const listTransactions = require("./controllers/listTransactions");
const checkout = require("./controllers/checkout");


app.use(express.json())


// ------------------------ Creating A Wallet ------------------------ \\
app.post("/ewallet", createWallet)

// -------------------- Money Transfer Between Wallet ------------------- \\
app.post("/transfer", transfer)

// ------------------------ Money Transfer Confirmation ------------------- \\
app.post("/confirmation", confirmation)


// ------------------------ Retrieve Wallet Contact----------------------- \\

app.post("/walletDetails", walletDetails)

// ------------------ List Transactions of a particular e-wallet ---------------- \\
app.post("/listTransactions", listTransactions)

// --------------------------- Checkout --------------------------- \\
app.post("/checkout", checkout)



app.get("/", (req, res) => {
    res.send("Hey There !! Welcome to the server")
})


app.listen(3000, () => console.log("The serving is running"));
