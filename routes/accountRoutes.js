
module.exports = app => {
    const accountValidation = require("../validators/accountValidation.js");
    const router = require("express").Router();
  
    // Create a new Account
    router.post("/", [authJwt.verifyToken], accountController.create);
    // router.post("/", [authJwt.verifyToken], createAccountValidator, accountController.create);
  
    // Retrieve all my accounts
    router.get("/", [authJwt.verifyToken], accountController.findAll);
    
    // Delete an account
    router.delete("/:id", [authJwt.verifyToken], accountController.delete);
  

    app.use("/api/accounts", router);
  };