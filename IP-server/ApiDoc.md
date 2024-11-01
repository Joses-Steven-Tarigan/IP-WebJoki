# P2-Challenge-1 (Server Side)


My Assets App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

##  RESTful endpoints

List of available endpoints:

    - GET /
    - POST /register
    - POST /login

Routes below need authentication:

    - GET /service/list
    

Routes below need authorization:

    - POST /service/add
    - PUT /service/:id
    - DELETE /service/:id

### 1. GET /

> Menampilkan halaman depan(homepage)



### 2. POST /register

> register akun

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
    "username": "<new username (required)>",
    "email": "<new email(unique)(required)>",
    "password": "<password> (required)",
}
```

_Response (201 - Created)_
```
  {
    "message": "User has been registered" 
  }

```

_Response (400 - Bad Request)_

```
{
  "message": "Email is required!"
}
OR
{
  "message": "Email has been already exist"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required!"
}
OR
{
  "message": "Password min 5 character"
}
OR
{
  "message": "Username is required!"
}
```
### 3. POST /login

> login user

_Request Header_
```
{
  not needed
}
```
_Request Body_
```
{
    "email": "user1@gmail.com",
    "password": "123456"
}
```
Response (201 - Created)_
```
{
    "access_token": "<your access token>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid Email or Password"
}
OR
{
  "message": "Email and Password are required"
}
```
### 4. GET /service/list
> Find all service
Request Header_
```
{
 Authorization: bearer <your access token>
}
```
_Request Body_
```
{
  not needed
}
```
Response (200)_
```
{
        "id": 1,
        "name": "Calla Lily",
        "region": "Mondstadt",
        "price": "190",
        "description": "material for diona and kaeya",
        "imageUrl": "https://rerollcdn.com/GENSHIN/Farming/NEW/Calla_Lily.png",
        "type": "Grinding",
        "createdAt": "2024-10-28T12:49:50.238Z",
        "updatedAt": "2024-10-28T12:49:50.238Z"
},
...
```

_Response (500),(403),(401)_
```
{
  "message": "Internal server error"
}
OR
{
  "message": "You're not authorized"
}
OR
{
  "message": "Invalid Token"
}
```
### 5. POST /service/add
> create new service
Request Header_
```
Authorization: bearer <your access token>
```
_Request Body_
```
{
        "id": 1,
        "name": "<your Material Name>",
        "region": "<material region>",
        "price": "<price>",
        "description": "<description>",
        "imageUrl": "<imageUrl>",
        "type": "Grinding",
       
}
```
Response (201 - Created)_
```
{
    "message": "Service has been created"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Title must fill"
}
OR
{
  "message": "Content must fill"
}
OR
{
  "message": "Invalid Token"
}
OR
{
  "message": "You're not authorized"
}
OR
{
  "message": "Internal server error"
}
```
### 6. PUT /service/:id
> edit service
Request Header_
```
{
  Authorization: bearer <your access token>
}
```
_Request Body_
```
{
        "id": 1,
        "name": "<your Material Name>",
        "region": "<material region>",
        "price": "<price>",
        "description": "<description>",
        "imageUrl": "<imageUrl>",
        "type": "Grinding",
}
```
_Request Params_
```
{
  "id":"<id_service>"
}
```
Response (200)_
```
{
    "message": "Service has been updated"
},
...
```

_Response (500),(403),(404)_
```
{
  "message": "Internal server error"
}
OR
{
  "message": "Invalid Token"
}
OR
{
  "message": "You're not authorized"
}
OR
{
  "message": "service not found"
}
```
### 9. DELETE /service/:id
> delete service
Request Header_
```
{
  Authorization: bearer <your access token>
}
```
_Request Body_
```
{
  no needed
}
```
_Request Params_
```
{
  "id":"<id_service>"
}
```
Response (200)_
```
{
    "message": "Service has been deleted"
},
...
```

_Response (500),(403),(404)_
```
{
  "message": "Internal server error"
}
OR
{
  "message": "Invalid Token"
}
OR
{
  "message": "You're not authorized"
}
OR
{
  "message": "Service not found"
}
```