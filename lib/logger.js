class Logger {
    log(message) {
        if (process.env.LOGGING_LEVEL <= 1) {
            console.log(`INFO: ${message}`)
        }
    }
    
    error(message) {
        if (process.env.LOGGING_LEVEL <= 2) {
            console.log(`ERROR: ${message}`)
        }
    }
}

module.exports = new Logger()