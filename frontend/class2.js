export var ROLES;
(function (ROLES) {
    ROLES[ROLES["DEVELOPER"] = 0] = "DEVELOPER";
    ROLES[ROLES["QA"] = 1] = "QA";
    ROLES[ROLES["DevOps"] = 2] = "DevOps";
})(ROLES || (ROLES = {}));
export class Employee {
    constructor(fname, mname, lname, email, phone, role, address) {
        this.FirstName = fname;
        this.MiddleName = mname;
        this.LastName = lname;
        this.Email = email;
        this.phoneno = phone;
        this.role = role;
        this.Address = address;
    }
}
export class fetchData {
    async fetch1() {
        let response = await fetch("http://localhost:3000/class2");
        let data = await response.json();
        return (data);
    }
}
