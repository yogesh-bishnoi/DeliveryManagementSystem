# Delivery Management System API

This is a RESTful API for a Delivery Management System built with **Node.js**, **Express**, and **MongoDB**. It includes role-based authentication using JWT and Swagger documentation.

## Features

- JWT Authentication
- Role-based access for Admin, Captain, and User
- Order placement,and cancellation
- Captain route management
- Payment calculation for captains
- Swagger UI for API testing

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/delivery-management-api.git
cd delivery-management-api
npm install


# Set Up Environment Variables

PORT = 8000
DB_URL = "mongodb://localhost:27017/delivery"
JWT_SECRET = "key"

# Run the Server
nodemon app.js
