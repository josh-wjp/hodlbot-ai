import React, { useState } from "react";
import axios from "axios";

function App() {
    const [coin, setCoin] = useState("");
    const [price, setPrice] = useState(null);
    const [tradeDecision, setTradeDecision] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const API_BASE_URL = "https://hodlbot-api-bmcmdhccf5hmgahy.eastus2-01.azurewebsites.net";

    const fetchTradeDecision = async () => {
        if (!coin) {
            setError("Please enter a cryptocurrency name.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await axios.get(`${API_BASE_URL}/trade/${coin.toLowerCase()}`);

            if (!res.data || !res.data.decision) {
                throw new Error("Invalid API response");
            }

            setPrice(res.data.price || "N/A");
            setTradeDecision(res.data.decision);
        } catch (error) {
            console.error("Error fetching trade decision:", error);
            setError(error.response?.status === 400 ?
                "Invalid cryptocurrency name. Please enter a valid coin." :
                "Failed to fetch data. Please try again.");
            setPrice(null);
            setTradeDecision("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>HodlBot AI</h1>
            <p>-For Educational Purposes Only-</p>
            <p>Enter a cryptocurrency to get a trade signal.</p>

            <input
                type="text"
                placeholder="Enter Coin (e.g., bitcoin)"
                onChange={(e) => setCoin(e.target.value)}
                style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
            />
            <button onClick={fetchTradeDecision} style={{ padding: "10px", fontSize: "16px" }}>
                Get Trade Decision
            </button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {price !== null && price !== undefined && (
                <div style={{ marginTop: "20px", fontSize: "18px" }}>
                    <h2>Current Price: ${price ? price.toFixed(2) : "N/A"}</h2>
                    <h2 style={{
                        color: tradeDecision === "BUY" ? "green" :
                            tradeDecision === "SELL" ? "red" :
                            "black"
                    }}>
                        Trade Signal: {tradeDecision}
                    </h2>
                </div>
            )}
        </div>
    );
}

export default App;
