import pandas as pd
from sentiment_analysis import analyze_sentiment
from data_retrieval import fetch_data

def make_trade_decision(price_data, sentiment_score):
    """
    Make a trading decision based on price trends and sentiment analysis.

    :param price_data: DataFrame containing stock price data.
    :param sentiment_score: Sentiment score (-1 to 1) for the stock.
    :return: A trade decision ('buy', 'sell', or 'hold').
    """
    # Example logic: Buy if sentiment is positive and price is rising
    if sentiment_score > 0 and price_data['Close'].iloc[-1] > price_data['Close'].iloc[-2]:
        return "buy"
    elif sentiment_score < 0:
        return "sell"
    else:
        return "hold"

if __name__ == "__main__":
    # Example usage
    stock_symbol = 'AAPL'
    start_date = '2023-01-01'
    end_date = '2023-12-31'

    # Fetch historical price data
    fetch_data(stock_symbol, start_date, end_date)
    price_data = pd.read_csv(f'data/{stock_symbol}_historical_data.csv')

    # Example sentiment text
    sentiment_text = "Apple stocks are performing exceptionally well!"
    sentiment_score = analyze_sentiment(sentiment_text)

    # Make trade decision
    decision = make_trade_decision(price_data, sentiment_score)
    print(f"Trade decision for {stock_symbol}: {decision}")
