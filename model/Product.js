// const { error } = require("console");
const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");
const { success, failure } = require("../util/common");
const { insertInLog } = require("../log");

class Product {
    async getAll() {
        return fsPromise
            .readFile(path.join(__dirname, "..", "data", "products.json"), {
                encoding: "utf-8"
            })
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

    async add(product) {
        try {
            //console.log("Nahid: ", product);

            if (!product.hasOwnProperty("title") || product.title.trim() === "") {
                return failure("Title is required and cannot be empty");

            } else if (!product.hasOwnProperty("price")) {
                return failure("Price is required and cannot be empty");

            } else if (!product.hasOwnProperty("rating")) {
                return failure("Rating is required and cannot be empty");

            } else if (!product.hasOwnProperty("stock")) {
                return failure("Stock is required and cannot be empty");
            }

            const data = await fsPromise.readFile(
                path.join(__dirname, "..", "data", "products.json"),
                { encoding: "utf-8" }
            );
            const jsonData = JSON.parse(data);

            const newProduct = {
                id: jsonData.length + 1,
                title: product.title,
                price: product.price,
                rating: product.rating,
                stock: product.stock,
                // Add other properties of the product here
            };

            jsonData.push(newProduct);
            insertInLog("objectAdded");

            await fsPromise.writeFile(
                path.join(__dirname, "..", "data", "products.json"),
                JSON.stringify(jsonData, null, 2),
                'utf-8'
            );

            console.log("Product has been added successfully!!");
            return success("Product has been added successfully!!");
        } catch (error) {
            console.error("Error:", error);
            return failure("Failed to add product", error);
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const data = await fsPromise.readFile(
                path.join(__dirname, "..", "data", "products.json"),
                { encoding: "utf-8" }
            );
            const jsonData = JSON.parse(data);
            console.log("Our jsonData: ", jsonData)

            const index = jsonData.findIndex(item => item.id === parseInt(id));
            console.log("index: ", index, id)
            if (index === -1) {
                return failure("Product not found for updating");
            }

            console.log("updated product: ", updatedProduct)

            jsonData[index] = {
                ...jsonData[index],
                ...updatedProduct
            };
            insertInLog("updated");


            await fsPromise.writeFile(
                path.join(__dirname, "..", "data", "products.json"),
                JSON.stringify(jsonData, null, 2),
                'utf-8'
            );

            console.log("Product has been updated successfully!!");
            return success("Product has been updated successfully!!");
        } catch (error) {
            console.error("Error:", error);
            return failure("Failed to update product", error);
        }
    }

    async deleteProduct(id) {
        try {
            const data = await fsPromise.readFile(
                path.join(__dirname, "..", "data", "products.json"),
                { encoding: "utf-8" }
            );
            const jsonData = JSON.parse(data);

            const index = jsonData.findIndex(item => item.id === parseInt(id));

            if (index === -1) {
                return failure("Product not found for deletion");
            }

            jsonData.splice(index, 1);

            await fsPromise.writeFile(
                path.join(__dirname, "..", "data", "products.json"),
                JSON.stringify(jsonData, null, 2),
                'utf-8'
            );

            console.log("Product has been deleted successfully!!");
            return success("Product has been deleted successfully!!");

        } catch (error) {
            console.error("Error:", error);
            return failure("Failed to delete product", error);
        }
    }

    async getStockLessThan10() {
        try {
            const data = await fsPromise.readFile(
                path.join(__dirname, "..", "data", "products.json"),
                { encoding: "utf-8" }
            );
            const jsonData = JSON.parse(data);

            const stockLessThan10 = jsonData.filter(item => item.stock < 10);

            if (stockLessThan10.length > 0) {
                return { success: true, data: stockLessThan10 };
            } else {
                return failure("No products found with stock less than 10");
            }
        } catch (error) {
            console.error("Error:", error);
            return failure("Failed to retrieve products with stock less than 10", error);
        }
    }
}

module.exports = new Product();
