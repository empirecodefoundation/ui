export interface Employee {
  id: number;
  name: string;
  age: number;
  salary: number;
  department: string;
  position: string;
  performance: number;
  joinDate: string;
}

export const sampleData: Employee[] = [
  {
    id: 1,
    name: "John Smith",
    age: 35,
    salary: 85000,
    department: "Engineering",
    position: "Senior Developer",
    performance: 4.5,
    joinDate: "2020-03-15"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    age: 28,
    salary: 72000,
    department: "Marketing",
    position: "Marketing Specialist",
    performance: 4.2,
    joinDate: "2021-06-01"
  },
  {
    id: 3,
    name: "Michael Chen",
    age: 42,
    salary: 120000,
    department: "Engineering",
    position: "Tech Lead",
    performance: 4.8,
    joinDate: "2018-11-20"
  },
  {
    id: 4,
    name: "Emily Davis",
    age: 31,
    salary: 78000,
    department: "HR",
    position: "HR Manager",
    performance: 4.0,
    joinDate: "2022-01-10"
  },
  {
    id: 5,
    name: "David Wilson",
    age: 45,
    salary: 95000,
    department: "Sales",
    position: "Sales Director",
    performance: 4.6,
    joinDate: "2019-08-05"
  },
  {
    id: 6,
    name: "Lisa Anderson",
    age: 26,
    salary: 65000,
    department: "Design",
    position: "UI/UX Designer",
    performance: 4.3,
    joinDate: "2022-03-15"
  },
  {
    id: 7,
    name: "Robert Taylor",
    age: 38,
    salary: 88000,
    department: "Engineering",
    position: "Backend Developer",
    performance: 4.4,
    joinDate: "2020-09-01"
  },
  {
    id: 8,
    name: "Maria Garcia",
    age: 33,
    salary: 82000,
    department: "Finance",
    position: "Financial Analyst",
    performance: 4.7,
    joinDate: "2021-02-15"
  },
  {
    id: 9,
    name: "James Brown",
    age: 29,
    salary: 70000,
    department: "Marketing",
    position: "Content Writer",
    performance: 4.1,
    joinDate: "2022-07-01"
  },
  {
    id: 10,
    name: "Sophia Lee",
    age: 36,
    salary: 90000,
    department: "Engineering",
    position: "Frontend Developer",
    performance: 4.5,
    joinDate: "2020-12-10"
  }
]; 