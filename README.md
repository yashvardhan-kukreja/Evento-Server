# Evento - Server Side code

API documentation

## Routes Structure

=> Base URL
   https://ieee-evento.herokuapp.com
   
=> Authentication Routes:

User SignUp
- POST /authenticate/user/register : Parameters (name, email, password, username, contact)
- Response : {success: true, message: "User registered successfully"}

User Login
- POST /authenticate/user/login : Paramters (email, password) or (username, password)
- Response : {success: true, message: "User authenticated successfully", token: token}

Organisation SignUp
- POST /authenticate/organisation/register : Parameters (name, college, email, contact, password)
- Response : {success: true, message: "Organisation registered successfully"}

Organisation Login
- POST /authenticate/organisation/login : Parameters (email, password)
- Response : {success: true, message: "Organisation authenticated successfully", token: token}

=> Variables
token: JSON Web Token containing the user object or the organisation object in encoded form
