import React, { Component } from 'react';
import {
  ProductItemStyles,
  ItemImageWrapper,
  ProductItemButton
} from './styles/ProductItemStyles';
import emptyCart from '../assets/icons/emptyWhiteCart.svg';
import { CurrencyContext } from './CurrencyContext';
import { CartContext } from './cart/CartContext';
import { getCurrencySymbol } from '../lib/currency';
import { NavLink } from 'react-router-dom';

export class ProductItem extends Component {
  getPriceByCurrency = (currency) => {
    const { prices } = this.props.product;
    return prices.find((price) => price.currency === currency)?.amount;
  };
  render() {
    const { category } = this.props;
    const {
      id,
      name,
      gallery: [firstImage]
    } = this.props.product;
    return (
      <CartContext.Consumer>
        {({ addItemToCart }) => (
          <ProductItemStyles>
            <ItemImageWrapper>
              <img src={firstImage} className="item-img" alt={name} />
              <ProductItemButton
                onClick={() => addItemToCart(this.props.product)}
              >
                <img src={emptyCart} alt="cart" className="cart-svg" />
              </ProductItemButton>
            </ItemImageWrapper>
            <p className="product-title">
              <NavLink to={`/${category}/${id}`}>{name}</NavLink>
            </p>
            <CurrencyContext.Consumer>
              {({ currency }) => (
                <p className="product-price">
                  {getCurrencySymbol(currency)}
                  {this.getPriceByCurrency(currency)}
                </p>
              )}
            </CurrencyContext.Consumer>
          </ProductItemStyles>
        )}
      </CartContext.Consumer>
    );
  }
}

export default ProductItem;
