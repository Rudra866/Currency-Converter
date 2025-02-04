const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded from data
app.use(express.urlencoded({extended: true}));

// Server static files
app.use(express.static("public"));

//Home Page: To show currency converter
app.get('/', (req, res) => {
  res.send(`
    <h1>Currency Converter</h1>
    <form action="/convert" method="post">
      <label>Amount: <input type="number" step="0.01" name="amount" required></label><br>
      <label>From: 
        <select name="from">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <!-- Add more currencies as needed -->
        </select>
      </label><br>
      <label>To: 
        <select name="to">
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <!-- Add more currencies as needed -->
        </select>
      </label><br>
      <button type="submit">Convert</button>
    </form>
  `);
});

// Conversion endpoint: Fetch exchange rate and display result
app.post('/convert', async (req,res) => {
  const {amount, from, to} = req.body;
  try{
  // Using a free API exchangerate.host (no API key needed)
  const resp = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`);
  const data = await reponse.json();
  
  if (!data.rates || !data.rates[to]) {
    throw new Error("Conversion rate not available");
  }
  const rate = data.rates[to];
  const convertedAmount = (amount * rate).toFixed(2);
  res.send(`
    <h1>Conversion Result</h1>
    <p>${amount} ${from} is approximately ${convertedAmount} ${to}.</p>
    <a href="/">Convert another amount</a>
  `);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Currency Converter app is running on port ${PORT}`);
});
