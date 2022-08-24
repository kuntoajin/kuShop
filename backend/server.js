const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const midtransClient = require("midtrans-client");
const app = express();
const router = express.Router();

const data = require("./data/user.json");

const PORT = 3500;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

let cart = [];
let checkout = {};
let checkLogin;

let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: "SB-Mid-server-YpASTKAKNLC392kqirD-9BtY",
});

router.post("/api/getToken", (req, res) => {
  let parameter = {
    transaction_details: {
      order_id: "YOUR-ORDERID-123456" + Math.ceil(Math.random() * 100 + 15),
      gross_amount: req.body.harga,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: "budi.pra@example.com",
      phone: "08111222333",
    },
  };
  snap
    .createTransaction(parameter)
    .then((transaction) => res.json(transaction));
});

router.post("/api/addToCart", (req, res) => {
  cart.push(req.body);
  res.json(cart);
});

router.get("/api/getCart", (req, res) => {
  res.json(cart);
});

router.get("/api/addToCheckout", (req, res) => {
  checkout = {
    productName: req.body.name,
  };
  res.json(cart);
});

router.post("/api/login", (req, res) => {
  if (
    req.body.username === data.username &&
    req.body.password === data.password
  ) {
    res.json({
      success: true,
      username: data.username,
      message: "Login berhasil!",
    });
    checkLogin = true;
  } else {
    res.json({
      success: false,
      message: "Login gagal! Periksa username atau password Anda!",
    });
    checkLogin = false;
  }
});

router.get("/api/checkLogin", (req, res) => {
  if (checkLogin) {
    res.json({ isLogin: checkLogin, username: data.username });
  } else {
    res.json({ isLogin: checkLogin });
  }
});

router.get("/api/logout", (req, res) => {
  checkLogin = false;
  res.json({ isLogin: checkLogin });
});

app.use("/", router);

app.listen(PORT, () => {
  console.log("running at port " + PORT);
  console.log(checkLogin);
});
