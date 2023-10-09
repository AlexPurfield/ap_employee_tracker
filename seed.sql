
INSERT INTO departments (department_name)
VALUES 
('IT'),
('Finance & Accounting'),
('Legal'),
('Operations');

INSERT INTO role (title, salary, department_id)
VALUES
('Full Stack Developer', 80000, 1),
('Software Engineer', 120000, 1),
('Accountant', 10000, 2), 
('Finanical Analyst', 150000, 2),
('Paralegal ', 70000, 3), 
('Lawyer', 90000, 3),
('Junior Developer', 100000, 4),
('Operations Manager', 90000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager)
VALUES 
('Andy', 'Anderson', 2, null),
('Samantha', 'Samsonite', 1, Jane Doe),
('Ben', 'Button', 4, null),
('John', 'Jones', 3, Karen Karen),
('Joseph', 'Carpenter', 6, null),
('Sara', 'Higgins', 5, null),
('Michael', 'Purfield', 7, null),
('Robin', 'Hood', 8, Little John);