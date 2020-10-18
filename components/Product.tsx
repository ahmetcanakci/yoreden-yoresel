import { withRouter, Router } from 'next/router'

export interface IProduct {
  id: string
  name: string
  price: number
  fromPrice: number
  url: string
  description: string
  image: string
}

interface IProductProps {
  product: IProduct
  router: Router
}

const Product = (props: IProductProps) => {

  const handleClick = () => {
    let text = "Merhaba " + props.product.name + " hakkında bilgi almak istiyorum."

    let re = /\ /gi;
    let result = text.replace(re, "%20");

    window.location.href = "https://api.whatsapp.com/send?phone=905323969261&text=" + result + "&source=&data=&app_absent="
  }

  return (
    <div className="product">
      <h2 className="product__title">{props.product.name}</h2>
      <p className="product__description">{props.product.description}</p>
      <img src={props.product.image} alt="product" className="product__image" />
      <div className="product__price-button-container">
        {props.product.fromPrice > 0 && <div className="product__from-price">₺{props.product.fromPrice.toFixed(2)}</div>}
        {props.product.price > 0 && <div className="product__price">₺{(props.product.price).toFixed(2)}</div>}
        <button
          onClick={handleClick}
          className="product__button"
          data-item-id={props.product.id}
          data-item-name={props.product.name}
          data-item-price={props.product.price}
          data-item-url={props.router.pathname}
          data-item-image={props.product.image}>
          Whatsapp'tan Sor
        </button>
      </div>
    </div>
  )
}

export default withRouter(Product)