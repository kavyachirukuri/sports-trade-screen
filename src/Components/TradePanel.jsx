import { useEffect, useState } from "react"
import barchart from "../assets/images/Bar chart.png"
import csk from "../assets/images/CSK.png"
import generateMockOrderBook from "../helpers/mockOrder"
import OrderBook from "./OrderBook"
import OrderDetailsCard from "./OrderDetailsCard"
import OrderForm from "./OrderForm"
import TradeTabs from "./Tabs"
import "../styles/TradePanel.css"

const TradePanel = () => {
  const [activeBtn, setActiveBtn] = useState("buy")
  const [percentage, setPercentage] = useState(0)
  const [activeTab, setActiveTab] = useState("OPEN ORDERS")
  const [orderBook, setOrderBook] = useState(generateMockOrderBook())

  useEffect(() => {
    const interval = setInterval(() => {
      setOrderBook(generateMockOrderBook())
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section>
      <div className="team-info">
        <img className="csk-image" src={csk} alt="csk" />
        <img className="csk-bar" src={barchart} alt="bar-chart" />
      </div>
      <div className="orders-section">
        <OrderForm
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          percentage={percentage}
          setPercentage={setPercentage}
        />
        <OrderBook data={orderBook} />
      </div>
      <TradeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <OrderDetailsCard activeTab={activeTab} />
    </section>
  )
}

export default TradePanel
