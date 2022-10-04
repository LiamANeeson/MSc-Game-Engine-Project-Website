# Website for MSc Game Engine Group Project (Horizon Game Engine )

This website will allow users to download the game engine as an .exe file.

It will also include:

- Documentation on how to use the HorizonGE 
- Tutorials 
- A list of all the features of the game engine
- A roadmap generator
- A development community section allowing users to post question and discuss using the game engine. 

## How to Use 

### Dependency Installation
Frontend 
```
cd client 
npm i
```

Backend
```
npm i
```

MongoDB
User Can create a cluster via mongoDB website and connect via MongoDB compass
In the .env file change user, password and collection name based on local machine 
Here Database name is: **MSc_Game_Engine_Website**
Collection name: **users** 
``` 
MONGO_URI = 'mongodb+srv://<USERNAME>:<PASSWORD>@msccluster.4g6wc.mongodb.net/<DB_NAME>?retryWrites=true&w=majority'
```

### List of Tasks
- [x] Basic UI Elements
- [x] User Authentication
- [ ] Frontend Login & Register Elements 
- [ ] Profile page
- [ ] Community page
- [ ] Allow logged in users to perform CRUD operations on posts  
- [ ] Like, Comment and Share posts
- [ ] Roadmap generation for different users groups 
- [ ] Populate content on Tutorial, Documentation & Homepages. 
- [ ] Download Game Engine
