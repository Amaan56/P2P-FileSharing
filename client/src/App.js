import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import _ from 'lodash';
import ViewForm from './ViewForm';
import Axios from 'axios';

import './App.css';
import './login/css/main.css';
import './login/css/util.css';
import './login/vendor/select2/select2.min.css';
import './login/vendor/css-hamburgers/hamburgers.min.css';
import './login/vendor/animate/animate.css';
import './login/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './login/vendor/bootstrap/css/bootstrap.min.css';

const BASE_URL = 'http://localhost:1337';

const publicKeyList = [
  'MDwwDQYJKoZIhvcNAQEBBQADKwAwKAIhAN1tUEKdQMWX6TJyelnYbMGCUPIXr3Il0hnsrxi6zhkjAgMBAAE=',
  'MDwwDQYJKoZIhvcNAQEBBQADKwAwKAIhAIK3rvYgNW9qfWjLcjxqL9lmpLMhrQ18Ot6n4vvTnbfVAgMBAAE=',
  'MDswDQYJKoZIhvcNAQEBBQADKgAwJwIgdfkpFObi5hq8kihQO9g6F5mkPAh1iqPdtTkuqdMrDa8CAwEAAQ==',
  'MDwwDQYJKoZIhvcNAQEBBQADKwAwKAIhAPCVpgFZ6Ti2uoC7gkK0Yp4Nnr9TdqyhYg65W747Nkq9AgMBAAE='
];

const vari = [
  {
    password: 'dk',
    userId: '234',
    userName: 'Dhanesh Katre',
    userPublicKey:
      'MDwwDQYJKoZIhvcNAQEBBQADKwAwKAIhAIK3rvYgNW9qfWjLcjxqL9lmpLMhrQ18Ot6n4vvTnbfVAgMBAAE='
  },
  {
    password: '123',
    userId: '1288',
    userName: 'anurag',
    userPublicKey:
      'MDwwDQYJKoZIhvcNAQEBBQADKwAwKAIhAN1tUEKdQMWX6TJyelnYbMGCUPIXr3Il0hnsrxi6zhkjAgMBAAE='
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      searchTerm: '',
      id: '',
      files: [],
      showIcon: false,
      searchOrview: 'search',
      isAuthenticated: false,
      password: '',
      userName: '',
      userId: '',
      accAddr: '',
      viewFiles: [],
      publ:
        'MDwwDQYJKoZIhvcNAQEBBQADKwAwKAIhAIK3rvYgNW9qfWjLcjxqL9lmpLMhrQ18Ot6n4vvTnbfVAgMBAAE='
    };
  }
  fullNameChanged(e) {
    this.setState({
      fullname: e.target.value
    });
  }
  emailChanged(e) {
    this.setState({
      email: e.target.value
    });
  }
  idChanged(e) {
    this.setState({
      id: e.target.value
    });
  }
  passwordChanged(e) {
    this.setState({
      password: e.target.value
    });
  }
  onLoginButtonPressed(e) {
    e.preventDefault();
    let data = {
      userId: this.state.id,
      userName: this.state.fullname,
      password: this.state.password
    };
    Axios.post(`${BASE_URL}/post`, data)
      .then(res => {
        if (res.status === 200) this.setState({ isAuthenticated: true });
      })
      .catch(err => {
        if (err) throw err;
      });
  }
  getLoginForm() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src={require('./login/images/img-01.png')} alt="IMG" />
            </div>
            <form className="login100-form validate-form">
              <span className="login100-form-title">USER REGISTRATION</span>

              <div className="wrap-input100 validate-input">
                <div className="w3-col" style={{ width: '20px' }}>
                  <span className="symbol-input100" style={{ width: '20px' }}>
                    <i className="fa fa-user w3-col s3" aria-hidden="true" />
                  </span>
                  <span className="focus-input100" />
                </div>
                <div className="w3-rest">
                  <input
                    className="input100 s9 w3-rest"
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    onChange={this.fullNameChanged.bind(this)}
                    value={this.state.fullname}
                    style={{ paddingLeft: '55px' }}
                  />
                </div>
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100"
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={this.emailChanged.bind(this)}
                  value={this.state.email}
                  style={{ paddingLeft: '55px' }}
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true" />
                </span>
              </div>

              <div className="wrap-input100 validate-input">
                <input
                  className="input100"
                  type="text"
                  name="User_Id"
                  placeholder="User id"
                  onChange={this.idChanged.bind(this)}
                  value={this.state.id}
                  style={{ paddingLeft: '55px' }}
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-id-card" aria-hidden="true" />
                </span>
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required!"
              >
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Password"
                  onChange={this.passwordChanged.bind(this)}
                  value={this.state.password}
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true" />
                </span>
              </div>

              <div className="container-login100-form-btn">
                <button
                  type="submit"
                  className="login100-form-btn"
                  onClick={this.onLoginButtonPressed.bind(this)}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  onSearchChanged(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  onSearchClicked() {
    var res = _.find(vari, { userId: this.state.searchTerm });
    console.log(res);
    if (res == null) {
      alert('User not found!');
    } else {
      this.setState({
        userName: res.userName,
        userId: res.userId,
        accAddr: res.userPublicKey,
        showIcon: true
      });
    }
  }

  getSearchForm() {
    return (
      <div>
        <div className="limiter">
          <div className="container-login100">
            <center>
              <h2 style={{ color: '#fff', marginBottom: '-20px' }}>
                Your files are end-to-end encrypted!
              </h2>
            </center>
            <div className="mainInfo">
              <div className="w3-row">
                <div className="wrap-input100 validate-input w3-col s9">
                  <input
                    value={this.state.searchTerm}
                    onChange={this.onSearchChanged.bind(this)}
                    className="input100"
                    type="text"
                    name="search"
                    placeholder="Search"
                  />
                  <span className="focus-input100" />
                </div>
                <div
                  className="container-login100-form-btn w3-col s3 w3-rest"
                  style={{ padding: '10px' }}
                >
                  <button
                    onClick={this.onSearchClicked.bind(this)}
                    className="login100-form-btn"
                  >
                    Search
                  </button>
                </div>
              </div>
              <div>
                <span>
                  <i className="fa fa-user" aria-hidden="true" />
                </span>
                <label id="username" style={{ paddingLeft: '6px' }}>
                  Username:
                </label>
                <label id="username" style={{ paddingLeft: '8px' }}>
                  {this.state.userName}&nbsp;&nbsp;
                  {this.state.showIcon ? (
                    <span>
                      <i
                        className="fa fa-check-circle"
                        aria-hidden="true"
                        style={{ color: 'green' }}
                      />
                    </span>
                  ) : (
                    <div />
                  )}
                </label>
                <br />
                <span>
                  <i className="fa fa-id-card" aria-hidden="true" />
                </span>
                <label id="username" style={{ paddingLeft: '6px' }}>
                  User ID:
                </label>
                <label id="username" style={{ paddingLeft: '8px' }}>
                  {this.state.userId}
                </label>
                <br />
                <span>
                  <i className="fas fa-wallet" aria-hidden="true" />
                </span>
                <label id="username" style={{ paddingLeft: '6px' }}>
                  Account Address:
                </label>
                <label id="username" style={{ paddingLeft: '8px' }}>
                  {this.state.accAddr}&nbsp;&nbsp;
                  {this.state.showIcon ? (
                    <span>
                      <i
                        className="fa fa-check-circle"
                        aria-hidden="true"
                        style={{ color: 'green' }}
                      />
                    </span>
                  ) : (
                    <div />
                  )}
                </label>
                <br />

                <form onSubmit={this.onUploadClicked.bind(this)} id="myForm">
                  <div
                    className="w3-row"
                    style={{
                      display: 'flex',
                      marginTop: '20px',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <div className="w3-col w3-container s3">
                      <input
                        id="fils"
                        style={{ marginTop: '10px' }}
                        type="file"
                        name="img"
                        onChange={this.showFiles.bind(this)}
                        multiple
                      />
                    </div>
                    <div className="w3-col w3-container s3">
                      <button
                        className="login100-form-btn"
                        onClick={this.onViewButtonClicked.bind(this)}
                      >
                        View Files
                      </button>
                    </div>
                    <div className="w3-col w3-container s3">
                      <button type="submit" className="login100-form-btn">
                        UPLOAD
                      </button>
                    </div>
                  </div>
                </form>
                <div>{this.renderFiles()}</div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
  onViewButtonClicked() {
    this.setState({
      searchOrview: 'view'
    });
  }
  showFiles(e) {
    this.setState({ files: e.target.files });
  }
  onUploadClicked(e) {
    if (document.getElementById('fils').value == '') {
      alert('Select file to upload!');
      return;
    }
    e.preventDefault();
    let formData = new FormData();
    _.forEach(this.state.files, file => {
      formData.append('img', file);
    });
    formData.append('extra', this.state.accAddr);
    console.log(formData);
    Axios.post(`${BASE_URL}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(function() {
        alert('SUCCESS!');
        document.getElementById('fils').value = '';
        this.setState({
          files: []
        });
      })
      .catch(function(err) {});
  }

  renderFiles() {
    let files = [];
    if (_.isEmpty(this.state.files)) return <div />;
    else {
      _.map(this.state.files, (value, key) => {
        switch (
          value.name
            .toString()
            .substring(value.name.toString().indexOf('.') + 1)
        ) {
          case 'png':
            files.push(
              <Card
                key={key}
                style={{ padding: '4px', width: '100%', margin: '10px' }}
              >
                <div className="w3-row">
                  <div className="w3-col   s2">
                    <img src={require('./icons/jpg.png')} height="80px" />
                  </div>
                  <div className="w3-col s4" style={{ paddingTop: '25px' }}>
                    <h5>{value.name}</h5>
                  </div>
                </div>
              </Card>
            );
        }
      });
      return files;
    }
  }

  render() {
    if (this.state.isAuthenticated) {
      if (this.state.searchOrview === 'search') return this.getSearchForm();
      else return <ViewForm />;
    } else return this.getLoginForm();
  }
}

export default App;
