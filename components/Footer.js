import Link from 'next/link'

import styled from 'styled-components'
import Router from 'next/router'
import NProgress from 'nprogress'

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

const Logo = styled.h1`
  font-size: 1.9rem;
  transform: skew(-7deg);
  margin: 0 auto;
  text-align: center;
  a {
    text-decoration: none;
    background: ${props => props.theme.red};
    color: ${props => props.theme.white};
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`
const StyledFooter = styled.footer`
  position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  .bar {
    background-color: ${props => props.theme.black};
    padding: 25px 0;
    display: flex;
    justify-content: center;
  }
`

const Footer = () => (
  <StyledFooter>
    <div className='bar'>
      <Logo>
        <Link href='/'>
          <a>Day Tripper Tours by Yummy Pixels</a>
        </Link>
      </Logo>
    </div>
  </StyledFooter>
)

export default Footer
