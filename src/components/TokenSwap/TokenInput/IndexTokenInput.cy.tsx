import React from 'react'
import TokenInput from './Index'

describe('<TokenInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TokenInput />)
  })
})