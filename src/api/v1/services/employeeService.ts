import { employees } from "../../../data/employee";
import { Employee } from "../../../models/employee";

let nextId = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1;

export function getAllEmployees(): Employee[] {
  return employees;
}

export function getEmployeeById(id: number): Employee | undefined {
  return employees.find(e => e.id === id);
}

export function createEmployee(data: Omit<Employee, "id">): Employee {
  const newEmployee: Employee = { id: nextId++, ...data };
  employees.push(newEmployee);
  return newEmployee;
}

export function updateEmployee(id: number, updates: Partial<Omit<Employee, "id">>): Employee | undefined {
  const employee = employees.find(e => e.id === id);
  if (!employee) return undefined;
  Object.assign(employee, updates);
  return employee;
}

export function deleteEmployee(id: number): boolean {
  const index = employees.findIndex(e => e.id === id);
  if (index === -1) return false;
  employees.splice(index, 1);
  return true;
}

export function getEmployeesByBranch(branchId: number) {
  return employees.filter(e => e.branchId === branchId);
}

export function getEmployeesByDepartment(department: string) {
  return employees.filter(e => e.department.toLowerCase() === department.toLowerCase());
}