import yfinance as yf
import pandas as pd
import os
import traceback

def fetch_data(stock_symbol, start_date, end_date):
    """
    Fetch historical stock price data and save it to a CSV file.
    """
    print(f"\n--- Starting data retrieval for {stock_symbol} ---")
    try:
        # Download data using yfinance
        print(f"Fetching data for {stock_symbol} from {start_date} to {end_date}...")
        data = yf.download(stock_symbol, start=start_date, end=end_date, progress=True)

        # Debug: Check if data is empty
        if data.empty:
            print(f"Error: No data found for {stock_symbol}. Skipping.")
            return

        # Debug: Show raw data structure
        print(f"\n--- Debug: Raw Data for {stock_symbol} ---")
        print(data.head())
        print(data.info())

        # Flatten multi-level columns if they exist
        if isinstance(data.columns, pd.MultiIndex):
            print("Flattening multi-level columns...")
            data.columns = data.columns.get_level_values(0)

        # Rename columns to standard format
        expected_columns = ['Adj Close', 'Close', 'High', 'Low', 'Open', 'Volume']
        column_mapping = {col: col for col in expected_columns}
        column_mapping.update({'Date': 'Date'})  # Ensure Date remains mapped correctly
        data.rename(columns=column_mapping, inplace=True)

        # Reset index and ensure the Date column exists
        print("Resetting index...")
        data.reset_index(inplace=True)
        if 'Date' not in data.columns:
            print("Renaming index to Date...")
            data.rename(columns={'index': 'Date'}, inplace=True)

        # Format the Date column
        try:
            print("Formatting Date column...")
            data['Date'] = pd.to_datetime(data['Date']).dt.strftime('%Y-%m-%d')
        except Exception as e:
            print(f"Error formatting 'Date' column for {stock_symbol}: {e}")
            traceback.print_exc()
            return

        # Debug: Check cleaned data
        print(f"\n--- Debug: First 5 Rows of Cleaned Data for {stock_symbol} ---")
        print(data.head())

        # Ensure required columns exist
        required_columns = ['Date', 'Close', 'Open', 'High', 'Low', 'Volume']
        missing_columns = [col for col in required_columns if col not in data.columns]
        if missing_columns:
            print(f"Error: Missing required columns {missing_columns} in data for {stock_symbol}.")
            return

        # Ensure the data directory exists
        os.makedirs('data', exist_ok=True)

        # Save cleaned data to CSV
        file_path = f'data/{stock_symbol}_historical_data.csv'
        print(f"Saving cleaned data to {file_path}...")
        data.to_csv(file_path, index=False)
        print(f"Data for {stock_symbol} saved successfully to {file_path}.\n")
    except Exception as e:
        print(f"Error fetching data for {stock_symbol}: {e}")
        traceback.print_exc()


def fetch_data_for_tickers(tickers, start_date, end_date):
    """
    Fetch historical data for multiple tickers and save to individual CSV files.
    """
    print("\n--- Starting multi-stock data retrieval ---")
    os.makedirs('data', exist_ok=True)

    for ticker in tickers:
        print(f"\n--- Debug: Processing {ticker} ---")
        try:
            fetch_data(ticker, start_date, end_date)
        except Exception as e:
            print(f"Error fetching data for {ticker}: {e}")
            traceback.print_exc()

    print("\n--- Multi-stock data retrieval completed ---")


if __name__ == "__main__":
    print("Starting the script...")
    # Define tickers and date range
    tickers = ['AAPL', 'MSFT', 'GOOGL']  # Add more tickers as needed
    start_date = '2020-01-01'
    end_date = '2023-12-31'

    # Fetch data for all tickers
    print(f"Fetching data for: {tickers}")
    fetch_data_for_tickers(tickers, start_date, end_date)
    print("Script completed.")
