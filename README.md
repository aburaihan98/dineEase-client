### DineEase

"Dine-Ease" aims to provide a seamless restaurant management experience by allowing restaurant owners and staff to efficiently manage food items, customer orders, and online interactions. The platform enables users to browse the menu, place orders, and manage their profiles. It also includes features for inventory management, food item addition, and purchasing, all integrated with Firebase authentication and secure database interactions using MongoDB. The project focuses on user-friendly navigation, responsive design, and ease of use for both customers and staff.

# Live URL

https://abu-raihan-37e40.web.app

# key features

- User Authentication:
  Email/password-based login and registration.
  Google login integration.
  Password verification (uppercase, lowercase, and minimum length).

- Food Management:
  CRUD operations for managing food items (Add, Update).
  Display food items on the "All Foods" page with relevant details.
  Filter food items using MongoDB’s $and operators on the server side.

- Food Purchase:
  Ability to purchase food, including quantity restrictions.
  Display purchase count for each food item.

- Gallery Section:
  Display 48 static images.
  Image lightbox functionality with a library like "react-lightbox."

- User Profile:
  Display logged-in user’s profile image and name.
  Show user-specific orders and food items.
  Option to update food items only for the logged-in user.

- Responsive Design:
  Fully responsive layout for mobile, tablet, and desktop.

- Theme Customization:
  Dark/Light theme toggle functionality for the entire website.

- Search and Filter Functionality:
  Search food items by name and sortByPrice and origin on the All Foods page.

- Pagination:
  Implement pagination for food items on the All Foods page, showing 9 items per page.

- JWT Authentication:
  Use JWT tokens to secure private routes and verify users.

- Toast and Sweetalert2 Notifications:
  Show success or error messages upon actions like successful login, registration, or food purchase.

- Food Quantity Management:
  Restrict purchases based on available quantity.
  Show message when a food item is out of stock.

- Gallery Image Infinite Scrolling:
  Implement infinite scroll on the gallery page to load images as users scroll down.
  Admin Dashboard:

- Separate pages for managing food items, orders, and user information.

- Add/Remove Foods from My Foods Page:
  Allow users to add food items they created and manage them.
  Error Handling:
  Proper error handling for failed login, registration, and food operations.

# npm packages

- emotion/react
- tanstack/react-query
- axios
- firebase
- framer-motion
- lottie-web
- moment
- react-dom
- react-infinite-scroll-component
- react-rating-stars-component
- react-router
- react-router-dom
- react-toastify
- sweetalert2
- yet-another-react-lightbo
- fortawesome/fontawesome-free
