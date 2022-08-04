const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const midtransClient = require('midtrans-client');
const app = express();
const router = express.Router();

const PORT = 3500;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction : false,
  serverKey : 'SB-Mid-server-YpASTKAKNLC392kqirD-9BtY'
});

router.post('/api/getToken', (req, res) => {
  let parameter = {
      "transaction_details": {
          "order_id": "YOUR-ORDERID-123456" + Math.ceil(Math.random()*100+15),
          "gross_amount": req.body.harga
      },
      "credit_card":{
          "secure" : true
      },
      "customer_details": {
          "first_name": req.body.first_name,
          "last_name": req.body.last_name,
          "email": "budi.pra@example.com",
          "phone": "08111222333"
      }
  };
  snap.createTransaction(parameter)
  .then((transaction)=>res.json(transaction))
})

app.use("/", router);

app.listen(PORT, () => {
  console.log("running at port " + PORT);
});
