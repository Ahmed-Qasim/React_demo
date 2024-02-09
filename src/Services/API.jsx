import database from "./db";
// Add Employee Function
export const addEmployee = (employee) => {
    const newEmployees = [...database.employees];
    newEmployees.push(employee);
    database.employees = newEmployees;
};

// Get All Employees Function
export const getAllEmployees = () => {
    return database.employees;
};

// Get Employee by ID Function
export const getEmployeeById = (id) => {
    return database.employees.find((employee) => employee.id === id);
};

// Update Employee Function
export const updateEmployee = (id, updatedEmployee) => {
    const index = database.employees.findIndex(
        (employee) => employee.id === id
    );
    if (index !== -1) {
        database.employees[index] = {
            ...database.employees[index],
            ...updatedEmployee,
        };
    }
};

// Delete Employee Function
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
