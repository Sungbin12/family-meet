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
      // 사용자별 쿠키 생성 (24시간 유지)
      const expiryDate = new Date();
      expiryDate.setTime(expiryDate.getTime() + (24 * 60 * 60 * 1000));
      const cookieName = `loginUser_${matchedUser.username}`;
      document.cookie = `${cookieName}=true; expires=${expiryDate.toUTCString()}; path=/`;
  
      // 사용자 이름 저장 (localStorage)
      localStorage.setItem("loginName", matchedUser.name);
  
      // 성공 메시지 숨김
      message.textContent = "";
  
      // 메인 페이지로 이동
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
  window.location.href = "/user"; // 쿠키가 있을 때 이동할 경로
}
