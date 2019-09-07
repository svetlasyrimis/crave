import React from 'react';
import { fetchFood, fetchDrink, fetchMealId, fetchDrinkId } from './services/api-helper'
import './App.css';
import Nav from './components/Nav';
import Header from './components/Header'
import Login from './components/Login'
import MakeCombo from './components/MakeCombo'
import ComboBoard from './components/ComboBoard'
import RecipeInfo from './components/RecipeInfo'
import AllCombos from './components/AllCombos'
import { createCombo, deleteCombo, getALL, fetchUserCombos, fetchFavorites, getOneCombo } from './services/combos'
import Faves from './components/Faves'

import Footer from './components/Footer'


import { Route, withRouter } from 'react-router-dom'
import {
  createUser,
  verifyToken,
  loginUser,

} from './services/auth';

import axios from 'axios';
import { updateComment, deleteComment } from './services/comments';




class App extends React.Component {

  constructor() {
    super()
    this.state = {
      currentView: 'login',
      currentUser: null,
      currentCombo: null,
      combos: [],
      allcombos: [],
      favorites: [],
      meal: {
        food: 'Food',
        foodImage: 'https://i.imgur.com/A8GTchf.png',
        foodId: '',
        drink: 'Drink',
        drinkImage: 'https://i.imgur.com/A8GTchf.png',
        drinkId: '',
        isLiked: false
      },

      loginFormData: {
        name: '',
        password: '',
      },
      registerFormData: {
        name: '',
        password: '',
        email: ''
      },
      isToggleOn: true,
      bgColor: ''
    }
  }


  fetchMealDrink = async () => {
    const drinkResp = await fetchDrink();
    const foodResp = await fetchFood();
    const meal = {
      food: foodResp.strMeal,
      foodImage: foodResp.strMealThumb,
      foodId: foodResp.idMeal,
      drink: drinkResp.strDrink,
      drinkImage: drinkResp.strDrinkThumb,
      drinkId: drinkResp.idDrink,
    }
    this.setState({

      meal: {
        food: foodResp.strMeal,
        foodImage: foodResp.strMealThumb,
        foodId: foodResp.idMeal,
        drink: drinkResp.strDrink,
        drinkImage: drinkResp.strDrinkThumb,
        drinkId: drinkResp.idDrink,
        isLiked: false
      }

    })
    const combo = await createCombo(meal);
    this.setState(prevState => ({
      combos: [combo, ...prevState.combos]
    }));
    console.log(this.state.combos)
  }


  getComboRecipes = async (comboId) => {
    const data = await getOneCombo(comboId);
   
    const comboFoodItem = await fetchMealId(data.combo.foodId)
    const comboDrinkItem = await fetchDrinkId(data.combo.drinkId)
   
    this.setState({
      currentCombo: {
        id: comboId,
        meal: comboFoodItem,
        drink: comboDrinkItem,
        comments: data.combo.comments
      }
    })
    console.log(this.state.currentCombo)
    // this.props.history.push(`/recipe/${parseInt(comboId)}`)
    this.props.history.push(`/recipe/${comboId}`)
  }

  componentDidMount = async () => {

    const user = await verifyToken();

    if (user) {
     
      console.log(user)
      const combos = await fetchUserCombos(user.id);
      const favorites = await fetchFavorites(user.id)
      this.setState({
       
        currentUser: user,
        combos: combos,
        favorites: favorites,
      })
      this.props.history.push(`/home`)
    }
   
  }


  handleLoginFormChange = (ev) => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      loginFormData: {
        ...prevState.loginFormData,
        [name]: value,
      },
    }));
  }

  handleLoginSubmit = async (ev) => {
    ev.preventDefault();
    const user = await loginUser(this.state.loginFormData);
    const combos = await fetchUserCombos(user.id);
    const favorites = await fetchFavorites(user.id)
    this.setState({
      loginFormData: {
        name: '',
        password: '',
      },
      currentUser: user,
      currentView: 'welcome',
      combos: combos,
      favorites: favorites,
    })
    console.log(this.state.favorites)
    this.props.history.push('/home');
 
  }

  handleLogout = (e) => {
    e.preventDefault();
    localStorage.getItem('authToken')
    localStorage.removeItem('authToken')
    this.setState({
      isLoggedIn: false,
      currentView: 'login',

      loginFormData: {
        name: '',
        password: '',
      }

    })
    console.log(this.state.currentView)
    this.props.history.push('/');
  }


  handleRegisterFormChange = (ev) => {
    const { name, value } = ev.target;

    this.setState(prevState => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: value
      }
    }));
  }

  handleRegisterSubmit = async (ev) => {
    ev.preventDefault();
    const user = await createUser(this.state.registerFormData);
    console.log(user);
    this.setState({
      registerForm: {
        name: '',
        password: '',
        email: ''
      },
      currentUser: user,
      currentView: 'welcome'
    });
    this.props.history.push('/home');
  }



  handleComboUpdate = async (comboId) => {
    const currentCombo = this.state.combos.find(combo => combo.id === comboId)
    console.log("combo id: " + comboId)
    const comboFoodItem = await fetchMealId(currentCombo.foodId)
    const comboDrinkItem = await fetchDrinkId(currentCombo.drinkId)
    
    this.setState({
      currentCombo: {
        foodId: comboFoodItem.idMeal,
        food: comboFoodItem.strMeal,
        foodImage: comboFoodItem.strMealThumb,
        drink: comboDrinkItem.strDrink,
        drinkImage: comboDrinkItem.strDrinkThumb,
        drinkId: comboDrinkItem.idDrink,
        isLiked: true
      }
    })

    this.setState(prevState => ({
      combos: prevState.combos.filter(combo => combo.id !== comboId)
    }))
    // https://cravemealdrink-api.herokuapp.com
    const resp = await axios.put(`https://cravemealdrink-api.herokuapp.com/combos/${comboId}`, this.state.currentCombo);
    const favorite = resp.data;

    this.setState(prevState => ({
      favorites: [favorite, ...prevState.favorites]
    }));
    console.log(this.state.favorites)


  }

  handleViewCombos = async () => {

    const combos = await getALL();
    this.setState({
      allcombos: combos.combos
    })
    console.log(this.state.allcombos)
  }

  addNewComment = (comment) => {
    console.log(comment)
    this.setState(prevState => ({
      currentCombo: {
        ...prevState.currentCombo,
        comments: [...prevState.currentCombo.comments,comment]
      },
      // combos: [...prevState.combos.filter(combo => combo.id !== prevState.currentCombo.id)]
    }))
   
  }

  putComment = async (id, commentInfo) => {
    const newComment = await updateComment(id, commentInfo)
    
    this.setState(prevState => ({
      currentCombo: {
        ...prevState.currentCombo,
        comments: prevState.currentCombo.comments.map(comment => comment.id === newComment.id ? newComment : comment)
      },
      // combos: [...prevState.combos.filter(combo => combo.id !== prevState.currentCombo.id)]

    }))
  }
  destroyComment = async (id) => {
    await deleteComment(id);
    this.setState(prevState => ({
      currentCombo: {
        ...prevState.currentCombo,
        comments: prevState.currentCombo.comments.filter(comment => comment.id !== id)
      },
      // combos: [...prevState.combos.filter(combo => combo.id !== prevState.currentCombo.id)]
    }))
  }

  handleComboDelete = async (e) => {
    e.preventDefault();
    const comboId = e.target.name
    console.log(comboId);
    await deleteCombo(comboId);

    this.setState(prevState => ({
      combos: prevState.combos.filter(combo =>
        combo.id !== parseInt(comboId))
    }))
  }


  toggleAuthView = () => {
    this.setState(prevState => ({
      currentView: prevState.currentView === 'register' ? 'login' : 'register'
    }));
  }

  render() {

    return (
      <div>

        <Header />
        <main>
          <>
            <Route path="/" exact render={() =>

              <Login
                currentView={this.state.currentView}
                registerFormData={this.state.registerFormData}
                handleRegisterSubmit={this.handleRegisterSubmit}
                handleRegisterFormChange={this.handleRegisterFormChange}
                toggleAuthView={this.toggleAuthView}
                loginFormData={this.state.loginFormData}
                handleLoginSubmit={this.handleLoginSubmit}
                handleLoginFormChange={this.handleLoginFormChange}
              />} />
          </>
        </main>
        <div>
          {this.state.currentUser && (
            <>
              <Nav handleLogout={this.handleLogout}/>
              <Route path="/home" exact render={() => (
                <>
                  
                  <p>Hello {this.state.currentUser.name}!</p>
                  <MakeCombo
                    isLoggedIn={this.state.isLoggedIn}
                    currentView={this.state.currentView}
                    loginFormData={this.state.loginFormData}
                    meal={this.state.meal}
                    fetchMealDrink={this.fetchMealDrink}
                    changeBoard={this.changeBoard}
                  />
                </>
              )} />

              <Route path="/combo" render={() => (
                <ComboBoard
                  getComboRecipes={this.getComboRecipes}
                  isToggleOn={this.state.isToggleOn}
                  combos={this.state.combos}
                  handleViewCombos={this.handleViewCombos}
                  handleComboDelete={this.handleComboDelete}
                  handleComboUpdate={this.handleComboUpdate}
                  bgColor={this.state.bgColor}
                />
              )} />

              <Route path="/allcombos" render={() => (
                <AllCombos
                  allcombos={this.state.allcombos}
                />
              )} />
             
              <Route exact path="/favorites" render={() => (
                <Faves
                  favorites={this.state.favorites}
                />
              )} />

              <Route path="/recipe/:id" render={(props) => (
                <RecipeInfo
                  id={props.match.params.id}
                  addNewComment={this.addNewComment}
                  putComment={this.putComment}
                  destroyComment={this.destroyComment}
                  currentCombo={this.state.currentCombo}
                  favorites={this.state.favorites}
                />
              )} />

            </>
          )}

        </div>
        <Footer />

      </div>
    )
  }
}


export default withRouter(App)