import os
import sys
import requests
import pandas as pd
from fastapi import FastAPI, HTTPException
from backend.ai.strategy import make_trade_decision  # Use relative import

app = FastAPI()

COINGECKO_API = "https://api.coingecko.com/api/v3/simple/price"

@app.get("/")
def home():
    return {"message": "HodlBot AI is running!"}

@app.get("/price/{coin_id}")
def get_price(coin_id: str):
    """Fetch real-time crypto price with a timeout."""
    try:
        response = requests.get(f"{COINGECKO_API}?ids={coin_id}&vs_currencies=usd", timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching price: {e}")

@app.get("/trade/{coin_id}")
def trade_decision(coin_id: str):
    """Returns a BUY, SELL, or HOLD recommendation."""
    result = make_trade_decision(coin_id)
    if result is None or "error" in result:
        raise HTTPException(status_code=400, detail=f"Invalid coin: '{coin_id}'")
    return result

@app.get("/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))  # ✅ Uses Azure’s PORT variable
    uvicorn.run("main:app", host="0.0.0.0", port=port)