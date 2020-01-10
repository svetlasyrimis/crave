import React from 'react'
import Shuffler from './Shuffler'


function MakeCombo(props) {
  return (
    <div className="shuffler">
      <p className="title">Hello {props.currentUser.name.charAt(0).toUpperCase() + props.currentUser.name.slice(1)}</p>
      <p className="subtitle">Shuffle and add a meal combo to your combo board.</p>
      <button onClick={props.fetchMealDrink}>Get a Combo</button>
      {props.meal &&
        <Shuffler data={props.meal} />
      }
    </div>
  )
}

export default MakeCombo;