const contactController = require("../controllers/contact");
const router = require("express").Router();

router.post("/", contactController.addContact);
router.post("/bulk/", contactController.addMoreThanOneContact);
router.get("/", contactController.getContact);
router.put("/", contactController.updateContact);

module.exports = router;
