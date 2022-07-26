
INSERT INTO department (name)
VALUES ("Management"), 
	   ("Human Resources"),
       ("Sales"),
       ("Accountancy");
  
INSERT INTO role (title, salary, department_id)
VALUES 	("Manager",8000,1),	
		("Social Worker",200,2),
		("Sales Representative",6000,3),
        ("Acconuntant",4000,4);

  
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 	("Michael","Scott",1, null),
		("Toby","Flenderson",2,1),
        ("Jim","Halpert",3,1),
        ("Dwight","Schrute",3,1),
        ("Andy","Bernard",3,1),
        ("Stanley","Hudson",3,1),
        ("Kevin","Malone",4,1),
        ("Oscar","Nunez",4,1),
        ("Angela","Martin",4,1);