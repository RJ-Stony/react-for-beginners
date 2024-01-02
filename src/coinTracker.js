import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [amount, setAmount] = useState(0);

  const onChange = (event) => {
    const coinId = event.target.value;
    const coinData = coins.find((coin) => coin.id === coinId);
    setSelectedCoin(coinData);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const calCoinQuantity = () => {
    if (selectedCoin && amount) {
      return amount / selectedCoin.quotes.USD.price;
    }
    return 0;
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <h1>The Coins! ({coins.length})</h1>
          <select onChange={onChange}>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol})
              </option>
            ))}
          </select>
          {selectedCoin && (
            <>
              <h3>How much {selectedCoin.name} can I buy?</h3>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter your amount in USD"
              />
              <p>
                You can buy approximately {calCoinQuantity().toFixed(2)}{" "}
                {selectedCoin.symbol}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
