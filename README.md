# Dine-Ease - Restaurant Management Website 🍽️

Dine-Ease is a full-stack restaurant management platform designed to improve the efficiency of food ordering and inventory management. Built using the MERN stack, the website provides functionalities like food management, user authentication, and a seamless user experience for both customers and staff.

![EquiSports Screenshot](https://i.postimg.cc/CxDqmzsR/Screenshot-56.png)

## live project links:
https://dine-ease-aacad.web.app/

## Key Features

- **User Authentication:**
  - Email/password-based login and registration.
  - Google login integration.
  - Password verification (uppercase, lowercase, and minimum length).

- **Food Management:**
  - Add, Update, and Delete food items.
  - View food details on the "All Foods" page.
  - Filter food items using MongoDB’s `$and` operators.

- **Food Purchase:**
  - Users can purchase food with quantity restrictions.
  - Display purchase count for each food item.

- **Gallery Section:**
  - 48 static images with image lightbox functionality using `react-lightbox`.

- **User Profile:**
  - Display logged-in user’s profile image and name.
  - Manage user-specific food items and orders.

- **Responsive Design:**
  - Fully responsive design for mobile, tablet, and desktop.

- **Theme Customization:**
  - Dark/Light theme toggle functionality.

- **Search and Filter:**
  - Search food items by name.
  - Filter food items based on price and origin.

- **Pagination:**
  - Pagination for food items with 9 items per page.

- **JWT Authentication:**
  - JWT tokens for secure private routes.

- **Toast & Sweetalert2 Notifications:**
  - Display notifications for login, registration, and food purchase actions.

- **Food Quantity Management:**
  - Restrict purchases based on available food quantity.
  - Notify users when a food item is out of stock.

- **Gallery Infinite Scrolling:**
  - Infinite scrolling for gallery images.

## Technologies Used

- React.js
- Node.js
- MongoDB
- Express.js
- Firebase Authentication
- React Router
- React Toastify
- Sweetalert2
- Framer Motion
- Lottie-web
- Moment.js
- Axios
- React Query (Tanstack)
- React Rating Stars Component
- React Infinite Scroll Component
- React Lightbox
- FontAwesome

## Dependencies

- **Frontend:**
  - `react`
  - `react-router-dom`
  - `firebase`
  - `axios`
  - `react-toastify`
  - `sweetalert2`
  - `framer-motion`
  - `moment`
  - `react-infinite-scroll-component`
  - `react-lightbox`
  - `react-rating-stars-component`

- **Backend:**
  - `express`
  - `mongoose`
  - `jsonwebtoken`
  - `dotenv`

## Running the Project Locally

### Prerequisites
- Node.js
- MongoDB instance
- Firebase credentials (for authentication)

## Steps to Run Locally

### 1. Clone this repository -
git clone https://github.com/aburaihan98/DineEase-client.git

### 2. Go to the cloned project directory
cd DineEase-client

### 3. Just run this command to install node dependencies
npm install

### 4. Just run this command
npm run dev


