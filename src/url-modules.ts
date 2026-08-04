

function runUrlDemo(): void {
    // ?? how we can create url object 
    const apiUrl = new URL("https://api.abc.com/users?page=2&limit=10&sort=latest");
    console.log(apiUrl.href);
    // console.log(apiUrl.protocol);
    // console.log(apiUrl.hostname);
    // console.log(apiUrl.pathname);
    // console.log(apiUrl.search);


    // getting search params value using key
    const page = apiUrl.searchParams.get("page");
    const limit = apiUrl.searchParams.get("limit");
    const sort = apiUrl.searchParams.get("sort");

    // update search params 

    apiUrl.searchParams.set("page", "10");
    apiUrl.searchParams.set("sort", "old");

    console.log(page);
    console.log(limit);
    console.log(sort);

    console.log(apiUrl.href);

    // create query params

    const queryParams = new URLSearchParams(
        {
            search: "node js",
            page: "2",
            limit: "5"
        }
    );

    console.log(queryParams.toString());
}

runUrlDemo();