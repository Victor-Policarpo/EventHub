# EventHub

EventHub is a commercial freelance project designed to automate stock control and scheduling for an inflatable toy rental business, prioritizing scalability and SaaS-ready architecture.

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

## Technologies
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=Spring-Security&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Apache Maven](https://img.shields.io/badge/Apache%20Maven-C71A36?style=for-the-badge&logo=Apache%20Maven&logoColor=white) 
![Swagger](https://img.shields.io/badge/-Swagger-%23C1E81C?style=for-the-badge&logo=swagger&logoColor=black)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## API Documentation
The API is organized into functional modules. For detailed request/response schemas, please refer to the [Swagger UI](http://localhost:8080/swagger-ui/index.html) after running the application.

| Module | Base Path | Key Features |
| :--- | :--- | :--- |
| **Auth** | `/access` | Registration, Login, Refresh, Password Recovery |
| **User Profile** | `/auth/profile` | Update profile, change password, account management |
| **Parties** | `/auth/parties` | Full lifecycle management (Create, Start, End, Cancel) |
| **Employees** | `/auth/employee` | CRUD operations for staff management |
| **Toys** | `/auth/toys` | Inventory management |
| **Dashboard** | `/auth/finance` | Financial reporting |

### Quick Reference (Key Operations)
* **Auth:** All interactions (Login/Register/Logout) are handled under `/access`.
* **Parties:** The lifecycle is managed via specific PATCH endpoints (e.g., `/parties/{id}/start-party`).
* **Security:** All `/auth/*` endpoints require a valid JWT token.

## API Usage & Business Logic
While the full API specification is available in our [Swagger UI](http://localhost:8080/swagger-ui/index.html), here is an example of the most critical operation in the system: **Party Creation**.

### Create Party (Complex Flow)
This endpoint handles not just data storage, but business rules like default timing and automatic financial calculation.

- **POST /auth/parties**

```json
{
  "name": "Event Name",
  "telephone": "12345678900",
  "address": "R. Example, n123",
  "startDateHours": "2026-10-20T14:30:00",
  "endDateHours": "2026-10-20T20:00:00", 
  "toys": [
    { "toyId": 11, "quantity": 3 }
  ],
  "employeeId": [1, 2]
}
```

### Business Rules:

- endDateHours: Defaults to 4 hours after startDateHours if not provided.

- value: Automatically calculated by the system based on the selected toys and duration.

## Project Status: Fullstack Development
The project is currently evolving into a comprehensive full-stack solution, connecting robust backend services to a modern frontend interface.

- **Backend (Java/Spring Boot):** Stable and fully functional.
- **Frontend (React + TypeScript + Tailwind):** In active development, focusing on core management features and UI/UX improvements.

## Technical Challenges:
- Conflict Resolution: Implemented business logic to prevent double-booking of employees and overlapping party schedules at the same address.

- Database Integrity: optimized complex queries for financial reporting.

- Scalability: Designed the architecture to allow future expansion into a multi-tenant SaaS model.

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
