# The Drone Service

## The Drone Backend Service API

To get this project running on your machine, follow the steps below:

### Install Node.js and NPM

1.  Visit [Nodejs.org](https://nodejs.org/en/download/) and download the latest LTS node.js
2.  Install Node.js on your machine and make sure it is added to path.
3.  Open your **Command Prompt** or **Terminal** and run the commands below:

```
node --version
```

This will display **v18.16.0** or similar.

```
npm --version
```

This will display **9.5.1** or similar.

**NB:** if the above command does not work, reinstall Node.js by following this [tutorial](https://www.youtube.com/watch?v=JINE4D0Syqw)

### Install MongoDB

1.  Visit [MongoDB.com](https://www.mongodb.com/try/download/community) and download the latest LTS MongoDB
2.  Install MongoDB on your machine and make sure it is added to path.
3.  Open your **Command Prompt** or **Terminal** and run the commands below:

```
mongo --version
```

This will display **MongoDB shell version v6.0.4** or similar.


**NB:** if the above command does not work, reinstall Node.js by following this [tutorial](https://www.youtube.com/watch?v=Ph1Z97X6xno)


Optionally, you can install [MongoDB Compass](https://www.mongodb.com/try/download/compass), a GUI client for Mongo DB by following this [tutorial](https://www.youtube.com/watch?v=VfBQa99kBbQ)

## Project Setup

### Package Installation

To setup the project running, navigate to the project directory via **Command Prompt** or **Terminal** and run the command below:

```
npm install
```

### Env Variables

Rename the **.env.example** at the root directory to **.env**

### Start Development Server

Run the command:

```
npm run dev
```

### Build for Production

Run the command:

```
npm run build
```

### Start Production Server

Run the command:

```
npm run start
```
### Running code formatter (Prettier) 
**Prettier** is the code formatter used, to run the code formatter, execute the following command on the root directory. 
```
npm run prettier
```
### Running code linter (ESLint) 
The code linter used in this project is **ESLint**, to run the code linter, execute the command below. 
```
npm run lint
```

## Project Usage

### API Documentation

This project is documented using swagger. To view this documentation run the server and visit the **HOST:PORT**

Rename the **.env.example** at the root directory to **.env**

### Start Development Server

Run the command:

```
npm run dev
```
Visit **localhost:3000/api/v1/docs** for full API documentation

### Build for Production

Run the command:

```
npm run build
```

### Start Production Server

Run the command:

```
npm run start
```

Visit **HOST:3000/api/v1/docs** for full API documentation