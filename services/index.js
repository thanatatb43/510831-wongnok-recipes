$(function () {
  $("#example1 tfoot th").each(function () {
    var title = $(this).text();
    $(this).html('<input type="text" placeholder="' + title + '" />');
  });
  console.log("datatable");
  $("#example1")
    .DataTable({
      ajax: {
        url: "http://localhost:3000/recipes",
        dataSrc: "data",
      },
      responsive: false,
      lengthChange: true,
      autoWidth: false,
      scrollY: "400px",
      scrollX: false,
      scrollCollapse: true,
      pageLength: 10,
      scrollX: true,
      columns: [
        { width: '10%', data: "name_of_menu" },
        { width: '22%', data: "picture_of_menu" },
        { width: '14%', data: "material_of_menu" },
        { width: '14%', data: "menu_structure" },
        { width: '10%', data: "menu_duration" },
        { width: '14%', data: "menu_level_of_difficulty" },
        {
          width: '14%',
          data: "id",
          render: function (data) {
            return `<button class="btn btn-block btn-warning rateRecipes" data-id="${data}">ให้คะแนน</button>`;
          },
        }
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

    $("#example1 tbody").on("click", ".rateRecipes", function () {
    var id = $(this).data("id");
    alert("กำลังพาคุณไปยังหน้าให้คะแนน");
    localStorage.setItem("editRecipesId", id);
    window.location.href = "show-recipes.html";
  });

});

console.log("Hello");
const response = axios
  .get("http://localhost:3000/recipes")
  .then((getResponse) => {
    console.log("GET Response");
    console.log(getResponse.data);
    data = getResponse.data;
    console.log("response : ", data.data[0].material_of_menu);
  })
  .catch(function (error) {
    console.log("Error: ", error);
  });
