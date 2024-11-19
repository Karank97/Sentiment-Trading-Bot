import yfinance as yf
import pandas as pd
import os

def fetch_data(stock_symbol, start_date, end_date):
    """
    Fetch historical stock price data and save it to a CSV file.
    """
    print(f"Starting data retrieval for {stock_symbol}...")

    # Download data using yfinance
    data = yf.download(stock_symbol, start=start_date, end=end_date)

    if data.empty:
        print(f"No data found for {stock_symbol}. Skipping.")
        return

    # Reset index and flatten multi-level columns
    data.reset_index(inplace=True)
    data.columns = data.columns.map(lambda x: x if isinstance(x, str) else x[1])

    # Explicitly reformat the Date column
    data['Date'] = pd.to_datetime(data['Date']).dt.strftime('%Y-%m-%d')

    # Debugging output
    print("\n--- Debug: First 5 Rows of Cleaned Data ---")
    print(data.head())

    print("\n--- Debug: Data Types of Cleaned Data ---")
    print(data.dtypes)

    # Ensure the data directory exists
    os.makedirs('data', exist_ok=True)

    # Save cleaned data to CSV
    data.to_csv(f'data/{stock_symbol}_historical_data.csv', index=False)
    print(f"Data for {stock_symbol} saved successfully.\n")


def fetch_data_for_tickers(tickers, start_date, end_date):
    """
    Fetch historical data for multiple tickers and save to individual CSV files.
    """
    print("Starting multi-stock data retrieval...")
    os.makedirs('data', exist_ok=True)

    for ticker in tickers:
        try:
            fetch_data(ticker, start_date, end_date)
        except Exception as e:
            print(f"Error fetching data for {ticker}: {e}")

    print("Multi-stock data retrieval completed.")


if __name__ == "__main__":
    # Define tickers and date range
    tickers = ['AAPL', 'MSFT', 'GOOGL']  # Add more tickers as needed
    start_date = '2020-01-01'
    end_date = '2023-12-31'

    # Fetch data for all tickers
    fetch_data_for_tickers(tickers, start_date, end_date)
