import React from 'react'
import Color from 'color'
import image from './treasure.png'

// TODO make Cell pure
export default ({ value, contains, index, count, handleHover }) => {
  const treasureColor = 'rgba(255, 255, 255, 0.5)'
  let clueColor = 'rgba(255, 255, 255, 0.5)'

  if (contains === 'clue') {
    clueColor = index === 1 ? '#fff' : Color('#fff').darken(index/count).alpha(0.9).rgbString()
  }

  const backgroundColor = contains === 'treasure' ? treasureColor : clueColor

  const style = {
    backgroundColor,
    backgroundImage: contains === 'treasure' ? `url(${image})` : null,
    color: Color(backgroundColor).dark() ? '#fff' : 'inherit'
  }

  return (
    <td className="cell center" style={style} onMouseOver={handleHover}>
      {`${value} `}
    </td>
  )
}
