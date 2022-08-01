# mern-jwt-auth

Simple MERN App with JWT authentication system.

## Usage

### Installation

Install the dependencies for this application using _yarn_ with these commands.

```
npm run client-install
npm run server-install
```

### Application

#### Development

Running the application (for development).

```
npm run dev
```

#### Production

You can follow these steps to run the application (for production).

1. Build the **client** application.

```
npm run client-build
```

2. Change the static files path to this configuration.

```javascript
// File location: <your_project_directory>/server/config/app.js
// Static files path
static_path: staticPath.client
```

3. Run the server.

```
npm run server
```

## Screenshots

### Tasks

![ScreenShot](https://raw.githubusercontent.com/andikabahari/mern-jwt-auth/master/Screenshot1.png)

### Users (for admin)

**Note: you can change a user's role directly in your database.**

![ScreenShot](https://raw.githubusercontent.com/andikabahari/mern-jwt-auth/master/Screenshot2.png)
