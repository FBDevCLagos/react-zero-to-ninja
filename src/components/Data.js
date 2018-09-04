import React, { Component } from "react";

export default class Data extends Component {
  constructor() {
    super();
    this.state = {
      character: [{ name: "Bola", sex: "Female" }]
    };
  }

  render() {
    return (
      <div>
        <p>My name is {this.state.character[0].name}</p>
        <p>I am a {this.state.character[0].sex} </p>
      </div>
    );
  }
}
