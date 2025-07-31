import "../styles/Tabs.css"

const TABS = ["OPEN ORDERS", "POSITIONS", "TRADE HISTORY"]

const TradeTabs = ({ activeTab, setActiveTab }) => {
  const cancelAllOrders = () => {
    localStorage.removeItem("orders")
    window.dispatchEvent(new Event("order-updated"))
  }

  return (
    <div className="tabs-section-wrapper">
      <div className="tabs-section">
        <div className="tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="hide-pairs-section">
          <div className="check-box-label-pair">
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox" className="check-box-label">
              Hide Other Pairs
            </label>
          </div>
          <button className="cancel-all-button" onClick={cancelAllOrders}>
            Cancel All
          </button>
        </div>
      </div>
    </div>
  )
}

export default TradeTabs
