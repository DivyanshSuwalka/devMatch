# DevTinder APIs

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

    (- POST /request/send/intrested/:userId
    - POST /request/send/ignored/:userId)
- POST /request/send/:status/:userId 

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter

- GET /connections
- GET /request/received
- GET /feed - gets you profile of other users on platform

Status: ignore, intrested, accepted, rejected.
