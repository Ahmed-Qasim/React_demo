import database from "./db";
// Add Employee
export const addEmployee = (employee) => {
    const newEmployees = [...database.employees];
    const id = Math.max(...newEmployees.map((employee) => employee.id)) + 1;
    const date = employee.hiringDate;
    const newEmployee = {
        id: id,
        hiringDate: date,
        ...employee,
    };
    newEmployees.push(newEmployee);
    database.employees = newEmployees;
};

// Get All Employees
export const getAllEmployees = () => {
    return database.employees;
};

// Get Employee by ID
export const getEmployeeById = (id) => {
    return database.employees.find((employee) => employee.id == id);
};

// Update Employee
export const updateEmployee = (id, updatedEmployee) => {
    const index = database.employees.findIndex(
        (employee) => employee.id === id
    );
    if (index !== -1) {
        const newEmployees = [...database.employees];
        newEmployees[index] = {
            ...database.employees[index],
            ...updatedEmployee,
        };
        database.employees = newEmployees;
    }
};

// Delete Employee
export const deleteEmployee = (id) => {
    const index = database.employees.findIndex(
        (employee) => employee.id === id
    );
    if (index !== -1) {
        const newEmployees = [...database.employees];
        newEmployees.splice(index, 1);
        database.employees = newEmployees;
    }
};

// Filter Employees

export const filterEmployees = (criteria) => {
    return database.employees.filter((employee) => {
        for (const key in criteria) {
            if (criteria.hasOwnProperty(key)) {
                if (employee[key] !== criteria[key]) {
                    return false;
                }
            }
        }
        return true;
    });
};

//Search Employees
export const searchEmployees = (query) => {
    return database.employees.filter((employee) => {
        const lowerCaseQuery = query.toString().toLowerCase();
        for (const key in employee) {
            if (Object.prototype.hasOwnProperty.call(employee, key)) {
                const value = employee[key];
                if (
                    typeof value === "string" &&
                    value.toLowerCase().includes(lowerCaseQuery)
                ) {
                    return true;
                } else if (
                    typeof value === "number" &&
                    value.toString().toLowerCase().includes(lowerCaseQuery)
                ) {
                    return true;
                }
            }
        }
        return false;
    });
};

export const getJobCodes = () => {
    return database.JobCodes;
};
