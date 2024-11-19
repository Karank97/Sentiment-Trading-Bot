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

        # Debugging: Inspect raw data structure
        print(f"\n--- Debug: Raw Data for {stock_symbol} ---")
        print(data.head())
        print(data.info())

        # Reset the index and ensure the Date column exists
        data.reset_index(inplace=True)
        if 'Date' not in data.columns:
            data.rename(columns={'index': 'Date'}, inplace=True)

        # Explicitly format the Date column
        try:
            data['Date'] = pd.to_datetime(data['Date']).dt.strftime('%Y-%m-%d')
        except Exception as e:
            print(f"Error formatting 'Date' column for {stock_symbol}: {e}")
            return

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
