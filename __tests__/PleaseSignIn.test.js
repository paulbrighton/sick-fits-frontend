import { mount } from 'enzyme'
import { CURRENT_USER_QUERY } from '../components/User'
import PleaseSignIn from '../components/PleaseSignin'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import { fakeUser } from '../lib/testUtils'

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

describe('<PleaseSignIn/>', () => {
  it('should render sign in message to logged out users', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedIn}>
        <PleaseSignIn />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    expect(wrapper.text()).toContain('Sign in to your Account')
    const SignIn = wrapper.find('Signin')
    expect(SignIn.exists()).toBe(true)
  })

  it('shows user as logged in', async () => {
    const Hey = () => <p>Hey!</p>
    const wrapper = mount(
      <MockedProvider mocks={signedIn}>
        <PleaseSignIn>
          <Hey />
        </PleaseSignIn>
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    expect(wrapper.contains(<Hey />)).toBe(true)
  })
})
