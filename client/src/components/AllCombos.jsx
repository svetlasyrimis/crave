import React from 'react';

import Shuffler from './Shuffler'

const AllCombos = (props) => {

  return (
    <div className="comboHeaders">
      <h4>Fellow Users' Combos</h4>

      <div className="allCombos">
        

        {props.allcombos && props.allcombos.map(combo => (
          <div className="boardCard" key={combo.id}>
            <p>Added by {combo.user.name}</p>
            <Shuffler data={combo} />
          </div>
        ))}
        {!props.allcombos && <p>No users with combos</p>}
      </div>


    </div>
  )
}

export default AllCombos;