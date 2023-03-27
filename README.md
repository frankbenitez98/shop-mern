# shop-mern
react shop using MERN

# how to start:

1. clone the repository: 
```
git clone https://github.com/frankbenitez98/shop-mern.git
```
2. open the folder and the terminal and let's init the backend
```
cd mern-shop-api
```
3. open mongo compass program and connect in the uri `mongodb://localhost:27017`
4. in the cdm run the following commands for running the backend: 
  ```
  a. npm install
  b. npm run start
  ```
6. to run the seed to fill the DB with test data put the following link in your browser and run it `http://localhost:3001/api/shop/seed`
7. open the fronted folder 
```
cd mern-shop-client
```
8. run the fronted with the followin commands: 
  ```
  yarn install
  yarn dev
  ```
9. open the Fronted Page followin the route `http://127.0.0.1:5173/` and the project is running ;) good look. 

# Facts 
1. for the test the .env of both folders were not hidden, but in case of production should be ignore.
2. the credentials to sign up an admin user is `4455` if you don't want an admin user let it empty. 
3. the new products will be seen in the bottom of the home page. 
 
