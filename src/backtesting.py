import pandas as pd
from trading_bot import make_trade_decision
from data_retrieval import fetch_data
from sentiment_analysis import analyze_sentiment

def calculate_indicators(price_data):
    """
    Add technical indicators to the price data.
    """
    price_data['SMA_20'] = price_data['Close'].rolling(window=20).mean()
    price_data['SMA_50'] = price_data['Close'].rolling(window=50).mean()
    price_data['EMA_20'] = price_data['Close'].ewm(span=20, adjust=False).mean()

    # RSI Calculation
    delta = price_data['Close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
    rs = gain / loss
    price_data['RSI'] = 100 - (100 / (1 + rs))

    # MACD Calculation
    ema_12 = price_data['Close'].ewm(span=12, adjust=False).mean()
    ema_26 = price_data['Close'].ewm(span=26, adjust=False).mean()
    price_data['MACD'] = ema_12 - ema_26
    price_data['Signal'] = price_data['MACD'].ewm(span=9, adjust=False).mean()

    return price_data

def enhanced_make_trade_decision(price_data, sentiment_score, position, balance):
    """
    Make a trading decision based on technical indicators and sentiment score.
    """
    current_price = price_data['Close'].iloc[-1]
    sma_20 = price_data['SMA_20'].iloc[-1]
    sma_50 = price_data['SMA_50'].iloc[-1]
    rsi = price_data['RSI'].iloc[-1]
    macd = price_data['MACD'].iloc[-1]
    signal = price_data['Signal'].iloc[-1]

    stop_loss = current_price * 0.95
    take_profit = current_price * 1.05

    if sentiment_score > 0 and sma_20 > sma_50 and rsi < 70:
        return "buy"
    elif position > 0 and (current_price < stop_loss or current_price > take_profit):
        return "sell"
    elif macd < signal and rsi > 70:
        return "sell"
    else:
        return "hold"

def backtest_strategy(stock_symbol, start_date, end_date):
    """
    Backtest the trading strategy on historical data.
    """
    print(f"Starting backtest for {stock_symbol}...")

    # Fetch historical stock data
    fetch_data(stock_symbol, start_date, end_date)
    price_data = pd.read_csv(f'data/{stock_symbol}_historical_data.csv')

    # Add indicators
    price_data = calculate_indicators(price_data)

    # Generate example sentiments
    sentiment_texts = ["Positive news"] * len(price_data)
    results = []
    balance = 10000  # Starting balance
    position = 0  # Starting position

    # Backtesting loop
    for i in range(len(price_data)):
        if i < 50:  # Ensure sufficient data for indicators
            results.append({'Date': price_data['Date'].iloc[i], 'Balance': balance, 'Position': position, 'Decision': 'hold'})
            continue

        sentiment_score = analyze_sentiment(sentiment_texts[i])
        decision = enhanced_make_trade_decision(price_data.iloc[:i + 1], sentiment_score, position, balance)

        if decision == "buy" and balance >= price_data['Close'].iloc[i]:
            position += 1
            balance -= price_data['Close'].iloc[i]
        elif decision == "sell" and position > 0:
            position -= 1
            balance += price_data['Close'].iloc[i]

        results.append({
            'Date': price_data['Date'].iloc[i],
            'Close': price_data['Close'].iloc[i],
            'Decision': decision,
            'Balance': balance,
            'Position': position
        })

    results_df = pd.DataFrame(results)
    results_df.to_csv(f'data/{stock_symbol}_backtest_results.csv', index=False)
    print(f"Backtesting completed. Results saved to data/{stock_symbol}_backtest_results.csv")

if __name__ == "__main__":
    tickers = ['AAPL', 'MSFT', 'GOOGL']
    start_date = '2020-01-01'
    end_date = '2023-12-31'

    for ticker in tickers:
        backtest_strategy(ticker, start_date, end_date)
