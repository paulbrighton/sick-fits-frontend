import ItemComponent from '../components/Item'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

const fakeItem = {
  id: 'asfghk',
  title: 'Shoes',
  price: 4000,
  description: 'Some shoes',
  image: 'cat.jpg',
  largeImage: 'createHttpLink.jpg'
}

describe('<Item/>', () => {
  it('renders and matches snapshot', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />)
   expect(toJSON(wrapper)).toMatchSnapshot()
  })
  // it('renders price tag and text correctly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />)
  //   const PriceTag = wrapper.find('PriceTag')
  //   const Title = wrapper.find('Title a')
  //   const Description = wrapper.find('p')
  //   expect(PriceTag.children().text()).toBe('£50')
  //   expect(Title.children().text()).toBe(fakeItem.title)
  //   expect(Description.children().text()).toBe(fakeItem.description)
  // })

  // it('renders the image correctly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />)
  //   const Image = wrapper.find('img')

  //   expect(Image.props().src).toBe(fakeItem.image)
  //   expect(Image.props().alt).toBe(fakeItem.title)
  // })

  // it('renders the buttons correctly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />)
  //   const buttonList = wrapper.find('.buttonList')

  //   expect(buttonList.children()).toHaveLength(3)
  //   expect(buttonList.find('Link')).toHaveLength(1)
  //   // Alternative way to find buttons ↑ ↓
  //   expect(buttonList.find('Link').exists()).toBe(true)
  //   expect(buttonList.find('DeleteItem').exists()).toBe(true)
  //   expect(buttonList.find('AddToCart').exists()).toBe(true)
  // })
})
