type User = {
    id: number;
    name: string;
    role: "user" | "super-admin"
}

const users: User[] = [
    {
        id: 1,
        name: "Sukhendra",
        role: "super-admin"
    },
    {
        id: 2,
        name: "Rohan",
        role: "user"
    },
    {
        id: 3,
        name: "Gayu",
        role: "user"
    }
]

// callback is a function - this function you are passing to a different function
// callback(error, result) -> *** impt concept => this is a classic node js callback pattern

function getUserWithCallback(
    userId: number,
    callback: (error: Error | null, user?: User) => void
): void {
    setTimeout(() => {
        const user = users.find(currentUser => currentUser.id === userId);

        if (!user) {
            callback(new Error(`User with id ${userId} was not found`));
            return;
        }

        callback(null, user);

    }, 500);
}

getUserWithCallback(300, (error, user) => {
    if (error) {
        console.log("Callback error", error.message);
        return;
    }
    console.log("Callback result:", user?.id, user?.name, user?.role);
})