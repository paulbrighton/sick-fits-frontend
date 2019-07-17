import { mount } from 'enzyme'
import { CURRENT_USER_QUERY } from '../components/User'
import Nav from '../components/Nav'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import { fakeUser, fakeCartItem } from '../lib/testUtils'
import toJSON from 'enzyme-to-json'

const notSignedIn = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } }
  }
]

const signedIn = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } }
  }
]

const signedInWithCartItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem(), fakeCartItem(), fakeCartItem()]
        }
      }
    }
  }
]

describe('<Nav />', () => {
  it('it renders signed out navigation', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedIn}>
        <Nav />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    const item = wrapper.find('ul[data-test="nav"]')
    expect(toJSON(item)).toMatchSnapshot()
  })

  it('shows full navigation to user when logged in', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedIn}>
        <Nav />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    const item = wrapper.find('ul[data-test="nav"]')
    expect(item.children().length).toBe(5)
    expect(item.text()).toContain('Sign Out')
    expect(item.text()).toContain('My Cart')
  })

  it('renders the amount of items in the cart', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInWithCartItems}>
        <Nav />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    const item = wrapper.find('[data-test="nav"]')
    const count = item.find('div.count')
    expect(toJSON(count)).toMatchSnapshot()
  })
})
