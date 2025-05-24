document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  let myBody, message, email, password, fullname;

  // login
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // หยุดการส่งฟอร์มเพื่อป้องกันการรีเฟรชหน้าเว็บ

    email = loginForm.email.value;
    password = loginForm.pswd.value;

    // เรียกใช้ฟังก์ชันสำหรับตรวจสอบข้อมูลผู้ใช้
    authenticateUser(email, password);
  });

  // register
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault(); // หยุดการส่งฟอร์มเพื่อป้องกันการรีเฟรชหน้าเว็บ

    email = signupForm.registerEmail.value;
    password = signupForm.registerPswd.value;
    fullname = signupForm.registerTxt.value;

    // เรียกใช้ฟังก์ชันสำหรับตรวจสอบข้อมูลผู้ใช้
    checkDuplicateEmail(email, password, fullname);
  });

  function authenticateUser(email, password) {
    // request api
    const url = "http://localhost:3000/user/login";
    myBody = {
      email: email,
      password: password,
    };
    console.log("login submit ");

    axios
      .post(url, myBody)
      .then((response) => {
        //Do stuff with the response.
        if (response) {
          console.log(response);
          alert(response.data.message);

          // บันทึกข้อมูลการ login ลงใน local storage
          localStorage.setItem("isLogin", response.data.access_token);
          localStorage.setItem("activeUser", response.data.user);
          
          window.location.href = "index.html";
        } else {
          alert("เกิดข้อผิดพลาด");
        }
      })
      .catch((error) => {
        console.log(error);
        alert({ ...error }.response.data.message);
      });
  }

  function checkDuplicateEmail(email, password, fullname) {
    myBody = {
      email: email,
      password: password,
      fullname: fullname,
    };

    axios
      .post("http://localhost:3000/user", myBody)
      .then((response) => {
        console.log(response.data);
        alert(response.data.message + " คุณสามารถใช้ Email นี้ Login ได้");
      })
      .catch((error) => {
        console.log({ ...error }.response.data.message);
        alert({ ...error }.response.data.message);
      });
  }
});
