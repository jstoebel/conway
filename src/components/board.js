import React, { Component } from 'react';
import Cell from './cell'


class Board extends Component {

  constructor() {
    super()
    this.eachCell = this.eachCell.bind(this);
    this.step = this.step.bind(this);
    this.go = this.go.bind(this);
    this.stop = this.stop.bind(this);
    this.oneStep = this.oneStep.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.update = this.update.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.render = this.render.bind(this);
  }

  *eachCell() {
    //a generator for returning the coordinates of each cell in sequence
    //from upper left to lower right.
    var nextR = 0;
    var nextC = 0;

    while(true){
      if(nextC >= this.props.columns){
            // ran over, get the next row!
            nextC = 0;
            nextR++;
            if(nextR >= this.props.rows){
              // off ramp when we reach the end of the board
                return({r: nextR, c:nextC})
            }
          }

        yield({r: nextR, c:nextC})
        nextC++;
    }
  }

  step() {
    //one step of the game

     function getNeighboors(ri, ci, board){
       // get all of the neighboor coords of cell defined by ri and ci
       //ri(int): row index of cell
       //ci(cell): column index of cell
       //board: reference to the react Board component

        var neighboors = [];
        for(var r=ri-1; r<ri+2; r++){
            for(var c=ci-1; c<ci+2; c++){
              if(!(ri==r && ci == c)){
                var coord = r+", "+c;
                var cell = board.refs[coord];
                if(cell !== undefined){
                  neighboors.push(Number(cell.state.live));
                }
              }
            }
        }
        return neighboors.reduce(function(prev, cur){
          return prev + cur
        }, 0);
     }  // getNeighboors

    // for each cell decide its fate.
    var cellObjs = {};
    var coordsGen = this.eachCell();
    while(true){
      var cellCoords = coordsGen.next()

      if(cellCoords.done){
        break
      }

      var r = cellCoords.value.r;
      var c = cellCoords.value.c;
      var coord = r+", "+c
      var cell = this.refs[coord];
      var neighboorCount = getNeighboors(r, c, this);

      var cellObj = {r:r, c:c};
      if(cell.props.live){
        //tests for living cell
        if(neighboorCount < 2 || neighboorCount > 3){
          cellObj.live = false;
        } else {
          cellObj.live = true;
        }
      } else {
        if(neighboorCount == 3){
          cellObj.live = true;
        } else {
          cellObj.live = false;
        }
      }
      cellObjs[coord] = cellObj
    }
    this.setState({cellObjects: cellObjs,
      generation: this.state.generation + 1
    })

  }

  go() {

    this.setState({running: true})
  }

  stop (){
    // clear the intervalId
    this.setState({running: false})

  }

  oneStep () {
    //move one step in the game
    this.step();
  }

  clearBoard () {
    //pauses the game and clears the board

    this.setState({running: false});

    var cellObjs = {};
    var coordsGen = this.eachCell();
    while(true){
      var cellCoords = coordsGen.next()

      if(cellCoords.done){
        break
      }

      var r = cellCoords.value.r;
      var c = cellCoords.value.c;
      var coord = r+", "+c;
      var cell = this.refs[coord];
      var cellObj = {r:r, c:c, live: false};

      cellObjs[coord] = cellObj;
    }

    this.setState({cellObjects: cellObjs})

  }

  update (newState, coord) {
    //updates a cell object to change its living state.
    //newState(bool) the new living state of the cell
    //coord (string): the coordinate of the cell

    var cellObjects = this.state.cellObjects
    cellObjects[coord].live = newState
    this.setState({cellObjects: cellObjects})

  }

  componentWillMount() {
    //set up the initial state of the board

    var coordsGen = this.eachCell();
    var cellObjects = {};
    while(true){
      var coords = coordsGen.next();
      if(coords.done){
        break;
      }

      var r = coords.value.r;
      var c = coords.value.c;
      var coord = r+", "+c;
      var live = Boolean(Math.round(Math.random()));
      var cellObj = {r:r, c:c, live:live};

      // objects with data to make a cell component
      cellObjects[coord] = cellObj; }

    this.setState({cellObjects: cellObjects,
      running: true,
      generation: 0
    });

  }

  componentDidMount() {

    var board = this;
    this.intervalId = setInterval(function(){
      if(board.state.running){
        board.step()
      }
    }, 500);

  }

  render() {

    var makeCells = function(key, i){
      //returns a Cell compnent based on the data in object\
      var cellObj = this.state.cellObjects[key]
      var coord = cellObj.r+", "+cellObj.c;
      var live = cellObj.live;
      return(
        <Cell
          id={coord}
          key={coord}
          ref={coord}
          live={live}
          onChange={this.update} />
      )

    }
    return (
      <div className="container">

        <h3>Genrations: {this.state.generation}</h3>
        <div className="btn btn-info" onClick={this.go}>
          <span className="glyphicon glyphicon-play"></span>
        </div>

        <div className="btn btn-info" onClick={this.stop}>
          <span className="glyphicon glyphicon-pause"> </span>
        </div>

        <div className="btn btn-info" onClick={this.oneStep}>
          <span className="glyphicon glyphicon-forward"> </span>
        </div>

        <div className="btn btn-danger" onClick={this.clearBoard}> Clear Board </div>

        <div className="panel-group">
          {Object.keys(this.state.cellObjects).map(makeCells, this)}
        </div>

      </div>
    )
  }
}

export default Board;
