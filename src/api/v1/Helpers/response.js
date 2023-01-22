export const sendResponse = (statusCode, message, res) => {
    res.status(statusCode).json({
        message: message
    });
}

export const sendData = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        message: message,
        payload: data
    });
}

export const sendDataScroll = (statusCode, data, lastID, next, message, res) => {
    res.status(statusCode).json({
        message: message,
        payload: data,
        lastData: lastID,
        next: next
    });
}
