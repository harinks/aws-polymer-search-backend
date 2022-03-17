const express = require("express");
const { getRepo, getTags } = require("../Controllers/Controller");
const router = express.Router();

router.route('/repos').get(getRepo)
router.route('/tags').get(getTags)

module.exports = router