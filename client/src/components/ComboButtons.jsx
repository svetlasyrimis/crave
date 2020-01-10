import React, { Component } from 'react'

export default class ComboButtons extends Component {
  constructor(props) {
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
        {!this.state.isAdded &&
          <>
            <button
              name={this.props.id}
              className="combo-button"
              onClick={this.props.handleComboDelete}>Delete</button>

            <button className="combo-button details" name={this.props.id}
              onClick={() => {
                this.props.getComboRecipes(this.props.id)
              }}>Get Recipes</button>

            <button name={this.props.id}
              className="combo-button like"
              onClick={(e) => {
                e.preventDefault();
                this.props.handleComboUpdate(this.props.id);
                this.handleAdd();

              }}
              variant="info" >Like</button></>}
        {this.state.isAdded && <>
          <button
            className="combo-button"
            name={this.props.id}
            onClick={this.props.handleComboDelete}>Delete</button>

          <button name={this.props.id}
            className="combo-button" onClick={() => {

              this.props.getComboRecipes(this.props.id)
            }}>Get Info</button>
          <p><strong>Liked<span className="heart">&hearts;</span><span>&#10004;</span></strong> </p>
        </>
        }
      </>
    )
  }
}
