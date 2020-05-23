CREATE DATABASE IF NOT EXISTS `hw12`;
USE hw12;
CREATE TABLE IF NOT EXISTS `department` (
    id INT AUTO_INCREMENT, 
    `name` VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS `role` (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT, 
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE IF NOT EXISTS `employee` (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES `role`(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);
