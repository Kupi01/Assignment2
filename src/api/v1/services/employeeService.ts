import { FirestoreRepository } from "../repositories/firestoreRepository";
import { Employee } from "../../models/employee";

const employeeRepo = new FirestoreRepository<Employee>("employees");

export async function getAllEmployees() {
  return await employeeRepo.getAll();
}

export async function getEmployeeById(id: string) {
  return await employeeRepo.getById(id);
}

export async function createEmployee(data: Employee) {
  return await employeeRepo.create(data);
}

export async function updateEmployee(id: string, data: Partial<Employee>) {
  return await employeeRepo.update(id, data);
}

export async function deleteEmployee(id: string) {
  return await employeeRepo.delete(id);
}

export async function getEmployeesByBranch(branchId: string) {
  const all = await employeeRepo.getAll();
  return all.filter(e => e.branchId === branchId);
}

export async function getEmployeesByDepartment(department: string) {
  const all = await employeeRepo.getAll();
  return all.filter(e => e.department.toLowerCase() === department.toLowerCase());
}