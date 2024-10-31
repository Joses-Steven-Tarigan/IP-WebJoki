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

### 1. GET /services

> Menampilkan services

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  not needed
}
```

_Response (200)_
```
    {
        "id": 1,
        "name": "Calla Lily",
        "region": "Mondstadt",
        "price": "190",
        "description": "material for diona and kaeya",
        "imageUrl": "https://rerollcdn.com/GENSHIN/Farming/NEW/Calla_Lily.png",
        "type": "Grinding",
        "amount": null,
        "createdAt": "2024-10-28T12:49:50.238Z",
        "updatedAt": "2024-10-28T12:49:50.238Z"
    },
    ...

```

_Response (500)_
```
{
  "message": "Internal server error"
}
```

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