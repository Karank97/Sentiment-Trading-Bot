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

        # Flatten multi-level columns
        if isinstance(data.columns, pd.MultiIndex):
            data.columns = [col[1] if col[1] else col[0] for col in data.columns]

        # Reset index and ensure the Date column exists
        data.reset_index(inplace=True)
        data.rename(columns={'index': 'Date'}, inplace=True)

        # Format the Date column
        data['Date'] = pd.to_datetime(data['Date']).dt.strftime('%Y-%m-%d')

        # Debugging: Show first 5 rows of cleaned data
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
        data.to_csv(file_path, index=False)
        print(f"Data for {stock_symbol} saved successfully to {file_path}.\n")
    except Exception as e:
        print(f"Error fetching data for {stock_symbol}: {e}")
