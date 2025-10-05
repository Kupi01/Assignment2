import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";

export function getAllEmployees(_req: Request, res: Response) {
  res.json(employeeService.getAllEmployees());
}

export function getEmployeeById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const employee = employeeService.getEmployeeById(id);
  if (!employee) return res. status(404).json({ error: "Employee not found" });
  res.json(employee);
}

export function createEmployee(req: Request, res: Response) {
  const { name, position, department, email, phone, branchId } = req.body;
  if (!name || !position || !department || !email || !phone || !branchId) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newEmployee = employeeService.createEmployee({ name, position, department, email, phone, branchId });
  res.status(201).json(newEmployee);
}

export function updateEmployee(req: Request, res: Response) {
  const id = Number(req.params.id);
  const updates = req.body;
  const updated = employeeService.updateEmployee(id, updates);
  if (!updated) return res.status(404).json({ error: "Employee not found" });
  res.json(updated);
}

export function deleteEmployee(req: Request, res: Response) {
  const id = Number(req.params.id);
  const deleted = employeeService.deleteEmployee(id);
  if (!deleted) return res.status(404).json({ error: "Employee not found" });
  res.json({ message: "Employee deleted" });
}

export function getEmployeesByBranch(req: Request, res: Response) {
  const branchId = Number(req.params.branchId);
  if (isNaN(branchId)) {
    return res.status(400).json({ error: "Invalid branch ID" });
  }
  const employees = employeeService.getEmployeesByBranch(branchId);
  res.json(employees);
}

export function getEmployeesByDepartment(req: Request, res: Response) {
  const department = req.params.department;
  if (!department) {
    return res.status(400).json({ error: "Department parameter is required" });
  }
  const employees = employeeService.getEmployeesByDepartment(department);
  res.json(employees);
}