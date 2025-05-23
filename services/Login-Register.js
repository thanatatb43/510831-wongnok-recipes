document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  let myBody, message;

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // หยุดการส่งฟอร์มเพื่อป้องกันการรีเฟรชหน้าเว็บ

    const email = loginForm.email.value;
    const password = loginForm.pswd.value;

    // เรียกใช้ฟังก์ชันสำหรับตรวจสอบข้อมูลผู้ใช้
    authenticateUser(email, password);
  });

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault(); // หยุดการส่งฟอร์มเพื่อป้องกันการรีเฟรชหน้าเว็บ

    const fullname = signupForm.txt.value;
    const email = signupForm.email.value;
    const password = signupForm.pswd.value;

    // เรียกใช้ฟังก์ชันสำหรับตรวจสอบข้อมูลผู้ใช้
    checkDuplicateEmail(fullname, email, password);
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
          alert("เข้าสู่ระบบสำเร็จ!" + response);
          window.location.href = "index.html";
        } else {
          alert("เกิดข้อผิดพลาด");
        }
      })
      .catch((response) => {
        console.log(response);
        alert(response);
      });
  }

  function checkDuplicateEmail(email, fullname, password) {
    myBody = {
      fullname: fullname,
      email: email,
      password: password,
    };
    message = axiosTest();

    // call api
    async function axiosTest() {
      const response = await axios.post("http://localhost:3000/user/", myBody);
      return response.data;
    }

    alert(message);
  }
});
