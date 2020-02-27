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
        // console.log(actual_json[i].id);
        actual_json[i].id = i;
    }
    fs.writeFileSync("data.json", JSON.stringify(actual_json), (err) => {
        // If an error occurred, show it and return
        if (err)
            return console.error(err);
        // Successfully wrote to the file!
    });
}
app.get("/class2", function (req, res) {
    modifyjson();
    let data = fs.readFileSync('data.json');
    let words = JSON.parse(data);
    console.log(words);
    res.send(words);
});
app.delete("/delete/:id", function (req, res) {
    let data = fs.readFileSync('data.json');
    let words = JSON.parse(data);
    let id = req.params.id;
    let v = words.length;
    // console.log(words);
    for (let i = 0; i < v; i++) {
        if (words[i].id == id) {
            words.splice(i, 1);
            break;
        }
    }
    fs.writeFile('data.json', JSON.stringify(words), (err) => {
        // If an error occurred, show it and return
        if (err)
            return console.error(err);
        // Successfully wrote to the file!
        res.send();
    });
});
app.put('/update/:id', function (req, res) {
    console.log("Data create");
    const data = fs.readFileSync('data.json');
    const actual = JSON.parse(data);
    const value = req.body;
    for (let i = 0; i < actual.length; i++) {
        if (actual[i].id == req.params.id) {
            actual[i] = value;
            break;
        }
    }
    fs.writeFile('data.json', JSON.stringify(actual), (err) => {
        // If an error occurred, show it and return
        if (err)
            return console.error(err);
        // Successfully wrote to the file!
        res.send();
    });
});
app.post("/addrow/:id", function (req, res) {
    console.log("new entery added");
    const data = fs.readFileSync('data.json');
    const act = JSON.parse(data);
    const value = req.body;
    act.push(value);
    fs.writeFile('data.json', JSON.stringify(act), (err) => {
        // If an error occurred, show it and return
        if (err)
            return console.error(err);
        // Successfully wrote to the file!
        res.send();
    });
});
