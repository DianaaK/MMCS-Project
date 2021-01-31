import React from "react";
import { TextField, Button } from "@material-ui/core";
import { centralLimit } from "./centralLimitUtils";

export class CentralLimit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mu: 0.2,
      sigma: 3,
      nrMax: 1000,

      dataResults: [],
      statsForResults: {}
    };
  }

  generateNSamples = (nrMax) => {
    const dataArray = [];
    for (let i = 0; i < nrMax; i++) {
      const centralLimitVariable = centralLimit(
        this.state.mu,
        this.state.sigma
      );
      dataArray.push(centralLimitVariable);
    }
    const stats = this.getDataForResults(dataArray);
    this.setState({ dataResults: dataArray, statsForResults: stats });
  };

  getDataForResults = (results) => {
    const dataResultsSum = results?.reduce((acc, item) => acc + item, 0);
    const dataResultsSumSq = results?.reduce(
      (acc, item) => acc + item * item,
      0
    );
    const mediaSelectie = dataResultsSum / this.state.nrMax;
    const dispersiaSelectie =
      dataResultsSumSq / this.state.nrMax - mediaSelectie * mediaSelectie;
    const data = {
      medieSelectie: mediaSelectie,
      dispersieSelectie: dispersiaSelectie,
      medieTeoretica: this.state.mu,
      dispersieTeoretica: this.state.sigma
    };
    return data;
  };

  handleButtonCentralLimit = () => {
    this.generateNSamples(this.state.nrMax);
  };

  render() {
    const data = this.state.statsForResults;
    return (
      <div style={{ margin: 40 }}>
        <div className='form-group col-sm-6 col-md-offset-6'>
          <div style={styles.container}>
            Introduceti media (m):
            <div className='col-sm-4'>
              <TextField
                id='mu'
                value={this.state.mu}
                onChange={(e) => this.setState({ mu: e.target.value })}
              />
            </div>
          </div>

          <div style={styles.container}>
            Introduceti dispersia (σ²):
            <div className='col-sm-4'>
              <TextField
                id='sigma'
                value={this.state.sigma}
                onChange={(e) => this.setState({ sigma: e.target.value })}
              />
            </div>
          </div>

          <div style={styles.container}>
            Introduceti numarul maxim de variabile:
            <div className='col-sm-4'>
              <TextField
                id='maximumNumbers'
                value={this.state.nrMax}
                onChange={(e) => this.setState({ nrMax: e.target.value })}
              />
            </div>
          </div>

          <Button
            variant='contained'
            color='primary'
            onClick={this.handleButtonCentralLimit}
          >
            Genereaza
          </Button>
        </div>

        {this.state.dataResults?.length ? (
          <div style={{ ...styles.container, justifyContent: "center" }}>
            <div className='col-sm-4' style={styles.containerResults}>
              <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                Media de selectie:{" "}
                <span style={{ fontWeight: "normal" }}>
                  {data.medieSelectie.toFixed(5)}
                </span>
              </p>
              <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                Dispersia de selectie:{" "}
                <span style={{ fontWeight: "normal" }}>
                  {data.dispersieSelectie.toFixed(5)}
                </span>
              </p>
              <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                Media teoretica:{" "}
                <span style={{ fontWeight: "normal" }}>
                  {data.medieTeoretica}
                </span>
              </p>
              <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                Dispersia teoretica:{" "}
                <span style={{ fontWeight: "normal" }}>
                  {data.dispersieTeoretica}
                </span>
              </p>
            </div>
            <div className='col-sm-4' style={styles.containerResults}>
              <span style={{ fontWeight: "bold" }}>Istoric rezultate:</span>
              <div style={styles.results}>
                {this.state.dataResults.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    margin: "20px 5px"
  },
  results: {
    height: 400,
    overflow: "auto",
    padding: 5
  },
  containerResults: {
    backgroundColor: "#efefef",
    padding: 10,
    margin: "10px 40px",
    borderRadius: 5,
    boxShadow: "rgb(190 190 190) -1px 2px 14px"
  }
};
