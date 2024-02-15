import { createServer, Model } from "miragejs";
import { addEmployee } from "./API";
import database from "../Services/db.jsx";
import { isEmpty } from "../utils.js";

const createMockServer = function () {
    createServer({
        models: {
            employee: Model,
            jobCode: Model,
        },

        seeds(server) {
            database.employees.forEach((employee) =>
                server.create("employee", employee)
            );
            database.jobCodes.forEach((jobCode) =>
                server.create("jobCode", jobCode)
            );
        },

        routes() {
            //Employee
            this.get("/api/employees", (schema, request) => {
                let filter = request.queryParams;

                if (!filter || isEmpty(filter)) {
                    return schema.employees.all();
                }
                return schema.employees.where(filter);
            });

            this.get("/api/employees/:id", (schema, request) => {
                let id = request.params.id;

                return schema.employees.find(id);
            });

            this.post("/api/employees", (schema, request) => {
                let employee = JSON.parse(request.requestBody);

                if (employee.code != null && employee.code !== "") {
                    return schema.employees.create(employee);
                } else {
                    let res = schema.db.employees;
                    const code =
                        Math.max(...res.map((employee) => employee?.code)) + 1;

                    const newEmployee = {
                        ...employee,
                        code: code,
                    };
                    return schema.employees.create(newEmployee);
                }
            });

            this.delete("/api/employees/:id", (schema, request) => {
                let id = request.params.id;

                return schema.employees.find(id).destroy();
            });
            this.put("/api/employees/:id", (schema, request) => {
                let id = request.params.id;
                let employee = JSON.parse(request.requestBody);

                return schema.db.employees.update(id, employee);
            });
            //Job Codes
            this.get("/api/jobCodes", (schema) => {
                return schema.jobCodes.all();
            });
        },
    });
};

export default createMockServer;
