# 🛒 E-Commerce API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens" />
  <img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white" />
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" />
</p>

<p align="center">
  A scalable and secure RESTful E-Commerce API built with Node.js, Express.js, and MongoDB.
</p>

<p align="center">
  Authentication • Products • Orders • Payments • Reviews • Admin Dashboard
</p>

---

## 📖 Overview

E-Commerce API is a complete backend solution for online stores. It provides authentication and authorization, product and category management, shopping cart functionality, order processing, payment integration with Stripe, reviews, coupons, wishlists, and address management.

The project follows a modular architecture and RESTful principles to ensure scalability, maintainability, and clean code organization.

---

## ✨ Features

### 🔐 Authentication & Authorization
- User Registration
- User Login
- Change Password
- JWT Authentication
- Role-Based Access Control (Admin/User)

### 🛍️ Products Management
- Create, Update, Delete Products
- Get Product Details
- Search Products
- Filtering
- Sorting
- Pagination

### 🗂️ Categories & Brands
- Categories Management
- Subcategories Management
- Brands Management

### 🛒 Shopping Cart
- Add Products to Cart
- Update Product Quantity
- Remove Products
- Clear Cart

### ❤️ Wishlist
- Add Products to Wishlist
- Remove Products from Wishlist
- Get Wishlist Products

### 📦 Orders & Payments
- Cash Orders
- Stripe Checkout Session
- Order History
- Order Management

### ⭐ Reviews
- Create Reviews
- Update Reviews
- Delete Reviews
- Product Ratings

### 🎁 Coupons
- Create Coupons
- Apply Discounts
- Update Coupons
- Delete Coupons

### 📍 Address Management
- Add Addresses
- Delete Addresses
- Get User Addresses

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt.js
- Multer
- Cloudinary
- Stripe
- Nodemailer
- Postman

---

## 🏗️ Architecture

The project follows a modular REST API architecture:

```bash
src
├── modules
│   ├── auth
│   ├── user
│   ├── category
│   ├── subCategory
│   ├── brand
│   ├── product
│   ├── cart
│   ├── order
│   ├── coupon
│   ├── review
│   ├── wishlist
│   └── address
├── middlewares
├── utils
├── database
└── app.js
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/Marwankhalill/E-commerce-Route.git
cd E-commerce-Route
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
PORT=3000
DATABASE_URL=your_mongodb_connection_string
JWT_KEY=your_secret_key
JWT_EXPIRES_IN=7d
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

### Run Project

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

## 🔐 Authentication

Protected routes require a JWT token:

```http
Authorization: Bearer <token>
```

---

## 📌 API Modules

- Authentication
- Users
- Categories
- Subcategories
- Brands
- Products
- Cart
- Wishlist
- Orders
- Coupons
- Reviews
- Addresses

---

## 📖 API Documentation

👉 **Postman Documentation:**  
[View API Documentation](https://marwankhalil-4503350.postman.co/workspace/Marwan-Khalil's-Workspace~de8ff09b-c06b-4893-82bf-5c1bf3c305ef/collection/46337352-186b3966-c1b4-46a8-bc12-dffcd830444e?action=share&creator=46337352)

---

## 🌟 Highlights

✅ RESTful API Architecture

✅ JWT Authentication & Authorization

✅ Role-Based Access Control (RBAC)

✅ Search, Filter, Sort & Pagination

✅ Stripe Payment Integration

✅ Image Upload Support

✅ Modular Folder Structure

✅ Scalable and Maintainable Codebase

---

## 👨‍💻 Author

**Marwan Khalil**

- GitHub: https://github.com/Marwankhalill
- LinkedIn: https://www.linkedin.com/in/marwankhalil22/

---

## 📄 License

This project is licensed under the MIT License.
