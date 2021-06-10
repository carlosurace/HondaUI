import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import { HondaData } from './components/HondaData';
import Weather from './components/New';
import 
{
    Container,
    Navbar,
    NavbarBrand,
    Jumbotron,
    Row,
    Col,
    InputGroup,
    Input,
    InputGroupAddon,
    Button,
    FormGroup
 } from 'reactstrap';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.state = { Vehicles: [], loading: true,searchValue:"",country:"" };
    this.Countries = [
        { id:0, value: "",label: "All Countries" },
        {  id:1,value: "United States",label: "United States" },
        {id:2, value: "China", label: "China", },
        { id:3,value: "Japan", label: "Japan" }
      ];
  }
  componentDidMount () {
    this.setState({ searchValue: ""});
    this.getdata();
  }

  handleSearchChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  handleFilterData = () => {
    this.getdata();
  };

  handleChangeCountry = (e) => {
    //this.setState({ country: e.target.value },)
    //.then(country =>);

    this.setState({ country: e.target.value },
      () => {
        this.getdata();
      }
      );
    
  }
  

  getdata = () =>
  {
    const SearchArg=this.state.searchValue;
    const country=this.state.country;
    const searchstring=`?keysearch=${SearchArg}&country=${country}`;
    const response = fetch('https://localhost:5001/Honda/Data'+searchstring)
    .then(data => data.json())
    .then(data => data.sort((a, b) =>{
      let retval = 0;
        if (a.createdOn > b.createdOn)
          retval = 1;
        if (a.createdOn < b.createdOn)
          retval = -1;
        if (retval === 0)
          retval = a.wmi < b.wmi ? -1 : 1;
        return retval;
    }))
    .then(data => this.setState({ Vehicles: data, loading: false }));
  }

  render () {
    return (
      <Container className="centered">
        <Navbar dark color="dark">
          <NavbarBrand href="/">React .NET App Test</NavbarBrand>
        </Navbar>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">HondaData</h1>
              <p className="lead">Query this random Honda data for no reason!</p>
              <InputGroup>
                <Input 
                  placeholder="Search a keyword..."
                  value={this.state.searchValue}
                  onChange={this.handleSearchChange}
                />
                <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={this.handleFilterData}>Filter Data</Button>
                </InputGroupAddon>
                
              </InputGroup>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-5">Current Data</h1>
            <FormGroup>
              <Input type="select" onChange={this.handleChangeCountry}>
                { this.Countries === 0 && <option>No cities added yet.</option> }
                { this.Countries > 0 && <option>Select a city.</option> }
                { this.Countries.map(country => <option key={country.id} value={country.value} label={country.label}></option>) }
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Weather className="DataTable" data={this.state.Vehicles}/>
      </Container>
    );
  }
}
