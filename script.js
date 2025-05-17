function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const pin = document.getElementById("pin").value;
    const message = document.getElementById("message");
  
    const users = [
      { username: "jinwook392", password: "mom1234", pin: "1111", name: "정진욱" },
      { username: "intae843", password: "dad1234", pin: "2222", name: "박인태" },
      { username: "sungbin", password: "son1234", pin: "3333", name: "박성빈" },
      { username: "hyobin583", password: "dau1234", pin: "4444", name: "박효빈" }
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
  