import yfinance as yf
import pandas as pd

def fetch_data(stock_symbol, start_date, end_date):
    """
    Fetch historical stock price data and save it to a CSV file.

    :param stock_symbol: Stock ticker symbol (e.g., 'AAPL').
    :param start_date: Start date for historical data (e.g., '2020-01-01').
    :param end_date: End date for historical data (e.g., '2023-12-31').
    """
    # Download data using yfinance
    data = yf.download(stock_symbol, start=start_date, end=end_date)

    # Reset the index to include the Date column
    data.reset_index(inplace=True)

    # Explicitly reformat the Date column
    data['Date'] = pd.to_datetime(data['Date']).dt.strftime('%Y-%m-%d')

    # Debugging output: Check the first few rows of the Date column
    print("\n--- Debug: First 5 Rows of the Date Column ---")
    print(data[['Date']].head())

    # Debugging output: Check the data types of all columns
    print("\n--- Debug: Data Types of the DataFrame ---")
    print(data.dtypes)

    # Save the data to a CSV file
    data.to_csv(f'data/{stock_symbol}_historical_data.csv', index=False)
    print(f"Data for {stock_symbol} saved successfully.")
