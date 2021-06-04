import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populateHondaData();
  }
  static keys = ["Name", "WMI", "Country", "CreatedOn", "VehicleType"];

  static getRowsJsx = (data) => {
    return data.map((d) => {
      const wmi = d.WMI;
      return (
        <tr key={wmi}>
          {keys.map((k) => (
            <td key={`${wmi}-${k}`}>{d[k]}</td>
          ))}
        </tr>
      );
    });
  };

  

  
  static renderDataTable(forecasts) {
    return (
      <div className="App">
        <header>WMI Data - Honda | Total: {data.length}</header>
        <table>
          <thead>
            <tr>
              {keys.map((k) => (
                <th key={k}>{k}</th>
              ))}
            </tr>
          </thead>
          <tbody>{getRowsJsx()}</tbody>
        </table>
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderDataTable(this.state.Vehicles);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateHondaData() {
    const response = await fetch(process.env.HONDA_API);
    const data = await response.json();
    this.setState({ Vehicles: data, loading: false });
  }
}
