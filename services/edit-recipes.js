var LoggedInUser = localStorage.getItem("isLogin");
var userId = localStorage.getItem("activeUser");

//เรียกข้อมูลสูตรที่ user กดมา
let firstconfig = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/recipes/'+localStorage.getItem("editRecipesId")+'',
  headers: { }
};

// นำข้อมูลที่ได้มาแสดงหน้าแก้ไข
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

    // ตัด html tag ออกจากลิงค์รูปภาพ
    image_link_1 = picture_of_menu.replace(`<center><img width='20%' src='`, '');
    image_link_2 = image_link_1.replace(`'></img></center>`, '');

    document.getElementById('inputMenuName').value = name_of_menu;
    document.getElementById('inputMenuPicture').value = image_link_2;
    document.getElementById('inputMenuMaterial').value = material_of_menu;
    document.getElementById('inputMenuStructure').value = menu_structure;
    document.getElementById('inputMenuDuration').value = menu_duration;
    document.getElementById('inputMenuDifficulty').value = menu_level_of_difficulty;
  })
  .catch((error) => {
    console.log(error);
  });

document.addEventListener("DOMContentLoaded", function () {

  const editRecipesForm = document.getElementById("editRecipesForm");

  // edit recipes
  editRecipesForm.addEventListener("submit", function (event) {
    event.preventDefault();

    name_of_menu = editRecipesForm.name_of_menu.value;
    picture_of_menu = editRecipesForm.picture_of_menu.value;
    material_of_menu = editRecipesForm.material_of_menu.value;
    menu_structure = editRecipesForm.menu_structure.value;
    menu_duration = editRecipesForm.menu_duration.value;
    menu_level_of_difficulty = editRecipesForm.menu_level_of_difficulty.value;
    user_id = userId;
    id = localStorage.getItem("editRecipesId");

    // เรียกใช้ฟังก์ชันสำหรับตรวจสอบข้อมูลผู้ใช้
    editTheMenu(
      name_of_menu,
      picture_of_menu,
      material_of_menu,
      menu_structure,
      menu_duration,
      menu_level_of_difficulty,
      user_id,
      id
    );
  });

  function editTheMenu(
    name_of_menu,
    picture_of_menu,
    material_of_menu,
    menu_structure,
    menu_duration,
    menu_level_of_difficulty,
    user_id,
    id
  ) {
    let data = JSON.stringify({
      name_of_menu: name_of_menu,
      picture_of_menu:
        "<center><img width='20%' src='" +
        picture_of_menu +
        "'></img></center>",
      material_of_menu: material_of_menu,
      menu_structure: menu_structure,
      menu_duration: menu_duration,
      menu_level_of_difficulty: menu_level_of_difficulty,
      user_id: user_id,
      id: id
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/recipes/edit",
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
        window.location.href = "my-recipes.html";
      })
      .catch((error) => {
        console.log(error);
        alert("เกิดข้อผิดพลาด " + error.data.message);
      });
  }
});
