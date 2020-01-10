import React from 'react'
import Shuffler from './Shuffler'


const Faves = (props) => {
  return (
    <div className="comboHeaders">
      <h3>Your Favorite Combos</h3>
      <div className="combo-board">
        {props.favorites && props.favorites.map(favorite => (
          <div className="combo-card" key={favorite.id}>
            <Shuffler data={favorite} /> <span className="heart">&hearts;</span>
            <button className="combo-button details" name={favorite.id}
              onClick={() => {
                props.getComboRecipes(favorite.id)
              }}>Get Recipes</button>
            <hr/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Faves;