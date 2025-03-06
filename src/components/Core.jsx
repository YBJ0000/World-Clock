import React from 'react'
import styled from 'styled-components'

const StyledCore = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  border-radius: 50%;
  width: ${({ $block_size }) => $block_size}px;
  aspect-ratio: 1/1;
  z-index: ${({ $z_index }) => $z_index};
  transform: rotate(${({ $angle }) => $angle}deg);
  &::before {
    content: "";
    width: ${({ $pointer_width }) => $pointer_width}px;
    height: ${props => `calc(${props.$block_size / 2}px + ${props.$tail}px)`};
    background: ${props => props.$light ? props.$pointer_light : props.$pointer_dark};
    border-radius: ${({ $pointer_radius }) => $pointer_radius};
  }

`

StyledCore.defaultProps = {
  $light: true,
  $angle: 0,
  $block_size: 100,
  $pointer_width: 4,
  $pointer_light: "#ff6767",
  $pointer_dark: "#69c0ff",
  $pointer_radius: "6px 6px 3px 3px",
  $z_index: 0,
  $tail: 0
}

const Core = (porps) => {

  const { ...rest } = porps
  return (
    <StyledCore {...rest} />
  )
}

export default Core