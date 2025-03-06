import React from 'react'
import styled from 'styled-components'

const StyledTime = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  color: ${({ $light, theme }) => $light ? theme.color.light : theme.color.dark};
`

const Time = (props) => {
  const { ...rest } = props
  return (
    <StyledTime {...rest} />
  )
}

export default Time