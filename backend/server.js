const path = require('path')
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const midtransClient = require("midtrans-client");
const app = express();
const router = express.Router();

const data = require("./data/files.json");

const PORT = 3500;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

let cart = [];
let checkout = {};
let payment = {}
let checkLogin;

app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')))

let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: "SB-Mid-server-YpASTKAKNLC392kqirD-9BtY",
});

let core = new midtransClient.CoreApi({
  isProduction : false,
  serverKey: "SB-Mid-server-YpASTKAKNLC392kqirD-9BtY",
  clientKey : 'SB-Mid-client-WjzrUPLaHVUvMFJp'
});

let apiClient = new midtransClient.Snap({
  isProduction : false,
  serverKey: "SB-Mid-server-YpASTKAKNLC392kqirD-9BtY",
  clientKey : 'SB-Mid-client-WjzrUPLaHVUvMFJp'
});

router.get("/api/getFiles", (req, res) => {
  res.json(data)
})

router.post("/api/getToken", (req, res) => {
  let parameter = {
    "transaction_details": {
      "order_id": "YOUR-ORDERID-123456" + Math.ceil(Math.random() * 100 + 15),
      "gross_amount": 50000,
    },
    "customer_details": {
      "first_name": req.body.first_name,
      "last_name": req.body.last_name,
      "email": "budi.pra@example.com",
      "phone": "08111222333",
    },
    "payment_type": "bank_transfer",
    "bank_transfer":{
      "bank": req.body.bank_transfer
  }
  };
  // snap
  //   .createTransaction(parameter)
  //   .then((transaction) => res.json(transaction));
  core.charge(parameter)
    .then((chargeResponse)=>{
      // console.log('chargeResponse:',JSON.stringify(chargeResponse));
      res.json(chargeResponse)
      apiClient.transaction.notification(chargeResponse)
        .then((statusResponse)=>{
            let orderId = statusResponse.order_id;
            let transactionStatus = statusResponse.transaction_status;
            let fraudStatus = statusResponse.fraud_status;

            console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

            // Sample transactionStatus handling logic

            if (transactionStatus == 'capture'){
                if (fraudStatus == 'challenge'){
                    // TODO set transaction status on your database to 'challenge'
                    // and response with 200 OK
                } else if (fraudStatus == 'accept'){
                    // TODO set transaction status on your database to 'success'
                    // and response with 200 OK
                }
            } else if (transactionStatus == 'settlement'){
                // TODO set transaction status on your database to 'success'
                // and response with 200 OK
                console.log('transaksi berhasil!')
            } else if (transactionStatus == 'cancel' ||
              transactionStatus == 'deny' ||
              transactionStatus == 'expire'){
              // TODO set transaction status on your database to 'failure'
              // and response with 200 OK
            } else if (transactionStatus == 'pending'){
              // TODO set transaction status on your database to 'pending' / waiting payment
              // and response with 200 OK
              async function getStatus() {
                const response = fetch(`https://api.sandbox.midtrans.com/v2/${orderId}/status`)
                console.log(response)
              }
              getStatus()
            }
        });
    })
    .catch((e)=>{
      console.log('Error occured:',e.message);
      res.json(e.message)
    });;
    
});

router.post("/api/addToCart", (req, res) => {
  cart.push(req.body);
  res.json(cart);
});

router.get("/api/getCart", (req, res) => {
  if (cart.length < 1) {
    res.json({ message: "Keranjang kosong" });
  } else {
    res.json(cart);
  }
});

router.get("/api/addToCheckout", (req, res) => {
  checkout = {
    productName: req.body.name,
  };
  res.json(cart);
});

router.post("/api/addToPayment", (req, res) => {
  console.log(req.body)
  payment = req.body
  res.json(payment)
})

router.get("/api/addToPayment", (req, res) => {
  res.json(payment)
})

router.post("/api/delete", (req, res) => {
  console.log(req.body);
  cart.splice(req.body.index, 1);
});

app.use("/", router);

app.listen(PORT, () => {
  console.log("running at port " + PORT);
  console.log(checkLogin);
});
