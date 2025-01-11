# mastermind-reach

 This is my immplementation of the mastermind game. It has been very fun to make, and I look forward to enhancing it. It is fully functional, but note that in order to run, when you insert the numbers via the /play route, the feedback will come via the terminal. I really wanted to create a web socket server to avoid continous api calls (they restart the process) but unfortunately I ran out of time. 

 To start: run npm run build.

 Here is my original interpretation of the project. Many things have changed, as told by 60+ commits, but the original idea was to utilize Node's event driven architecture to send information to different parts of the application via events. This stage came on later, where I planned to route the user to a gameplay route in order to send requests without calling the api for a new random number. This was also my approach for enabling multiplayer functionality. 
![Blank diagram - Page 1](https://github.com/user-attachments/assets/0575ccff-b0a0-457a-b925-c215098a3f32)
Here is the current flow of the project. In sequence, each route redirects to the next. Data is stored via cookies for the subsequent route. Due to last minute time constraints, the /play route does not log results or send data to the database. However, it does send feedback to the user. 
![Blank diagram](https://github.com/user-attachments/assets/84e2ee23-845d-4dde-bfc8-30571766b261)
