# Evento - Server Side code

API documentation

## Routes Structure

**=> Base URL:**
   https://ieee-evento.herokuapp.com
   
**=> Authentication Routes:**

User SignUp
```
- POST /authenticate/user/register : Parameters (name, email, password, username, contact)
- Response : {success: true, message: "User registered successfully"}
```

User Login
```
- POST /authenticate/user/login : Parameters (email, password) or (username, password)
- Response : {success: true, message: "User authenticated successfully", token: token}
```

Organisation SignUp
```
- POST /authenticate/organisation/register : Parameters (name, college, email, contact, password)
- Response : {success: true, message: "Organisation registered successfully"}
```

Organisation Login
```
- POST /authenticate/organisation/login : Parameters (email, password)
- Response : {success: true, message: "Organisation authenticated successfully", token: token}
```

**=> User Routes:**

Fetching user details
```
- GET /user/fetch/personal-info: Headers ("x-access-token": token)
- Response : {success: true, message: "User details fetched successfully", user: user}
```

Fetching the events in which the user participated
```
- GET /user/fetch/participated-events: Headers ("x-access-token": token)
- Response : {success: true, message: "Participated events fetched", events: outputEvents}
```

Participate(Register) in an event
```
- POST /user/participate: Headers ("x-access-token": token) & Parameters (event_id)
- Response : {success: true, message: "Registered to the event successfully"}```
```

Login to an event (Verifying whether a part of the given event or not)
```
- POST /user/verification: Headers ("x-access-token": token) & Parameters (event_id)
- Response : {success: true, message: "User registered to the event"}```
```

**=> Organisation Routes:**

Fetching organisation details
```
- GET /organisation/fetch/info: Headers ("x-access-token": token)
- Response : {success: true, message: "Organisation details fetched successfully", organisation: organisation}
```

Host an event
```
- POST /organisation/host-event: Headers ("x-access-token": token) & Parameters (event_name, event_date, event_location)
- Response : {success: true, message: "Event hosted successfully"}
```

Delete an event
```
- POST /organisation/delete-event: Headers ("x-access-token": token)
- Response : {success: true, message: "Event removed successfully"}
```

Add multiple FAQs to an event
```
- POST /organisation/add-multiple-faqs: Headers ("x-access-token": token) & Parameters (event_id, questions <Array of questions>, answers <Array of answers>)
- Response : {success: true, message: "Added FAQs to the event"}
```

Add an FAQ to an event
```
- POST /organisation/add-faq: Headers ("x-access-token": token) & Parameters (event_id, question, answer)
- Response : {success: true, message: "FAQ added successfully"}
```

**=> Event Routes:**

Fetching event details
```
- POST /event/fetch/info: Parameters (event_id)
- Response : {success: true, message: "Event details fetched successfully", event: outputEvent}
```

Fetching the FAQs of the given event
```
- POST /event/fetch/faqs: Parameters (event_id)
- Response : {success: true, message: "Fetched all the FAQs for this event", faqs: faqs}
```

**=> Variables:**

- token: JSON Web Token containing the user object or the organisation object in encoded form
- user: A user object containing the respective user details except _id and password
- organisation: An organisation object containing the respective organisation details except _id and password