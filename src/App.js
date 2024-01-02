import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const onChange = (event) => {
    const coinId = event.target.value;
    const coinData = coins.find((coin) => coin.id === coinId);
    setSelectedCoin(coinData);
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
          <select onChange={onChange}>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol})
              </option>
            ))}
          </select>
          {selectedCoin && <h3>How much {selectedCoin.name} can I buy?</h3>}
          {selectedCoin && (
            <p>
              {selectedCoin.name} ({selectedCoin.symbol}): $
              {selectedCoin.quotes.USD.price} USD
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
