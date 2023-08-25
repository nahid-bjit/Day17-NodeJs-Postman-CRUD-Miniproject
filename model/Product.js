// const { error } = require("console");
const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");
const { success, failure } = require("../util/common");

class Product {
    async getAll() {
        return fsPromise
            .readFile(path.join(__dirname, "..", "data", "products.json"), {
                encoding: "utf-8"})
            .then((data) => {
                return { success: true, data: data };
            })
            .catch((error) => {
                console.log(error);
                return { success: false };
            });
    }

    async getOneById(id) {
        try {
            const data = await fsPromise.readFile(
                path.join(__dirname, "..", "data", "products.json"),
                { encoding: "utf-8" }
            );
            const jsonData = JSON.parse(data);
            const product = jsonData.find(item => item.id === Number(id));
            //console.log("Nahid", product);
            if (product) {
                return { success: true, data: product };
            } else {
                return failure("Product not found");
            }
        } catch (error) {
            console.log(error);
            return failure("Failed to retrieve product", error);
        }
    }


    

    // async getOneId(id) {
    //     // will implement it later
    //     return fsPromise
    //     .readFile(path.join(__dirname, "..", "data", "products.json"), {
    //         encoding: "utf-8"})
    //         .then(data)
    //     })

    // ## Get One By Id ## 

//     async getOneById(id) {
//         return fsPromise
//         .readFile(path.join(__dirname, "..", "data", "products.json" ), {
//           encoding: "utf-8"})
//         .then((data) => {
//             const findData = JSON.parse(data).filter((element) => element.id) === Number(id)[0];
//             if (findData) {

//             }
//         })
//     }

// }

}

module.exports = new Product();
