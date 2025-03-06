import React from 'react'
import styled from 'styled-components'
import City from './City'
import Time from './Time'
import Pointer from './Pointer'
import Center from './Center'
import Core from './Core'

const StyledClock = styled.div`
  width: ${props => props.$size};
  aspect-ratio: 1/1;
  background-color: ${({ $light, theme }) => $light ? theme.clockBackground.light : theme.clockBackground.dark};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  color: ${props => props.color};

  border-radius: 2rem;
  padding: 2rem;
  margin: 2rem;
`

StyledClock.defaultProps = {
  $size: '40rem',
  $light: false,
  color: 'black'
}

const Clock = (props) => {
  const { city, timezone } = props

  const [light, setLight] = React.useState(false)

  const [year, setYear] = React.useState()
  const [month, setMonth] = React.useState()
  const [day, setDay] = React.useState()

  const [hour, setHour] = React.useState()
  const [minute, setMinute] = React.useState()
  const [second, setSecond] = React.useState()

  const [hourDeg, setHourDeg] = React.useState(0)
  const [minuteDeg, setMinuteDeg] = React.useState(30)
  const [secondDeg, setSecondDeg] = React.useState(60)

  const setTime = () => {
    const currentTime = new Date()
    const offset = timezone * 60 * 60 * 1000
    const timeWithOffset = new Date(currentTime.getTime() + offset)

    const unitDeg = 360 / 60
    const bigUnitDeg = 360 / 12

    setYear(timeWithOffset.getUTCFullYear())
    setMonth(timeWithOffset.getUTCMonth() + 1)
    setDay(timeWithOffset.getUTCDate())
    setHour(timeWithOffset.getUTCHours())
    setMinute(timeWithOffset.getUTCMinutes())
    setSecond(timeWithOffset.getUTCSeconds())

    setSecondDeg(timeWithOffset.getUTCSeconds() * unitDeg)
    setMinuteDeg(timeWithOffset.getUTCMinutes() * unitDeg + timeWithOffset.getUTCSeconds() / 60 * unitDeg)
    setHourDeg((timeWithOffset.getUTCHours() + timeWithOffset.getUTCMinutes() / 60) * bigUnitDeg)
  }

  React.useEffect(() => {
    setTime()
    const interval = setInterval(() => {
      setTime()
    }, 200)
    return () => clearInterval(interval)
  }, [])

  React.useEffect(() => {
    (hour >= 6 && hour < 18) ? setLight(true) : setLight(false)
  }, [hour])

  return (
    <StyledClock $light={light}>
      <City $light={light}>{city}</City>
      <Pointer $light={light}>
        <Center $light={light} />
        <Core $light={light} $angle={hourDeg} $pointer_width={7} $block_size={100} $pointer_light="#848484" $pointer_dark="#ff6767" />
        <Core $light={light} $angle={minuteDeg} $pointer_width={4} $block_size={120} $pointer_light="#848484" $pointer_dark="#fff" />
        <Core $light={light} $angle={secondDeg} $pointer_width={2} $block_size={150} $tail={25} />
      </Pointer>
      <Time $light={light} >{year}-{month}-{day} {hour}:{minute}:{second}</Time>
    </StyledClock>
  )
}

export default Clock