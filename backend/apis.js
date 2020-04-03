"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let express = require("express");
let app = express();
let fs = require('fs');
let bodyParser = require('body-parser');
app.listen(3000);
app.use(bodyParser.json());
function modifyjson() {
    let raw_json = fs.readFileSync('data.json');
    let actual_json = JSON.parse(raw_json);
    for (let i = 0; i < actual_json.length; i++) {
        actual_json[i].id = i;
    }
    fs.writeFileSync("data.json", JSON.stringify(actual_json), (err) => {
    });
}
app.get("/fetchJsonData", function (req, res) {
    modifyjson();
    let jsondata = fs.readFileSync('data.json');
    let data = JSON.parse(jsondata);
    res.send(data);
});
app.delete("/deleteEmployee/:id", function (req, res) {
    let jsondata = fs.readFileSync('data.json');
    let data = JSON.parse(jsondata);
    let id = req.params.id;
    let v = data.length;
    for (let i = 0; i < v; i++) {
        if (data[i].id == id) {
            data.splice(i, 1);
            break;
        }
    }
    fs.writeFile('data.json', JSON.stringify(data), (err) => {
        res.send();
    });
});
app.put('/updateEmployee/:id', function (req, res) {
    const jsondata = fs.readFileSync('data.json');
    const data = JSON.parse(jsondata);
    const value = req.body;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == req.params.id) {
            data[i] = value;
            break;
        }
    }
    fs.writeFile('data.json', JSON.stringify(data), (err) => {
        res.send();
    });
});
app.post("/addEmployee/:id", function (req, res) {
    const jsondata = fs.readFileSync('data.json');
    const data = JSON.parse(jsondata);
    const value = req.body;
    data.push(value);
    fs.writeFile('data.json', JSON.stringify(data), (err) => {
        res.send();
    });
});
