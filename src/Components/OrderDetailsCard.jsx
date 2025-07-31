import { useEffect, useState } from "react"
import "../styles/OrderDetailsCard.css"

const OrderDetailsCard = ({ activeTab }) => {
  const [orders, setOrders] = useState([])

  const loadOrders = () => {
    const data = JSON.parse(localStorage.getItem("orders") || "[]")
    setOrders(data)
  }

  const cancelOrder = (id) => {
    const updated = orders.filter((order) => order.id !== id)
    setOrders(updated)
    localStorage.setItem("orders", JSON.stringify(updated))
  }

  useEffect(() => {
    loadOrders()
    window.addEventListener("order-updated", loadOrders)
    return () => window.removeEventListener("order-updated", loadOrders)
  }, [])

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "OPEN ORDERS") return order.status === "open"
    if (activeTab === "POSITIONS") return order.status === "filled"
    if (activeTab === "TRADE HISTORY") return order.status !== "open"
    return true
  })

  const latestOrder = filteredOrders.length
    ? [...filteredOrders].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      )[0]
    : null

  return (
    <>
      {latestOrder ? (
        <div className="order-card" key={latestOrder.id}>
          <div className="order-header">
            <div>
              <div className="order-title">CSK / IPL Winner</div>
              <div className="order-type-time">
                <span className="order-type">
                  Limit /{latestOrder.side === "buy" ? "Buy" : "Sell"}
                </span>
                <span className="order-time">
                  {new Date(latestOrder.timestamp)
                    .toLocaleString("sv-SE")
                    .replace("T", " ")}
                </span>
              </div>
            </div>

            <div className="order-actions">
              <div className="order-progress">
                <span>{latestOrder.filled || 0}%</span>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${latestOrder.filled || 0}%` }}
                  ></div>
                </div>
              </div>
              {activeTab === "OPEN ORDERS" && (
                <button
                  className="cancel-button"
                  onClick={() => cancelOrder(latestOrder.id)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          <div className="order-footer">
            <div className="order-detail">
              <span className="filled-label">Filled / Amount</span>
              <span className="filled-value">
                {latestOrder.filled || 0.0} / <span>{latestOrder.shares}</span>
              </span>
            </div>
            <div className="order-detail">
              <span className="price-label">Price</span>
              <span className="price-value">{latestOrder.price}¢</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="order-card">
          <div
            style={{
              color: "black"
            }}
          >
            No {activeTab.toLowerCase()} yet.
          </div>
        </div>
      )}
    </>
  )
}

export default OrderDetailsCard
