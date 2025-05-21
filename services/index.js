$(function () {
    $("#example1").DataTable({
      "responsive": true, "lengthChange": false, "autoWidth": false,
      "buttons": ["copy", "csv", "excel", "pdf", "print"]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
});

console.log('Hello');
const response = axios.get('http://localhost:3000/recipes').then((getResponse) => {
    console.log("GET Response")
    console.log(getResponse.data);
    data = getResponse.data;
    console.log('response : ', data.data[0].material_of_menu);
})
.catch(function (error) {
    console.log("Error: ", error);
});
