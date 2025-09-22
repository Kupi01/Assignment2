import { branches } from "../../../data/branch";
import { Branch } from "../../../models/branch";

let nextId = branches.length ? Math.max(...branches.map(b => b.id)) + 1 : 1;

export function getAllBranches(): Branch[] {
  return branches;
}

export function getBranchById(id: number): Branch | undefined {
  return branches.find(b => b.id === id);
}

export function createBranch(data: Omit<Branch, "id">): Branch {
  const newBranch: Branch = { id: nextId++, ...data };
  branches.push(newBranch);
  return newBranch;
}

export function updateBranch(id: number, updates: Partial<Omit<Branch, "id">>): Branch | undefined {
  const branch = branches.find(b => b.id === id);
  if (!branch) return undefined;
  Object.assign(branch, updates);
  return branch;
}

export function deleteBranch(id: number): boolean {
  const index = branches.findIndex(b => b.id === id);
  if (index === -1) return false;
  branches.splice(index, 1);
  return true;
}