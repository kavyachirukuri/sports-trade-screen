import { useEffect, useState } from "react"
import "../styles/OrderBook.css"

const OrderRow = ({ order, type, delay }) => {
  const [fill, setFill] = useState(false)

  useEffect(() => {
    setFill(false)
    const timer = setTimeout(() => {
      setFill(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [order, delay])

  return (
    <div className={`order-row ${type}`}>
      <span>{order.price}¢</span>
      <span>
        {order.shares.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </span>
      <div
        className={["row-fill", fill ? `row-fill--${type}` : ""]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  )
}

export default OrderRow
