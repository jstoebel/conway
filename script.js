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
    var cells = this.props.structure.map(function(row, row_i){
      return row.map(function(cellValue, col_i){
        return (
          <Cell
          key={row_i+"-"+col_i}
          startValue={cellValue} />
        )
      })
    })
    return {'cells': cells}
  },

  step: function(){
    //one step of the game

    function getNeighboors(row, column){
      //row(int): a row index
      //column(int): a column index
      //returns an array of all of the neighboors to the cell at coordinates row, column

      var neighboors = [];
      for(var r=row-1; r<row+2; r++){
        for(var c=column-1; c<column+2; c++){
          neighboors.push(this.state.cells[r][c])
        }
      }
      return neighboors;
    }

    return getNeighboors(0, 0).bind(this);

  },

  componentDidMount: function(){
    // this.state.cells.map(function(row, row_i){
    //   console.log(row)
    // })

    console.log(this.step())

  },

  render: function(){



    return (
      <div className="container">
        <div className="panel-group" id="accordion">
          {this.state.cells}
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


React.render(<Board structure={cells} />, document.getElementById('container-fluid'));
