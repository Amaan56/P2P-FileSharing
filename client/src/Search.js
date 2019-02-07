import React, { Component } from 'react'
import { Card, Button } from '@material-ui/core'
import _ from 'lodash';
import Axios from 'axios';

import './App.css';
import './login/css/main.css';
import './login/css/util.css';
import './login/vendor/select2/select2.min.css';
import './login/vendor/css-hamburgers/hamburgers.min.css';
import './login/vendor/animate/animate.css';
import './login/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './login/vendor/bootstrap/css/bootstrap.min.css';

const BASE_URL = 'http://192.168.31.31:1337';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      id: '',
      files: [],
      isAuthenticated: false,
      password: ''
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
    })
  }
  idChanged(e) {
    this.setState({
      id: e.target.value
    })
  }
  passwordChanged(e) {
    this.setState({
      password: e.target.value
    })
  }
  onLoginButtonPressed(e) {
    e.preventDefault();
    let data = {
      "userId": this.state.id,
      "userName": this.state.fullname,
      "password": this.state.password
    }
    Axios.post(`${BASE_URL}/post`, data).then(res => {
      if (res.status === 200) this.setState({ isAuthenticated: true });
    }).catch(err => {
      if (err) throw err;
    });
  }
  getLoginForm() {
    return (<div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={require('./login/images/img-01.png')} alt="IMG" />
          </div>

          <form className="login100-form validate-form">
            <span className="login100-form-title">
              USER REGISTRATION
                </span>
            <div className="wrap-input100 validate-input" >
              <input className="input100" type="text" name="fullname" placeholder="Full Name" onChange={this.fullNameChanged.bind(this)} value={this.state.fullname} />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-user" aria-hidden="true"></i>
              </span>
            </div>
            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
              <input className="input100" type="text" name="email" placeholder="Email" onChange={this.emailChanged.bind(this)} value={this.state.email} />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div className="wrap-input100 validate-input">
              <input className="input100" type="text" name="User_Id" placeholder="User id" onChange={this.idChanged.bind(this)} value={this.state.id} />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-id-card" aria-hidden="true"></i>
              </span>
            </div>

            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input className="input100" type="password" name="pass" placeholder="Password" onChange={this.passwordChanged.bind(this)} value={this.state.password} />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>
            <div className="container-login100-form-btn">
              <button
                type='submit'
                className="login100-form-btn"
                onClick={this.onLoginButtonPressed.bind(this)}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>);
  }

  getForm() {
    return(
      <div className="limiter">
        <div className="container-login100">
          <div className="mainInfo">
            <div className="wrap-input100" >
              <input className="input100" type="text" name="search" placeholder="Search" />
            </div>
            <div className="container-login100-form-btn">
              <button className="login100-form-btn">
                Search
              </button>
            </div>
            <div className="w3-row">
              <div style={{margin: '20px', width: '250px' }} className="w3-col w3-left">
                <span>
                  <i className="fa fa-user" aria-hidden="true"></i>
                </span>&nbsp;&nbsp;&nbsp;
                <label id="username">Username:&nbsp;</label>
                <label id="username">UsernameVal</label>
                <br />
                <span>
                  <i className="fa fa-id-card" aria-hidden="true"></i>
                </span>&nbsp;&nbsp;&nbsp;
                <label id="username">Fullname:&nbsp;</label>
                <label id="username">FullnameVal</label>
                <br />
                <span>
                  <i className="fas fa-wallet" aria-hidden="true"></i>
                </span>&nbsp;&nbsp;&nbsp;
                <label id="username">Account Address:&nbsp;</label>
                <label id="username">AddressVal</label>
                <br />
              </div>
              <div style={{width: '100%'}} className="w3-col w3-rest w3-container w3-right">
                <div className="w3-row">
                  <div className="w3-col w3-right w3-container">
                    <button
                      type="submit"
                      classNameName="login100-form-btn">
                        UPLOAD
                    </button>
                  </div>
                  <div className="w3-col w3-rest w3-container">
                    <input type="file" name="img" onChange={this.showFiles.bind(this)} multiple />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getSearchForm() {
    return (
      <div>
        <div className="limiter">
          <div className="container-login100">
            <div className="mainInfo">
            <div className="w3-row">
            <div className="wrap-input100 validate-input w3-col s9" >
                <input className="input100" type="text" name="search" placeholder="Search" />
                <span className="focus-input100"></span>
              </div>
              <div className="container-login100-form-btn w3-col s3 w3-rest" style={{padding: '10px'}}>
                <button className="login100-form-btn">
                  Search
                </button>
              </div>
            </div>
              <div>
                <span>
                  <i className="fa fa-user" aria-hidden="true"></i>
                </span>
                <label id="username">Username:</label>
                <label id="username">UsernameVal</label>
                <br />
                <span>
                  <i className="fa fa-id-card" aria-hidden="true"></i>
                </span>

                <label id="username">Fullname:</label>
                <label id="username">FullnameVal</label>
                <br />
                <span>
                  <i className="fas fa-wallet" aria-hidden="true"></i>
                </span>
                <label id="username">Account Address:</label>
                <label id="username">AddressVal</label>
                <br />
                <br />
                <div classNameName="w3-row container-login10" style={{float: "right"}}>
                  <form onSubmit={this.onUploadClicked.bind(this)}>
                      <div className="column2">
                        <input
                        className="login100-form-btn"
                          type="file" name="img" onChange={this.showFiles.bind(this)} multiple></input>
                      </div>
                      <div className="column2">
                        <button
                          type="submit"
                          className="login100-form-btn">
                          UPLOAD
                        </button>
                        </div>
                    </form>
                  {/* <div className="container-login100-form-btn column">
                    <input
                      classNameName="login100-form-btn"
                      type="file" name="img" onChange={this.showFiles.bind(this)} multiple></input>
                  </div>
                  <div classNameName="login20-form-btn">
                  <button
                    type="submit"
                    classNameName="login100-form-btn">
                      UPLOAD
                    </button></div> */}
                </div>
                <div>{this.renderFiles()}</div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // getMainForm() {
  //   return (
  //     <div>
  //       {/* <header>
  //         <div className="logo">
  //           <h1>File Sharing</h1>
  //         </div>
  //         <nav>
  //           <div className="topnav" id="mnav"> 
  //             <a href="addBook.html">Upload Files</a>
  //             <a href="viewBook.html">View Files</a>
  //             <a href="javascript:void(0);" className="flr" onclick="signOut()">LOGOUT</a>
  //             <a href="javascript:void(0);" className="icon" onclick="fun()">&#9776;</a>
  //           </div>
  //         </nav>
  //       </header> */}
  //       <div classNameName="limiter" >
  //         <div className="container-login100">
  //           <div className="wrap-login100">
  //             <center>
  //               <div className="w3-col">
                  // <form onSubmit={this.onUploadClicked.bind(this)}>
                  //   <div className="wrap-input100 validate-input" >
                  //     <input
                  //       className="login100-form-btn"
                  //       type="file" name="img" onChange={this.showFiles.bind(this)} multiple></input>
                  //   </div>
                  //   <div>{this.renderFiles()}</div>
                  //   <button
                  //     type="submit"
                  //     className="login100-form-btn">
                  //     UPLOAD
                  //   </button>
                  // </form>
  //               </div>
  //             </center>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  // getSharedFiles() {
  //   Axios.
  // }
  showFiles(e) {
    this.setState({ files: e.target.files });
  }
  onUploadClicked(e) {
    e.preventDefault();
    let formData = new FormData();
    _.forEach(this.state.files, file => {
      formData.append('img', file);
    });
    console.log(formData);
    Axios.post(`${BASE_URL}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function () {
      alert('SUCCESS!');
    }).catch(function (err) {
      alert(err);
    });
  }


  renderFiles() {
    let files = []
    if (_.isEmpty(this.state.files)) return <div></div>;
    else {
      _.map(this.state.files, (value, key) => {
        switch (value.name.toString().substring(value.name.toString().indexOf(".") + 1)) {
          case 'png':
            files.push(
              <Card key={key} style={{ padding: '4px', width: '100%', margin: '10px' }}>
                <div className="w3-row">
                  <div className="w3-col   s2">
                    <img src={require("./icons/jpg.png")} height="80px" />
                  </div>
                  <div className="w3-col s10 w3-rest" style={{paddingTop: '25px'}}>
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
    return (this.state.isAuthenticated) ?
      this.getMainForm()
      : this.getSearchForm();
  }
}

export default App;
