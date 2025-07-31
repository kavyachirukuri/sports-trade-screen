import "./App.css"
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import TradePanel from "./Components/TradePanel"

function App() {
  return (
    <div className="App">
      <Header />
      <hr className="header-divider" />
      <TradePanel />
      <Footer />
    </div>
  )
}

export default App
