import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Item from './Item'
import Pagination from './Pagination'
import { perPage } from '../config'

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`

const Center = styled.div`
  text-align: center;
`
const Intro = styled.p`
  font-size: 1.7rem;
  a {
    color: ${props => props.theme.red};
  }
  a:hover {
    border-bottom: 1px solid #FF5A5F;
  }
`
const Title = styled.h1`
  font-size: 5rem;
  margin-bottom: 25px;
  color: ${props => props.theme.red};
  line-height: 1.4;
`

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
}
`

class Items extends Component {
  render () {
    return (<Center>
      <Title>Day Tripper Tours</Title>
      <Intro>Welcome to Day Tripper Tours, the best place to find the perfect day tour in some of the most exciting and interesting places in the world. Our tours have been personally selected by <a href='http://www.yummypixels.co.uk/'>Yummy Pixels</a> and all have been tried and tested to guarantee the quality of service received.</Intro>
      <Intro>Whether it is magnificent old temples, city tours or areas of outstanding beauty, we have the tour for you. Some of our favourites include a trip to Borobudur from Yogyakarta, Iguassu Falls in the far south of Brazil, the Banaue Rice Terraces in the Northern Philippines and not to forget Angkor Wat and surrounding temples from Siem Reap.</Intro>
      <Pagination page={this.props.page} />
      <Query
        query={ALL_ITEMS_QUERY}
        variables={{
          skip: this.props.page * perPage - perPage
        }}
      >
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error: {error.message}</p>
          return (<ItemsList>{data.items.map(item => <Item item={item} key={item.id} />)}</ItemsList>
          )
        }}
      </Query>
      <Pagination page={this.props.page} />
    </Center>
    )
  }
}

export default Items
export { ALL_ITEMS_QUERY }
