export var ROLES;
(function (ROLES) {
    ROLES[ROLES["DEVELOPER"] = 0] = "DEVELOPER";
    ROLES[ROLES["QA"] = 1] = "QA";
    ROLES[ROLES["DevOps"] = 2] = "DevOps";
})(ROLES || (ROLES = {}));
export class Employee {
    constructor(firstName, middleName, lastName, email, phoneNo, role, address) {
        this.FirstName = firstName;
        this.MiddleName = middleName;
        this.LastName = lastName;
        this.Email = email;
        this.phoneno = phoneNo;
        this.role = role;
        this.Address = address;
    }
}
export class fetchJsonData {
    async fetchData() {
        let jsonResponse = await fetch("http://localhost:3000/fetchJsonData");
        let data = await jsonResponse.json();
        return (data);
    }
}
