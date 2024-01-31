function getRequest(method) {
  return fetch(`http://pp-kb-dev01.parcelpoint.us:2323/${method}`, {
    method: "GET",
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const res = await response.json();
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}
getRequest("get/");
function postRequest(method, data) {
  return fetch(`http://pp-kb-dev01.parcelpoint.us:2323/${method}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  });
}
