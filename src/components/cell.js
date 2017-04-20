import React, { Component } from 'react';

class Cell extends Component {

  constructor() {
    super();
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.render = this.render.bind(this);
  }

  componentWillMount(){
    this.setState({live: this.props.live})
  }

  componentWillReceiveProps(nextProps){
    //determines if props have updated and if so changes state.

    if(this.props.live != nextProps.live){
      this.setState({live: nextProps.live})
    }
  }

  toggleState(){
    var newState = !this.state.live
    this.props.onChange(newState, this.props.id)
  }

  render() {

    const outerStyle = {
      backgroundColor: this.state.live ? "red" : "white",
      floa: "left",
      position: "relative",
      width: "2%",
      paddingBottom: "2%", /* = width for a 1:1 aspect ratio */
      overflow: "hidden",
      border: "1px solid black"
    }

    const innerStyle = {
      position: "absolute",
      height: "100%", /* = 100% - 2*5% padding */
      width: "100%", /* = 100% - 2*5% padding */
    }

    return (
      <div className="square"
        onClick={this.toggleState}
        style={outerStyle}
      >
        <div className="content" style={innerStyle}>
        </div>
      </div>

    )
  }
}

export default Cell
