
// user registred
// send a welcome email
// write log
// notify some other services

import EventEmitter from "node:events";

// emit on event -> listeners listen to this event, do something
// .on() - register one listener
// .once() - register one listener that run only one time
// .emit() - triggers an event and send to the listeners

type UserRegisterPayload = {
    id: number;
    email: string;
}

const appEvents = new EventEmitter();

appEvents.on("user:registred", (user: UserRegisterPayload) => {
    console.log(`Welcome email send to ${user.email}`);
});

appEvents.on("user:registred", (user: UserRegisterPayload) => {
    console.log(user.id, user.email);
});

appEvents.once("app:started", () => {
    console.log("APP Started");
});

function registerUser(): void {
    const user = {
        id: 1,
        email: "sukhendra@gmail.com"
    }

    console.log("User Saved: ", user);
    appEvents.emit("user:registred", user);
    console.log("Event listener completed");
    appEvents.emit("app:started");
    appEvents.emit("app:started");
}

registerUser();