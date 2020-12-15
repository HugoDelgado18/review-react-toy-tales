import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    toys:[],
    display: false
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => {
      this.setState({
        toys:data
      })
    })
  }

  handleAddToy = (e) => {
    e.preventDefault()
    // console.log(e.target[0].value)
    // console.log(e.target[1].value)
    // console.log(e.target.image.value)
    fetch('http://localhost:3000/toys', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name: e.target[0].value,
        image: e.target[1].value,
        likes:0
      })
    })
    .then(res=> res.json())
    .then(data => {
      this.setState({
        toys:[...this.state.toys, data]
      })
    })
  }

  handleLikes = (toy) => {
    // console.log(toy)
    let updateLikes = toy.likes + 1

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        likes: updateLikes
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.likes)
      //  this.setState({
      //    toys: this.state.toys.map( t => {
      //      if(t.id === toy.id){
      //        t.likes = data.likes
      //        return t
      //      }else{
      //        return t
      //      }
      //    })
      //  })

      let index = this.state.toys.indexOf(toy)
      // [0,1,2,3,4,5,6,7]
      this.setState({
        toys: [...this.state.toys.slice(0, index),
          {...toy, likes: data.likes},
          ...this.state.toys.slice(index + 1)
        ]
      })
    })
  }

  handleDonate = (toy) => {
    console.log(toy)

    let updateToys = this.state.toys.filter(t => t.id !== toy.id)
    this.setState({
      toys: updateToys
    })

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      }
    })
  }

  render(){
    // console.log(this.state.toys)
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm handleAddToy={this.handleAddToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} handleLikes={this.handleLikes} handleDonate={this.handleDonate}/>
      </>
    );
  }
}

export default App;
