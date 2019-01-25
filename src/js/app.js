// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);

// //connect to MongoDB
// mongoose.connect("mongodb://localhost/testForAuth");
// const db = mongoose.connection;

// //handle mongo error
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
//   // we're connected!
// });

// //use sessions for tracking logins
// app.use(
//   session({
//     secret: "work hard",
//     resave: true,
//     saveUninitialized: false,
//     store: new MongoStore({
//       mongooseConnection: db
//     })
//   })
// );

// // parse incoming requests
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // serve static files from template
// app.use(express.static(__dirname + "/templateLogReg"));

// // include routes
// const routes = require("./routes/router");
// app.use("/", routes);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   const err = new Error("File Not Found");
//   err.status = 404;
//   next(err);
// });

// // error handler
// // define as the last app.use callback
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.send(err.message);
// });

// // listen on port 3000
// app.listen(3000, function() {
//   console.log("Express app listening on port 3000");
// });

App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",

  init: function() {
    return App.initWeb3();
    // await App.initWeb3()
    // await App.initContract()
    // await App.render()
  },

  // Initialize web3
  // Connects client side app to the local block chain
  // MetaMask is the extension that turns the Chrome browser
  // into a Blockchain browser, that can connect to the Ethereum network
  initWeb3: function() {
    if (typeof web3 !== "undefined") {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  // Initialize contract
  // Loads the contract into the front-end app
  initContract: function() {
    $.getJSON("Voting.json", function(voting) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Voting = TruffleContract(voting);
      // Connect provider created earlier to interact with contract
      App.contracts.Voting.setProvider(App.web3Provider);

      // App.listenForEvents();

      return App.render();
    });
  },

  // Render the contents to the page
  render: function() {
    let votingInstance;
    const loader = $("#loader");
    const content = $("#content");

    loader.show();
    content.hide();

    // Load account data that is connected to the blockchain
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data or the candidates for voting
    App.contracts.Voting.deployed()
      .then(function(instance) {
        votingInstance = instance;
        return votingInstance.candidatesCount();
      })
      .then(function(candidatesCount) {
        const candidatesResults = $("#candidatesResults");
        candidatesResults.empty();

        // Start at one since array index starts with 1
        for (let i = 1; i <= candidatesCount; i++) {
          votingInstance.candidates(i).then(function(candidate) {
            let id = candidate[0];
            let name = candidate[1];
            let voteCount = candidate[2];

            // Render candidate Result
            let candidateTemplate =
              "<tr><th>" +
              id +
              "</th><td>" +
              name +
              "</td><td>" +
              voteCount +
              "</td></tr>";
            candidatesResults.append(candidateTemplate);
          });
        }
        loader.hide();
        content.show();
      });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
