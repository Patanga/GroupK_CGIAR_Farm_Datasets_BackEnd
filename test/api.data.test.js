// Load testing libraries
const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = require("assert");
const apiUrl = "http://127.0.0.1:8080";

chai.should();
chai.use(chaiHttp);

// Loading sever information
const app = require("../server");

//
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



