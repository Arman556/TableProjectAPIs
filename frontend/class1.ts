import * as Imp from "./class2.js";
// import * as Imp1 from "./class3.js";
let this1 = new Imp.fetchData();
class actions {
  flag: boolean;
  copy: any[];
  cols: number;
  arrHeaders: any;
  rows: number;
  removeRow: boolean[];
  table:any;
  //cell:any[]=[];
  constructor() {
    this.copy = [];
    this.arrHeaders = [];
    this.removeRow = [];
    let j = document.getElementById("b1")!;
    j.addEventListener("click", this.loadData);
  }
  loadData() {
    if (document.getElementById("b1")!.innerHTML == "LOAD DATA") {
      document.getElementById("b1")!.innerHTML = "REFRESH DATA";
    } else {
      let div = document.getElementById("d1")!;
      div.innerHTML = " ";
    }
    this1.fetch1().then(data => obj.create(data));
    // let data1=this1.fetch1();
    // this.create(data1);
  }
  create(Emp: any) {
    // document.getElementById("LOAD").innerHTML = "REFRESH DATA";
    // let div = document.getElementById("id1");
    // div.innerHTML = " ";
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
    this.flag=true;
    this.rows = Emp.length;
    this.cols = this.arrHeaders.length;
    this.removeRow = [];
    let tr = this.table.insertRow(-1);
    for (let h = 0; h < this.cols + 2; h++) {
      let th = document.createElement("th");
      if (h < this.cols) {
        th.innerHTML = this.arrHeaders[h];
        tr.appendChild(th);
      } else {
        th.innerHTML = "Action";
        tr.appendChild(th);
      }
    }
    for (let c = 0; c < this.rows; c++) {
      tr = this.table.insertRow(-1);
      tr.setAttribute("id", "row" + c);
      tr.innerHTML =
        '<td class="cell' + Emp[c].id + '">' + Emp[c].FirstName +"</td>" +
        '<td class="cell' + Emp[c].id + '">' + Emp[c].MiddleName + "</td>" +
        '<td class="cell' + Emp[c].id + '">' + Emp[c].LastName + "</td>" +
        '<td class="cell' + Emp[c].id + '">' + Emp[c].Email + "</td>" +
        '<td class="cell' + Emp[c].id + '">' + Emp[c].phoneno + "</td>" +
        '<td class="cell' + Emp[c].id + '">' + Imp.ROLES[Emp[c].role] + "</td>" +
        '<td class="cell' + Emp[c].id + '">' + Emp[c].Address + "</td>" +
        '<td> <button type="button" class="editb" id="edit' + Emp[c].id + '"> edit data</button></td>' +
        '<td> <button type="button" class="deleteb" id="delete' + Emp[c].id + '"> delete data </button></td>';
    }
    document.getElementById("d1")!.appendChild(this.table);
    let btn=document.createElement("button");
        btn.innerHTML="ADD ROW";
        btn.setAttribute("id","newbtn");
    document.getElementById("d1")!.appendChild(btn);    
    for (let i = 0; i < this.rows; i++) {
        let edit_button = "edit" + Emp[i].id;
        let delete_button = "delete" + Emp[i].id;
        let n = Emp[i].id;
        let edit = document.getElementById(edit_button);
        edit!.onclick = () => {
          this.editRow(n);
        }
        let deletef=document.getElementById(delete_button);
        deletef!.onclick = () => {
            this.deleteRow(n);
          }
     }
     let btn1=document.getElementById("newbtn");
     btn1!.onclick = () => {
       this.addrow();
     }
  }
  editRow(val: number) {
    document.getElementById("newbtn")!.setAttribute("disabled","true");
    let cellClass = "cell" + val;
    let cell = document.getElementsByClassName(cellClass);
    this.copyLastRow(val);
    console.log(this.copy);
    if (this.flag) {
        // this.flag = false;
        // for (let i = 0; i <cell.length; i++) {
        //   // cell[i].setAttribute("contenteditable", "true");
        //   if(i===5)
        //   {
        //     cell[i].innerHTML = `<select id = "role1">
        //     <option value ="1">QA</option>
        //     <option value ="0">Developer</option>
        //     <option value ="2">DevOps</option>
        //     `;
        //   }
        //   else{
        //   cell[i].innerHTML ='<input type = "text" >';}
        // }
        // this.changeButton(val);
        // this.disableButtons(val);  
      
      this.flag = false;
      for (let i = 0; i <cell.length; i++) {
        // cell[i].setAttribute("contenteditable", "true");
        if(i===5)
        {
          cell[i].innerHTML = `<select id = "role1">
          <option value ="1">QA</option>
          <option value ="0">Developer</option>
          <option value ="2">DevOps</option>
          `;
        }else{
        cell[i].innerHTML =`<input  value = ${this.copy[i]}>`;}
      }
      this.changeButton(val);
      this.disableButtons(val);
    } else {
      this.flag = true;
      document.getElementById("newbtn")!.removeAttribute("disabled");
      let row_array:any[] = [];
      for(let i =0;i<cell.length;i++)
      {
        if(i===5)
        {
          row_array[i] = +(cell[i].childNodes[0]! as HTMLSelectElement).value;
        }else{
        row_array[i] = (cell[i].childNodes[0] as HTMLInputElement).value;}
      }

      let newEmployee = new Imp.Employee(row_array[0],row_array[1],
        row_array[2],row_array[3],
        +row_array[4],+row_array[5],
        row_array[6]);
        newEmployee.id = val;

        this.copy = [];
      fetch(`http://localhost:3000/update/${val}`,{
        method: "put",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(newEmployee)}
        ).then(res=>{
      for (let i = 0; i < this.cols; i++){
        if(i===5)
        {
          cell[i].innerHTML = Imp.ROLES[+(cell[i].childNodes[0]! as HTMLSelectElement).value];
        }else{
        cell[i].innerHTML = (cell[i].childNodes[0] as HTMLInputElement).value;}
      }
      this.changeAgain(val);
      this.enableButtons(val);
      });
    }
  }
  deleteRow(val: number) {
    let row_id = "row" + val;
    let cellClass = "cell" + val;
    let cell = document.getElementsByClassName(cellClass)!;
    if (this.flag) {
      fetch(`http://localhost:3000/delete/${val}`,{
        method: "delete"
      })
    .then(res=>{
      let delete_row = document.getElementById(row_id)!;
      delete_row.parentNode!.removeChild(delete_row);
      this.removeRow[val] = true;
    });
    } 
     else {
      this.flag = true;
      document.getElementById("newbtn")!.removeAttribute("disabled");
      this.pasteLastRow(val);
      this.copy = [];
      // for (let i = 0; i < this.rows; i++) {
      //   cell[i].setAttribute("contenteditable", "false");
      // }
      this.changeAgain(val);
      this.enableButtons(val);
      console.log(this.flag);
    }
  }
  copyLastRow(val: number) {
    let cellClass = "cell" + val;
    let cell = document.getElementsByClassName(cellClass);
    //console.log(cell);
    for (let i = 0; i < this.cols; i++) {
      if(i===5)
      {
        this.copy[i] = Imp.ROLES[+cell[i].innerHTML];
      }
      else if(i==4){
      this.copy[i]=+cell[i].innerHTML;
      console.log(this.copy[i]);
      }else{
      this.copy[i] = (cell[i].innerHTML)}
    }
    }
  pasteLastRow(val: number) {
    let cellClass = "cell" + val;
    let cell = document.getElementsByClassName(cellClass);
    for (let i = 0; i < this.cols; i++) {
      cell[i].innerHTML = this.copy[i];
    }
  }
  changeButton(val: number) {
    let edit_btn = "edit" + val;
    let delete_btn = "delete" + val;
    document.getElementById(edit_btn)!.innerHTML = "Save";
    document.getElementById(delete_btn)!.innerHTML = "cancel";
  }
  changeAgain(val: number) {
    let edit_btn = "edit" + val;
    let delete_btn = "delete" + val;
    document.getElementById(edit_btn)!.innerHTML = "edit data";
    document.getElementById(delete_btn)!.innerHTML = "delete data";
  }
  enableButtons(val: number) {
    for (let i = 0; i < this.rows; i++) {
      if (this.removeRow[i] !== true && i !== val) {
        document.getElementById("edit" + i)!.toggleAttribute("disabled");
        document.getElementById("delete" + i)!.toggleAttribute("disabled");
      }
    }
  }
  disableButtons(val: number) {
    for (let i = 0; i < this.rows; i++) {
      if (this.removeRow[i] !== true && i !== val) {
        document.getElementById("edit" + i)!.toggleAttribute("disabled");
        document.getElementById("delete" + i)!.toggleAttribute("disabled");
      }
    }
  }
  addrow(){
    let ind=this.rows
    //console.log(ind);
    let tr = this.table.insertRow(-1);
      tr.setAttribute("id", "row" + ind);
      // tr.innerHTML =
      //   '<td class="cell' + ind + '"><input type="text"></td>' +
      //   '<td class="cell' + ind + '"><input type="text"></td>' +
      //   '<td class="cell' + ind + '"><input type="text"></td>' +
      //   '<td class="cell' + ind + '"><input type="text"></td>' +
      //   '<td class="cell' + ind + '"><input type="text"></td>' +
      //   '<td class="cell' + ind + '"><select id = "role1"><option value ="1">QA</option><option value ="0">Developer</option><option value ="2">DevOps</option></td>' +
      //   '<td class="cell' + ind + '"><input type="text"></td>' +
      //   '<td> <button type="button" class="editb" id="edit' + ind + '"> Save </button></td>' +
      //   '<td> <button type="button" class="deleteb" id="delete' + ind + '"> cancel </button></td>';
        
        tr.innerHTML =
        '<td class="cell' + ind + '"></td>' +
        '<td class="cell' + ind + '"></td>' +
        '<td class="cell' + ind + '"></td>' +
        '<td class="cell' + ind + '"></td>' +
        '<td class="cell' + ind + '">1</td>' +
        '<td class="cell' + ind + '">'+Imp.ROLES[1]+'</td>' +
        '<td class="cell' + ind + '"></td>' +
        '<td> <button type="button" class="editb" id="edit' + ind + '">  </button></td>' +
        '<td> <button type="button" class="deleteb" id="delete' + ind + '"> </button></td>';
        let newEmployee = new Imp.Employee("","","","",1,2,"");
        newEmployee.id=ind;
        console.log(newEmployee);
        fetch(`http://localhost:3000/addrow/${ind}`,{
        method: "POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(newEmployee)}
        ).then(res=>{this.editRow(ind);});
          let edit_button = "edit" + ind;
          let delete_button = "delete" + ind;
          let n = ind;
          let edit = document.getElementById(edit_button);
          edit!.onclick = () => {
            this.editRow(n);
          }
          let deletef=document.getElementById(delete_button);
          deletef!.onclick = () => {
              this.deleteRow(n);
            }
        this.rows++;
      }
}
export let obj = new actions();
