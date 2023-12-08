import {ImCart} from 'react-icons/im'
import './index.css'

const Header = props => {
  const {totalItems} = props

  return (
    <nav className="nav-bar">
      <ul className="nav-ul">
        <h1>UNI Resto cafe</h1>
        <div className="nav-cart-div">
          <p>My orders</p>
          <ImCart className="cart-icon" />
          <p className="count">{totalItems}</p>
        </div>
      </ul>
    </nav>
  )
}

export default Header
