import "../App.css"
import header from "../assets/images/Header.png"
import statusbar from "../assets/images/status-bar.png"

const Header = () => {
  return (
    <header>
      <img src={statusbar} alt="status-bar" />
      <img src={header} alt="header" style={{ width: "100%" }} />
    </header>
  )
}

export default Header
