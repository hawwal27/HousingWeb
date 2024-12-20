const baseUrl = new URL("http://localhost:4000");

document.getElementById("login-form").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = {
    email,
    password,
  }

  const loginUrl = new URL('/api/v1/user/login', baseUrl);

  let response = await fetch(loginUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  let result = await response.json();

  window.localStorage.setItem('access_token', result.token);

  if (result.status === "success") {
    alertMessage(result.message, result.status)
  } else {
    alertMessage(result.message, result.status)
  }
  // const token = window.localStorage.getItem('access_token')

  // window.localStorage.removeItem('access_token')
});

function alertMessage(message, status) {
  let div = document.createElement('div');
  if (status === "success") {
    div.className = "alert-success";
  } else {
    div.className = "alert-failure";
  }
  div.innerHTML = `<strong>${status}!</strong> ${message}`;

  document.body.append(div);
  setTimeout(() => div.remove(), 5000);
}
