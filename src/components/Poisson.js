import React from "react";
import { TextField, Button } from "@material-ui/core";
import { generatePoissoinV1, generatePoissoinV2 } from "./poissonUtils";

export class Poisson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poissonParameter: 5,
      nrMax: 500,

      dataResultsV1: [],
      dataResultsV2: [],
      statsForResultsV1: {},
      statsForResultsV2: {}
    };
  }

  generateNSamples = (nrMax, method) => {
    const dataArrayV1 = [];
    const dataArrayV2 = [];

    for (let i = 0; i < nrMax; i++) {
      const poisson1Variable = generatePoissoinV1(this.state.poissonParameter);
      dataArrayV1.push(poisson1Variable);
      const poisson2Variable = generatePoissoinV2(this.state.poissonParameter);
      dataArrayV2.push(poisson2Variable);
    }
    const statsV1 = this.getDataForResults(dataArrayV1);
    const statsV2 = this.getDataForResults(dataArrayV2);
    this.setState({
      dataResultsV1: dataArrayV1,
      statsForResultsV1: statsV1,
      dataResultsV2: dataArrayV2,
      statsForResultsV2: statsV2
    });
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
      medieTeoretica: this.state.poissonParameter,
      dispersieTeoretica: this.state.poissonParameter
    };
    return data;
  };

  handleButtonPoisson = () => {
    this.generateNSamples(this.state.nrMax);
  };

  render() {
    const dataV1 = this.state.statsForResultsV1;
    const dataV2 = this.state.statsForResultsV2;
    return (
      <div style={{ margin: 40 }}>
        <div className='form-group col-sm-6 col-md-offset-6'>
          <div style={styles.container}>
            Introduceti parametrul pentru variabila Poisson (λ):
            <div className='col-sm-4'>
              <TextField
                id='parameter'
                value={this.state.poissonParameter}
                onChange={(e) =>
                  this.setState({ poissonParameter: e.target.value })
                }
              />
            </div>
          </div>

          <div style={styles.container}>
            Introduceti numarul maxim de variabile:
            <div className='col-sm-4'>
              <TextField
                id='maximumNumber'
                value={this.state.nrMax}
                onChange={(e) => this.setState({ nrMax: e.target.value })}
              />
            </div>
          </div>

          <Button
            variant='contained'
            color='primary'
            onClick={this.handleButtonPoisson}
          >
            Genereaza
          </Button>
        </div>

        {this.state.dataResultsV1?.length ? (
          <div style={{ ...styles.container, justifyContent: "center" }}>
            <div style={styles.alignText}>Rezultate pentru algoritmul 1:</div>
            <div className='col-sm-4' style={styles.containerResults}>
              <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                Media de selectie:{" "}
                <span style={{ fontWeight: "normal" }}>
                  {dataV1.medieSelectie.toFixed(5)}
                </span>
              </p>
              <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                Dispersia de selectie:{" "}
                <span style={{ fontWeight: "normal" }}>
                  {dataV1.dispersieSelectie.toFixed(5)}
                </span>
              </p>
              <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                Media teoretica:{" "}
                <span style={{ fontWeight: "normal" }}>
                  {dataV1.medieTeoretica}
                </span>
              </p>
              <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                Dispersia teoretica:{" "}
                <span style={{ fontWeight: "normal" }}>
                  {dataV1.dispersieTeoretica}
                </span>
              </p>
            </div>
            <div className='col-sm-4' style={styles.containerResults}>
              <span
                style={{
                  fontWeight: "bold"
                }}
              >
                Istoric rezultate:
              </span>
              <div style={styles.results}>
                {this.state.dataResultsV1.map((item, index) => (
                  <p key={index} style={{ marginBottom: 3 }}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {this.state.dataResultsV2?.length ? (
          <div style={{ ...styles.container, justifyContent: "center" }}>
            <div style={styles.alignText}>Rezultate pentru algoritmul 2:</div>
            <div className='col-sm-4' style={styles.containerResults}>
              <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                Media de selectie:{" "}
                <span style={{ fontWeight: "normal" }}>
                  {dataV2.medieSelectie.toFixed(5)}
                </span>
              </p>
              <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                Dispersia de selectie:{" "}
                <span style={{ fontWeight: "normal" }}>
                  {dataV2.dispersieSelectie.toFixed(5)}
                </span>
              </p>
              <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                Media teoretica:{" "}
                <span style={{ fontWeight: "normal" }}>
                  {dataV2.medieTeoretica}
                </span>
              </p>
              <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                Dispersia teoretica:{" "}
                <span style={{ fontWeight: "normal" }}>
                  {dataV2.dispersieTeoretica}
                </span>
              </p>
            </div>
            <div className='col-sm-4' style={styles.containerResults}>
              <span
                style={{
                  fontWeight: "bold"
                }}
              >
                Istoric rezultate:
              </span>
              <div style={styles.results}>
                {this.state.dataResultsV2.map((item, index) => (
                  <p key={index} style={{ marginBottom: 3 }}>
                    {item}
                  </p>
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
    height: 220,
    overflow: "auto",
    padding: 5
  },
  containerResults: {
    backgroundColor: "#efefef",
    padding: 10,
    margin: "10px 40px",
    borderRadius: 5,
    boxShadow: "rgb(190 190 190) -1px 2px 14px"
  },
  alignText: {
    marginTop: 50
  }
};
