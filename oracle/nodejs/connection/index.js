const oracledb = require("oracledb");

const run = async () => {

    // see: https://oracle.github.io/node-oracledb/doc/api.html#configureconnections
    const connection = await oracledb.getConnection({
        user: "",
        password: '',
        connectString: "mydbmachine.example.com:1984/orclpdb1"
    });

    console.log(`Oracle connection PoC`);
};

run();