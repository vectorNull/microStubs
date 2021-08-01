# microStubs - Using An Event-driven Microservice Architecture <a name='table_of_contents'></a>

![](https://img.shields.io/badge/API-REST-informational?style=flat&logo=<jose>&logoColor=white&color=99ffff)
![](https://img.shields.io/badge/architecture-eventDriven-informational?style=flat&logo=<jose>&logoColor=white&color=99ffff)
![](https://img.shields.io/badge/architecture-microservice-informational?style=flat&logo=<jose>&logoColor=white&color=99ffff)
![](https://img.shields.io/badge/containers-docker-informational?style=flat&logo=<jose>&logoColor=white&color=99ffff)
![](https://img.shields.io/badge/orchestration-kubernetes-informational?style=flat&logo=<jose>&logoColor=white&color=99ffff)

Another microservice-focused application that will allow users to sell and purchase event tickets. I will be using production-grade authentication, custom error-handling, and StripeJS. More details will unfold as I develop the app. Keep a weather-eye on this README for updates...

Table of Contents:

[User Stories](#userstories)

[Data Models](#datamodels)

[Services](#services)

[Events](#events)

[Overall Application Layout and Tech Used](#overall)

[The Auth Service](#auth)

[Why JWT For Authentication / Authorization?](#JWT)

[NextJS, Server-Side Rendering, and JSON Web Tokens](#nextJS)

[Error Handling in a Microservice App](#error_handling)

## User Stories <a name='userstories'></a>

-   User can list a ticket for an event(sports, concerts, etc) for sale.
-   Other users can purchase this ticket
-   Any user can list tickets for sale and purchase tickets
-   When a user attempts to purchase a ticket, the ticket is 'locked' for 15 minutes. The user has 15 minutes to enter their payment info.
-   While locked, no other user can purchase the ticket. After 15 minutes, the ticket should unlock.
-   Ticket prices can be edited if they are not locked.

## Data Models <a name='datamodels'></a>

![ticketAppDataModels](https://user-images.githubusercontent.com/50179896/127247053-8d646eab-e4fb-4169-9316-a06055878e49.png)
[Top of README](#table_of_contents)

## Services <a name='services'></a>

![services](https://user-images.githubusercontent.com/50179896/127251381-c94880ca-cc52-487a-9b29-f5e2fc231f29.png)
[Top of README](#table_of_contents)

## Events <a name='events'></a>

![events](https://user-images.githubusercontent.com/50179896/127252626-0d791bc5-d3eb-45f2-810e-044136379a78.png)
[Top of README](#table_of_contents)

## Overall Application Layout and Tech Used <a name='overall'></a>

![overall](https://user-images.githubusercontent.com/50179896/127253967-dcd3bc82-1757-4908-bde1-21258257ee5e.png)
[Top of README](#table_of_contents)

## The Auth Service <a name='auth'></a>

![authService](https://user-images.githubusercontent.com/50179896/127380322-04aef378-a82c-4030-b602-4b3209c408f1.png)
![authServiceDetails](https://user-images.githubusercontent.com/50179896/127726997-53d1b9b3-b5aa-4045-a5c3-f31d9dee3887.png)

### Security Issue
There is a major security issue that needs to be addressed. How do we address the issue of banned users in this application? (That, of course, is just one of many security issues)

By nature, microservices are decoupled services. That is, they do not directly communicate with one another. And to maintain this type of architecture and make sure is does not morph into something different, services must be autonomous. That presents a fundamental problem when it comes to security and authentication.

Imagine that a admin wishes to ban a particular user who has a valid JWT token, coookie, or is otherwise currently authenticated by the auth service. If that user is already authenticated, how do we communicate to the other services (which are decoupled from that auth service) that the user is banned? There is really no perfect solution to this issue that I'm aware of. This is something that needs to be considered when designing microservices. Developers coould implement an expiration date or time on cookies/JWT tokes and send an event (BannedUserEvent, for example) via the Event Bus to the other services that would block banned users from interacting with those services. However, I won't be doing that here. Main reason: I don't know how :) That's something I will research for future projects.

## Why JWT For Authentication / Authorization? <a name='JWT'></a>

Several requirements are needed to secure the auth service from malicious users. First, whatever auth method we use must be able to communicate information about the user and handle authorization as well. One way or another, we need to be able to distinguish between a regular user with limited permissions and an administrator. We must also have a built-in, tamper resistant way to expire or invalidate whatever we use for authentication. And, in keeping with the standard microservice architecture, the auth method must be easily understood by different tech stacks since other services may be built using different languages and/or frameworks. 

All of this points to the use of [JSON Web Tokens](https://jwt.io/).

[Top of README](#table_of_contents)

## NextJS, Server-Side Rendering, and JWT <a name='nextJS'></a>

In a "normal" React application, when a user initiates a request for a particular server resource, React sends HTML that usually includes script tags. Then a request is made for that JavaScript so that it may be loaded into the browser. It is in those scripts that our authentication mechanism is implmented. So, only then can we then receive our JWT for authentication / authorization.

We have a different issue with NextJS. By using the [NextJS](https://nextjs.org/) framework, all the rendering is done on the server and the browser only receives a fully-rendered page. The browser will not have the JavaScript before hand to implement the authentication method in the browser. This means that we cannot append a custom header to the response beforehand, nor can we add a custom token to the body of the response because that would require code that the browser will not have. The only option we have (or that I'm aware of at the moment) is to use the Cookie tranport mechanism to communicate the JWT during the initial page load. So, I'll be using a Cookie to communicate a JWT and impliment that with the [cookie-session npm package](https://www.npmjs.com/package/cookie-session).

[Top of README](#table_of_contents)

## Error Handling in a Microservice App <a name='error_handling'></a>

Microservice architecture allows for the use of different tech stacks for engineering different services. We could have one service built using NodeJS and another using Ruby On Rails. In this project, I'm using Node-Express for my project and express-validator to handle my validation. But in the future, if I wanted to add an additional service using a different stack, my error responses would be different than those sent by express-validator.

To remedy this issue and not place the burden on the front-end folks, we should attempt to use a consistent error response regardless of what tech stack is being used to build a paricular service. I will use a separate Error-handling middleware so that the structure of my error responses are consistent regardless of where the error is coming from.

Because Typescript will not allow you to just add properties to the built-in Error object, we'll need to subclass it into two separate subclasses:

-   RequestValidationError
-   DatabaseConnectionError

![errorHandlingMiddleware](https://user-images.githubusercontent.com/50179896/127425893-d864ebb9-765e-4887-9442-b50a72fea472.png)

This allows us to add additional properties to our error message to further clarify the error response to our front-end.

[Top of README](#table_of_contents)

