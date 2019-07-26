import Link from 'next/link'
import { Mutation } from 'react-apollo'
import { TOGGLE_CART_MUTATION } from './Cart'
import NavStyles from './styles/NavStyles'
import User from './User'
import Signout from './Signout'
import CartCount from './CartCount'
import CartItem from './CartItem';


const Nav = () => (

  <User>
    {({ data: { me } }) => (
      <NavStyles data-test='nav'>
        <Link href='/items'>
          <a>Tours</a>
        </Link>
        {me && (
          <>
            <Link href='/sell'>
            <a>Adverise</a>
            </Link>
            <Link href='/orders'>
              <a>Bookings</a>
            </Link>
            <Signout />
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {(toggleCart) => (
                <button onClick={toggleCart}>
                  My Cart
                  <CartCount count={me.cart.reduce((tally, CartItem) => tally + CartItem.quantity, 0)} />
                </button>
              )}
            </Mutation>
          </>
        )}
        {!me && (
          <Link href='/signup'>
          <a>Sign In</a>
        </Link>
        )}
      </NavStyles>
    )}
  </User>
)

export default Nav
