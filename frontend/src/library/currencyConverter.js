import axios from "axios";
import { useEffect, useState } from "react";

export const currencyConverter = async (price) => {
  const response = await axios.get(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/idr.json"
  );

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return response?.data?.idr && formatter.format(response?.data?.idr * price);
  //   return currency;
};
