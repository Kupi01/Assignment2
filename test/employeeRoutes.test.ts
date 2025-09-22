import request from "supertest";
import app from "src/app";

describe("Employee Logical Operation Routes", () => {
  it("should return all employees for a given branch", async () => {
    const res = await request(app).get("/api/v1/employees/branch/1");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((emp: any) => {
      expect(emp.branchId).toBe(1);
    });
  });

  it("should return all employees for a given department", async () => {
    const res = await request(app).get("/api/v1/employees/department/IT");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((emp: any) => {
      expect(emp.department.toLowerCase()).toBe("it");
    });
  });
});