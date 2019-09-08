import React from 'react';
import Shuffler from './Shuffler';
import { Redirect,Link } from 'react-router-dom'
import ComboCard from './ComboCard'


const ComboBoard = (props) => {
  console.log(props)
  return (
    <div className="combo-board">
      <Link to="/allcombos">View all combos</Link>
      {/* <button name="all" onClick={() => {
        props.handleViewCombos()
        props.history.push('/allcombos')
      }}>View all combos</button> */}

      {props.combos.length > 0 ?
       
          <Redirect to="/combo" />
        :
        <>
          <Redirect to="/home" />
        </>}
      {props.combos && props.combos.map(combo => (
        <div key={combo.id}>

          <div className="combo-card" key={combo.id}>

            <Shuffler data={combo} />
            <ComboCard id={combo.id} handleComboDelete={props.handleComboDelete} getComboRecipes={props.getComboRecipes} handleComboUpdate={props.handleComboUpdate}/>
           
          </div>


        </div>
      ))}

    </div>
   
  )
}





export default ComboBoard;