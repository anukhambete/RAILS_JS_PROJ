// <a rel="nofollow" data-method="delete" href="/itineraries/10">Delete Itinerary</a>
// <a href="/itineraries/10/edit">Edit Itinerary</a>
var current_user_id = 0;

function attachListeners () {

  var itins = $('.itin_name');
  //debugger
  $('.itin_name').on('click', function(){


    var itin_id = parseInt(this.getAttribute("itin_id"));
    var posting = $.get('/itineraries/'+itin_id);
    posting.done(function(itin_data){

      $('.itin_index h1').remove();
      $('.itin_index_js').empty();

      var name_text = "<h3>" + itin_data["name"] + "<h3>";
      var description_text = "<h3>" + itin_data["description"] + "<h3>";
      var place_text = "";
      itin_data["places"].forEach(function(place){
        place_text = place_text + "<p>" + place.name +"<p>"
      });
      place_text = "<div class=" + "places_list" + ">" + place_text + "</div>"
      //
      $('.itin_index_js').append(name_text);
      $('.itin_index_js').append(description_text);
      $('.itin_index_js').append(place_text);

      var add_place_link = "<a href=" + "/itineraries/" +itin_data.id+ "/places/new" + ">" + "Add new Places</a></br>"
      var edit_itin_link = "<a href=" + "/itineraries/" +itin_data.id+ "/edit" + ">" + "Edit Itinerary</a></br>"
      var delete_itin_link = "<a rel=" + "nofollow" + " data-method=" + "delete" + " href=" + "/itineraries/" +itin_data.id+ ">" + "Delete Itinerary</a>"


      // var current_user_id = itin_data.user.id;
      if (itin_data.user_id === current_user_id) {
        $('.itin_index_js').append(add_place_link);
        $('.itin_index_js').append(edit_itin_link);
        $('.itin_index_js').append(delete_itin_link);
      }

    });

  });
}

window.addEventListener("load",function() {
  // attachListeners();
  // $.get('/currentappuser', function(user_data){
  //   var user_id = user_data.id;
  //   current_user_id = user_id;
  // });
  //
  // $('.itin_index h1').on('click', () => load_itin_list());


  // console.log("got it!");
});


function load_itin_list(){
  $('.itin_index_js').empty();
  var posting = $.get('/list');
  posting.done(function(list_data){
    //debugger
    var array = list_data;
    var i;
    for (i=0; i<array.length; i++){
      var item = array[i];
      $('.itin_index_js').append(`<div class="col col-4 itin_name" itin_id=`+item.id+`>`+item.name+`</div>`+`<div class="col col-4 "> by `+item.user.username+`</div>`);
      if (item.likes.length === 1) {
        $('.itin_index_js').append(`<div class="col col-4 ">`+item.likes.length+` like</div>`);
      } else if (item.likes.length > 1) {
        $('.itin_index_js').append(`<div class="col col-4 ">`+item.likes.length+` likes</div>`);
      } else {
        $('.itin_index_js').append(`<div class="col col-4 "> No likes yet </div>`);
      }
    }
    //var item2 = list_data[0];
    // $('.itin_index_js').append(`<div class="col col-4 "><p id=itin`+item.id+`>`+item.name+`</p></div>`);
    attachListeners();
  });
}
