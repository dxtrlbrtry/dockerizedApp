class Logger {
    log(message) {
        if (process.env.LOGGING_LEVEL <= 1) {
            console.log(`${new Date().toISOString()} INFO: ${message}`)
        }
    }
    
    error(message) {
        if (process.env.LOGGING_LEVEL <= 2) {
            console.log(`${new Date().toISOString()} ERROR: ${message}`)
        }
    }
}

module.exports = new Logger()