class APIerror extends Error {
    constructor(
        statusCode,
        message = "Somthing went wrong",
        errors = [],
        statck = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.messgae = message
        this.success = false
        this.errors = errors

        if (statck) {
            this.stack = statck
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { APIerror }