# 9am Solution – MERN Stack Authentication & Shop Dashboard

A full-stack MERN application that supports user authentication, session management, and dynamic shop-specific dynamic  subdomains.

##  Repository

Frontend (Vite + React): [https://github.com/rakib-gazi/9am-solution-client](https://github.com/rakib-gazi/9am-solution-client)  
Backend (Express + MongoDB): [https://github.com/rakib-gazi/9am-solution-server](https://github.com/rakib-gazi/9am-solution-server)  
---
## API 

**1. Sign up (POST)**  
https://mern-server-nu.vercel.app/users

**2. Sign In (POST)**  
https://mern-server-nu.vercel.app/auth/signin

**3. Verify Token (POST)**  
https://mern-server-nu.vercel.app/auth/verify-token

**4. Sign Out (POST)**  
https://mern-server-nu.vercel.app/auth/signout

---
## Features

###  1. **Signup Page**
- Signup form includes:
  - Username
  - Password (validated: min 8 characters, at least 1 number and 1 special character)
  - At least 3 Shop Names (stored as an array)
- Shop name validation:
  - Shop names must be **globally unique** across all users.
- Secure password storage and input validation.

###  2. **Signin Page**
- Login using username and password.
- "Remember Me" option:
  - If selected: session lasts **7 days**.
  - Otherwise: session expires in **30 minutes**.
- Validation messages for wrong credentials.

### 3. **Dashboard**
- Simple placeholder dashboard.
- Profile icon dropdown includes:
  - Shop names entered at signup.
  - Logout button with confirmation.

### 4. **Shop-Specific Dashboard with Dynamic Subdomains**
- Clicking a shop name should open a subdomain : worked but not passed Auth info, but token set after reload.

---

## Setup Instructions

### 1. Clone Repos
```
git clone https://github.com/rakib-gazi/9am-solution-client.git
cd 9am-solution-client
```
### 2. Install Dependencies
```
npm install
```
### 2. Run the Client
```
npm run dev
```
---
---

## Tech Stack

| Layer        | Tech                                      |
|--------------|-------------------------------------------|
| Frontend     | React 19, Vite                            |
| Styling      | Tailwind CSS v4, Flowbite                 |
| Routing      | React Router v7                           |
| Forms        | React Hook Form                           |
| API Calls    | Axios                                     |
| Alerts       | SweetAlert2                               |
| Animations   | React Spinners                            |
| Auth         | JWT-based with cookie sessions            |


---
## Live Demo
[https://shop-hub-auth.netlify.app/]

---

Thank You.
