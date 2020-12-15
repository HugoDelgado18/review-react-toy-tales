import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  // console.log(props.toys)
  return(
    <div id="toy-collection">
      {props.toys.map(toy => <ToyCard toy={toy} key={toy.id} handleLikes={props.handleLikes} handleDonate={props.handleDonate}/>)}
    </div>
  );
}

export default ToyContainer;
