# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

#### Homepage Route
``` GET ./ ```

#### Users Routes
Read all users - ``` GET /users ```
Read specific user - ``` GET /users/:username ```
Create user - ``` POST /users ```
Delete specific user - ``` DELETE /users/:id ```

#### Products Routes
Read all users - ``` GET /products ```
Read specific product - ``` GET /products/:username ```
Create product - ``` POST /products ```
Delete specific product - ``` DELETE /products/:id ```

#### Orders Routes
Read all orders - ``` GET /orders ```
Read orders by user id - ``` GET /orders/:username ```
Create order - ``` POST /orders ```
Delete specific user - ``` DELETE /orders/:id ```

#### Products
- Index 
- Show (args: product name)
- Create (product name, product price) [token required]
- Delete (args: product id) [token required]

#### Users
- Index [token required]
- Show (args: user id) [token required]
- Create (args: first name, last name, password) [token required]
- Delete (args: user id)

#### Orders
- Index
- Show (args: user id)
- Create (args: status, quantity)
- Delete (args: order id) [token required]
- Current Order by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

