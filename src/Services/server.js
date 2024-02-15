import { createServer, Model } from "miragejs";
import { addEmployee } from "./API";
import database from "../Services/db.jsx";
import { isEmpty } from "../utils.js";

const createMockServer = function () {
    createServer({
        models: {
            employee: Model,
        },

        seeds(server) {
            database.employees.forEach((employee) =>
                server.create("employee", employee)
            );
        },
        routes() {
            this.get("/api/employees", (schema, request) => {
                let filter = request.queryParams;

                if (!filter || isEmpty(filter)) {
                    return schema.employees.all();
                }
                return schema.employees.where(filter);
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
        },
    });
};

export default createMockServer;
