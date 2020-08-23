INSERT INTO department (dpt_name)
VALUES
    ('Human Resources'),
    ('Sales'),
    ('Development'),
    ('Security');
  
INSERT INTO emp_role (title, salary, department_id)
VALUES
    ('HR Manager', '52000.00', '1'),
    ('Sales Manager', '44000.00', '2'),
    ('Dev Manager', '112000.00', '3'),
    ('Sec Manager', '48000.00', '4'),
    ('HR Rep', '44000.00', '1'),
    ('Sales Rep', '36000.00', '2'),
    ('Jr Dev', '52000.00', '3'),
    ('Front End Dev', '74000.00', '3'),
    ('Back End Dev', '82000.00', '3'),
    ('Full Stack Dev', '90000.00', '3'),
    ('Sec Guard', '37000.00', '4'),
    ('Baba Yaga', '1000000.00', '4');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
      ('Jacob', 'Daughtry', 7, 5),
      ('Grant', 'Emerson', 7, 5),
      ('Melanie', 'Gilman', 7, 5),
      ('Mallory', 'Korpics', 7, 5),
      ('Rhonda', 'Kremer', 3, NULL),
      ('Matt', 'Brooks', 8, 5),
      ('Adam', 'Keyser', 9, 5),
      ('Miguel', 'Villareal', 10, 5),
      ('A A Ron', 'Rodgers', 1, NULL),
      ('John', 'Doe', 5, 1),
      ('Slick', 'Rick', 2, NULL),
      ('Sweaty Palms', 'Steve', 6, 2),
      ('Diamond', 'Dave', 6, 2),
      ('Lauren', 'Bellatora', 6, 2),
      ('John', 'Wick', 12, NULL),
      ('Mike', 'Tyson', 4, NULL),
      ('Jimmy', 'Cricket', 11, 16),
      ('Gene', 'Simmons', 11, 16),
      ('Motor', 'Mike', 11, 16),
      ('Ace', 'Malone', 11, 16);
  