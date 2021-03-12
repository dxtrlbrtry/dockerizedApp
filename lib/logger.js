const path = require('path')

const loggingLevel = process.env.LOGGING_LEVEL;

exports.Logger = class {
    constructor(moduleName) {
        this.moduleName = moduleName;
    }

    log(message) {
        if (loggingLevel <= 1) {
            console.log(`INFO: ${path.basename(this.moduleName)} - ${message}`)
        }
    }
    
    error(message) {
        if (loggingLevel <= 2) {
            console.log(`ERROR: ${path.basename(this.moduleName)} - ${message}`)
        }
    }
}