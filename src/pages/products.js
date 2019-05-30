// QUERY the stripe DB for SKUs
import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"

class Product extends React.Component {
  // constructor() {
  // 	this.handleSubmit.bind(this)
  // }
  //
  componentDidMount() {
    this.stripe = window.Stripe("pk_test_ZL9HIqbaVPH1Op6slyV9DZjp00Vpv5ZT1O")
  }

  // onSubmit is returned an event handler, which is the function that is actually executed.
  handleSubmit(sku) {
    return event => {
      event.preventDefault()

      this.stripe
        .redirectToCheckout({
          items: [{ sku, quantity: 1 }],

          // Do not rely on the redirect to the successUrl for fulfilling
          // purchases, customers may not always reach the success_url after
          // a successful payment.
          // Instead use one of the strategies described in
          // https://stripe.com/docs/payments/checkout/fulfillment
          successUrl: "http://localhost:8000/success",
          cancelUrl: "http://localhost:8000/canceled",
        })
        .then(function(result) {
          if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer.
            // var displayError = document.getElementById("error-message")
            console.error(result.error.message)
          }
        })
    }
  }

  render() {
    const { id, currency, price, name } = this.props
    //international number format, see MDN: - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
    const priceFloat = (price / 100).toFixed(2)
    const formattedPrice = Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(priceFloat)

    return (
      <form onSubmit={this.handleSubmit(id)}>
        <h2>
          {name} ({formattedPrice})
        </h2>

        <button type="submit">Buy Now</button>
      </form>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      {
        allStripeSku {
          edges {
            node {
              id
              currency
              price
              attributes {
                name
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Layout>
        {data.allStripeSku.edges.map(({ node: sku }) => (
          <Product
            id={sku.id}
            currency={sku.currency}
            price={sku.price}
            name={sku.attributes.name}
          />
        ))}
      </Layout>
    )}
  />
)
