function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const pin = document.getElementById("pin").value;
  const message = document.getElementById("message");

  const users = [
    { username: "admin", password: "-", pin: "-", name: "---" },
    { username: "mR4k", password: "&Qp3KtVz2!", pin: "C1B7F39A5D", name: "Mom" },
    { username: "V7bX", password: "T9#vLp2@Qx", pin: "D2C9F1B37A", name: "Dad" },
    { username: "s3Lf", password: "Gc4@BwNz7!", pin: "7F3D9A2C1B", name: "Older sister" }
  ];

  const matchedUser = users.find(user =>
    user.username === username &&
    user.password === password &&
    user.pin === pin
  );

  if (matchedUser) {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (24 * 60 * 60 * 1000));
    const cookieName = `loginUser_${matchedUser.username}`;
    document.cookie = `${cookieName}=true; expires=${expiryDate.toUTCString()}; path=/`;

    localStorage.setItem("loginName", matchedUser.name);
    message.textContent = "";
    window.location.href = "user";
  } else {
    message.style.color = "red";
    message.textContent = "아이디, 비밀번호 또는 고유인증번호가 잘못되었습니다.";
  }
}

function isLoggedIn() {
  const cookies = document.cookie.split(";").map(c => c.trim());
  return cookies.some(c => c.startsWith("loginUser_"));
}

if (isLoggedIn()) {
  window.location.href = "/user";
}

let recaptchaPassed = false;

function onRecaptchaSuccess() {
  recaptchaPassed = true;
  validateInputs();
}

function onRecaptchaExpired() {
  recaptchaPassed = false;
  validateInputs();
}

function validateInputs() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const pin = document.getElementById("pin").value.trim();
  const loginBtn = document.getElementById("loginBtn");

  if (username && password && pin && recaptchaPassed) {
    loginBtn.disabled = false;
  } else {
    loginBtn.disabled = true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("username").addEventListener("input", validateInputs);
  document.getElementById("password").addEventListener("input", validateInputs);
  document.getElementById("pin").addEventListener("input", validateInputs);
});
