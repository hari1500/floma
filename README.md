## Steps to run 
### Frontend
1. npm i
2. npm start

### Backend
1. npm i
2. Add .env file at backend/.env
    ```
    PORT=3500
    WS_PORT=3502
    MONGO_URL="<secret_here>"
    ACCESS_TOKEN_SECRET="<secret_here>"
    ```
3. npm run start # For http server
4. npm run start-ws # For ws server

## Dependencies
- MongoDB
- node
- npm

## My specs
- node: v16.20.2
- npm: 8.19.4

## Mongo setup
- Used https://www.mongodb.com/ to start a dev instance
- Sign in
- Let's you create a free database cluster
- copy db connection string and store it in env file. Providing a sample secret
    `mongodb+srv://<username>:<password>@floma.kzpgoro.mongodb.net/?retryWrites=true&w=majority&appName=floma`
