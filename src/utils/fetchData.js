
export function fetchData() {
    return fetch("http://localhost:2323", { method: "GET" })
        .then(async (response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return await response.json();
        })
        .catch((error) => {
            console.error(
                "There has been a problem with your fetch operation:",
                error
            );
            return null;
        });
}
