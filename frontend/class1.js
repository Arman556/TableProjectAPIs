import * as Imp from "./class2.js";
import * as Imp1 from "./class4.js";
let fetchData = new Imp.fetchJsonData();
let validate = new Imp1.validations();
class CrudOperations {
    constructor() {
        this.copy = [];
        this.arrHeaders = [];
        this.removeRow = [];
        this.arr = [];
        let j = document.getElementById("b1");
        j.addEventListener("click", this.loadData);
    }
    loadData() {
        if (document.getElementById("b1").innerHTML == "LOAD DATA") {
            document.getElementById("b1").innerHTML = "REFRESH DATA";
        }
        else {
            let div = document.getElementById("d1");
            div.innerHTML = " ";
        }
        fetchData.fetchData().then(data => obj.create(data));
    }
    create(Emp) {
        this.table = document.createElement("table");
        this.arrHeaders = [
            "FirstName",
            "MiddleName",
            "LastName",
            "Email",
            "Phoneno",
            "Role",
            "Address"
        ];
        this.flag = true;
        this.rows = Emp.length;
        this.cols = this.arrHeaders.length;
        this.removeRow = [];
        let tr = this.table.insertRow(-1);
        for (let h = 0; h < this.cols + 2; h++) {
            let th = document.createElement("th");
            if (h < this.cols) {
                th.innerHTML = this.arrHeaders[h];
                tr.appendChild(th);
            }
            else {
                th.innerHTML = "Action";
                tr.appendChild(th);
            }
        }
        for (let c = 0; c < this.rows; c++) {
            tr = this.table.insertRow(-1);
            tr.setAttribute("id", "row" + c);
            tr.innerHTML =
                '<td class="cell' + Emp[c].id + '">' + Emp[c].FirstName + "</td>" +
                    '<td class="cell' + Emp[c].id + '">' + Emp[c].MiddleName + "</td>" +
                    '<td class="cell' + Emp[c].id + '">' + Emp[c].LastName + "</td>" +
                    '<td class="cell' + Emp[c].id + '">' + Emp[c].Email + "</td>" +
                    '<td class="cell' + Emp[c].id + '">' + Emp[c].phoneno + "</td>" +
                    '<td class="cell' + Emp[c].id + '">' + Imp.ROLES[Emp[c].role] + "</td>" +
                    '<td class="cell' + Emp[c].id + '">' + Emp[c].Address + "</td>" +
                    '<td> <button type="button" class="editb" id="edit' + Emp[c].id + '"> edit data</button></td>' +
                    '<td> <button type="button" class="deleteb" id="delete' + Emp[c].id + '"> delete data </button></td>';
        }
        document.getElementById("d1").appendChild(this.table);
        let btn = document.createElement("button");
        btn.innerHTML = "ADD ROW";
        btn.setAttribute("id", "newbtn");
        document.getElementById("d1").appendChild(btn);
        for (let i = 0; i < this.rows; i++) {
            let edit_button = "edit" + Emp[i].id;
            let delete_button = "delete" + Emp[i].id;
            let n = Emp[i].id;
            let edit = document.getElementById(edit_button);
            edit.onclick = () => {
                this.editRow(n);
            };
            let deletef = document.getElementById(delete_button);
            deletef.onclick = () => {
                this.deleteRow(n);
            };
        }
        let btn1 = document.getElementById("newbtn");
        btn1.onclick = () => {
            this.addrow();
        };
    }
    editRow(val) {
        document.getElementById("newbtn").setAttribute("disabled", "true");
        let cellClass = "cell" + val;
        let cell = document.getElementsByClassName(cellClass);
        this.copyLastRow(val);
        console.log(this.copy);
        if (this.flag) {
            this.flag = false;
            for (let i = 0; i < cell.length; i++) {
                if (i === 5) {
                    cell[i].innerHTML = `<select id = "role1">
          <option value ="1">QA</option>
          <option value ="0">Developer</option>
          <option value ="2">DevOps</option>
          `;
                }
                else {
                    cell[i].innerHTML = `<input  value = ${this.copy[i]}>`;
                }
            }
            this.changeButton(val);
            this.disableButtons(val);
        }
        else {
            this.flag = true;
            this.arr[val + 1] = 1;
            document.getElementById("newbtn").removeAttribute("disabled");
            let row_array = [];
            for (let i = 0; i < cell.length; i++) {
                if (i === 5) {
                    row_array[i] = +cell[i].childNodes[0].value;
                }
                else {
                    row_array[i] = cell[i].childNodes[0].value;
                }
            }
            if (!validate.email(row_array[3])) {
                this.flag = false;
                cell[3].innerHTML += '<span id="span1" style="color:red" ></span>';
                let span1 = document.getElementById("span1");
                span1.style.fontSize = "12px";
                span1.innerHTML = "invalid email";
            }
            if (!validate.phoneno(`${row_array[4]}`)) {
                this.flag = false;
                cell[4].innerHTML += '<span id="span2" style="color:red" ></span>';
                let span1 = document.getElementById("span2");
                span1.style.fontSize = "12px";
                span1.innerHTML = "invalid phoneNo.";
            }
            if (!validate.notempty(row_array[0])) {
                this.flag = false;
                cell[0].innerHTML += '<span id="span3" style="color:red" ></span>';
                let span1 = document.getElementById("span3");
                span1.style.fontSize = "12px";
                span1.innerHTML = "enter firstname";
            }
            if (!validate.notempty(row_array[6])) {
                this.flag = false;
                cell[6].innerHTML += '<span id="span4" style="color:red" ></span>';
                let span1 = document.getElementById("span4");
                span1.style.fontSize = "12px";
                span1.innerHTML = "enter address";
            }
            if (!validate.notempty(row_array[2])) {
                this.flag = false;
                cell[2].innerHTML += '<span id="span5" style="color:red" ></span>';
                let span1 = document.getElementById("span5");
                span1.style.fontSize = "12px";
                span1.innerHTML = "enter lastname";
            }
            if (validate.notempty(row_array[2]) && validate.email(row_array[3]) && validate.notempty(row_array[6]) && validate.notempty(row_array[0]) && validate.phoneno(`${row_array[4]}`)) {
                let newEmployee = new Imp.Employee(row_array[0], row_array[1], row_array[2], row_array[3], +row_array[4], +row_array[5], row_array[6]);
                newEmployee.id = val;
                this.copy = [];
                fetch(`http://localhost:3000/updateEmployee/${val}`, {
                    method: "put",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newEmployee)
                }).then(res => {
                    for (let i = 0; i < this.cols; i++) {
                        if (i === 5) {
                            cell[i].innerHTML = Imp.ROLES[+cell[i].childNodes[0].value];
                        }
                        else {
                            cell[i].innerHTML = cell[i].childNodes[0].value;
                        }
                    }
                    this.changeAgain(val);
                    this.enableButtons(val);
                });
            }
        }
    }
    deleteRow(val) {
        let row_id = "row" + val;
        let cellClass = "cell" + val;
        let cell = document.getElementsByClassName(cellClass);
        if (this.flag) {
            fetch(`http://localhost:3000/deleteEmployee/${val}`, {
                method: "delete"
            })
                .then(res => {
                let delete_row = document.getElementById(row_id);
                delete_row.parentNode.removeChild(delete_row);
                this.removeRow[val] = true;
            });
        }
        else {
            let deletebtn = "delete" + val;
            for (let i = 0; i < this.rows; i++) {
                this.arr[i] = 1;
            }
            let btnid = document.getElementById(deletebtn).innerHTML;
            console.log(btnid);
            console.log(this.arr[val + 1]);
            if ((btnid == "cancel") && this.arr[val + 1] == 0) {
                console.log("entering block");
                fetch(`http://localhost:3000/deleteEmployee/${val}`, {
                    method: "delete"
                })
                    .then(res => {
                    let delete_row = document.getElementById(row_id);
                    delete_row.parentNode.removeChild(delete_row);
                    this.removeRow[val] = true;
                });
            }
            else {
                this.pasteLastRow(val);
                this.copy = [];
            }
            this.arr[val + 1] = 1;
            this.flag = true;
            document.getElementById("newbtn").removeAttribute("disabled");
            this.changeAgain(val);
            this.enableButtons(val);
        }
    }
    copyLastRow(val) {
        let cellClass = "cell" + val;
        let cell = document.getElementsByClassName(cellClass);
        for (let i = 0; i < this.cols; i++) {
            if (i === 5) {
                this.copy[i] = cell[i].innerHTML;
            }
            else if (i == 4) {
                this.copy[i] = cell[i].innerHTML;
                console.log(this.copy[i]);
            }
            else {
                this.copy[i] = (cell[i].innerHTML);
            }
        }
    }
    pasteLastRow(val) {
        let cellClass = "cell" + val;
        let cell = document.getElementsByClassName(cellClass);
        for (let i = 0; i < this.cols; i++) {
            cell[i].innerHTML = this.copy[i];
        }
    }
    changeButton(val) {
        let edit_btn = "edit" + val;
        let delete_btn = "delete" + val;
        document.getElementById(edit_btn).innerHTML = "Save";
        document.getElementById(delete_btn).innerHTML = "cancel";
    }
    changeAgain(val) {
        let edit_btn = "edit" + val;
        let delete_btn = "delete" + val;
        document.getElementById(edit_btn).innerHTML = "edit data";
        document.getElementById(delete_btn).innerHTML = "delete data";
    }
    enableButtons(val) {
        for (let i = 0; i < this.rows; i++) {
            if (this.removeRow[i] !== true && i !== val) {
                document.getElementById("edit" + i).toggleAttribute("disabled");
                document.getElementById("delete" + i).toggleAttribute("disabled");
            }
        }
    }
    disableButtons(val) {
        for (let i = 0; i < this.rows; i++) {
            if (this.removeRow[i] !== true && i !== val) {
                document.getElementById("edit" + i).toggleAttribute("disabled");
                document.getElementById("delete" + i).toggleAttribute("disabled");
            }
        }
    }
    addrow() {
        let ind = this.rows;
        let tr = this.table.insertRow(-1);
        tr.setAttribute("id", "row" + ind);
        tr.innerHTML =
            '<td class="cell' + ind + '"></td>' +
                '<td class="cell' + ind + '"></td>' +
                '<td class="cell' + ind + '"></td>' +
                '<td class="cell' + ind + '"></td>' +
                '<td class="cell' + ind + '">1</td>' +
                '<td class="cell' + ind + '">' + Imp.ROLES[1] + '</td>' +
                '<td class="cell' + ind + '"></td>' +
                '<td> <button type="button" class="editb" id="edit' + ind + '">  </button></td>' +
                '<td> <button type="button" class="deleteb" id="delete' + ind + '"> </button></td>';
        this.arr[ind + 1] = 0;
        let newEmployee = new Imp.Employee("", "", "", "", 1, 2, "");
        newEmployee.id = ind;
        console.log(newEmployee);
        fetch(`http://localhost:3000/addEmployee/${ind}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEmployee)
        }).then(res => { this.editRow(ind); });
        let edit_button = "edit" + ind;
        let delete_button = "delete" + ind;
        let n = ind;
        let edit = document.getElementById(edit_button);
        edit.onclick = () => {
            this.editRow(n);
        };
        let deletef = document.getElementById(delete_button);
        deletef.onclick = () => {
            this.deleteRow(n);
        };
        this.rows++;
    }
}
export let obj = new CrudOperations;
