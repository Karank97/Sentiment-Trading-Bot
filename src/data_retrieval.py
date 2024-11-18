import yfinance as yf

def fetch_data(stock_symbol, start_date, end_date):
    """
    Fetch historical stock price data and save it to a CSV file.

    :param stock_symbol: Stock ticker symbol (e.g., 'AAPL').
    :param start_date: Start date for historical data (e.g., '2020-01-01').
    :param end_date: End date for historical data (e.g., '2023-12-31').
    """
    data = yf.download(stock_symbol, start=start_date, end=end_date)
    # Save data locally (to be downloaded manually)
    data.to_csv(f'data/{stock_symbol}_historical_data.csv')
    print(f"Data for {stock_symbol} saved successfully.")

# Example usage
if __name__ == "__main__":
    fetch_data('AAPL', '2020-01-01', '2023-12-31')
