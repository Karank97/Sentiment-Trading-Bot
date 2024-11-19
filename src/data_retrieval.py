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

    # Reset the index to include the Date column
    data.reset_index(inplace=True)

    # Assign proper column names
    data.rename(columns={
        'Adj Close': 'Adj_Close',
        'Close': 'Close',
        'High': 'High',
        'Low': 'Low',
        'Open': 'Open',
        'Volume': 'Volume'
    }, inplace=True)

    # Explicitly reformat the Date column
    data['Date'] = pd.to_datetime(data['Date']).dt.strftime('%Y-%m-%d')

    # Debugging output: Check the first few rows of the Date column
    print("\n--- Debug: First 5 Rows of the Date Column ---")
    print(data[['Date']].head())

    # Debugging output: Check the data types of all columns
    print("\n--- Debug: Data Types of the DataFrame ---")
    print(data.dtypes)

    # Debugging output: Display the first few rows of the entire DataFrame
    print("\n--- Debug: First 5 Rows of the Entire DataFrame ---")
    print(data.head())

    print("Saving the data...")
    # Ensure the data directory exists
    os.makedirs('data', exist_ok=True)

    # Save the data to a CSV file
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
