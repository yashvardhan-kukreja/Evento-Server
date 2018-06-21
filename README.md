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
- Response : {success: true, message: "User details fetched successfully", user: {_id: id, name: name, password: password, email: email, username: username, contact: contact}}
```

Fetching the events in which the user participated
```
- GET /user/fetch/participated-events: Headers ("x-access-token": token)
- Response : {success: true, message: "Participated events fetched", events: outputEvents}
```

Participate(Register) in an event
```
- POST /user/participate: Headers ("x-access-token": token) & Parameters (event_id)
- Response : {success: true, message: "Registered to the event successfully"}
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
- POST /organisation/host-event: Headers ("x-access-token": token) & Parameters (event_name, start_date, end_date, event_location, organisation_id, reg_fees <Array of reg fees>, about, point_of_contacts <Array of point of contacts>)
- Response : {success: true, message: "Event hosted successfully"}
```

Delete an event
```
- POST /organisation/delete-event: Headers ("x-access-token": token)
- Response : {success: true, message: "Event removed successfully"}
```

Add multiple FAQs to an event
```
- POST /organisation/event/add-faqs: Headers ("x-access-token": token) & Parameters (event_id, questions <Array of questions>, answers <Array of answers>)
- Response : {success: true, message: "Added FAQs to the event"}
```

Add an FAQ to an event
```
- POST /organisation/event/add-faqs: Headers ("x-access-token": token) & Parameters (event_id, question, answer)
- Response : {success: true, message: "FAQ added successfully"}
```

Add multiple speakers to an event
```
- POST /organisation/event/add-speakers: Headers ("x-access-token": token) & Parameters (event_id, names <Array of names>, descriptions <Array of descriptions>, img_urls <Array of image URLs>)
- Response : {success: true, message: "Added speakers to the event"}
```

Add a speaker to an event
```
- POST /organisation/event/add-speakers: Headers ("x-access-token": token) & Parameters (event_id, name, description, img_url)
- Response : {success: true, message: "Speaker added successfully"}
```

Add fees to the event
```
- POST /organisation/event/add-fees: Headers ("x-access-token": token) & Parameters (event_id, amount, description)
- Response : {success: true, message: "Fees added successfully"}
```

Modify the 'about' of an event
```
- POST /organisation/event/modify-about: Headers ("x-access-token": token) & Parameters (event_id, about)
- Response : {success: true, message: "Modified 'about' of the event successfully"}
```

Add multiple point of contacts to the event
```
- POST /organisation/event/add-pocs: Headers ("x-access-token": token) & Parameters (event_id, names <Array of names>, contacts <Array of contacts>, emails <Array of emails>)
- Response : {success: true, message: "Point of contacts added successfully"}
```

Add a point of contact to the event
```
- POST /organisation/event/add-pocs: Headers ("x-access-token": token) & Parameters (event_id, name, contact, email)
- Response : {success: true, message: "Added point of contact successfully"}
```

**=> Event Routes:**

Fetching event details (without the list of participants)
```
- POST /event/fetch/info: Parameters (event_id)
- Response : {success: true, message: "Event details fetched successfully", event: outputEvent}
```

Fetching the list of participants (with details) for an event
```
- POST /event/fetch/participants: Parameters (event_id)
- Response : {success:true, message: "Participants fetched successfully", participants: <Array of user objects which are participants in this event>}
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
- event - An event object containing the respective event details along with a list of its participants, hosting organisation, point of contacts and speakers
- faq - An object containing a 'question' field and an 'answer' field
