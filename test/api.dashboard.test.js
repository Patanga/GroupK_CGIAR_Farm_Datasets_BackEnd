// Load testing libraries
const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = require("assert");
const apiUrl = "http://127.0.0.1:8080";

chai.should();
chai.use(chaiHttp);

// Loading sever information
const app = require("../server");
const dashboard = require("../app/models/dashboard.model");

// Loading test data
const testCase = require("../test_data/test_dashboard.json");

//
describe("Get Dashboard_API Data", () => {

  // Before the test, reset data in the database
  before(function (done) {
    dashboard.deleteMany({}, (err) => {
      if (err) {
        console.log("Deleting collection \'dashboard\' failed.")
        console.log(err);
      }
      done();
    });
  });

  before(function (done) {
    //console.log(testCase);
    dashboard.insertMany(testCase, (err,doc) => {
      if (err) {
        console.log("Inserting collection \'dashboard\' failed.")
        console.log(err);
      } else {
        console.log("Inserted successfully " + doc.length + " docs !");
      }
      done();
    });
  });


  it("Works", (done) => {
    chai.request(apiUrl)
      .get("/api/dashboard")
      .end((err, res) => {
        //console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.a("array");

        let result = res.body.filter(
          obj => obj["id_unique"] === "01a38d9dfc65f16aa9defa64abab0d3b"
        );
        assert.equal(result.length, 1);
        assert.equal(result[0]["api_hfias_status"], "severely_fi");

        result = res.body.filter(
          obj => obj["id_unique"] === "0cad497fdb56c3dccbd5f4529ebecf1e"
        );
        assert.equal(result.length, 1);
        assert.equal(result[0]["api_hfias_status"], "moderately_fi");

        done();
      });
  });

});
