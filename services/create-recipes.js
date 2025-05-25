var LoggedInUser = localStorage.getItem("isLogin");
var userId = localStorage.getItem("activeUser");

document.addEventListener("DOMContentLoaded", function () {
  const createRecipesForm = document.getElementById("createRecipesForm");

  // create recipes
  createRecipesForm.addEventListener("submit", function (event) {
    event.preventDefault();

    name_of_menu = createRecipesForm.name_of_menu.value;
    picture_of_menu = createRecipesForm.picture_of_menu.value;
    material_of_menu = createRecipesForm.material_of_menu.value;
    menu_structure = createRecipesForm.menu_structure.value;
    menu_duration = createRecipesForm.menu_duration.value;
    menu_level_of_difficulty = createRecipesForm.menu_level_of_difficulty.value;
    user_id = userId;

    // เรียกใช้ฟังก์ชันสำหรับตรวจสอบข้อมูลผู้ใช้
    createTheMenu(
      name_of_menu,
      picture_of_menu,
      material_of_menu,
      menu_structure,
      menu_duration,
      menu_level_of_difficulty,
      user_id
    );
  });

  function createTheMenu(
    name_of_menu,
    picture_of_menu,
    material_of_menu,
    menu_structure,
    menu_duration,
    menu_level_of_difficulty,
    user_id
  ) {
    // request api
    // var settings = {
    //   url: "http://localhost:3000/recipes/create",
    //   method: "POST",
    //   timeout: 0,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: LoggedInUser,
    //   },
    //   data: JSON.stringify({
    //     name_of_menu: name_of_menu,
    //     picture_of_menu:
    //       "<center><img width='50%' src='" +
    //       picture_of_menu +
    //       "'></img></center>",
    //     material_of_menu: material_of_menu,
    //     menu_structure: menu_structure,
    //     menu_duration: menu_duration,
    //     menu_level_of_difficulty: menu_level_of_difficulty,
    //   }),
    // };

    // $.ajax(settings).done(function (response) {
    //   alert("สำเร็จ");
    //   console.log(response);
    // });
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
      user_id: user_id
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/recipes/create",
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
