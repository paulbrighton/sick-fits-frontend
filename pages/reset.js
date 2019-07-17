import CreateItem from '../components/CreateItem'
import Reset from '../components/Reset'

const Sell = props => (
  <div>
    <p>Reset your Password {props.query.resetToken}</p>
    <Reset resetToken={props.query.resetToken}/>
  </div>
)

export default Sell
