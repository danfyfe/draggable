import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    draggables: [],
    id: 1
  }

  dragStartHandler = (e) => {
    // console.log('id',e.target.id)
    e.dataTransfer.setData('text/plain', e.target.id)
  }

  dragOverHandler = (e) => {
    // console.log("dragOver", e.target)
    e.preventDefault()
  }

  dropHandler = (e) => {
    e.preventDefault()
    let data = e.dataTransfer.getData('text')
    // console.log('data',data)
    let draggableItem = document.getElementById(data)
    if (e.target.id === 'target') {
      draggableItem.style.backgroundColor = "red"
      draggableItem.innerText = "This has been dropped"
    } else {
      draggableItem.style.backgroundColor = "#32cd32"
      draggableItem.innerText = "This has been dropped BACK"
    }
    // console.log('e.target',e.target.id)
    e.target.appendChild(draggableItem)

    e.dataTransfer.clearData()
  }

  createNewDraggableBox = () => {
    this.setState({
      draggables: [...this.state.draggables, this.state.id],
      id: this.state.id + 1
    })
  }

  renderDraggableBoxes = () => {
    return this.state.draggables.map(draggable => {
      return <div key={draggable} className="draggable" id={draggable} draggable onDragStart={ this.dragStartHandler}>
        This is draggable
      </div>
    })
  }

  render(){

    return (
      <>
        <button onClick={this.createNewDraggableBox}>New Draggable</button>
        <div className="draggablesContainer" id="draggablesContainer" onDragOver={this.dragOverHandler} onDrop={this.dropHandler}>
          {this.renderDraggableBoxes()}
        </div>
        <div className="droppable" id="target" onDrop={this.dropHandler} onDragOver={this.dragOverHandler}>
        </div>
      </>
    );
  }
}

export default App;

// <div className="draggable" id={ id} draggable onDragStart={ this.dragStartHandler}>
//   This is draggable
// </div>