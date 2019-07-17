import { rejects } from 'assert'

function Person (name, foods) {
  this.name = name
  this.foods = foods
}

Person.prototype.fetchFavFoods = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(this.foods), 200)
  })
}

describe('mocking learning', () => {
  it('mocks a reg function', () => {
    const fetchDogs = jest.fn()
    fetchDogs('Kimi')
    expect(fetchDogs).toHaveBeenCalled()
    expect(fetchDogs).toHaveBeenCalledWith('Kimi')

    fetchDogs('Louis')
    expect(fetchDogs).toHaveBeenCalledTimes(2)
  })

  it('can create a person', () => {
    const me = new Person('Paul', ['Kebab', 'Curry'])
    expect(me.name).toEqual('Paul')
  })
  it('can fetch foods', async () => {
    const me = new Person('Paul', ['Kebab', 'Curry'])
    me.fetchFavFoods = jest.fn().mockResolvedValue(['sushi', 'ramen'])
    const favFoods = await me.fetchFavFoods()
    expect(favFoods).toContain('sushi', 'ramen')
  })
})
