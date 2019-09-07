import React, { Component } from 'react'

export default class ComboCard extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = {
      isAdded: false
    }
  }


  handleAdd = () => {
    this.setState(prevState => ({
      isAdded: !prevState.isAdded,

    }));
  }
  render() {
    return (
      <>
        {!this.state.isAdded && <><button
          name={this.props.id}
          onClick={this.props.handleComboDelete}>Delete</button>
          <button name={this.props.id} onClick={() => {

            this.props.getComboRecipes(this.props.id)
          }}>Get Info</button>

          <button name={this.props.id}
            onClick={(e) => {
              e.preventDefault();
              this.props.handleComboUpdate(this.props.id);
              this.handleAdd();

            }}
            variant="info" >Like<span className="heart">&hearts;</span></button></>}
        {this.state.isAdded && <>
          <button
            name={this.props.id}
            onClick={this.props.handleComboDelete}>Delete</button>
          <button name={this.props.id} onClick={() => {

            this.props.getComboRecipes(this.props.id)
          }}>Get Info</button>
          <p><strong>Liked<span className="heart">&hearts;</span><span>&#10004;</span></strong> </p>
          
        </>

        }
      </>
    )
  }
}
