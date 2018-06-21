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
```js
- Sample Response :
{
    "success": true,
    "message": "User authenticated successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJThisIsAFalseTokenJackassCJuYW1lIjoiWWFzaHZhcmRoYW4SupNiggagS3VrcmVqYSIsInVzZXJDamnItFeelsGoodToBeAGangstauYW1lIjoibHVjaTQiCI6Inlhc2gua3VrcmVqYS45OEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRQbFZvcWttYXZ2Qm4vZ2lEd1VKbkZlaUVWZkZhem5lRUlVN2UyV0wuZnpuZ0hqVXlwWm85RyIsImNvbnRhY3QiOiI5OTk5NzEyNDI2IiwiX192IjowLCJpYXQiOjE1Mjk1NjYwNzd9._-1uBi0XfncvddPCsDAav6ZiZX_M6WHEEV0azjUX3l8"
}
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
```js
- Sample Response :
{
    "success": true,
    "message": "Organisation authenticated successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJThisIsAFalseTokenJackassCJuYW1lIjoiWWFzaHZhcmRoYW4SupNiggagS3VrcmVqYSIsInVzZXJDamnItFeelsGoodToBeAGangstauYW1lIjoibHVjaTQiCI6Inlhc2gua3VrcmVqYS45OEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRQbFZvcWttYXZ2Qm4vZ2lEd1VKbkZlaUVWZkZhem5lRUlVN2UyV0wuZnpuZ0hqVXlwWm85RyIsImNvbnRhY3QiOiI5OTk5NzEyNDI2IiwiX192IjowLCJpYXQiOjE1Mjk1NjYwNzd9._-1uBi0XfncvddPCsDAav6ZiZX_M6WHEEV0azjUX3l8"
}
```

**=> User Routes:**

Fetching user details
```
- GET /user/fetch/personal-info: Headers ("x-access-token": token)
- Response : {success: true, message: "User details fetched successfully", user: {_id: id, name: name, password: password, email: email, username: username, contact: contact}}
```
```js
- Sample Response :
{
    "success": true,
    "message": "User details fetched successfully",
    "user": {
        "name": "Yashvardhan Kukreja",
        "username": "luci4",
        "email": "yash.kukreja.98@gmail.com",
        "contact": "9999712426",
        "__v": 0
    }
}
```

Fetching the events in which the user participated
```
- GET /user/fetch/participated-events: Headers ("x-access-token": token)
- Response : {success: true, message: "Participated events fetched", events: outputEvents}
```
```js
- Sample Response :
{
    "success": true,
    "message": "Participated events fetched",
    "events": [
        {
            "about": "Techloop is an IEEE initiative which began with a simple objective: Students Teaching Students. Techloop provides an environment for students to learn from other students by the means of hands-on projects and interactive sessions. As the tagline, ‘stay in the loop’ suggests, Techloop truly keeps the students informed about all the happenings and developments in the technological industry. ITC presents three parallel techloop tracks: Artificial Intelligence, Internet Of Things and Android Application Development. \n",
            "faqs": [],
            "speakers": [],
            "fees": [
                {
                    "_id": "5b0e9c1120b960763fb36aba",
                    "amount": 500,
                    "description": "Day 1 + Day 2 + Day 3 (For IEEE Member)"
                },
                {
                    "_id": "5b0e9d5a20b960763fb36abb",
                    "amount": 400,
                    "description": "Day 2 + Day 3 (For IEEE Member)"
                },
                {
                    "_id": "5b0e9d9720b960763fb36abc",
                    "amount": 600,
                    "description": "Day 1 + Day 2 + Day 3 (For Non IEEE Member)"
                },
                {
                    "_id": "5b0e9db420b960763fb36abd",
                    "amount": 500,
                    "description": "Day 2 + Day 3 (For Non IEEE Member)"
                }
            ],
            "pointOfContacts": [
                {
                    "_id": "5b0ea31ebf14ce789959a55d",
                    "name": "Apoorva Junnuri",
                    "contact": "+919789988683 ",
                    "email": "apoorvajunnuri.30@gmail.com"
                },
                {
                    "_id": "5b0ea31ebf14ce789959a55c",
                    "name": "Ayush Priya",
                    "contact": "+917530000626",
                    "email": "ayushpriya10@ieee.org"
                }
            ],
            "_id": "5b0e9c1120b960763fb36ab9",
            "eventName": "IEEE Techloop Congress",
            "eventStartDate": "03-08-2018",
            "eventEndDate": "05-08-2018",
            "eventLocation": "<Some Auditorium>",
            "hostingOrganisation": {
                "authorized": true,
                "_id": "5b0e9a54c7a5c575988a8536",
                "orgName": "IEEE-VIT",
                "college": "VIT University, Vellore",
                "concernedEmail": "ieee@gmail.com",
                "concernedContact": "+919999712426",
                "password": "$2a$10$NS1KtidJXXAppnFTh0qUh.eRcNVOzo9bBffQLeeYlg.LPD0k3jSQG",
                "__v": 0
            },
            "__v": 0
        }
    ]
}
```

Participate(Register) in an event
```
- POST /user/participate: Headers ("x-access-token": token) & Parameters (event_id)
- Response : {success: true, message: "Registered to the event successfully"}
```

Login to an event (Verifying whether a part of the given event or not)
```
- POST /user/verification: Headers ("x-access-token": token) & Parameters (event_id)
- Response : {success: true, message: "User registered to the event"}
```

**=> Organisation Routes:**

Fetching organisation details
```
- GET /organisation/fetch/info: Headers ("x-access-token": token)
- Response : {success: true, message: "Organisation details fetched successfully", organisation: organisation}
```
```js
- Sample Response :
{
    "success": true,
    "message": "Organisation details fetched successfully",
    "organisation": {
        "authorized": true,
        "orgName": "IEEE-VIT",
        "college": "VIT University, Vellore",
        "concernedEmail": "ieee@gmail.com",
        "concernedContact": "+919999712426",
        "__v": 0
    }
}
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
```js
- Sample Response :
{
    "success": true,
    "message": "Event details fetched successfully",
    "event": {
        "about": "Techloop is an IEEE initiative which began with a simple objective: Students Teaching Students. Techloop provides an environment for students to learn from other students by the means of hands-on projects and interactive sessions. As the tagline, ‘stay in the loop’ suggests, Techloop truly keeps the students informed about all the happenings and developments in the technological industry. ITC presents three parallel techloop tracks: Artificial Intelligence, Internet Of Things and Android Application Development. \n",
        "faqs": [],
        "speakers": [],
        "fees": [
            {
                "_id": "5b0e9c1120b960763fb36aba",
                "amount": 500,
                "description": "Day 1 + Day 2 + Day 3 (For IEEE Member)"
            },
            {
                "_id": "5b0e9d5a20b960763fb36abb",
                "amount": 400,
                "description": "Day 2 + Day 3 (For IEEE Member)"
            },
            {
                "_id": "5b0e9d9720b960763fb36abc",
                "amount": 600,
                "description": "Day 1 + Day 2 + Day 3 (For Non IEEE Member)"
            },
            {
                "_id": "5b0e9db420b960763fb36abd",
                "amount": 500,
                "description": "Day 2 + Day 3 (For Non IEEE Member)"
            }
        ],
        "pointOfContacts": [
            {
                "_id": "5b0ea31ebf14ce789959a55d",
                "name": "Apoorva Junnuri",
                "contact": "+919789988683 ",
                "email": "apoorvajunnuri.30@gmail.com"
            },
            {
                "_id": "5b0ea31ebf14ce789959a55c",
                "name": "Ayush Priya",
                "contact": "+917530000626",
                "email": "ayushpriya10@ieee.org"
            }
        ],
        "_id": "5b0e9c1120b960763fb36ab9",
        "eventName": "IEEE Techloop Congress",
        "eventStartDate": "03-08-2018",
        "eventEndDate": "05-08-2018",
        "eventLocation": "<Some Auditorium>",
        "hostingOrganisation": {
            "authorized": true,
            "_id": "5b0e9a54c7a5c575988a8536",
            "orgName": "IEEE-VIT",
            "college": "VIT University, Vellore",
            "concernedEmail": "ieee@gmail.com",
            "concernedContact": "+919999712426",
            "password": "$2a$10$NS1KtidJXXAppnFTh0qUh.eRcNVOzo9bBffQLeeYlg.LPD0k3jSQG",
            "__v": 0
        },
        "__v": 0
    }
}
```
Fetching the list of participants (with details) for an event
```
- POST /event/fetch/participants: Parameters (event_id)
- Response : {success:true, message: "Participants fetched successfully", participants: <Array of user objects which are participants in this event>}
```
```js
- Sample Response :
{
    "success": true,
    "message": "Participants fetched successfully",
    "participants": [
        {
            "_id": "5abbd86032f6580014e7968c",
            "name": "Yashvardhan Kukreja",
            "username": "luci4",
            "email": "yash.kukreja.98@gmail.com",
            "password": "$2a$10$PlVoqkmavvBn/giDwUJnFeiEVfFazneEIU7e2WL.fzngHjUypZo9G",
            "contact": "9999712426",
            "__v": 0
        }
    ]
}
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
