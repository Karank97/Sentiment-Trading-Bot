import pandas as pd
from trading_bot import make_trade_decision
from data_retrieval import fetch_data
from sentiment_analysis import analyze_sentiment

def backtest_strategy(stock_symbol, start_date, end_date):
    """
    Backtest the trading strategy on historical data.

    :param stock_symbol: Stock ticker symbol (e.g., 'AAPL').
    :param start_date: Start date for backtesting (e.g., '2020-01-01').
    :param end_date: End date for backtesting (e.g., '2023-12-31').
    :return: DataFrame with backtesting results.
    """
    # Fetch historical stock data
    fetch_data(stock_symbol, start_date, end_date)
    price_data = pd.read_csv(f'data/{stock_symbol}_historical_data.csv')

    # Generate example sentiments for each day
    example_sentiments = ["Positive news about the market"] * len(price_data)

    # Initialize variables for backtesting
    results = []
    balance = 10000  # Starting balance in USD
    position = 0  # Current position (number of shares)

    # Iterate through each day of the price data
    for i in range(len(price_data) - 1):
        # Get the sentiment score for the current day
        sentiment_score = analyze_sentiment(example_sentiments[i])

        # Make a trade decision based on price trends and sentiment
        decision = make_trade_decision(price_data.iloc[:i + 1], sentiment_score)

        # Simulate the trade
        if decision == "buy" and balance >= price_data['Close'].iloc[i]:
            position += 1
            balance -= price_data['Close'].iloc[i]
        elif decision == "sell" and position > 0:
            position -= 1
            balance += price_data['Close'].iloc[i]

        # Record the results
        results.append({
            'Date': price_data['Date'].iloc[i],
            'Close': price_data['Close'].iloc[i],
            'Decision': decision,
            'Balance': balance,
            'Position': position
        })

    # Create a results DataFrame
    results_df = pd.DataFrame(results)
    results_df.to_csv(f'data/{stock_symbol}_backtest_results.csv', index=False)
    print(f"Backtesting completed. Results saved to data/{stock_symbol}_backtest_results.csv")
    return results_df

if __name__ == "__main__":
    # Run the backtesting strategy
    backtest_strategy('AAPL', '2020-01-01', '2023-12-31')
