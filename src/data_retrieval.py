import yfinance as yf
import pandas as pd
import os

def fetch_data(stock_symbol, start_date, end_date):
    """
    Fetch historical stock price data and save it to a CSV file.
    """
    print(f"Starting data retrieval for {stock_symbol}...")

    try:
        # Download data using yfinance
        data = yf.download(stock_symbol, start=start_date, end=end_date)

        if data.empty:
            print(f"No data found for {stock_symbol}. Skipping.")
            return

        # Reset the index and flatten multi-level columns if necessary
        data.reset_index(inplace=True)
        if isinstance(data.columns, pd.MultiIndex):
            data.columns = data.columns.get_level_values(1)

        # Ensure the Date column exists and is formatted correctly
        if 'Date' not in data.columns:
            data.rename(columns={'index': 'Date'}, inplace=True)

        data['Date'] = pd.to_datetime(data['Date']).dt.strftime('%Y-%m-%d')

        # Debugging: Check the first 5 rows of cleaned data
        print("\n--- Debug: First 5 Rows of Cleaned Data ---")
        print(data.head())

        # Ensure required columns exist
        required_columns = ['Date', 'Close', 'Open', 'High', 'Low', 'Volume']
        for col in required_columns:
            if col not in data.columns:
                print(f"Error: Missing required column '{col}' in data for {stock_symbol}.")
                return

        # Ensure the data directory exists
        os.makedirs('data', exist_ok=True)

        # Save the cleaned data to a CSV file
        file_path = f'data/{stock_symbol}_historical_data.csv'
        data.to_csv(file_path, index=False)
        print(f"Data for {stock_symbol} saved successfully to {file_path}.\n")
    except Exception as e:
        print(f"Error fetching data for {stock_symbol}: {e}")


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
