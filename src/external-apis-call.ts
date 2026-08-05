// web scraping
const API_URL = "https://jsonplaceholder.typicode.com/users/1";

type PlaceholderUser = {
    id: number;
    name: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city?: string;
        zipcode?: string;
        geo: {
            lat?: string;
            lng?: string;
        }
    }
    phone?: string;
    website?: string;
    company: {
        name: string;
        catchPhrase?: string;
        bs?: string
    }
}

type PublicUser = {
    id: number;
    name: string;
    email: string;
    company: string;
    street: string;
    suite: string;
    city?: string;
    zipcode?: string;
    lat?: string;
    lng?: string;
    phone?: string;
    website?: string;
    catchPhrase?: string;
    bs?: string
}

function transformUser(rawData: PlaceholderUser): PublicUser {
    return {
        id: rawData.id,
        name: rawData.name,
        email: rawData.email,
        company: rawData.company.name,
        street: rawData.address.street,
        suite: rawData.address.suite,
        city: rawData.address.city,
        zipcode: rawData.address.zipcode,
        lat: rawData.address.geo.lat,
        lng: rawData.address.geo.lng,
        phone: rawData.phone,
        website: rawData.website,
        catchPhrase: rawData.company.catchPhrase,
        bs: rawData.company.bs
    }
}

async function fetchExternalUser(): Promise<void> {
    // AbortController lets us cancel an inprogress fetch request
    const controller = new AbortController();
    const timer = setTimeout(() => {
        controller.abort()
    }, 5000);

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            signal: controller.signal
        });

        if (!response.ok) {
            console.error(`upstream api failed with http ${response.status}`);
            return;
        }

        const rawUser = (await response.json()) as PlaceholderUser;
        const user = transformUser(rawUser);
        console.log(user);

    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            console.error("request failed because upstream api took so long time");
            return;
        }

        const message = error instanceof Error ? error.message : "unknown error";
        console.error("External api failed: ", message);
    } finally {
        clearTimeout(timer);
    }
}

fetchExternalUser();