import "../styles/OrderBook.css"
import OrderRow from "./OrderRow"

const OrderBook = ({ data }) => {
  return (
    <div className="order-book">
      <div className="order-book__header">
        <span>Price</span>
        <span>Shares (CSK)</span>
      </div>
      {data.sellOrders.map((order, index) => (
        <OrderRow
          key={`sell-${index}`}
          order={order}
          index={index}
          type="sell"
          delay={index * 150}
        />
      ))}

      <div className="order-row mid-price">
        <span>
          <strong>{data.midPrice}¢</strong>
        </span>
        <span style={{ fontSize: "10px" }}>(Spread 1%)</span>
      </div>

      {data.buyOrders.map((order, index) => {
        const reversedIndex = data.buyOrders.length - 1 - index
        return (
          <OrderRow
            key={`buy-${index}`}
            order={order}
            index={index}
            type="buy"
            delay={reversedIndex * 150}
          />
        )
      })}
    </div>
  )
}

export default OrderBook
