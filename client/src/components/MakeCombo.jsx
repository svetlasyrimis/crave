import React from 'react'
import Shuffler from './Shuffler'


function MakeCombo(props) {
  return (
    <div className="shuffler">
      <h1>{'Meal Shuffler'}</h1>
      <h2>Shuffle and add a meal combo to your combo board.</h2>
      {props.meal &&
        <Shuffler data={props.meal} />
      }
      <button onClick={props.fetchMealDrink}>Get a Combo</button>


    </div>


  )
}

export default MakeCombo;