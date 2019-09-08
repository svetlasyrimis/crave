import React from 'react'
import Shuffler from './Shuffler'


const Faves = (props) => {
  console.log(props)
  return (

    <div className="comboHeaders">
      <h4>Your Favorite Combos</h4>

      <div className="allCombos">
       
        {props.favorites && props.favorites.map(favorite => (
          <div className="boardCard" key={favorite.id}>
            <Shuffler data={favorite} /> <span className="heart">&hearts;</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Faves;