import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import SingleItem, { SINGLE_ITEM_QUERY } from '../components/SingleItem'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import { fakeItem } from '../lib/testUtils'

describe('<SingleItem/>', () => {
  it('renders with proper data', async () => {
    const mocks = [
      {
        request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
        result: { data: {
          item: fakeItem()
        }
        }
      }
    ]
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id='123' />
      </MockedProvider>
    )
    expect(wrapper.text()).toBe('Loading...')
    await wait()
    wrapper.update()
    // console.log(wrapper.debug())
    expect(toJSON(wrapper.find('h2'))).toMatchSnapshot()
    expect(toJSON(wrapper.find('img'))).toMatchSnapshot()
    expect(toJSON(wrapper.find('p'))).toMatchSnapshot()
  })

  it('errors with no found item', async () => {
    const mocks = [
      {
        request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
        result: {
          errors: [{ message: 'Items not found!' }]
        }
      }
    ]
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id='123' />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    const item = wrapper.find('[data-test="graphql-error"]')
    expect(item.text()).toContain('Items not found!')
    expect(toJSON(item)).toMatchSnapshot()
  })
})
