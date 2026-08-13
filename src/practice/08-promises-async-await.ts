type User = {
    id: number;
    name: string;
    email: string;
    role: "user" | "admin"
}

const users: User[] = [
    {
        id: 1,
        name: "Somakhsi",
        email: "somakshi@gmail.com",
        role: "admin"
    },
    {
        id: 1,
        name: "Somakhsi",
        email: "somakshi@gmail.com",
        role: "admin"
    },
    {
        id: 1,
        name: "Somakhsi",
        email: "somakshi@gmail.com",
        role: "admin"
    }
]


function fetchUserWithPromises(userId: number): Promise<User> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(currentUser => currentUser.id === userId);
            if (!user) {
                reject(new Error("user not found"));
                return;
            }
            resolve(user);
        });
    });
}

fetchUserWithPromises(100)
    .then((user) => {
        console.log(user);
    }).catch((error: Error) => {
        console.log(error.message);
    })