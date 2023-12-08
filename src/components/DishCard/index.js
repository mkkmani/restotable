import {useState} from 'react'
import {BiFoodTag} from 'react-icons/bi'
import './index.css'

const DishCard = props => {
  const {details, onClickQtyButton} = props
  const {
    currency,
    dishAvailability,
    dishCalories,
    dishDesc,
    dishImage,
    dishPrice,
    dishName,
    dishType,
    addonCat,
  } = details

  const [qty, updateQty] = useState(0)

  const onClickPlus = () => {
    onClickQtyButton(1)
    updateQty(prev => prev + 1)
  }

  const onClickMinus = () => {
    if (qty > 0) {
      onClickQtyButton(-1)
      updateQty(prev => prev - 1)
    }
  }

  return (
    <div className="food-card">
      <div className="dish-details">
        <div className="type-det">
          <div className="icon-div">
            <BiFoodTag
              className={dishType === 1 ? 'non-veg-icon' : 'veg-icon'}
            />
          </div>
          <div>
            <p className="dish-name">{dishName}</p>
            <p>
              {currency}
              <span>{dishPrice}</span>
            </p>
            <p className="dish-desc">{dishDesc}</p>
            {dishAvailability ? (
              <div>
                <div className="qty-div">
                  <button
                    className="qty-btn"
                    type="button"
                    onClick={onClickMinus}
                  >
                    -
                  </button>
                  <span>{qty}</span>
                  <button
                    className="qty-btn"
                    type="button"
                    onClick={onClickPlus}
                  >
                    +
                  </button>
                </div>
                {addonCat > 0 && <p>Customization available</p>}
              </div>
            ) : (
              <p className="na">Not available</p>
            )}
          </div>
        </div>
        <div className="cal-img">
          <p className="calories">{`${dishCalories} calories`}</p>
          <img className="dish-img" src={dishImage} alt={dishName} />
        </div>
      </div>
    </div>
  )
}

export default DishCard
