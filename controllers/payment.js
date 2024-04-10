const axios = require("axios");

async function payment() {
  const url =
    "https://raw.githubusercontent.com/SharjeelJathol/payments/main/11116831.json";

  try {
    const response = await axios.get(url);
    const jsonData = response.data;
    console.log(jsonData.Payment);
    return jsonData.Payment;
    // Now you can work with the JSON data
  } catch (error) {
    console.error("Error fetching JSON from GitHub:", error);
  }
}

module.exports = payment;
