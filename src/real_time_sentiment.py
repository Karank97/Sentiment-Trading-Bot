import tweepy
from textblob import TextBlob

def fetch_real_time_sentiment(keyword):
    """
    Fetch real-time sentiment for a given keyword from Twitter.
    """
    consumer_key = 'YOUR_CONSUMER_KEY'
    consumer_secret = 'YOUR_CONSUMER_SECRET'
    access_token = 'YOUR_ACCESS_TOKEN'
    access_token_secret = 'YOUR_ACCESS_TOKEN_SECRET'

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth)

    tweets = api.search_tweets(q=keyword, lang="en", count=100)
    sentiment_score = 0

    for tweet in tweets:
        analysis = TextBlob(tweet.text)
        sentiment_score += analysis.sentiment.polarity

    return sentiment_score / len(tweets)

if __name__ == "__main__":
    sentiment = fetch_real_time_sentiment("AAPL")
    print(f"Real-time sentiment for AAPL: {sentiment}")
