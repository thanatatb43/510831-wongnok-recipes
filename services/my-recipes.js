var activeUser = localStorage.getItem("activeUser");

$(document).ready(function () {
  $("#example1 tfoot th").each(function () {
    var title = $(this).text();
    $(this).html('<input type="text" placeholder="' + title + '" />');
  });
  console.log("datatable");

  $("#example1")
    .DataTable({
      ajax: {
        url: "http://localhost:3000/user/" + activeUser,
        dataSrc: "data.recipes",
      },
      responsive: false,
      lengthChange: true,
      autoWidth: false,
      scrollY: '400px',
      scrollCollapse: true,
      pageLength: 50,
      scrollX: true,
      columns: [
        { width: '11%', data: "name_of_menu" },
        { width: '13%', data: "picture_of_menu" },
        { width: '11%', data: "material_of_menu" },
        { width: '11%', data: "menu_structure" },
        { width: '9%', data: "menu_duration" },
        { width: '11%', data: "menu_level_of_difficulty" },
        {
          width: '11%',
          data: "id",
          render: function (data) {
            return `<button class="btn btn-block btn-warning editRecipes" data-id="${data}">แก้ไข</button>`;
          },
        },
        {
          width: '11%',
          data: "id",
          render: function (data) {
            return `<button class="btn btn-block btn-danger deleteRecipes" data-id="${data}">ลบ</button>`;
          },
        },
      ],
      initComplete: function () {
        // Apply the search
        this.api()
          .columns()
          .every(function () {
            var that = this;
            $("input", this.footer()).on("keyup change clear", function () {
              if (that.search() !== this.value) {
                that.search(this.value).draw();
              }
            });
          });
      },
    })
    .buttons()
    .container()
    .appendTo("#example1_wrapper .col-md-6:eq(0)");

  $("#example1 tbody").on("click", ".editRecipes", function () {
    var id = $(this).data("id");
    alert("กำลังนำทางไปยังหน้าแก้ไข");
    localStorage.setItem("editRecipesId", id);
    window.location.href = "edit-recipes.html";
  });

  $("#example1 tbody").on("click", ".deleteRecipes", function () {

    var id = $(this).data("id");
    // alert("ID clicked: " + id);

    let data = JSON.stringify({
      user_id: activeUser,
      id: id,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/recipes/delete",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert(response.data.message);
        location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert('เกิดข้อผิดพลาด');
      });
  });
});
