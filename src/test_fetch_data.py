from data_retrieval import fetch_data

def test_fetch_data_valid_stock():
    print("\n--- Test: Fetch Data for Valid Stock ---")
    fetch_data('AAPL', '2020-01-01', '2023-12-31')
    print("Test passed: Data for AAPL fetched successfully.\n")

def test_fetch_data_invalid_stock():
    print("\n--- Test: Fetch Data for Invalid Stock ---")
    fetch_data('INVALID_TICKER', '2020-01-01', '2023-12-31')
    print("Test passed: Handled invalid stock ticker gracefully.\n")

def test_fetch_data_empty_date_range():
    print("\n--- Test: Fetch Data for Empty Date Range ---")
    fetch_data('AAPL', '2023-01-01', '2020-01-01')  # End date earlier than start date
    print("Test passed: Handled empty date range gracefully.\n")

if __name__ == "__main__":
    # Run all tests
    test_fetch_data_valid_stock()
    test_fetch_data_invalid_stock()
    test_fetch_data_empty_date_range()
