# Chatter

Chatter is browser based web chat application mainly developed for Chrome and Firefox, although it is supported in other browsers as well. 
Chatter enables users to sign in by choosing a nickname, this does not require a password, doing so will then take them to a list of rooms which they can then join to connect with others making use of the app.

## Getting Started

A number of things are required for the application in order for it to be run as intended on your system.

### Prerequisites 

Make sure you have the latest version of Angular installed on your system, to see what version of Angular you currently have on you system (if you have it installed already) run the following command in your terminal:

```
ng version
```

If you do not have Angular installed, you will have to install it using a package manager such as npm, bower or your favorite package manager, for now we'll be using npm.

Install the angular-cli globally into your system like so:

```
npm install -g angular-cli
```

then go into the root of the project folder and run:

```
npm install
```
This will ensure you have angular active in the project.

You will also need Websockets, so make sure to install socket.io via npm as well:

```
npm install socket.io
```
After this you should be able to start up the app by running the following command in the client folder:

```
ng serve
```

and the following command in the server folder:

```
node chatserver.js
```

NOTE: The private message is extrememly classified, so classified not even the sender can see the message, only the reciever.
Additionally, when kicking or banning a user, the kick (or ban) is delayed for a few seconds in order for the user in 
question read the chat notification of his ousting.  

