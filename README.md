# EventHub

EventHub is a backend system for a company that rents inflatable toys for events.\
It allows event creation, employee assignment, and schedule management, with business rules to prevent conflicts.\
Built with Java and Spring Boot using RESTful API principles.

## Features

### Users

* Create new users
* User registration and authentication using JWT
* Secure access to protected endpoints
* Password reset via email token
* Logout functionality with token invalidation

### Parties

* Create new Party linked to users
* Retrieve all Parties stored in the database
* Fetch a specific Party by ID
* Filter parties by status 'SCHEDULED', 'IN_PROGRESS', 'FINISHED', 'CANCELED' and 'TO_ASSEMBLE', 'ASSEMBLED', 'TO_DISASSEMBLE', 'DISASSEMBLED', 'NOT_APPLICABLE'
* Update existing Party details
* Update Party status
* Soft delete parties
* Assign employees to Parties
* Assign toys to Parties

### Employees

* Create new Employee
* Fetch a specific Employee by ID
* Retrieve all Employees stored in the database
* Update existing Employee details
* Delete Employee

### Toys

* Create new Toy
* Fetch a specific Toy by ID
* Retrieve all Toys stored in the database
* Update existing Toy details
* Delete Toy

### Dashboard 

* Retrieve financial reports by date

## Business Rules

- Employees cannot be assigned to multiple parties at the same time
- Parties cannot be scheduled at the same address and time
- Automatic validation of scheduling conflicts
- Passwords are securely stored using hashing

## Technologies
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=Spring-Security&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Apache Maven](https://img.shields.io/badge/Apache%20Maven-C71A36?style=for-the-badge&logo=Apache%20Maven&logoColor=white) 
![Swagger](https://img.shields.io/badge/-Swagger-%23C1E81C?style=for-the-badge&logo=swagger&logoColor=black)
## Endpoints

### Users
| Method | Endpoint | Description |
|-------|----------|------------|
| POST | /users | Register User |
| POST | /users/login | Authenticate User and return JWT |
| POST | /auth/forgot-password | Send password reset email |
| POST | /auth/reset-password | Reset password using email token|

### Parties
| Method | Endpoint | Description |
|-------|----------|------------|
| POST | /auth/parties | Create Party |
| GET | /auth/parties | Filter and List Parties |
| PATCH | /auth/parties/{id} | Update Party |
| DELETE | /auth/parties/{id} | Soft Delete Party | 

### Employees
| Method | Endpoint | Description |
|-------|----------|------------|
| POST | /auth/employee | Create Employee |
| GET | /auth/employee | List all employees |
| PATCH | /auth/employee/{id} | Update Employee |
| DELETE | /auth/employee/{id} | Delete Employee |

### Toys
| Method | Endpoint | Description |
|-------|----------|------------|
| POST | /auth/toys | Create Toy |
| GET | /auth/toys | List toys |
| PATCH | /auth/toys/{id} | Update Toy |
| DELETE | /auth/toys/{id} | Delete Toy |

### Dashboard (only admin access)

| Method | Endpoint | Description |
|-------|----------|------------|
| GET | /auth/finance | Filter financial data by date using query parameters |


## API Usage Examples
###  Create user 

- **POST /users**

```json
{
  "fullName": "NameOfUser",
  "username": "Name Example",
  "email": "yourEmail@gmail.com",
  "password": "@andNumbers123"
}
```

###  Login JWT
- **POST /users/login**

```json
{
  "username": "Name Example",
  "password": "@Example123",
}
```

### Create Party 

- **POST /auth/parties**
```json
{
  "name": "Name of the Party or owner",
  "telephone": "12345678900",
  "address": "R. Example, n123",
  "startDateHours": "2026-10-20T14:30:00",
  "endDateHours": "2026-10-20T20:00:00", 
  "value": 2000.00,
  "toys": [
    {
      "toyId":11,
      "quantity":3
    }
  ],
  "employeeId": [1, 2, 3, 4]
}
```
> Optional fields. If not provided:
> - endDateHours defaults to 4 hours after start time
> - value is calculated based on selected toys
### Create Employee

- **POST /auth/employee**
```json
{
  "name": "Name Example",
  "telephone": "12345678900"
}
```

### Create Toy

- **POST /auth/toys**
```json
{
  "name": "Name Example",
  "valueForFourHours": 400.00,
  "availableQuantity": 5
}
```

## Project Status

Backend complete  
Frontend in development (React + TypeScript)

##  How to run the project

###  Prerequisites
- Java 21
- Maven
- Docker & Docker Compose (Recommended for Database)
### 1. Clone the repository
```bash
git clone https://github.com/Victor-Policarpo/EventHub.git
```
### 2. Configure environment variables
Configure the environment variables according to the file `.env.example`:

#### Database Config
```
POSTGRES_DB=eventhub
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin
DB_URL=jdbc:postgresql://localhost:5432/eventhub
```


#### pgAdmin Config
```
PGADMIN_EMAIL=admin@admin.com
PGADMIN_PASSWORD=admin
```


#### Mail Config
```
MAIL=your_email@gmail.com
MAIL_PASSWORD=your_app_password
```

### 3. Run the application
Execute commands:

```
docker-compose up -d
mvn spring-boot:run
```

The application will be available at:

```http://localhost:8080```

### 4. API Documentation (Swagger)
- After running the application, you can explore and test the endpoints through the Swagger UI:
```
http://localhost:8080/swagger-ui/index.html
```

#### To test protected endpoints:
- Use the `/users` endpoint to register a new user.
- Authenticate via `/users/login` to receive your JWT Token.
- Click the `Authorize` button in Swagger.
- Enter your token in the format: Bearer `your_token_here`

##  Author

Victor Policarpo
- GitHub: [Victor-Policarpo](https://github.com/Victor-Policarpo)
- LinkedIn: [VictorPolicarpo](https://www.linkedin.com/in/victor-policarpo-dev/)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
