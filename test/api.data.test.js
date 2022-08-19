// Load testing libraries
const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = require("assert");
const apiUrl = "http://127.0.0.1:8080";

chai.should();
chai.use(chaiHttp);

// Loading sever information
const app = require("../server");
const data = require("../app/models/data.model");

// Loading test data
const testData = require("../test_data/test_data");
const testCase = [...testData.indicatorDataList, ...testData.processedDataList];


// Testing whether the server can start.
describe("API ROUTE", () => {
  it("Works", (done) => {
    chai.request(apiUrl)
      .get("/")
      .end((err, res) => {
        //console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eq("Welcome to RHoMIS_Dashboard API application.");
        done();
      });
  });
});

//
describe("Get Data_API Data", () => {

  // Before the test, reset data in the database
  before(function (done) {
    data.deleteMany({}, (err) => {
      if (err) {
        console.log("Deleting collection \'data\' failed.")
        console.log(err);
      }
      done();
    });
  });

  before(function (done) {
    //console.log(testCase);
    data.insertMany(testCase, (err,doc) => {
      if (err) {
        console.log("Inserting collection \'data\' failed.")
        console.log(err);
      } else {
        console.log("Inserted successfully " + doc.length + " docs !");
      }
      done();
    });
  });


  it("Works", (done) => {
    chai.request(apiUrl)
      .get("/api/data/all_pages")
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
