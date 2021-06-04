import React, { Component } from 'react';
import CustomSelect from './CustomSelect';
export class HondaData extends Component {
  static displayName = HondaData.name;

  constructor(props) {
    super(props);
    this.state = { Vehicles: [], loading: true,searchValue:"",country:[1] };
    this.Countries = [
        { id:0, value: "",label: "All Countries" },
        {  id:1,value: "United States",label: "United States" },
        {id:2, value: "China", label: "China", },
        { id:3,value: "Japan", label: "Japan" }
      ];
  }

  

  componentDidMount() {
    this.populateHondaData(this.state.searchValue,this.Countries[this.state.country].value);
  }
  
   handleSearchChange = e =>  {
    const value = e.target.value;
    this.setState({
      searchValue: value
    });
    this.populateHondaData(value,this.Countries[this.state.country[0]].value);
  };

  handleCountryChange= e =>{
    
    const value = e;
    console.log("value")
    console.log(value)
    this.setState({
      country: value
    });
    this.populateHondaData(this.state.searchValue,this.Countries[value[0]].value);
  };
  
  

  
  static renderDataTable(Vehicles,searchValue,country,handleSearchChange,handleCountryChange) { 
    const keys = ["name", "wmi", "country", "createdOn", "vehicleType"];

    const Countries = [
        { id:0, value: "",label: "All Countries" },
        {  id:1,value: "United States",label: "United States" },
        {id:2, value: "China", label: "China", },
        { id:3,value: "Japan", label: "Japan" }
      ];


    const getRowsJsx= () => {
        return Vehicles.map((d) => {
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
          <tr>
              <th colSpan="5">
                <div className="ui fluid search">
                  <div className="ui icon input">
                    <input
                      className="prompt"
                      type="text"
                      placeholder="Search Vehicles..."
                      value={searchValue}
                      onChange={handleSearchChange}
                    />
                    <CustomSelect options={Countries}
                      value={country}
                      title={"Country Filter"}
                      onChange={handleCountryChange}
                      isMulti={true}
                     />
                    <i className="search icon" />
                  </div>
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
      : HondaData.renderDataTable(this.state.Vehicles,this.state.searchValue,this.state.country,this.handleSearchChange,this.handleCountryChange);

    return (
      <div>
        <h1 id="tabelLabel" >Honda Data</h1>
        {contents}
      </div>
    );
  }

  async populateHondaData(SearchArg,country) {
    const searchstring='?keysearch='+SearchArg+'&country='+country
    console.log("Start");
    console.log(searchstring);
    const response = await fetch('https://localhost:5001/Honda/Data'+searchstring);
    console.log("data retrieved");
    
    //const data = await response.json();
    const data = await response.json();
    console.log(data.length);
    console.log(data);
    console.log("data finished");
    this.setState({ Vehicles: data, loading: false });
  }
}
