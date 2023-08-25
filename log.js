const fs = require("fs/promises");

const insertInLog = async (operation, id = null) => {
    try {
        let date = new Date();
        if (operation == "getAll") {
            message = `get all at ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
        }
        if (operation == "getOne") {
            message = `get one at ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
        }

        if (operation == "objectAdded") {
            message = `Object Added at ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
        }

        if (operation == "updated") {
            message = `updated at ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
        }

        // if (operation == "getOne product") {
        //     message = `get One at ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
        // }
        // Write the log entry asynchronously and append to the log file
        await fs.appendFile("./log.txt", message + "\n");

        console.log("Log entry added successfully");
    } catch (error) {
        console.error("Error adding log entry:", error);
    }
};

module.exports = { insertInLog };
