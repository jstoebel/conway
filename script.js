var Cell = React.createClass({

  getInitialState: function(){
    return {live: this.props.startValue}
  },

  componentWillMount: function(){
    if(this.state.live){
      this.style = {
        "backgroundColor": "red"
      }
    } else {
      this.style = {}
    }
  },

  toggleState: function(){
    this.setState({ live : !this.state.live})
  },

  render: function(){
    var style = {
      "backgroundColor": this.state.live ? "red" : "white"
    }

    return (
      <div className="square"
        onClick={this.toggleState}
        style={style}
      >
        <div className="content">
        </div>
      </div>

    )
  }
})

var Board = React.createClass({

  getInitialState: function(){
    return({running: true})
  },

  eachCell: function(){
    //returns an iterator traversing the strucutre of the board, returning
    //each cell coordinates

    var nextR = 0;
    var nextC = 0;
    var board = this;

    return {
      next: function(){
        if(nextC >= board.props.columns){
          // ran over, get the next row!
          nextC = 0;
          nextR++;
          if(nextR >= board.props.rows){
            // off ramp when we reach the end of the board
              return {done: true}
          }
        } else {
          nextC++;
        }

        var coords = nextR + "," + nextC;
        var isDone = (nextR == board.props.rows -1 && nextC == board.props.columns - 1)
        return {value: coords, done: isDone? true : false }
      }
    }
  },

  step: function(){
    //one step of the game

    function getNeighboors(ri, ci, board){
      //row(int): a row index
      //column(int): a column index
      //returns an array of all of the neighboors to the cell at coordinates row, column
      //will contain undefined for boarder cells

      var neighboors = [];
      var strucutre = board.props.strucutre;
      for(var r=ri-1; r<ri+2; r++){
        //iterate over each row in stucture
        var row = board.props.structure[r]
        if(row != undefined){ //make sure we didn't go out of bounds

          for(var c=ci-1; c<ci+2; c++){
            //iterate over each item in row
            if(!(ri==r && ci == c)){
              //skip the cell in question
              var cell = board.refs[r+","+c]
              // make sure its a cell before trying to get its state
              if(cell !== undefined){neighboors.push(Number(cell.state.live))}
            }
          }
        }

      }
      return neighboors.reduce(function(prev, cur){
        return prev + cur
      }, 0);

    } // getNeighboors

    // for each cell decide its fate.
    var structure = this.props.structure;
    for(var r=0; r<structure.length; r++){
      //iterate over each row in stucture
      var row = structure[r]
      if(row != undefined){   //make sure we didn't go out of bounds
        for(var c=0; c<row.length; c++){
          //iterate over each item in row
            //skip the cell in question
          var cell = this.refs[r+","+c]
          // make sure its a cell before trying to get its state
          if(cell !== undefined){
            var neighboorCount = getNeighboors(r,c, this);

            if(cell.state.live){
              //tests for living cell
              if(neighboorCount < 2 || neighboorCount > 3){
                cell.setState({live: false})
              }
            } else {
              if(neighboorCount == 3){
                cell.setState({live: true})
              }
            }
          }
        }
      }
    }
  },

  componentDidMount: function(){
    // this.state.cells.map(function(row, row_i){
    //   console.log(row)
    // })

    var it = this.eachCell();

    do {
      console.log(it.next())

    } while (!it.done)

    // var board = this;
    // this.intervalId = setInterval(function(){
    //   if(board.state.running){
    //     board.step()
    //   }
    // }, 1000);

  },

  go: function(){
    console.log("starting!")
    this.setState({running: true})

  },

  stop: function(){
    // clear the intervalId
    console.log("stopping!")
    this.setState({running: false})

  },

  clearBoard: function(){
    //pauses the game and clears the board

    this.setState({running: false});


  },

  render: function(){
    var cells = this.props.structure.map(function(row, row_i){
      return row.map(function(cellValue, col_i){
        return (
          <Cell
          key={row_i+","+col_i}
          ref={row_i+","+col_i}
          startValue={cellValue} />
        )
      })
    })

    return (
      <div className="container">
        <div className="btn btn-info" onClick={this.go}>
          <span className="glyphicon glyphicon-play"></span>
        </div>

        <div className="btn btn-info" onClick={this.stop}>
          <span className="glyphicon glyphicon-pause"> </span>
         </div>
        <div className="btn btn-danger" onClick={this.clearBoard}> Clear Board </div>
        <div className="panel-group" id="accordion">
          {cells}
        </div>

      </div>
    )
  }
})

var cells = [];
// make a board 50 wide and 25 tall
for (var h=0; h<25; h++){
  var cell_row = [];
  for (var w=0; w<50;  w++){
    cell_row.push(Boolean(Math.round(Math.random())));
  }
    cells.push(cell_row);
}


React.render(<Board structure={cells} rows={2} columns={3} />, document.getElementById('container-fluid'));
