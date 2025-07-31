import { useEffect, useState } from "react"

const OrderForm = ({ activeBtn, setActiveBtn, percentage, setPercentage }) => {
  const [balance, setBalance] = useState(1000.0)
  const [price, setPrice] = useState("")
  const [shares, setShares] = useState("")
  const [orderTotal, setOrderTotal] = useState(0)
  const [toWin, setToWin] = useState(0)
  const [isPriceFocused, setIsPriceFocused] = useState(false)
  const [isSharesFocused, setIsSharesFocused] = useState(false)

  useEffect(() => {
    const p = parseFloat(price)
    const percent = parseFloat(percentage)
    if (!isNaN(p) && percent > 0) {
      const amountToUse = (balance * percent) / 100
      const calculatedShares = amountToUse / p
      setShares(calculatedShares.toFixed(2))
    }
  }, [percentage])

  useEffect(() => {
    const p = parseFloat(price)
    const s = parseFloat(shares)
    if (!isNaN(p) && !isNaN(s)) {
      const total = parseFloat((p * s).toFixed(2))
      setOrderTotal(total)
      setToWin(parseFloat((total * 2).toFixed(2)))
    } else {
      setOrderTotal(0)
      setToWin(0)
    }
  }, [price, shares])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!price || !shares || orderTotal > balance) {
      alert("Invalid order or insufficient balance.")
      return
    }

    const order = {
      id: Date.now(),
      side: activeBtn,
      price: parseFloat(price),
      shares: parseFloat(shares),
      total: orderTotal,
      toWin: toWin,
      timestamp: new Date().toISOString(),
      status: "open",
      filled: 0
    }

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    localStorage.setItem("orders", JSON.stringify([order, ...existingOrders]))
    window.dispatchEvent(new Event("order-updated"))

    setBalance((prev) => parseFloat((prev - orderTotal).toFixed(2)))
    setPrice("")
    setShares("")
    setPercentage(0)
  }

  return (
    <div className="order-inputs">
      <div>
        <button
          className={`trade-button ${activeBtn === "buy" ? "active" : ""}`}
          onClick={() => setActiveBtn("buy")}
        >
          BUY/LONG
        </button>
        <button
          className={`trade-button ${activeBtn === "sell" ? "active" : ""}`}
          onClick={() => setActiveBtn("sell")}
        >
          SELL/SHORT
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="custom-select-wrapper">
          <select className="trade-options">
            <option>Limit</option>
            <option>Market</option>
          </select>
        </div>

        <div className="form-bal">
          <p className="form-para">Available to Trade</p>
          <span>{balance.toFixed(2)} USDC</span>
        </div>

        <div className="order-fields">
          <div className="input-wrapper">
            <input
              className="price-field"
              type="number"
              placeholder="Price (USD)"
              value={price}
              onFocus={() => setIsPriceFocused(true)}
              onBlur={() => setIsPriceFocused(false)}
              onChange={(e) => {
                setPrice(e.target.value)
                setPercentage(0)
              }}
            />
            {!(isPriceFocused || price) && (
              <div className="input-suffix-group">
                <span className="value-text">34.5</span>
                <span className="mid-text">Mid</span>
              </div>
            )}
          </div>
          <div className="input-wrapper">
            <input
              className="shares-field"
              type="number"
              placeholder="Shares"
              value={shares}
              onFocus={() => setIsSharesFocused(true)}
              onBlur={() => setIsSharesFocused(false)}
              onChange={(e) => {
                setShares(e.target.value)
                setPercentage(0)
              }}
            />
            {!(isSharesFocused || shares) && (
              <span className="input-suffix light-text">0</span>
            )}
          </div>
          <div className="range-container">
            <div className="slider-container">
              <div className="ticks">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="tick" />
                ))}
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="25"
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value))}
                className="range-slider"
              />
            </div>
            <div className="percentage-box">{percentage} %</div>
          </div>
        </div>

        <hr className="divider" />
        <div className="order-summary">
          <div className="order-summary__item">
            <p>Order Total</p>
            <p>${orderTotal}</p>
          </div>
          <div className="order-summary__item">
            <p>To Win</p>
            <p>${toWin}</p>
          </div>
        </div>

        <button type="submit" className="submit-button">
          {activeBtn === "buy" ? "BUY/LONG CSK" : "SELL/SHORT CSK"}
        </button>
      </form>
    </div>
  )
}

export default OrderForm
