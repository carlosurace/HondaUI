import React from 'react';
import { Row, Col, Table } from 'reactstrap';

const Weather = (props) => {
  const { data } = props;
  const keys = ["name", "wmi", "country", "createdOn", "vehicleType"];
  const getRowsJsx= () => {
    return data.map((d) => {
      const wmi = d.wmi;
      return (
        <tr key={wmi}>
          {keys.map((k) => (
            <td className="data-cell" key={`${wmi}-${k}`}>{d[k]}</td>
          ))}
        </tr>
      );
    });
  };

  if (!data)
    return <div></div>;

  return (
    <Row className="weather">
      <Col>
        <Table className="DataTable">
          <thead>
          <tr>
          {keys.map((k) => (
            <th key={k}>{k}</th>
          ))}
          </tr>
          </thead>
          <tbody>
        {getRowsJsx()}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default Weather;