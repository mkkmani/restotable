import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import DishCard from '../DishCard'
import './index.css'

const apiStatusList = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Page extends Component {
  state = {
    apiStatus: 'init',
    details: [],
    activeTab: '11',
    cartCount: 0,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: apiStatusList.loading})
    const api = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const options = {
      method: 'GET',
    }

    const response = await fetch(api, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.map(each => ({
        restaurantId: each.restaurant_id,
        restaurantName: each.restaurant_name,
        restaurantImage: each.restaurant_image,
        tableId: each.table_id,
        tableName: each.table_name,
        branchName: each.branch_name,
        nextUrl: each.nexturl,
        tableMenuList: each.table_menu_list.map(eachMenu => ({
          menuCategory: eachMenu.menu_category,
          menuCategoryId: eachMenu.menu_category_id,
          menuCategoryImage: eachMenu.menu_category_image,
          nextUrl: eachMenu.nexturl,
          categoryDishes: eachMenu.category_dishes.map(eachDish => ({
            dishId: eachDish.dish_id,
            dishName: eachDish.dish_name,
            dishPrice: eachDish.dish_price,
            dishImage: eachDish.dish_image,
            currency: eachDish.dish_currency,
            dishDesc: eachDish.dish_description,
            dishCalories: eachDish.dish_calories,
            dishAvailability: eachDish.dish_Availability,
            dishType: eachDish.dish_Type,
            nextUrl: eachDish.nexturl,
            addonCat: eachDish.addonCat.length,
          })),
        })),
      }))

      this.setState({details: updatedData, apiStatus: apiStatusList.success})
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  renderHeader = () => {
    const {cartCount} = this.state
    return <Header totalItems={cartCount} />
  }

  onClickTab = activeTab => {
    this.setState({activeTab})
  }

  renderTabs = () => {
    const {details, activeTab} = this.state

    return (
      <div>
        {details.map(eachDetails => (
          <div key={eachDetails.menuCategory}>
            <ul className="btn-ul-list">
              {eachDetails.tableMenuList.map((eachTab, index) => (
                <li key={eachTab.menuCategory}>
                  <button
                    type="button"
                    onClick={() => this.onClickTab(eachTab.menuCategoryId)}
                    style={{whiteSpace: 'nowrap'}}
                    className={`tab-btn ${
                      activeTab === eachTab.menuCategoryId ? 'active' : ''
                    }`}
                  >
                    {eachTab.menuCategory}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }

  onClickQtyButton = qty => {
    this.setState(prevState => {
      const updatedQty = prevState.cartCount + qty
      const cartCount = updatedQty >= 0 ? updatedQty : 0

      return {cartCount}
    })
  }

  renderMenu = () => {
    const {activeTab, details} = this.state

    const filteredData = details
      .map(each => {
        const menuList = each.tableMenuList.find(
          eachMenu => eachMenu.menuCategoryId === activeTab,
        )

        if (menuList) {
          return menuList.categoryDishes
        }

        return null
      })
      .filter(Boolean)
      .flat()

    return (
      <div>
        <ul className="dishes-ul">
          {filteredData.map(each => (
            <li key={each.dishId}>
              <DishCard
                details={each}
                onClickQtyButton={this.onClickQtyButton}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-div">
      <Loader type="Circles" color="skyblue" height="60" width="60" />
    </div>
  )

  onClickRetry = () => {
    this.getDetails()
  }

  renderFailure = () => (
    <div className="failure-div">
      <h1>Something went wrong</h1>
      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderDetails = () => (
    <div className="page-div">
      {this.renderHeader()}
      {this.renderTabs()}
      {this.renderMenu()}
    </div>
  )

  renderPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusList.success:
        return this.renderDetails()

      case apiStatusList.loading:
        return this.renderLoader()

      case apiStatusList.failure:
        return this.renderFailure()

      default:
        return null
    }
  }

  render() {
    return this.renderPage()
  }
}

export default Page
