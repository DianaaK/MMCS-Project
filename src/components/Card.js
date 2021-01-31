import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Poisson } from "./Poisson";
import { CentralLimit } from "./CentralLimit";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: "subpunctA"
    };
  }

  handleTabChange = (event, value) => {
    this.setState({ tabValue: value });
  };

  render() {
    return (
      <div className='mainCard'>
        <div style={{ borderBottom: "1px solid #dedede", marginBottom: 10 }}>
          <Tabs
            value={this.state.tabValue}
            onChange={this.handleTabChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
          >
            <Tab label='Limita Centrala' value='subpunctA' />
            <Tab label='Variabila Poisson' value='subpunctB' />
          </Tabs>
        </div>
        {this.state.tabValue === "subpunctA" ? <CentralLimit /> : null}
        {this.state.tabValue === "subpunctB" ? <Poisson /> : null}
      </div>
    );
  }
}

export default Card;
