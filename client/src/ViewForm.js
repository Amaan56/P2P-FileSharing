import React, { Component } from 'react';
import _ from 'lodash';
import Axios from 'axios';
import { Card, Button } from '@material-ui/core';
import web3 from './web3';

const BASE_URL = 'http://localhost:1337';
const abi = [
  {
    constant: true,
    inputs: [],
    name: 'decryptionKey',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'ipfsHash',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'reciever',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { name: 'initialIpfsHash', type: 'string' },
      { name: 'initialDecryptionKey', type: 'string' },
      { name: 'Reciever', type: 'string' }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  }
];

class ViewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      publ:
        'MDwwDQYJKoZIhvcNAQEBBQADKwAwKAIhAN1tUEKdQMWX6TJyelnYbMGCUPIXr3Il0hnsrxi6zhkjAgMBAAE='
    };
  }
  componentDidMount() {
    let arr = [];
    Axios.get(`${BASE_URL}/get`)
      .then(res => {
        console.log(res);
        _.forEach(res.data[this.state.publ]['files'], file => {
          arr.push(file);
        });
        this.setState({
          list: arr
        });
      })
      .catch(err => {
        if (err) alert(err.message);
      });
  }

  async buttonClicked(value) {
    const localContract = new web3.eth.Contract(abi, value.hashId);
    const hash = await localContract.methods.ipfsHash().call();
    window.open('https://gateway.ipfs.io/ipfs/' + hash);
  }

  getData() {
    if (_.isEmpty(this.state.list)) return <img src={require('./inf.gif')} />;
    else {
      let arr = [];
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      today = dd + '/' + mm + '/' + yyyy;
      _.map(this.state.list, (value, key) => {
        arr.push(
          <Card
            key={key}
            style={{
              padding: '20px',
              width: '100%',
              marginBottom: '10px',
              borderRadius: '10px'
            }}
          >
            <div className="w3-row">
              <div className="w3-col s9">
                <h5>{`Sender: ${value.sender}`}</h5>
                <h5>{`Transaction ID: ${value.hashId}`}</h5>
                <h5>{`Date: ${today}`}</h5>
              </div>
              <div className="w3-col s3">
                <button
                  style={{ marginTop: '25px' }}
                  className="login100-form-btn"
                  variant="contained"
                  onClick={() => this.buttonClicked(value)}
                >
                  ATTACHMENT
                </button>
              </div>
            </div>
          </Card>
        );
      });
      return arr;
    }
  }
  render() {
    return (
      <div className="limiter">
        {/* <center>
          <h2 style={{ color: '#fff' }}>Received Files</h2>
        </center> */}
        <div className="container-login100">
          <div style={{ marginTop: '20px' }}>{this.getData()}</div>
        </div>
      </div>
    );
  }
}
export default ViewForm;
