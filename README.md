# Evento - Server Side code

API documentation

## Routes Structure

**=> Base URL:**
   https://ieee-evento.herokuapp.com

**=> Order:**
    </br>
    1). Authentication Routes</br>
    2). User Routes</br>
    3). Coordinator Routes</br>
    4). Organisation Routes</br>
    5). Event Routes</br>

   
**=> Authentication Routes:**

User SignUp
```
- POST /authenticate/user/register : Request Body (name, email, password, username, contact)
```
```js
- Sample Response :
{
    "success": true,
    "message": "User registered successfully"
}
```

User Login
```
- POST /authenticate/user/login : Request Body (email, password) or (username, password)
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
- POST /authenticate/organisation/register : Request Body (name, college, email, contact, password)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Organisation registered successfully"
}
```

Organisation Login
```
- POST /authenticate/organisation/login : Request Body (email, password)
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
- GET /user/fetch/personal-info: Request Headers ("x-access-token": token)
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
- GET /user/fetch/participated-events: Request Headers ("x-access-token": token)
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
- POST /user/participate: Request Headers ("x-access-token": token) & Request Body (event_id)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Registered to the event successfully"
}
```

Login to an event (Verifying whether a part of the given event or not)
```
- POST /user/verification: Request Headers ("x-access-token": token) & Request Body (event_id)
```
```js
- Sample Response if the user is a participant and not a coordinator of that event:
{
    "success": true,
    "message": "User registered to the event",
    "is_coordinator": false,
    "encrypted_id": "3N1dym0EYp+pXGTS2AMe8SWnazAF6O+nGCVzksswMH/kuAttC7DSSQ0hW0rDucg9+vcAZ0GoEE3Kjgjhftpv"
}
// Here, the "encrypted_id" will stored in the qr code in the app
```
```js
- Sample Response if the user is a coordinator of that event
{
    "success": true,
    "message": "User registered to the event",
    "is_coordinator": true
}
```

**=> Coordinator Routes:**

Route for marking a participant as present in a session
```
- POST /coordinator/mark-attendance: Request Headers ("x-access-token": token) & Request Body (session_obj_id, qr_code)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Participant marked present"
}
```

**=> Organisation Routes:**

Fetching organisation details
```
- GET /organisation/fetch/info: Request Headers ("x-access-token": token)
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
- POST /organisation/host-event: Request Headers ("x-access-token": token) & Request Body (event_name, coordinator_emails, start_date, end_date, event_location, reg_fees, point_of_contacts, about, faqs, sponsors)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Event hosted successfully"
}
```

Delete an event
```
- POST /organisation/delete-event: Request Headers ("x-access-token": token) & Request Body (event_id)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Event removed successfully"
}
```

Add multiple FAQs to an event
```
- POST /organisation/event/add-faqs: Request Headers ("x-access-token": token) & Request Body (event_id, questions <Array of questions>, answers <Array of answers>)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Added FAQs to the event"
}
```

Add an FAQ to an event
```
- POST /organisation/event/add-faqs: Request Headers ("x-access-token": token) & Request Body (event_id, question, answer)
```
```js
- Sample Response :
{
    "success": true,
    "message": "FAQ added successfully"
}
```

Add multiple speakers to an event
```
- POST /organisation/event/add-speakers: Request Headers ("x-access-token": token) & Request Body (event_id, names <Array of names>, descriptions <Array of descriptions>, img_urls <Array of image URLs>)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Added speakers to the event"
}
```

Add a speaker to an event
```
- POST /organisation/event/add-speakers: Request Headers ("x-access-token": token) & Request Body (event_id, name, description, img_url)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Speaker added successfully"
}
```

Add fees to the event
```
- POST /organisation/event/add-fees: Request Headers ("x-access-token": token) & Request Body (event_id, amount, description)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Fees added successfully"
}
```

Modify the 'about' of an event
```
- POST /organisation/event/modify-about: Request Headers ("x-access-token": token) & Request Body (event_id, about)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Modified 'about' of the event successfully"
}
```

Add multiple point of contacts to the event
```
- POST /organisation/event/add-pocs: Request Headers ("x-access-token": token) & Request Body (event_id, names <Array of names>, contacts <Array of contacts>, emails <Array of emails>)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Point of contacts added successfully"
}
```

Add a point of contact to the event
```
- POST /organisation/event/add-pocs: Request Headers ("x-access-token": token) & Request Body (event_id, name, contact, email)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Added point of contact successfully"
}
```

Add coordinators to an event
```
- POST /organisation/event/add-coordinators: Request Headers ("x-access-token": token) & Request Body (event_id, coordinator_emails<Array of emails of coordinators>)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Coordinators added to the event"
}
```

Add a single coordinator to an event
```
- POST /organisation/event/add-coordinators: Request Headers ("x-access-token": token) & Request Body (event_id, coordinator_email)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Coordinator added to the event"
}
```

Add a single session to an event
```
- POST /organisation/event/add-single-session: Request Headers ("x-access-token": token) & Request Body (event_id, names, locations, dates, start_times, end_times, types<Array of sessions types. Each of the type is among "Meal", "Swag", "Session", "Others">)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Added a session to the event"
}
```

Add sponsors to an event
```
- POST /event/add-sponsors: Request Headers ("x-access-token": token) & Request Body (names, img_urls)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Sponsors added successfully"
}
```

Add a single sponsor to an event
```
- POST /event/add-sponsors: Request Headers ("x-access-token": token) & Request Body (name, img_url)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Sponsor added successfully"
}
```

**=> Event Routes:**

Fetching event details (without the list of participants)
```
- POST /event/fetch/info: Request Body (event_id)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Event details fetched successfully",
    "event": {
        "eventSessions": [
            {
                "sessionType": "Others",
                "participantsPresent": [
                    "5b2d1d11949eab0014d03f5f"
                ],
                "_id": "5b3a8d290aa8ea00142e0999",
                "name": "Arrival of Dignitaries\nDelegate Registration",
                "date": "03-08-2018",
                "startTime": "8:30 AM",
                "endTime": "10:15 AM",
                "location": "VIT",
                "sessionId": 6752,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Meal",
                "participantsPresent": [],
                "_id": "5b3a909c0aa8ea00142e099a",
                "name": "Tea Break",
                "date": "03-08-2018",
                "startTime": "10:15 AM",
                "endTime": "10:30 AM",
                "location": "VIT",
                "sessionId": 3343,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Others",
                "participantsPresent": [],
                "_id": "5b3a90ef0aa8ea00142e099b",
                "name": "Techloop Session",
                "date": "03-08-2018",
                "startTime": "10:30 AM",
                "endTime": "01:30 PM",
                "location": "VIT",
                "sessionId": 4158,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Meal",
                "participantsPresent": [],
                "_id": "5b3a91170aa8ea00142e099c",
                "name": "Lunch",
                "date": "03-08-2018",
                "startTime": "01:30 PM",
                "endTime": "02:15 PM",
                "location": "VIT",
                "sessionId": 3081,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Others",
                "participantsPresent": [],
                "_id": "5b3a91450aa8ea00142e099d",
                "name": "Techloop Session",
                "date": "03-08-2018",
                "startTime": "02:30 PM",
                "endTime": "04:30 PM",
                "location": "VIT",
                "sessionId": 4177,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Meal",
                "participantsPresent": [],
                "_id": "5b3a915a0aa8ea00142e099e",
                "name": "Tea Break",
                "date": "03-08-2018",
                "startTime": "04:30 PM",
                "endTime": "04:45 PM",
                "location": "VIT",
                "sessionId": 3382,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Others",
                "participantsPresent": [
                    "5b0e9a54c7a5c575988a8536"
                ],
                "_id": "5b3a91750aa8ea00142e099f",
                "name": "Techloop Session",
                "date": "03-08-2018",
                "startTime": "05:00 PM",
                "endTime": "07:00 PM",
                "location": "VIT",
                "sessionId": 4177,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Others",
                "participantsPresent": [
                    "5b0e9a54c7a5c575988a8536",
                    "5abbd86032f6580014e7968c"
                ],
                "_id": "5b3a91cd0aa8ea00142e09a0",
                "name": "Opening Ceremony\nIEEE VIT Presentation",
                "date": "04-08-2018",
                "startTime": "08:30 AM",
                "endTime": "10:00 AM",
                "location": "VIT",
                "sessionId": 6005,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Meal",
                "participantsPresent": [],
                "_id": "5b3a91fc0aa8ea00142e09a1",
                "name": "Tea Break",
                "date": "04-08-2018",
                "startTime": "10:15 AM",
                "endTime": "10:30 AM",
                "location": "VIT",
                "sessionId": 3344,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Others",
                "participantsPresent": [],
                "_id": "5b3a92240aa8ea00142e09a2",
                "name": "Speakers Panel 1",
                "date": "04-08-2018",
                "startTime": "10:30 AM",
                "endTime": "01:20 PM",
                "location": "VIT",
                "sessionId": 3995,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Meal",
                "participantsPresent": [],
                "_id": "5b3a92400aa8ea00142e09a3",
                "name": "Lunch",
                "date": "04-08-2018",
                "startTime": "01:30 PM",
                "endTime": "02:30 PM",
                "location": "VIT",
                "sessionId": 3079,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Others",
                "participantsPresent": [],
                "_id": "5b3a92620aa8ea00142e09a4",
                "name": "Keynote Session For Speakers",
                "date": "04-08-2018",
                "startTime": "02:30 PM",
                "endTime": "04:30 PM",
                "location": "VIT",
                "sessionId": 5272,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Meal",
                "participantsPresent": [],
                "_id": "5b3a92790aa8ea00142e09a5",
                "name": "Tea Break",
                "date": "04-08-2018",
                "startTime": "04:30 PM",
                "endTime": "04:45 PM",
                "location": "VIT",
                "sessionId": 3383,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Others",
                "participantsPresent": [],
                "_id": "5b3a929e0aa8ea00142e09a6",
                "name": "Speakers Panel 2",
                "date": "04-08-2018",
                "startTime": "04:50 PM",
                "endTime": "07:00 PM",
                "location": "VIT",
                "sessionId": 4020,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Others",
                "participantsPresent": [],
                "_id": "5b3a92b80aa8ea00142e09a7",
                "name": "Cultural Night",
                "date": "04-08-2018",
                "startTime": "07:15 PM",
                "endTime": "-",
                "location": "VIT",
                "sessionId": 3565,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Others",
                "participantsPresent": [],
                "_id": "5b3a92f00aa8ea00142e09a8",
                "name": "IEEE SB Presentation",
                "date": "05-08-2018",
                "startTime": "09:00 AM",
                "endTime": "10:00 AM",
                "location": "VIT",
                "sessionId": 4314,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Meal",
                "participantsPresent": [],
                "_id": "5b3a93040aa8ea00142e09a9",
                "name": "Tea Break",
                "date": "05-08-2018",
                "startTime": "10:15 AM",
                "endTime": "10:30 AM",
                "location": "VIT",
                "sessionId": 3345,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Others",
                "participantsPresent": [],
                "_id": "5b3a93200aa8ea00142e09aa",
                "name": "Speakers",
                "date": "05-08-2018",
                "startTime": "10:30 AM",
                "endTime": "01:20 PM",
                "location": "VIT",
                "sessionId": 3387,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Meal",
                "participantsPresent": [],
                "_id": "5b3a933c0aa8ea00142e09ab",
                "name": "Lunch",
                "date": "05-08-2018",
                "startTime": "01:30 PM",
                "endTime": "02:30 PM",
                "location": "VIT",
                "sessionId": 3080,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Others",
                "participantsPresent": [],
                "_id": "5b3a93640aa8ea00142e09ac",
                "name": "Speakers",
                "date": "05-08-2018",
                "startTime": "02:40 PM",
                "endTime": "04:40 PM",
                "location": "VIT",
                "sessionId": 3409,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Meal",
                "participantsPresent": [],
                "_id": "5b3a93810aa8ea00142e09ad",
                "name": "Tea Break",
                "date": "05-08-2018",
                "startTime": "04:45 PM",
                "endTime": "05:00 PM",
                "location": "VIT",
                "sessionId": 3382,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            },
            {
                "sessionType": "Others",
                "participantsPresent": [],
                "_id": "5b3a93a40aa8ea00142e09ae",
                "name": "Memento Presentation",
                "date": "05-08-2018",
                "startTime": "05:00 PM",
                "endTime": "-",
                "location": "VIT",
                "sessionId": 4209,
                "eventId": "ieee_techloop_congress",
                "__v": 0
            }
        ],
        "coordinatorEmails": [
            "ayushpriya10@ieee.org"
        ],
        "about": "The IEEE Techloop Congress is a place for people to come together, collaborate and network. With informative and engaging technical sessions on some of the most promising areas of technology like Artificial Intelligence , Blockchain Technology and Robotics, this is a place where future innovators and enthusiasts can grow, learn, and discuss their ideas. With some of the most knowledgeable and reputed speakers from all around the country present, ITC is bound to be the best place for delegates to gain experience from some of the best in their field.\nTechloop is an IEEE initiative which began with a simple objective: Students Teaching Students. Techloop provides an environment for students to learn from other students by the means of hands-on projects and interactive sessions. As the tagline, stay in the loop suggests, Techloop truly keeps the students informed about all the happenings and developments in the technological industry. ITC presents three parallel techloop tracks: Artificial Intelligence, Internet Of Things and Android Application Development. \n",
        "faqs": [
            {
                "_id": "5b392e41b0250000141941b2",
                "question": "What is Techloop?",
                "answer": "Techloop is an IEEE initiative which began with a simple objective: Students Teaching Students. Techloop provides an environment for students to learn from other students by the means of hands-on projects and interactive sessions."
            },
            {
                "_id": "5b392e41b0250000141941b1",
                "question": "Can I just attend just the Congress and not the Techloop Workshop?",
                "answer": "Yes, you can attend just the Congress on day 2 and 3. The registration fee for the same is mentioned on our website."
            },
            {
                "_id": "5b392e41b0250000141941b0",
                "question": "Can I attend two Techloop Workshops?",
                "answer": "ITC offers three parallel Techloop tracks: Machine Learning, Internet Of Things and Android Application Development. Since these will be occurring simultaneously, you cannot participate in two Techloop tracks."
            },
            {
                "_id": "5b392e41b0250000141941af",
                "question": "Will I require my laptop for Techloop?",
                "answer": "Yes, we recommend delegates to carry their laptops as the Techloop sessions are hands-on and project based."
            },
            {
                "_id": "5b392e41b0250000141941ae",
                "question": "How do I pay my registration fee?",
                "answer": "Registration for ITC is three-step process. The first step is to fill the delegate form on our website, after which each candidate will go through a screening process. Once your registration is confirmed, you will receive the link to pay via email."
            },
            {
                "_id": "5b392e41b0250000141941ad",
                "question": "What accommodation is provided to the delegates?",
                "answer": "ITC will not be providing accommodation to its delegates, but will provide assistance and various discounts for your stay in hotels near VIT, Vellore."
            },
            {
                "_id": "5b392e41b0250000141941ac",
                "question": "Will food be provided to the delegates?",
                "answer": "Yes, we will be providing food to the delegates during the course of ITC."
            }
        ],
        "speakers": [
            {
                "_id": "5b392c1fb0250000141941ab",
                "name": "Abhijith Naraparaju",
                "description": "Director, Global Blockchain Foundation",
                "image_url": "http://itc.ieeevit.com/images/AbhijithN.jpg"
            },
            {
                "_id": "5b392c1fb0250000141941aa",
                "name": "Aharsh MS",
                "description": "Co-Founder, Accubits Technologies",
                "image_url": "http://itc.ieeevit.com/images/AharshM.jpg"
            },
            {
                "_id": "5b392c1fb0250000141941a9",
                "name": "Dipanjan Sarkar",
                "description": "Data Scientist, Intel",
                "image_url": "http://itc.ieeevit.com/images/DipanjanS.jpg"
            },
            {
                "_id": "5b392c1fb0250000141941a8",
                "name": "Sandeep Bhagat",
                "description": "Assoc. Partner & Service Line Leader, IBM",
                "image_url": "http://itc.ieeevit.com/images/SandeepB.jpg"
            },
            {
                "_id": "5b392c1fb0250000141941a7",
                "name": "Saurav Kaushik",
                "description": "Data Scientist, Uber",
                "image_url": "http://itc.ieeevit.com/images/SauravK.jpg"
            },
            {
                "_id": "5b392c1fb0250000141941a6",
                "name": "Seera Dileep Raju",
                "description": "Data Scientist, IBM",
                "image_url": "http://itc.ieeevit.com/images/SeeraD.jpg"
            },
            {
                "_id": "5b392c1fb0250000141941a5",
                "name": "Shailesh Kumar",
                "description": "Chief Data Scientist, Jio",
                "image_url": "http://itc.ieeevit.com/images/ShaileshK.jpg"
            },
            {
                "_id": "5b392c1fb0250000141941a4",
                "name": "Srinivas Atreya",
                "description": "Advanced Analytics Leader, eAutomation",
                "image_url": "http://itc.ieeevit.com/images/SrinivasA.jpg"
            },
            {
                "_id": "5b392c1fb0250000141941a3",
                "name": "Surya Putchala",
                "description": "CEO & Founder, ZettaMine Labs",
                "image_url": "http://itc.ieeevit.com/images/SuryaP.jpg"
            },
            {
                "_id": "5b392c1fb0250000141941a2",
                "name": "Varun Kohli",
                "description": "Data Scientist & Senior Strategist, Google",
                "image_url": "http://itc.ieeevit.com/images/varunK.jpg"
            },
            {
                "_id": "5b392c1fb0250000141941a1",
                "name": "Varun Thamba",
                "description": "Sr Advanced Analytics & ML Architect, SAP",
                "image_url": "http://itc.ieeevit.com/images/varunT.jpg"
            },
            {
                "_id": "5b392c1fb0250000141941a0",
                "name": "Vinay Kumar",
                "description": "Founder, Arya.ai",
                "image_url": "http://itc.ieeevit.com/images/vinayK.jpg"
            }
        ],
        "sponsors": [
            {
                "_id": "5b47c96d8b203d00144e04aa",
                "name": "IEEE Madras Section",
                "img_url": "http://itc.ieeevit.com/images/ms.png"
            },
            {
                "_id": "5b47c96d8b203d00144e04a9",
                "name": "IEEE Region 10",
                "img_url": "http://itc.ieeevit.com/images/r10.png"
            },
            {
                "_id": "5b47c96d8b203d00144e04a8",
                "name": "IEEE PSES",
                "img_url": "http://itc.ieeevit.com/images/ieeepses.png"
            },
            {
                "_id": "5b47c96d8b203d00144e04a7",
                "name": "IEEE Young Professionals",
                "img_url": "http://itc.ieeevit.com/images/ieeeyp.png"
            },
            {
                "_id": "5b47c96d8b203d00144e04a6",
                "name": "Darling Residency",
                "img_url": "http://itc.ieeevit.com/images/dr.png"
            },
            {
                "_id": "5b47c96d8b203d00144e04a5",
                "name": "GRT Hotels",
                "img_url": "http://itc.ieeevit.com/images/grt.png"
            }
        ],
        "fees": [
            {
                "legitParticipants": [],
                "_id": "5b0e9c1120b960763fb36aba",
                "amount": 500,
                "description": "Day 1 + Day 2 + Day 3 (For IEEE Member)"
            },
            {
                "legitParticipants": [],
                "_id": "5b0e9d5a20b960763fb36abb",
                "amount": 400,
                "description": "Day 2 + Day 3 (For IEEE Member)"
            },
            {
                "legitParticipants": [],
                "_id": "5b0e9d9720b960763fb36abc",
                "amount": 600,
                "description": "Day 1 + Day 2 + Day 3 (For Non IEEE Member)"
            },
            {
                "legitParticipants": [],
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
        "eventId": "ieee_techloop_congress",
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
- POST /event/fetch/participants: Request Body (event_id)
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
- POST /event/fetch/faqs: Request Body (event_id)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Fetched all the FAQs for this event",
    "faqs": [
        {
            "_id": "5b392e41b0250000141941b2",
            "question": "What is Techloop?",
            "answer": "Techloop is an IEEE initiative which began with a simple objective: Students Teaching Students. Techloop provides an environment for students to learn from other students by the means of hands-on projects and interactive sessions."
        },
        {
            "_id": "5b392e41b0250000141941b1",
            "question": "Can I just attend just the Congress and not the Techloop Workshop?",
            "answer": "Yes, you can attend just the Congress on day 2 and 3. The registration fee for the same is mentioned on our website."
        },
        {
            "_id": "5b392e41b0250000141941b0",
            "question": "Can I attend two Techloop Workshops?",
            "answer": "ITC offers three parallel Techloop tracks: Machine Learning, Internet Of Things and Android Application Development. Since these will be occurring simultaneously, you cannot participate in two Techloop tracks."
        },
        {
            "_id": "5b392e41b0250000141941af",
            "question": "Will I require my laptop for Techloop?",
            "answer": "Yes, we recommend delegates to carry their laptops as the Techloop sessions are hands-on and project based."
        },
        {
            "_id": "5b392e41b0250000141941ae",
            "question": "How do I pay my registration fee?",
            "answer": "Registration for ITC is three-step process. The first step is to fill the delegate form on our website, after which each candidate will go through a screening process. Once your registration is confirmed, you will receive the link to pay via email."
        },
        {
            "_id": "5b392e41b0250000141941ad",
            "question": "What accommodation is provided to the delegates?",
            "answer": "ITC will not be providing accommodation to its delegates, but will provide assistance and various discounts for your stay in hotels near VIT, Vellore."
        },
        {
            "_id": "5b392e41b0250000141941ac",
            "question": "Will food be provided to the delegates?",
            "answer": "Yes, we will be providing food to the delegates during the course of ITC."
        }
    ]
}
```

Fetching the participants present in a session of an event
```
- POST /event/session/fetch/participants : Request Body (session_obj_id)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Participants present fetched",
    "participants": [
        {
            "_id": "5b2d1d11949eab0014d03f5f",
            "name": "Lama Pixie",
            "username": "Lamapixie",
            "email": "lama@fxprix.com",
            "password": "$2a$10$YR0demF53nvmEKumMe.b3.rbwN3cl.dj4IJ44pE2K.BKo2xKeLSum",
            "contact": "9876543210",
            "__v": 0
        }
    ]
}
```

Fetching the participants present in a session of an event
```
- POST /event/fetch/sessions : Request Body (event_id)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Event sessions fetched",
    "sessions": [
        {
            "sessionType": "Others",
            "participantsPresent": [
                "5b2d1d11949eab0014d03f5f"
            ],
            "_id": "5b3a8d290aa8ea00142e0999",
            "name": "Arrival of Dignitaries\nDelegate Registration",
            "date": "03-08-2018",
            "startTime": "8:30 AM",
            "endTime": "10:15 AM",
            "location": "VIT",
            "sessionId": 6752,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Meal",
            "participantsPresent": [],
            "_id": "5b3a909c0aa8ea00142e099a",
            "name": "Tea Break",
            "date": "03-08-2018",
            "startTime": "10:15 AM",
            "endTime": "10:30 AM",
            "location": "VIT",
            "sessionId": 3343,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Others",
            "participantsPresent": [],
            "_id": "5b3a90ef0aa8ea00142e099b",
            "name": "Techloop Session",
            "date": "03-08-2018",
            "startTime": "10:30 AM",
            "endTime": "01:30 PM",
            "location": "VIT",
            "sessionId": 4158,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Meal",
            "participantsPresent": [],
            "_id": "5b3a91170aa8ea00142e099c",
            "name": "Lunch",
            "date": "03-08-2018",
            "startTime": "01:30 PM",
            "endTime": "02:15 PM",
            "location": "VIT",
            "sessionId": 3081,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Others",
            "participantsPresent": [],
            "_id": "5b3a91450aa8ea00142e099d",
            "name": "Techloop Session",
            "date": "03-08-2018",
            "startTime": "02:30 PM",
            "endTime": "04:30 PM",
            "location": "VIT",
            "sessionId": 4177,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Meal",
            "participantsPresent": [],
            "_id": "5b3a915a0aa8ea00142e099e",
            "name": "Tea Break",
            "date": "03-08-2018",
            "startTime": "04:30 PM",
            "endTime": "04:45 PM",
            "location": "VIT",
            "sessionId": 3382,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Others",
            "participantsPresent": [
                "5b0e9a54c7a5c575988a8536"
            ],
            "_id": "5b3a91750aa8ea00142e099f",
            "name": "Techloop Session",
            "date": "03-08-2018",
            "startTime": "05:00 PM",
            "endTime": "07:00 PM",
            "location": "VIT",
            "sessionId": 4177,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Others",
            "participantsPresent": [
                "5b0e9a54c7a5c575988a8536",
                "5abbd86032f6580014e7968c"
            ],
            "_id": "5b3a91cd0aa8ea00142e09a0",
            "name": "Opening Ceremony\nIEEE VIT Presentation",
            "date": "04-08-2018",
            "startTime": "08:30 AM",
            "endTime": "10:00 AM",
            "location": "VIT",
            "sessionId": 6005,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Meal",
            "participantsPresent": [],
            "_id": "5b3a91fc0aa8ea00142e09a1",
            "name": "Tea Break",
            "date": "04-08-2018",
            "startTime": "10:15 AM",
            "endTime": "10:30 AM",
            "location": "VIT",
            "sessionId": 3344,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Others",
            "participantsPresent": [],
            "_id": "5b3a92240aa8ea00142e09a2",
            "name": "Speakers Panel 1",
            "date": "04-08-2018",
            "startTime": "10:30 AM",
            "endTime": "01:20 PM",
            "location": "VIT",
            "sessionId": 3995,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Meal",
            "participantsPresent": [],
            "_id": "5b3a92400aa8ea00142e09a3",
            "name": "Lunch",
            "date": "04-08-2018",
            "startTime": "01:30 PM",
            "endTime": "02:30 PM",
            "location": "VIT",
            "sessionId": 3079,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Others",
            "participantsPresent": [],
            "_id": "5b3a92620aa8ea00142e09a4",
            "name": "Keynote Session For Speakers",
            "date": "04-08-2018",
            "startTime": "02:30 PM",
            "endTime": "04:30 PM",
            "location": "VIT",
            "sessionId": 5272,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Meal",
            "participantsPresent": [],
            "_id": "5b3a92790aa8ea00142e09a5",
            "name": "Tea Break",
            "date": "04-08-2018",
            "startTime": "04:30 PM",
            "endTime": "04:45 PM",
            "location": "VIT",
            "sessionId": 3383,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Others",
            "participantsPresent": [],
            "_id": "5b3a929e0aa8ea00142e09a6",
            "name": "Speakers Panel 2",
            "date": "04-08-2018",
            "startTime": "04:50 PM",
            "endTime": "07:00 PM",
            "location": "VIT",
            "sessionId": 4020,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Others",
            "participantsPresent": [],
            "_id": "5b3a92b80aa8ea00142e09a7",
            "name": "Cultural Night",
            "date": "04-08-2018",
            "startTime": "07:15 PM",
            "endTime": "-",
            "location": "VIT",
            "sessionId": 3565,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Others",
            "participantsPresent": [],
            "_id": "5b3a92f00aa8ea00142e09a8",
            "name": "IEEE SB Presentation",
            "date": "05-08-2018",
            "startTime": "09:00 AM",
            "endTime": "10:00 AM",
            "location": "VIT",
            "sessionId": 4314,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Meal",
            "participantsPresent": [],
            "_id": "5b3a93040aa8ea00142e09a9",
            "name": "Tea Break",
            "date": "05-08-2018",
            "startTime": "10:15 AM",
            "endTime": "10:30 AM",
            "location": "VIT",
            "sessionId": 3345,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Others",
            "participantsPresent": [],
            "_id": "5b3a93200aa8ea00142e09aa",
            "name": "Speakers",
            "date": "05-08-2018",
            "startTime": "10:30 AM",
            "endTime": "01:20 PM",
            "location": "VIT",
            "sessionId": 3387,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Meal",
            "participantsPresent": [],
            "_id": "5b3a933c0aa8ea00142e09ab",
            "name": "Lunch",
            "date": "05-08-2018",
            "startTime": "01:30 PM",
            "endTime": "02:30 PM",
            "location": "VIT",
            "sessionId": 3080,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Others",
            "participantsPresent": [],
            "_id": "5b3a93640aa8ea00142e09ac",
            "name": "Speakers",
            "date": "05-08-2018",
            "startTime": "02:40 PM",
            "endTime": "04:40 PM",
            "location": "VIT",
            "sessionId": 3409,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Meal",
            "participantsPresent": [],
            "_id": "5b3a93810aa8ea00142e09ad",
            "name": "Tea Break",
            "date": "05-08-2018",
            "startTime": "04:45 PM",
            "endTime": "05:00 PM",
            "location": "VIT",
            "sessionId": 3382,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        },
        {
            "sessionType": "Others",
            "participantsPresent": [],
            "_id": "5b3a93a40aa8ea00142e09ae",
            "name": "Memento Presentation",
            "date": "05-08-2018",
            "startTime": "05:00 PM",
            "endTime": "-",
            "location": "VIT",
            "sessionId": 4209,
            "eventId": "ieee_techloop_congress",
            "__v": 0
        }
    ]
}
```

Fetching the sponsors of an event
```
- POST /event/fetch/sponsors : Request Body (event_id)
```
```js
- Sample Response :
{
    "success": true,
    "message": "Sponsors fetched successfully",
    "sponsors": [
        {
            "_id": "5b47c96d8b203d00144e04aa",
            "name": "IEEE Madras Section",
            "img_url": "http://itc.ieeevit.com/images/ms.png"
        },
        {
            "_id": "5b47c96d8b203d00144e04a9",
            "name": "IEEE Region 10",
            "img_url": "http://itc.ieeevit.com/images/r10.png"
        },
        {
            "_id": "5b47c96d8b203d00144e04a8",
            "name": "IEEE PSES",
            "img_url": "http://itc.ieeevit.com/images/ieeepses.png"
        },
        {
            "_id": "5b47c96d8b203d00144e04a7",
            "name": "IEEE Young Professionals",
            "img_url": "http://itc.ieeevit.com/images/ieeeyp.png"
        },
        {
            "_id": "5b47c96d8b203d00144e04a6",
            "name": "Darling Residency",
            "img_url": "http://itc.ieeevit.com/images/dr.png"
        },
        {
            "_id": "5b47c96d8b203d00144e04a5",
            "name": "GRT Hotels",
            "img_url": "http://itc.ieeevit.com/images/grt.png"
        }
    ]
}
```



**=> Variables:**

- token: JSON Web Token containing the user object or the organisation object in encoded form
- user: A user object containing the respective user details except _id and password
- organisation: An organisation object containing the respective organisation details except _id and password
- event - An event object containing the respective event details along with a list of its participants, hosting organisation, point of contacts and speakers
- faq - An object containing a 'question' field and an 'answer' field
