export const sendEventToServer = (method, data) => {
  return fetch(`http://localhost:2323/${method}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  });
};
