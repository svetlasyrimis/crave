import React from 'react';
import Shuffler from './Shuffler';
import { Redirect, Link } from 'react-router-dom'
import ComboButtons from './ComboButtons'


const ComboBoard = (props) => {
  return (
    <div className="combo-board">
      <div className="get-inspired-div">
        <p>Check fellow users' combos here</p>
        <Link to="/allcombos"><button className="btn-secondary">Get inspired</button></Link>   
      </div>
      <h4>Your Board</h4>
      <hr />
      {props.combos.length > 0 ?
        <Redirect to="/combo" />
        :
        <>
          <Redirect to="/home" />
        </>
      }
      {props.combos && props.combos.map(combo => (
        <div key={combo.id}>
          <div className="combo-card" key={combo.id}>
            <p>Combo N{combo.id}</p>
            <Shuffler data={combo} />
            <ComboButtons id={combo.id}
              handleComboDelete={props.handleComboDelete}
              getComboRecipes={props.getComboRecipes}
              handleComboUpdate={props.handleComboUpdate} />
            <hr/>
          </div>
        </div>
      ))}
    </div>
  )
}





export default ComboBoard;