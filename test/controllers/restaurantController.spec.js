const mocha = require("mocha");
const chai = require("chai");
const mongoose = require("mongoose");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const restaurantController = require("../../controllers/restaurantController");

const expect = chai.expect;
chai.use(sinonChai);

describe("restaurantController", () => {
  // findAll
  describe("findAll", () => {
    const sandbox = sinon.createSandbox();
    afterEach(function () {
      sinon.restore();
      sandbox.restore();
    });

    const statusJsonSpy = sinon.spy();

    const req = {
      params: {
        query: "Bistro",
      },
    };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returns({ json: statusJsonSpy }),
    };

    it("should return the models if found", async () => {
      const mockFindAll = {
        find: function () {
          return this;
        },
        sort: function () {
          return Promise.resolve("success");
        },
      };
      mongoose.Model.find = mockFindAll.find;
      mongoose.Model.sort = mockFindAll.sort;
      await restaurantController.findAll(req, res);
      expect(res.json).to.have.been.calledWith("success");
    });

    it("should return an error message if an error occurs", async () => {
      const mockFindAll = {
        find: function () {
          return this;
        },
        sort: function () {
          return Promise.reject("error message");
        },
      };
      mongoose.Model.find = mockFindAll.find;
      mongoose.Model.sort = mockFindAll.sort;
      await restaurantController.findAll(req, res);
      await console.log("---"); // to delay
      expect(res.status).to.have.been.calledWith(422);
      expect(statusJsonSpy).to.have.been.calledWith("error message");
    });
  });

  // FindById
  describe("findById", () => {
    const sandbox = sinon.createSandbox();
    afterEach(function () {
      sinon.restore();
      sandbox.restore();
    });

    const statusJsonSpy = sinon.spy();

    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returns({ json: statusJsonSpy }),
    };

    it("should return a model if found", async () => {
      // Arrange
      mongoose.Model.findById = sandbox
        .stub()
        .returns(Promise.resolve("resolved"));

      // Act
      await restaurantController.findById(req, res);

      // Assert
      // Is res.json called and passed the string from the Promise.resolve above?
      expect(res.json).to.have.been.calledWith("resolved");
    });
    it("should return an error message if an error occurs", async () => {
      // Arrange
      mongoose.Model.findById = sandbox
        .stub()
        .returns(Promise.reject("error message"));

      // Act
      await restaurantController.findById(req, res);
      await console.log("---"); //adding this to delay the logging

      // Assert
      expect(res.status).to.have.been.calledWith(422);
      expect(statusJsonSpy).to.have.been.calledWith("error message");
    });
  });

  // Create
  describe("create", () => {
    const sandbox = sinon.createSandbox();
    afterEach(function () {
      sinon.restore();
      sandbox.restore();
    });

    const statusJsonSpy = sinon.spy();

    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returns({ json: statusJsonSpy }),
    };

    it("should return the new model if created", async () => {
      // Arrange
      mongoose.Model.create = sandbox
        .stub()
        .returns(Promise.resolve("new model"));
      // Act
      await restaurantController.create(req, res);
      // Assert
      expect(res.json).to.have.been.calledWith("new model");
    });

    it("should return an error message if an error occurs", async () => {
      // Arrange
      mongoose.Model.create = sandbox
        .stub()
        .returns(Promise.reject("error message"));
      // Act
      await restaurantController.create(req, res);
      await console.log("---"); //adding this to delay the logging
      // Assert
      expect(res.status).to.have.been.calledWith(422);
      expect(statusJsonSpy).to.have.been.calledWith("error message");
    });
  });

  // Update
  describe("update", () => {
    const sandbox = sinon.createSandbox();
    afterEach(function () {
      sinon.restore();
      sandbox.restore();
    });

    const statusJsonSpy = sinon.spy();
    const dbRemove = sinon.spy();

    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returns({ json: statusJsonSpy }),
    };

    it("should return the updated model", async () => {
      mongoose.Model.findOneAndUpdate = sandbox
        .stub()
        .returns(Promise.resolve("updated model"));

      await restaurantController.update(req, res);
      expect(res.json).to.have.been.calledWith("updated model");
    });

    it("should return an error message if an error occurs", async () => {
      mongoose.Model.findOneAndUpdate = sandbox
        .stub()
        .returns(Promise.reject("error message"));

      await restaurantController.update(req, res);
      await console.log("---"); // delay
      expect(res.status).to.have.been.calledWith(422);
      expect(statusJsonSpy).to.have.been.calledWith("error message");
    });
  });

  // Remove
  describe("remove", () => {
    const sandbox = sinon.createSandbox();
    afterEach(function () {
      sinon.restore();
      sandbox.restore();
    });

    const statusJsonSpy = sinon.spy();
    const dbRemove = sinon.spy();

    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returns({ json: statusJsonSpy }),
    };

    it("findByIdAndRemove", async () => {
      mongoose.Model.findByIdAndRemove = sandbox
        .stub()
        .returns(Promise.resolve({ success: true }));

      await restaurantController.remove(req, res);
      expect(res.json).to.have.been.calledWith({ success: true });
    });

    it("should return an error message if an error occurs", async () => {
      const err = {
        message: "error message",
      };
      mongoose.Model.findByIdAndRemove = sandbox
        .stub()
        .returns(Promise.reject({ err }));

      await restaurantController.remove(req, res);
      await console.log("---"); // delay
      expect(res.status).to.have.been.calledWith(422);
      expect(statusJsonSpy).to.have.been.calledWith({ err });
    });
  });
});
