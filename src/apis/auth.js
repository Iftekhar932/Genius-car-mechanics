export const setAuthToken = (user) => {
  fetch("http://localhost:5000/jwt", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email: user.email }),
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      localStorage.setItem("jsonWebToken", data.token);
    })
    .catch((error) =>
      console.log(error.code, error.message, "line 15 auth.js")
    );
};
