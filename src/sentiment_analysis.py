from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def analyze_sentiment(text):
    """
    Analyze sentiment of a given text using VADER.

    :param text: The input text (e.g., a tweet or news headline).
    :return: A sentiment score (-1 for negative, 1 for positive).
    """
    analyzer = SentimentIntensityAnalyzer()
    score = analyzer.polarity_scores(text)
    return score['compound']

# Example usage
if __name__ == "__main__":
    print(analyze_sentiment("The stock market is doing great today!"))
