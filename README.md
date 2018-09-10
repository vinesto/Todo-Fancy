# Todo-Fancy
Portofolio project Todo-Fancy web application using javascript


# BACKEND SERVER
Backed use Express, NodeJs
# BACKEND SERVER REST API DOCUMENTATION

List of user routes:

Route | HTTP | Description | Body Attributes | Headers
--- | --- | --- | --- | ---
/users/register | POST | Register a user | name (string required) : user name,<br/>email (string required) : user email,<br/>password (string required) : user plain password |
/users/login | POST | User login | email (string required) : user email,<br/>password (string required) : user plain password |


List of task routes:

Route | HTTP | Description | Attributes | Headers
--- | --- | --- | --- | ---
/tasks | POST | Create new task to database | title (string required) : task title,<br/>description (file required) : task description | token : a valid user token
/tasks/:id | PUT | Update Task by id| title (string required) : task title,<br/>description (file required) : task description | token : a valid user token
/tasks | GET | Get current user task | | token : a valid user token
/tasks/:id | GET | Get task by id| | token : a valid user token
/tasks/:id | DELETE | Delete user task by id| | token : a valid user token




With only npm:
```
npm install
npm run dev
```

Access the API via `http://localhost:3000/`


