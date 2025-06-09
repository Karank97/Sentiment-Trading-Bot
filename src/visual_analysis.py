import pandas as pd
import matplotlib.pyplot as plt

# Load backtesting results
results = pd.read_csv('/Users/karan/Desktop/PROJECT/Sentiment-Trading-Bot/data/AAPL_backtest_results.csv')

# Plot Balance Over Time
plt.figure(figsize=(10, 6))
plt.plot(results['Date'], results['Balance'], label='Balance Over Time', marker='o')
plt.xlabel('Date')
plt.ylabel('Balance (USD)')
plt.title('Backtesting Results: Balance Over Time')
plt.xticks(rotation=45)
plt.legend()
plt.tight_layout()
plt.show()

# Plot Stock Price with Buy/Sell Decisions
plt.figure(figsize=(10, 6))
plt.plot(results['Date'], results['Close'], label='Stock Price', color='blue')

buy_dates = results[results['Decision'] == 'buy']['Date']
buy_prices = results[results['Decision'] == 'buy']['Close']
sell_dates = results[results['Decision'] == 'sell']['Date']
sell_prices = results[results['Decision'] == 'sell']['Close']

plt.scatter(buy_dates, buy_prices, color='green', label='Buy', marker='^', alpha=1)
plt.scatter(sell_dates, sell_prices, color='red', label='Sell', marker='v', alpha=1)

plt.xlabel('Date')
plt.ylabel('Price (USD)')
plt.title('Stock Price with Buy and Sell Decisions')
plt.xticks(rotation=45)
plt.legend()
plt.tight_layout()
plt.show()

# Compare Balance and Stock Price
fig, ax1 = plt.subplots(figsize=(10, 6))
ax1.set_xlabel('Date')
ax1.set_ylabel('Stock Price (USD)', color='blue')
ax1.plot(results['Date'], results['Close'], label='Stock Price', color='blue')
ax1.tick_params(axis='y', labelcolor='blue')

ax2 = ax1.twinx()
ax2.set_ylabel('Balance (USD)', color='green')
ax2.plot(results['Date'], results['Balance'], label='Balance', color='green')
ax2.tick_params(axis='y', labelcolor='green')

plt.title('Comparison of Stock Price and Account Balance')
fig.tight_layout()
plt.show()
