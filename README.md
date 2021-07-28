# microTickets

![](https://img.shields.io/badge/API-REST-informational?style=flat&logo=<jose>&logoColor=white&color=99ffff)
![](https://img.shields.io/badge/architecture-eventDriven-informational?style=flat&logo=<jose>&logoColor=white&color=99ffff)
![](https://img.shields.io/badge/architecture-microservice-informational?style=flat&logo=<jose>&logoColor=white&color=99ffff)
![](https://img.shields.io/badge/containers-docker-informational?style=flat&logo=<jose>&logoColor=white&color=99ffff)
![](https://img.shields.io/badge/orchestration-kubernetes-informational?style=flat&logo=<jose>&logoColor=white&color=99ffff)

Another microservice-focused application that will allow users to sell and purchase event tickets. I will be using production-grade authentication and StripeJS. More details will unfold as I develop the app. Keep a weather I on this README for updates...

Table of Contents:

[User Stories](#userstories)
[Data Models](#datamodels)



## User Stories <a name='userstories'></a>

- User can list a ticket for an event(sports, concerts, etc) for sale.
- Other users can purchase this ticket
- Any user can list tickets for sale and purchase tickets
- When a user attempts to purchase a ticket, the ticket is 'locked' for 15 minutes. The user has 15 minutes to enter their payment info.
- While locked, no other user can purchase the ticket. After 15 minutes, the ticket should unlock.
- Ticket prices can be edited if they are not locked.

## Data Models
![ticketAppDataModels](https://user-images.githubusercontent.com/50179896/127247053-8d646eab-e4fb-4169-9316-a06055878e49.png)
