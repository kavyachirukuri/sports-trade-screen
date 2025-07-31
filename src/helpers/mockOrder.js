const generateMockOrderBook = () => {
  const fluctuate = (base, variance = 1) =>
    +(base + (Math.random() - 0.5) * variance).toFixed(1)

  const baseShares = 14984.0
  const baseMid = 34.5

  return {
    sellOrders: [
      { price: fluctuate(38), shares: baseShares },
      { price: fluctuate(37), shares: baseShares },
      { price: fluctuate(36), shares: baseShares },
      { price: fluctuate(35.6), shares: baseShares },
      { price: fluctuate(35), shares: baseShares }
    ],
    midPrice: fluctuate(baseMid, 0.3),
    buyOrders: [
      { price: fluctuate(34), shares: baseShares },
      { price: fluctuate(33.5), shares: baseShares },
      { price: fluctuate(33.4), shares: baseShares },
      { price: fluctuate(32), shares: baseShares },
      { price: fluctuate(30), shares: baseShares }
    ]
  }
}

export default generateMockOrderBook
