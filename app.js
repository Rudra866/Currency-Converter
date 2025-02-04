import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory (if you have any)
app.use(express.static("public"));

// Helper function to wrap content in a styled HTML template
function wrapInHTML(content) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Currency Converter</title>
      <style>
        /* Global Styles */
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background: linear-gradient(120deg, #006aff, #00d4ff);
          color: #333;
        }
        a {
          color: #006aff;
          text-decoration: none;
          font-weight: bold;
        }
        a:hover {
          text-decoration: underline;
        }
        
        /* Container */
        .converter-container {
          max-width: 600px;
          margin: 60px auto;
          background: rgba(255, 255, 255, 0.8);
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
        }

        /* Form Styles */
        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        label {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
        input[type="number"], select {
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
          flex: 1;
          margin-left: 10px;
        }
        button {
          align-self: center;
          padding: 10px 20px;
          background: #006aff;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s;
        }
        button:hover {
          background: #004bb8;
        }

        /* Table Styles (for ALL conversions) */
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: center;
          background: #fff;
        }
        th {
          background: #f0f0f0;
        }
      </style>
    </head>
    <body>
      <div class="converter-container">
        ${content}
      </div>
    </body>
  </html>
  `;
}

// Home Page: Display a currency converter form
app.get("/", (req, res) => {
  const homeContent = `
    <h1>Currency Converter</h1>
    <form action="/convert" method="post">
      <label>
        Amount:
        <input type="number" step="0.01" name="amount" required />
      </label>
      <label>
        From:
        <select name="from">
          <option value="AUD">AUD</option>
          <option value="BGN">BGN</option>
          <option value="BRL">BRL</option>
          <option value="CAD">CAD</option>
          <option value="CHF">CHF</option>
          <option value="CNY">CNY</option>
          <option value="CZK">CZK</option>
          <option value="DKK">DKK</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="HKD">HKD</option>
          <option value="HUF">HUF</option>
          <option value="IDR">IDR</option>
          <option value="ILR">ILR</option>
          <option value="INR">INR</option>
          <option value="ISK">ISK</option>
          <option value="JPY">JPY</option>
          <option value="KRW">KRW</option>
          <option value="MXN">MXN</option>
          <option value="MYR">MYR</option>
          <option value="NOK">NOK</option>
          <option value="NZD">NZD</option>
          <option value="PHP">PHP</option>
          <option value="PLN">PLN</option>
          <option value="RON">RON</option>
          <option value="SEK">SEK</option>
          <option value="SGD">SGD</option>
          <option value="THB">THB</option>
          <option value="TRY">TRY</option>
          <option value="USD">USD</option>
          <option value="ZAR">ZAR</option>
        </select>
      </label>
      <label>
        To:
        <select name="to">
          <option value="ALL">ALL</option>
          <option value="AUD">AUD</option>
          <option value="BGN">BGN</option>
          <option value="BRL">BRL</option>
          <option value="CAD">CAD</option>
          <option value="CHF">CHF</option>
          <option value="CNY">CNY</option>
          <option value="CZK">CZK</option>
          <option value="DKK">DKK</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="HKD">HKD</option>
          <option value="HUF">HUF</option>
          <option value="IDR">IDR</option>
          <option value="ILR">ILR</option>
          <option value="INR">INR</option>
          <option value="ISK">ISK</option>
          <option value="JPY">JPY</option>
          <option value="KRW">KRW</option>
          <option value="MXN">MXN</option>
          <option value="MYR">MYR</option>
          <option value="NOK">NOK</option>
          <option value="NZD">NZD</option>
          <option value="PHP">PHP</option>
          <option value="PLN">PLN</option>
          <option value="RON">RON</option>
          <option value="SEK">SEK</option>
          <option value="SGD">SGD</option>
          <option value="THB">THB</option>
          <option value="TRY">TRY</option>
          <option value="USD">USD</option>
          <option value="ZAR">ZAR</option>
        </select>
      </label>
      <button type="submit">Convert</button>
    </form>
  `;
  res.send(wrapInHTML(homeContent));
});

// Conversion endpoint: Fetch exchange rate and display result
app.post("/convert", async (req, res) => {
  const { amount, from, to } = req.body;
  try {
    let response;
    if (to === "ALL") {
      // Fetch all rates based on the 'from' currency
      response = await fetch(`https://api.frankfurter.app/latest?from=${from}`);
    } else {
      // Fetch only the specific target currency
      response = await fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`);
    }

    const data = await response.json();

    // Debug: log the full response to help see what's coming back from the API
    console.log("API response:", data);

    // If the user chose ALL currencies, display them in a table
    if (to === "ALL") {
      if (!data.rates) {
        throw new Error("Conversion rates not available");
      }

      let tableRows = "";
      for (const currency in data.rates) {
        const rate = data.rates[currency];
        const convertedAmount = (amount * rate).toFixed(2);
        tableRows += `
          <tr>
            <td>${amount} ${from}</td>
            <td>${convertedAmount} ${currency}</td>
          </tr>
        `;
      }

      const allResultHTML = `
        <h1>All Conversion Results from ${from}</h1>
        <table>
          <tr>
            <th>Original Amount</th>
            <th>Converted Amount</th>
          </tr>
          ${tableRows}
        </table>
        <a href="/">Convert another amount</a>
      `;
      res.send(wrapInHTML(allResultHTML));
    } else {
      // The user chose a specific currency
      if (!data.rates || !data.rates[to]) {
        throw new Error("Conversion rate not available");
      }

      const rate = data.rates[to];
      const convertedAmount = (amount * rate).toFixed(2);

      const singleResultHTML = `
        <h1>Conversion Result</h1>
        <p>${amount} ${from} is approximately <strong>${convertedAmount} ${to}</strong>.</p>
        <a href="/">Convert another amount</a>
      `;
      res.send(wrapInHTML(singleResultHTML));
    }
  } catch (error) {
    // If there's an error, send it back so you can see what's wrong
    const errorHTML = `
      <h1>Error</h1>
      <p>${error.message}</p>
      <a href="/">Go Back</a>
    `;
    res.status(500).send(wrapInHTML(errorHTML));
  }
});

app.listen(PORT, () => {
  console.log(`Currency Converter app is running on port ${PORT}`);
});
