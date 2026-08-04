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

// function fetchUserWithPromises(userId: number): Promise<User> {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const user = users.find(currentUser => currentUser.id === userId);
//             if (!user) {
//                 reject(new Error("user not found"));
//                 return;
//             }
//             resolve(user);
//         }, 500);
//     });
// }

async function findUser(userId: number) {
    const user = await users.find((u) => u.id === userId);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}


async function findUserWithAsyncAwait(userId: number): Promise<void> {
    try {
        const user = await findUser(userId);
        console.log("async/await", user?.name);
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.log(message);
    }
}

findUserWithAsyncAwait(10);