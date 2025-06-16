var LoggedInUser = localStorage.getItem("isLogin");
var userId = localStorage.getItem("activeUser");

//เรียกข้อมูลสูตรที่ user กดมา
let firstconfig = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/recipes/withowner/' + localStorage.getItem("rateRecipesId") + '',
  headers: {}
};

// นำข้อมูลที่ได้มาแสดง
axios.request(firstconfig)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    var name_of_menu = response.data.data.name_of_menu;
    var picture_of_menu = response.data.data.picture_of_menu;
    var image_link_1, image_link_2;
    var material_of_menu = response.data.data.material_of_menu;
    var menu_structure = response.data.data.menu_structure;
    var menu_duration = response.data.data.menu_duration;
    var menu_level_of_difficulty = response.data.data.menu_level_of_difficulty;
    var full_name;
    if (response.data.data.user == null) {
      full_name = 'WongNok';
    } else {
      full_name = response.data.data.user.fullname;
    }

    // ตัด html tag ออกจากลิงค์รูปภาพ
    image_link_1 = picture_of_menu.replace(`<center><img width='14%' src='`, '');
    image_link_2 = image_link_1.replace(`'></img></center>`, '');

    document.getElementById('menuName').innerHTML = name_of_menu;
    document.getElementById('menuPicture').src = image_link_2;
    document.getElementById('menuMaterial').innerHTML = material_of_menu;
    document.getElementById('menuStructure').innerHTML = menu_structure;
    document.getElementById('menuDuration').innerHTML = menu_duration;
    document.getElementById('menuDifficulty').innerHTML = menu_level_of_difficulty;
    document.getElementById('recipesOwner').innerHTML = `สูตรอาหารโดยคุณ ` + full_name;
  })
  .catch((error) => {
    console.log(error);
  });

  // แสดง comments
  let secondconfig = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/rating/recipes/' + localStorage.getItem("rateRecipesId") + '',
  headers: {}
};

// นำข้อมูลที่ได้มาแสดง
axios.request(secondconfig)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    var totalRecord = response.data.totalRecord;
    var rated_score = response.data.data.rated_score;
    var rated_comment = response.data.data.rated_comment;
    var full_name;
    if (response.data.data.user_rating == null) {
      full_name = 'WongNok';
    } else {
      full_name = response.data.data.user_rating.fullname;
    }

    for (let i = 0; i <= totalRecord; i++) {
      document.getElementById('recipesComments').innerHTML = 
      `
        <div class="callout callout-success">
          <h5>` + rated_comment + `</h5>
          <p>` + rated_score + ` คะแนน</p>
          <p>ความคิดเห็นโดยคุณ `+ full_name +`</p>
        </div>
      `
    }
  })
  .catch((error) => {
    console.log(error);
  });

document.addEventListener("DOMContentLoaded", function () {

  const editRecipesForm = document.getElementById("rateRecipesForm");

  // rating recipes
  editRecipesForm.addEventListener("submit", function (event) {
    event.preventDefault();

    rated_score = editRecipesForm.rateStar.value;
    rated_comment = editRecipesForm.rateComment.value;
    recipes_rating_id = localStorage.getItem("rateRecipesId");
    user_rating_id = userId;

    // เรียกใช้ฟังก์ชันสำหรับตรวจสอบข้อมูลผู้ใช้
    rateTheMenu(
      rated_score,
      rated_comment,
      recipes_rating_id,
      user_rating_id,
    );
  });

  function rateTheMenu(
    rated_score,
    rated_comment,
    recipes_rating_id,
    user_rating_id
  ) {
    let data = JSON.stringify({
      rated_score: rated_score,
      rated_comment: rated_comment,
      recipes_rating_id: recipes_rating_id,
      user_rating_id: user_rating_id,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/rating/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: LoggedInUser,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert("สำเร็จ " + response.data.message);
        location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("คุณเคยให้คะแนนสูตรนี้ไปแล้ว หรือเกิดข้อผิดพลาด โปรดตรวจสอบ console");
      });
  }
});
