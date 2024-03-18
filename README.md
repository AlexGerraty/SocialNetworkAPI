# Social Network API

This is a RESTful API for a social network application. It allows users to create, read, update, and delete thoughts and reactions.

## Installation

1. To install the application, follow these steps:
2. Clone the repository to your local machine.
3. Install the dependencies by running npm install.
4. Create a .env file in the root directory and add your MongoDB connection string to it.
5. Start the application by running npm start.


## Usage
The application provides the following endpoints:

- GET /api/users: Retrieves all users.
- GET /api/users/:id: Retrieves a single user by ID.
- POST /api/users: Creates a new user.
- PUT /api/users/:id: Updates a user by ID.
- DELETE /api/users/:id: Deletes a user by ID.
- POST /api/users/:userId/friends/:friendId: Adds a friend to a user's friend list.
- DELETE /api/users/:userId/friends/:friendId: Removes a friend from a user's friend list.
- GET /api/thoughts: Retrieves all thoughts.
- GET /api/thoughts/:id: Retrieves a single thought by ID.
- POST /api/thoughts: Creates a new thought.
- PUT /api/thoughts/:id: Updates a thought by ID.
- DELETE /api/thoughts/:id: Deletes a thought by ID.
- POST /api/thoughts/:thoughtId/reactions: Adds a reaction to a thought.
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Removes a reaction from a thought.

## Screenshot

![Screenshot of my website](/SocialNetworkScreenshot.png)

## Demonstration

[Check out my demo!](https://www.loom.com/share/a8650b7b05454e7b99b2aeece0224837/)


