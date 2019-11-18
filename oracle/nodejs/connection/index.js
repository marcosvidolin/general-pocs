const oracledb = require("oracledb");

const run = async () => {

    // see: https://oracle.github.io/node-oracledb/doc/api.html#configureconnections
    const connection = await oracledb.getConnection({
        user: '',
        password: '',
        connectString: ''
    });

    console.log(`Oracle connection PoC`);
};

run();

/**
 (node:13883) UnhandledPromiseRejectionWarning: Error: DPI-1047: Cannot locate a 64-bit Oracle Client library: "libclntsh.so: cannot open shared object file: No such file or directory". See https://oracle.github.io/odpi/doc/installation.html#linux for help
Node-oracledb installation instructions: https://oracle.github.io/node-oracledb/INSTALL.html
You must have 64-bit Oracle client libraries in LD_LIBRARY_PATH, or configured with ldconfig.
If you do not have Oracle Database on this computer, then install the Instant Client Basic or Basic Light package from 
http://www.oracle.com/technetwork/topics/linuxx86-64soft-092277.html

    at OracleDb.getConnection (/home/mvidolin/Development/mvidolin/general-pocs/oracle/nodejs/connection/node_modules/oracledb/lib/oracledb.js:270:10)
    at /home/mvidolin/Development/mvidolin/general-pocs/oracle/nodejs/connection/node_modules/oracledb/lib/util.js:180:16
    at new Promise (<anonymous>)
    at OracleDb.getConnection (/home/mvidolin/Development/mvidolin/general-pocs/oracle/nodejs/connection/node_modules/oracledb/lib/util.js:168:14)
    at run (/home/mvidolin/Development/mvidolin/general-pocs/oracle/nodejs/connection/index.js:6:39)
    at Object.<anonymous> (/home/mvidolin/Development/mvidolin/general-pocs/oracle/nodejs/connection/index.js:15:1)
    at Module._compile (internal/modules/cjs/loader.js:734:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:745:10)
    at Module.load (internal/modules/cjs/loader.js:626:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:566:12)
(node:13883) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 2)
(node:13883) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
 */