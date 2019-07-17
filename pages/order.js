import PleaseSignIn from '../components/PleaseSignin'
import SingleOrder from '../components/Order'

const Order = props => (
  <div>
    <PleaseSignIn>
      <SingleOrder id={props.query.id} />
    </PleaseSignIn>
  </div>
)

export default Order
