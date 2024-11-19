# Sentiment Trading Bot

A Python-based trading bot that combines sentiment analysis and historical stock price data to simulate and backtest trading strategies. The bot uses data from Yahoo Finance and provides visualizations for performance evaluation.

---

## Features
- **Data Retrieval**: Fetches historical stock price data using the Yahoo Finance API.
- **Trading Strategy**: Simulates buy/sell/hold decisions based on sentiment and stock price trends.
- **Backtesting**: Evaluates trading performance over a given time period.
- **Visualization**: Plots account balance, stock prices, and trade decisions for detailed analysis.

---

## Installation
Install dependencies:
pip install -r requirements.txt
### Prerequisites
- Python 3.10 or later
- Virtual environment for dependency management

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/karank97/Sentiment-Trading-Bot.git
   cd Sentiment-Trading-Bot
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
### Usage 
1. Run Backtesting:
   Fetch historical stock data, simulate trades, and generate results:
   ```bash
   python src/backtesting.py
   The backtesting results will be saved in:
   data/AAPL_backtest_results.csv
2. Visualize Results
   Generate plots for account balance, stock prices, and trade decisions:
   ```bash
   python src/visual_analysis.py
3. Real Time Sentiment
   ```bash
   python src/real_time_sentiment.py
Example Visualization
Balance Over Time
Stock Price with Buy/Sell Decisions

### Project Structure
  ```bash
Sentiment-Trading-Bot/
├── data/                  # Contains historical and backtesting result CSVs
├── src/                   # Source code for the bot
│   ├── backtesting.py     # Backtesting logic
│   ├── data_retrieval.py  # Data fetching from Yahoo Finance
│   ├── sentiment_analysis.py  # Sentiment analysis logic
│   ├── trading_bot.py     # Trade decision logic
│   ├── visual_analysis.py # Visualization and analysis
├── venv/                  # Virtual environment
├── requirements.txt       # Project dependencies
└── README.md              # Project documentation

###Future Enhancements
Deep learning-based sentiment analysis.
Integration with live trading APIs for executing trades.

Contact
Created by Karan Kumar. Feel free to connect on LinkedIn or reach out via email at karan.kumar@rutgers.edu

