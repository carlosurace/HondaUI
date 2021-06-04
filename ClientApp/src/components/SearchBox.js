import React, { Component } from 'react';

export class HondaData extends Component {
  static displayName = HondaData.name;

  constructor(props) {
    super(props);
    this.state = { text: "", loading: true };
  }

  componentDidMount() {
    this.populateHondaData();
  }
  
  
  

  

  
  static renderDataTable(Vehicles) { 
    const keys = ["name", "wmi", "country", "createdOn", "vehicleType"];
    const getRowsJsx= () => {
        return Vehicles.map((d) => {
        console.log(d);
          const wmi = d.wmi;
          return (
            <tr key={wmi}>
              {keys.map((k) => (
                <td key={`${wmi}-${k}`}>{d[k]}</td>
              ))}
            </tr>
          );
        });
      };
    
    return (
      <div className="App">
        <header>WMI Data - Honda | Total: {Vehicles.length}</header>
        <table>
          <thead>
          <tr
              <th colSpan="5">
                <div className="ui fluid search">
                  <div className="ui icon input">
                    <input
                      className="prompt"
                      type="text"
                      placeholder="Search foods..."
                      value={this.state.searchValue}
                      onChange={this.handleSearchChange}
                    />
                    <i className="search icon" />
                  </div>
                  <i
                    className="remove icon"
                    onClick={this.handleSearchCancel}
                    style={removeIconStyle}
                  />
                </div>
              </th>
            </tr>
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
      : HondaData.renderDataTable(this.state.Vehicles);

    return (
      <div>
        <h1 id="tabelLabel" >Honda Data</h1>
        {contents}
      </div>
    );
  }

}