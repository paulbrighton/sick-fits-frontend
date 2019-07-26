import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { format, parseISO } from 'date-fns'
import Head from 'next/head'
import gql from 'graphql-tag'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'
import OrderStyles from './styles/OrderStyles'

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`

class SingleOrder extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }
  render () {
    const props = this.props
    return (
      <Query query={SINGLE_ORDER_QUERY } variables={{id: this.props.id}}>
        {({data, error, loading}) => {
          if (error) return <Error error={error}/>
          if (loading) return <p>Loading...</p>
          const order = data.order
          return (
            <OrderStyles>
              <Head>
                <title>Sick Fits - Order: {order.id}</title>
              </Head>
              <h2>Your Order Details</h2>
              <p>
                <span>Order ID:</span>
                <span>{props.id}</span>
              </p>
              <p>
                <span>Charge:</span>
                <span>{order.charge}</span>
              </p>
              <p>
                <span>Date:</span>
                <span>{format(parseISO(order.createdAt), 'iii do MMMM, yyyy h:mm a', { awareOfUnicodeTokens: true })}</span>
              </p>
              <p>
                <span>Order Total:</span>
                <span>{formatMoney(order.total)}</span>
              </p>
              <p>
                <span>Tour Count:</span>
                <span>{order.items.length}</span>
              </p>
              <div className="items">
                {order.items.map(item => (
                  <div className="order-item" key={item.id}>
                    <figure>
                      <img width='300' src={item.image} alt={item.title}/>
                    </figure>
                    <div className="item-details">
                      <h2>{item.title}</h2>
                      <p>Qty: {item.quantity}</p>
                      <p>Each: {formatMoney(item.price)}</p>
                      <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </OrderStyles>
          )
        }}
      </Query>
    )
  }
}

export default SingleOrder
