var activeUser = localStorage.getItem("activeUser");

$(document).ready(function () {
  $("#example1 tfoot th").each(function () {
    var title = $(this).text();
    $(this).html('<input type="text" placeholder="' + title + '" />');
  });
  console.log("datatable");

  var table = $("#example1")
    .DataTable({
      ajax: {
        url: "http://localhost:3000/user/" + activeUser,
        dataSrc: "data.recipes",
      },
      responsive: false,
      lengthChange: true,
      autoWidth: false,
      scrollY: "400px",
      scrollCollapse: true,
      pageLength: 50,
      scrollX: true,
      columns: [
        { data: "name_of_menu" },
        { data: "picture_of_menu" },
        { data: "material_of_menu" },
        { data: "menu_structure" },
        { data: "menu_duration" },
        { data: "menu_level_of_difficulty" },
        {
          defaultContent:
            '<input type="button" id="editRecipes" class="btn btn-block btn-warning" value="แก้ไข"/>',
        },
        {
          defaultContent:
            '<input type="button" id="deleteRecipes" class="btn btn-block btn-danger" value="ลบ"/>',
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

  $("#example1 tbody").on("click", "#editRecipes", function () {
    // var row = $(this).closest("tr");

    // var data = table.row(row).data().name_of_menu;
    // console.log(data);
    alert('กำลังปรับปรุง');
  });

  $("#example1 tbody").on("click", "#deleteRecipes", function () {
    // var row = $(this).closest("tr");

    // var data = table.row(row).data().picture_of_menu;
    // console.log(data);
    alert('กำลังปรับปรุง');
  });
});
