const router = require("express").Router();
const {
  signup,
  signin,
  resetPassword,
} = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/reset-password", resetPassword);

module.exports = router;


/*
-- signup
{
  "username": "sabikrahat",
  "email": "sabikrahat72428@gmail.com",
  "password": "@Rahat123",
  "name": "Md. Sabik Alam Rahat"
}
*/

/*
-- signin
{
  "email": "sabikrahat72428@gmail.com",
  "password": "@Rahat123"
}
*/

/*
-- reset-password
{
  "email": "sabikrahat72428@gmail.com"
}
*/

