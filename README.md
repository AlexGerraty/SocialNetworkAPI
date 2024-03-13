# Social Network API

This is a social network API app built using Express.js, MongoDB, and Mongoose. It allows users to interact with each other by creating thoughts, reacting to thoughts, and adding friends.

## Getting Started

To get a local copy of the repository up and running, follow these simple steps.

### Prerequisites

- Node.js
- MongoDB
- Insomnia (for testing API routes)


## Usage

### API Routes

The API has the following routes:

- GET /api/users
- GET /api/users/:id
- POST /api/users
- PUT /api/users/:id
- DELETE /api/users/:id

- GET /api/thoughts
- GET /api/thoughts/:id
- POST /api/thoughts
- PUT /api/thoughts/:id
- DELETE /api/thoughts/:id

- POST /api/users/:userId/friends/:friendId
- DELETE /api/users/:userId/friends/:friendId

- POST /api/thoughts/:thoughtId/reactions
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId

### Testing API Routes

To test the API routes, you can use Insomnia. Here are some example requests:

1. GET /api/users
- This will return all users in the database.

2. GET /api/users/:id
- Replace :id with the user's ID. This will return the user with the specified ID.

3. POST /api/users
- This will create a new user. The request body should include the user's username, email, and password.

4. PUT /api/users/:id
- Replace :id with the user's ID. This will update the user with the specified ID. The request body should include the updated user information.

5. DELETE /api/users/:id
- Replace :id with the user's ID. This will delete the user with the specified ID.

6. POST /api/thoughts
- This will create a new thought. The request body should include the thought's content and the user's ID.

7. PUT /api/thoughts/:id
- Replace :id with the thought's ID. This will update the thought with the specified ID. The request body should include the updated thought information.

8. DELETE /api/thoughts/:id
- Replace :id with the thought's ID. This will delete the thought with the specified ID.

9. POST /api/users/:userId/friends/:friendId
- Replace :userId with the user's ID and :friendId with the friend's ID. This will add the specified friend to the user's friend list.

10. DELETE /api/users/:userId/friends/:friendId
 - Replace :userId with the user's ID and :friendId with the friend's ID. This will remove the specified friend from the user's friend list.

11. POST /api/thoughts/:thoughtId/reactions
 - Replace :thoughtId with the thought's ID. This will create a new reaction for the specified thought. The request body should include the reaction's content and the user's ID.

12. DELETE /api/thoughts/:thoughtId/reactions/:reactionId
 - Replace :thoughtId with the thought's ID and :reactionId with the reaction's ID. This will delete the reaction with the specified ID from the thought.

