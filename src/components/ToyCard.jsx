import React, { Component } from 'react';

class ToyCard extends Component {

  render() {
    // console.log(this.props.toy)
    let toy = this.props.toy
    return (
      <div className="card">
        <h2>{toy.name}</h2>
        <img src={toy.image} alt={toy.name} className="toy-avatar" />
        <p>{toy.likes} Likes </p>
        <button className="like-btn" onClick={()=> this.props.handleLikes(toy)}>Like {'<3'}</button>
        <button className="del-btn" onClick={() => this.props.handleDonate(toy)}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
