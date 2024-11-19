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
    print(f"Starting backtest for {stock_symbol}...")

    # Fetch historical stock data
    fetch_data(stock_symbol, start_date, end_date)
    price_data_path = f'data/{stock_symbol}_historical_data.csv'

    # Load data and handle potential errors
    try:
        price_data = pd.read_csv(price_data_path)
        print(f"Price data loaded successfully from {price_data_path}.")
    except FileNotFoundError:
        print(f"Error: {price_data_path} not found. Ensure the fetch_data function ran correctly.")
        return
    except Exception as e:
        print(f"Error loading price data: {e}")
        return

    # Debugging: Show the first few rows of the price data
    print("\n--- Debug: First 5 Rows of Price Data ---")
    print(price_data.head())

    # Ensure required columns exist
    required_columns = {'Date', 'Close'}
    if not required_columns.issubset(price_data.columns):
        print(f"Error: Missing required columns in price_data. Found columns: {price_data.columns}")
        return

    # Explicitly check and fix column data types
    try:
        price_data['Date'] = pd.to_datetime(price_data['Date'])
        price_data['Close'] = pd.to_numeric(price_data['Close'])
    except Exception as e:
        print(f"Error processing column data types: {e}")
        return

    # Debugging: Verify data types after fixing
    print("\n--- Debug: Data Types of Price Data ---")
    print(price_data.dtypes)

    # Generate example sentiments for each day (to be replaced with real sentiment analysis)
    example_sentiments = ["Positive news about the market"] * len(price_data)

    # Initialize variables for backtesting
    results = []
    balance = 10000  # Starting balance in USD
    position = 0  # Current position (number of shares)

    # Backtesting loop
    for i in range(len(price_data) - 1):
        try:
            # Get the sentiment score for the current day
            sentiment_score = analyze_sentiment(example_sentiments[i])

            # Make a trade decision
            decision = make_trade_decision(price_data.iloc[:i + 1], sentiment_score)

            # Simulate the trade
            if decision == "buy" and balance >= price_data['Close'].iloc[i]:
                position += 1
                balance -= price_data['Close'].iloc[i]
            elif decision == "sell" and position > 0:
                position -= 1
                balance += price_data['Close'].iloc[i]

            # Record results for the day
            results.append({
                'Date': price_data['Date'].iloc[i],
                'Close': price_data['Close'].iloc[i],
                'Decision': decision,
                'Balance': balance,
                'Position': position
            })

        except Exception as e:
            print(f"Error processing row {i}: {e}")
            continue

    # Create a results DataFrame
    results_df = pd.DataFrame(results)

    # Debugging: Show the first few rows of backtesting results
    print("\n--- Debug: First 5 Rows of Backtesting Results ---")
    print(results_df.head())

    # Save results to a CSV file
    results_file_path = f'data/{stock_symbol}_backtest_results.csv'
    try:
        results_df.to_csv(results_file_path, index=False)
        print(f"Backtesting completed. Results saved to {results_file_path}.")
    except Exception as e:
        print(f"Error saving backtest results: {e}")

    return results_df


def backtest_multiple_stocks(tickers, start_date, end_date):
    """
    Backtest the strategy for multiple stocks and save portfolio-level results.
    """
    print("Starting backtest for multiple stocks...")
    portfolio_results = []

    for ticker in tickers:
        try:
            print(f"\nProcessing {ticker}...")
            stock_results = backtest_strategy(ticker, start_date, end_date)
            if stock_results is not None:
                final_balance = stock_results['Balance'].iloc[-1]
                portfolio_results.append({'Ticker': ticker, 'Final Balance': final_balance})
        except Exception as e:
            print(f"Error backtesting {ticker}: {e}")
            continue

    # Save portfolio-level results
    portfolio_df = pd.DataFrame(portfolio_results)
    portfolio_results_file = 'data/portfolio_backtest_results.csv'
    try:
        portfolio_df.to_csv(portfolio_results_file, index=False)
        print(f"Portfolio backtest results saved to {portfolio_results_file}.")
    except Exception as e:
        print(f"Error saving portfolio results: {e}")

    print("\n--- Portfolio Backtest Summary ---")
    print(portfolio_df)


if __name__ == "__main__":
    # Parameters for backtesting
    tickers = ['AAPL', 'MSFT', 'GOOGL']  # Add more tickers as needed
    start_date = '2020-01-01'
    end_date = '2023-12-31'

    # Run backtesting for multiple stocks
    backtest_multiple_stocks(tickers, start_date, end_date)
