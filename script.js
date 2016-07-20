var Cell = React.createClass({

  getInitialState: function(){
    return {"live": this.props.startValue}
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
    this.setState({"live" : !this.state.live})
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

  eachCell: function(startValue, cell_index){
    var cellId = "cell"+cell_index
    return  (
      <Cell
        key={cellId}
        startValue={startValue}>
      </Cell>
    )

  },

  render: function(){

    var cells = this.props.structure.map(function(row, row_i){
      var cell = row.map(function(cellValue, col_i){
        return (
          <Cell
            key={row_i+col_i}
            startValue={cellValue} />
        )
      })
    })

    return (
      <div className="container">
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
    cell_row.push(Math.round(Math.random()));
  }
    cells.push(cell_row);
}


React.render(<Board structure={cells} />, document.getElementById('container-fluid'));
