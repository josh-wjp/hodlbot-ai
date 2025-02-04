# hodlbot-ai
HodlBot AI is an autonomous crypto portfolio manager on NEAR that automates smart investing with AI-driven trading, risk management, and real-time market insights.

HodlBot AI v1.0 - Functionality Included:

🔹 Backend (FastAPI)

    API to fetch real-time crypto prices from CoinGecko
    AI trading strategy (SMA + RSI) for BUY / SELL / HOLD decisions
    Exception handling for invalid cryptocurrency names

🔹 Frontend (React)

    Search for any cryptocurrency to get AI trading signals
    Display real-time price and trade decisions
    Error handling for invalid or missing cryptocurrencies

🔹 Error Handling & Stability

    Prevent frontend crashes when price is undefined
    Show loading indicators when fetching trade signals
    Display error messages for invalid inputs
