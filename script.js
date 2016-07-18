var Cell = React.createClass({

  getInitialState: function(){
    return {"live": false}
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

  eachCell: function(cell, cell_index){
    var cellId = "cell"+cell_index
    return  (
      <Cell
        key={cellId}>
      </Cell>
    )

  },

  render: function(){

    return (
      <div className="container">
        <div className="panel-group" id="accordion">
          {this.props.structure.map(this.eachCell)}
        </div>
      </div>
    )
  }

})

// var cells = [];
// for (var i=0; i<10; i++){
//   var row = [];
//   for (var j=0; j<10; j++){
//     row.push(j);
//   }
//   cells.push(row);
// }

var cells = [];
for (var i=0; i<5000; i++){
  cells.push(i)
}

React.render(<Board structure={cells} />, document.getElementById('container-fluid'));
