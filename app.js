// attempt - 3 starts 
// attempt - 3 ends 



const http = require("http");
const { success, failure } = require("./util/common");
const Product = require("./model/Product");

const server = http.createServer(function (req, res) {
    // Parsing query parameters
    const getQueryParams = () => {
        const params = new URLSearchParams(req.url.split("?")[1]);
        const queryParams = {};
        for (const param of params) {
            queryParams[param[0]] = param[1];
        }
        return queryParams;
    };

    // Collecting request data
    let body = "";
    req.on("data", (buffer) => {
        body += buffer;
    });

    req.on("end", async () => {
        console.log(req.url, req.method);
        res.setHeader("Content-Type", "application/json");

        const requestURL = req.url.split("?")[0];

        // Handling different request URLs
        if (requestURL === "/products/all" && req.method === "GET") {
            // Handling request for getting all products
            try {
                const result = await Product.getAll();

                if (result.success) {
                    res.writeHead(200);
                    res.write(success("Successfully got all products", JSON.parse(result.data)));
                    return res.end();
                } else {
                    res.writeHead(400);
                    res.write(failure("Failed to get products"));
                    return res.end();
                }
            } catch (error) {
                console.error(error);
                res.writeHead(500);
                res.write(JSON.stringify({ message: "Internal server error" }));
                return res.end();
            }
        } else if (requestURL.startsWith("/products/") && req.method === "GET") {
            // Handling request for getting a product by ID
            const parts = requestURL.split("/");
            const productId = parts[2];
            
            try {
                const result = await Product.getOneById(productId);
                
                if (result.success) {
                    res.writeHead(200);
                    res.write(success("Successfully got the product", result.data));
                    return res.end();
                } else {
                    res.writeHead(404);
                    res.write(failure("Product not found"));
                    return res.end();
                }
            } catch (error) {
                console.error(error);
                res.writeHead(500);
                res.write(JSON.stringify({ message: "Internal server error" }));
                return res.end();
            }
        } else {
            // Handling invalid request URLs
            res.writeHead(404);
            res.write(failure("You just called a wrong method"));
            return res.end();
        }
    });
});

server.listen(8000, () => {
    console.log("Server is running on 8000...");
});



// // attempt - 2 starts 

// const http = require("http");
// const { success, failure } = require("./util/common");
// const Product = require("./model/Product");
// const { fail } = require("assert");

// const server = http.createServer(function (req, res) {
//     const getQueryParams = () => {
//         const params = new URLSearchParams(req.url.split("?")[1]);
//         const queryParams = {};
//         for (const param of params) {
//             queryParams[param[0]] = param[1];
//         }
//         return queryParams;
//     };

//     let body = "";
//     req.on("data", (buffer) => {
//         body += buffer;
//     });

//     req.on("end", async () => {
//         console.log(req.url, req.method);
//         res.setHeader("Content-Type", "application/json");

//         const requestURL = req.url.split("?")[0];

//         // Get All Products Starts
//         if (requestURL === "/products/all" && req.method === "GET") {
//             try {
//                 // execute the code here...
//                 const result = await Product.getAll();
//                 // console.log(result)
//                 if (result.success) {
//                     res.writeHead(200);
//                     res.write(success("Successfully got all products", JSON.parse(result.data))
//                     );
//                     return res.end();
//                 } else {
//                     res.writeHead(400);
//                     res.write(failure("Failed to get products"));
//                     return res.end();
//                 }

//             } catch (error) {
//                 console.log(error);
//                 res.writeHead(500);
//                 res.write({ message: "Internal server error" });
//                 return res.end();
//             }
//         }

//         // Get All Products Ends

//         // Get One Product By Id Starts 

//         else if (requestURL.startsWith("/products/") && req.method === "GET") {
//             const parts = requestURL.split("/");
//             const productId = parts[2]; // The ID will be the third part of the URL
            
//             try {
//                 const result = await Product.getOneById(productId);
                
//                 if (result.success) {
//                     res.writeHead(200);
//                     res.write(success("Successfully got the product", result.data));
//                     return res.end();
//                 } else {
//                     res.writeHead(404);
//                     res.write(failure("Product not found"));
//                     return res.end();
//                 }
//             } catch (error) {
//                 console.log(error);
//                 res.writeHead(500);
//                 res.write({ message: "Internal server error" });
//                 return res.end();
//             }
//         }


//         // Get One Product By Id Ends 

//     });
// });

// server.listen(8000, () => {
//     console.log("Server is running on 8000...");
// });

// // attempt - 2 ends
