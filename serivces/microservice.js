const express = require("express");
const bodyParser = require('body-parser');
let cors = require('cors');
let fs = require('fs');
let path = require('path');
const filePath = path.join(__dirname, '../db.json');

let app = express();

app.use(cors());
app.use(bodyParser.json());
/***
 * Refresh store after paid multiple products
 * The FAKE-JSON-SERVER api does not have the ability to update a lot of data. For more information: (https://github.com/typicode/json-server)
 */
app.post('/refresh-store', (req, res, next) => {
    fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
        if (!err) {
            let fileData = JSON.parse(data);
            let store = fileData.store;
            let requestData = req.body;
            let refreshedStore = store.map(s => {
                let findProduct = requestData.find(product => product.product_id === s.product_id);
                if (findProduct) {
                    s.count = findProduct.count;
                }
                return s;
            });

            fileData.store = refreshedStore;
            fs.writeFileSync(filePath, JSON.stringify(fileData));
        } else {
            console.log("***ERROR ==>", err);
        }
    });

    res.json(["Request is successfully!"]);
});

app.listen(3002, () => {
    console.log("Micro Service running on port 3002");
});