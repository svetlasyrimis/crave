import React from 'react';
import Card from 'react-bootstrap/Card';
import { createComment } from '../services/comments';



class RecipeInfo extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      comment: "",
      isEdit: null,
      editComment: "",
     
    }
  }
  handleSubmit = async (ev) => {
    ev.preventDefault();
    const newComment = await createComment({ comment: this.state.comment, combo: this.props.currentCombo.id });
    this.setState({
      comment:''
    })
    this.props.addNewComment(newComment);
  }
  handleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState({
      [name]: value
    });
  }
  componentDidMount = async () => {
    this.setState({
      id: this.props.id,
      
    })
  }
  render() {

    return (
      <>
      
       
        {this.props.currentCombo &&
          <>
          <div id='container'>
          
            <>
              <Card style={{ width: '50%' }}>
                <Card.Img variant="top" src={this.props.currentCombo.meal.strMealThumb} />
                <Card.Body>
                  <Card.Title>{this.props.currentCombo.meal.strMeal}</Card.Title>
                  <Card.Text>
                    {this.props.currentCombo.meal.strInstructions}
                  </Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
              <Card style={{ width: '50%' }}>
                <Card.Img variant="top" src={this.props.currentCombo.drink.strDrinkThumb} />
                <Card.Body>
                  <Card.Title>{this.props.currentCombo.drink.strDrink}</Card.Title>
                  <Card.Text>
                    {this.props.currentCombo.drink.strInstructions}
                  </Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
            </>
          
          </div>

          <div>

            <form onSubmit={this.handleSubmit}>
              <input

                name="comment"
                onChange={this.handleChange}
                type="text"
                value={this.state.comment}
              />
              <button>Add Comment</button>
            </form>


            {this.props.currentCombo.comments && this.props.currentCombo.comments.map(comment => (
              <div key={comment.id}>
                {
                  this.state.isEdit === comment.id ?
                    <form onSubmit={() => {
                      this.props.putComment(comment.id, this.state.editComment);
                      this.setState({
                        isEdit: null,
                        editComment: ""
                      })
                    }}>
                      <input
                        type="text"
                        name="editComment"
                        value={this.state.editComment}
                        onChange={this.handleChange}
                      />
                      <button>Submit</button>
                    </form>
                    :
                    <>
                      <div><p>{comment.comment}</p>
                      <button onClick={() => {
                        this.setState({
                          isEdit: comment.id,
                          editComment: comment.comment
                        })
                      }}> Edit </button>
                        <button onClick={() => this.props.destroyComment(comment.id)}>Delete</button>
                        </div>
                    </>}
              </div>
            ))}
          </div>
          </>
        }
      </>
    )
  }
}


export default RecipeInfo;

