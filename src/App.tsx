import React from "react";
import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <div className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <div className="header">
              <img
                src={require("./assets/logo.png")}
                alt="Intelie - a RigNet company"
              />
              <div className="title"> Thomas Gouveia Lopes Challenge </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section chart-input">
        <div className="container">
          <textarea name="" id=""></textarea>
        </div>
      </section>

      <div className="footer">
        <div className="container">
          <button className="button is-info">Generate Chart</button>
        </div>
      </div>
    </div>
  );
}

export default App;
