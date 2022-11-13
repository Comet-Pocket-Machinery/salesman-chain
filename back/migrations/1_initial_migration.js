const Migrations = artifacts.require("Migrations");
const eventos = artifacts.require("eventos");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(eventos);


};
