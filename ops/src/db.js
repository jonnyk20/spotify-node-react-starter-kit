const CodeModel = require("./models/code");

// Any data that needs to be populated to set up the apps db
async function setUp(){
    console.info("**** SETTING UP DBS ****");

    // Insert initial code for using app
    await CodeModel.create({
        uses: 100,
        value: "giveth"
    });
    return true;
}

module.exports = setUp;