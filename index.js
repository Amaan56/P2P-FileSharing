//Required modules
const ipfsAPI = require('ipfs-api');
const express = require('express');
const encryptor = require('file-encryptor');
const fs = require('fs');
const app = express();
const cors = require('cors');
var multer = require('multer');
const deploy = require('./deploy');

var bodyParser = require('body-parser');

var filesHash = [];
var i = 1;
// var pb = 'MDwwDQYJKoZIhvcNAQEBBQADKwAwKAIhAIK3rvYgNW9qfWjLcjxqL9lmpLMhrQ18Ot6n4vvTnbfVAgMBAAE=';
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var firebase = require('firebase');
const publicKeyList = [
  'MDwwDQYJKoZIhvcNAQEBBQADKwAwKAIhAN1tUEKdQMWX6TJyelnYbMGCUPIXr3Il0hnsrxi6zhkjAgMBAAE=',
  'MDwwDQYJKoZIhvcNAQEBBQADKwAwKAIhAIK3rvYgNW9qfWjLcjxqL9lmpLMhrQ18Ot6n4vvTnbfVAgMBAAE=',
  'MDswDQYJKoZIhvcNAQEBBQADKgAwJwIgdfkpFObi5hq8kihQO9g6F5mkPAh1iqPdtTkuqdMrDa8CAwEAAQ==',
  'MDwwDQYJKoZIhvcNAQEBBQADKwAwKAIhAPCVpgFZ6Ti2uoC7gkK0Yp4Nnr9TdqyhYg65W747Nkq9AgMBAAE='
];

var config = {
  apiKey: 'AIzaSyColXbH6iOsfMIH40e-2K1k8rV-217gpxU',
  authDomain: 'tsec-7e3d9.firebaseapp.com',
  databaseURL: 'https://tsec-7e3d9.firebaseio.com',
  projectId: 'tsec-7e3d9',
  storageBucket: 'tsec-7e3d9.appspot.com',
  messagingSenderId: '628828806107'
};

firebase.initializeApp(config);

var database = firebase.database();
var ref = database.ref('StoredFileData');
var fileRef = ref.child(publicKeyList[0]).child('files')

var index = 0;
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    // cb(null, `${Date.now()}${path.extname(file.originalname)}`); //Appending extension
    cb(null, file.originalname);
  }
});

var upload = multer({ storage });
app.use(cors());
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));

var options = { algorithm: 'aes256' };

//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' });

//Reading file from computer
// let testFile = fs.readFileSync("/home/dhanesh/filesec_backend/package.json");
// //Creating buffer for ipfs function to add file to the system
// let testBuffer = new Buffer(testFile);

app.get('/s', (res, err) => {
  encryptor.encryptFile(
    __dirname + '\\uploads\\' + '1.png',
    __dirname + '\\uploads\\' + 'enc.png',
    'my secret key',
    options,
    err => {}
  );
  res.send(JSON.stringify('success'));
});
app.get('/d', (req, res, err) => {
  encryptor.decryptFile(
    __dirname + '\\uploads\\' + 'enc.png',
    __dirname + '\\uploads\\' + '1.png',
    'my secret key',
    options,
    err => {}
  );
  res.send(JSON.stringify('success'));
});

//Addfile router for adding file a local file to the IPFS network without any local node
app.get('/addfile', function(req, res) {
  ipfs.files.add(testBuffer, function(err, file) {
    if (err) {
      console.log(err);
    }
    console.log(file);
    res.status(200).send('File added successfully');
  });
});

app.post('/files', upload.array('img', 12), async (req, res) => {
  console.log(req.body);
  for (let i = 0; i < req.files.length; i++) {
    var hash;
    const key = 'my secret key';
    await encryptor.encryptFile(
      __dirname + '\\uploads\\' + req.files[i].filename,
      __dirname + '\\uploads\\' + 'enc' + i + '.dat',
      key,
      options,
      err => {}
    );
    let testBuffer = new Buffer(
      await fs.readFileSync(__dirname + '\\uploads\\' + req.files[i].filename)
    );
    await ipfs.files.add(testBuffer, async (err, file) => {
      if (err) {
        console.log(err);
      }
      console.log(file);
      hash = file[0].hash;
      filesHash.push(hash);
      var id = uuidv4();
      fileRef.child(id).set({
        hashId: await deploy.dep(
          hash,
          'QmTgQcBLDHdA5dfeRS1YSgj7i5mzKg4CFb2DvRQMmeSExb',
          req.body.extra
        ),
        sender: 'dhanesh',
        id: id
      });
    });
  }
  res.status(200).send();
});

//Getting the uploaded file via hash code.
app.get('/getfile', function(req, res) {
  //This hash is returned hash of addFile router.
  var d = 'QmQWdizL7gmzLFait4AApifnzZvgbXjghHRmE6b9UeX5Ry'; // image2
  var c = 'QmTgQcBLDHdA5dfeRS1YSgj7i5mzKg4CFb2DvRQMmeSExb'; // image
  var b = 'QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH'; // dat file
  var a = 'QmRK7HvEywicCxApJWy3cmqdwTFXw8od2259UfzUVGv7PD'; // json
  const validCID = c;

  ipfs.files.get(validCID, function(err, files) {
    files.forEach(file => {
      console.log(file.path);
      console.log(file.content.toString('utf8'));
      fs.writeFile('helloworld.png', file, function(err) {
        if (err) return console.log(err);
      });
      res.status(200).send(file.content.toString('utf8'));
    });
  });
});

//To get data from Firebase
app.get('/get', function(req, res) {
  ref.on(
    'value',
    function(snapshot) {
      var data = snapshot.val();
      console.log(data);

      res.send(JSON.stringify(data));
    },
    function(errorObject) {
      console.log('The read failed: ' + errorObject.code);
    }
  );
});

// app.get('/hashId',function(req,res){

// })
//To post data to firebase
app.post('/post', function(req, res) {
  console.log(req.body);
  // var fileRef = ref.child(publicKeyList[1]).child('files');
  // // files = {
  //   senderId: 'CCC',
  //   filesHash: [
  //     {
  //       hashID: 'aaa',
  //       extension: '.jpg'
  //     },
  //     {
  //       hashID: 'aaa',
  //       extension: '.jpg'
  //     }
  //   ]
  // };

  ref.child(publicKeyList[i]).set({
    userId: req.body.userId,
    userName: req.body.userName,
    password: req.body.password,
    userPublicKey: publicKeyList[i]
  });

  //var file_id = fileRef.push().key;

  // fileRef.set(files);

  res.send('Success');
});

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

app.listen(1337, () => console.log('App listening on port 1337!'));
