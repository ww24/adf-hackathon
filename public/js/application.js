var user_name,img;
function load_page(page){
  document.getElementById('page1').style.display = 'none';
  document.getElementById('page2').style.display = 'none';
  document.getElementById('page3').style.display = 'none';
  document.getElementById(page).style.display = '';
}

$(function(){
  $('#name_box').change(function() {
    $('#image_file').css({
      display : ''
    })
  });
})



