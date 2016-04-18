var styles = [];
var activeIndex = 0;

var blouse = new Style("Classic Blouse", "TK20004", "Top", "images/styles/blouse1.jpg");
blouse.addVariant("images/fabric/fabric_1.jpg", 10);
blouse.addVariant("images/fabric/fabric_2.jpg", 12);
styles.push(blouse);

var blouse2 = new Style("Tie Front Blouse", "TK20006", "Top", "images/styles/blouse2.jpg");
blouse2.addVariant("images/fabric/fabric_4.jpg", 10);
blouse2.addVariant("images/fabric/fabric_5.jpg", 22);
blouse2.addVariant("images/fabric/fabric_3.jpg", 28);
blouse2.toggleStatus("fabric");
blouse2.toggleStatus("graded");
styles.push(blouse2);

var blouse3 = new Style("Tie Front Top", "TK20007", "Top", "images/styles/blouse3.jpg");
blouse3.addVariant("images/fabric/fabric_4.jpg", 14);
blouse3.addVariant("images/fabric/fabric_5.jpg", 22);
blouse3.addVariant("images/fabric/fabric_3.jpg", 18);
blouse3.addVariant("images/fabric/fabric_8.jpg", 8);
blouse3.toggleStatus("fabric");
styles.push(blouse3);

var dress = new Style("Shift Dress", "TK50017", "Dress", "images/styles/dress3.jpg");
dress.addVariant("images/fabric/fabric_4.jpg", 14);
dress.addVariant("images/fabric/fabric_5.jpg", 22);
dress.addVariant("images/fabric/fabric_3.jpg", 18);
dress.addVariant("images/fabric/fabric_8.jpg", 8);
styles.push(dress);

var pants = new Style("Basic Slacks", "TK70032", "Pants", "images/styles/pants1.jpg");
pants.addVariant("images/fabric/fabric_4.jpg", 14);
pants.addVariant("images/fabric/fabric_5.jpg", 8);
pants.addVariant("images/fabric/fabric_7.jpg", 18);
pants.addVariant("images/fabric/fabric_9.jpg", 20);
pants.toggleStatus("fabric");
styles.push(pants);

for (var i=0; i<styles.length; i++) {
  var style=styles[i];
  var card = $("<div class='style_card'></div>");
  card.attr('id', style.code);
  card.attr('data-code', style.code);
  card.attr('data-id', i);
  card.addClass(style.garment);
  var season = $("<h3 class='season'>Fall 2016</h3>");
  card.append(season);
  var col_left = $("<div class='col-left'></div>");
  var col_right = $("<div class='col-right'></div>");

  var title = $("<h3>"+style.code+" "+style.name+"</h3>");
  var image = $("<div class='image-block'><img src='"+style.image+"' /></div>");
  var progress = $("<div class='status'></div>");
    progress.append($("<span data-type='fabric' class='setting-"+style.status.fabric+"'>F</span>"));
    progress.append($("<span data-type='graded' class='setting-"+style.status.graded+"'>G</span>"));
    progress.append($("<span data-type='cut' class='setting-"+style.status.cut+"'>C</span>"));
    progress.append($("<span data-type='ready' class='setting-"+style.status.ready+"'>R</span>"));
  col_left.append(title);
  col_left.append(image);
  col_left.append(progress);
  card.append(col_left);

  var q = $("<h3 class='total'>"+style.total+"</h3>");
  col_right.append(q);
  for (var a=0; a<style.variants.length; a++){
    var item = $("<div class='variant'><div class='quantity'>"+style.variants[a].quantity+"</div><div class='swatch'><img src='"+style.variants[a].image+"' /></div></div>");
    col_right.append(item);
  }
  card.append(col_right);
  var print_button = $("<button class='print_button'>Print Card</button>");
  //card.append(print_button);
  print_button.click(function(){
    PrintElem($(this).parent());
  })
  var note_button = $("<span class='fui-alert-circle icon note_button'></span>");
  card.append(note_button);
  note_button.click(function(){
    var newnote = addNote($(this).parent());
    newnote.find(".note_content").show();
  });

  progress.children().click(function(e){
    e.preventDefault();
    var status_item=($(this).data('type'));
    styles[activeIndex].toggleStatus(String(status_item));
    $(this).attr('class', "setting-"+styles[activeIndex].status[status_item]);
  });
  card.mouseenter(function(){
    activeIndex = $(this).index();
  });
  image.click(function(){
    $("#overlay").fadeIn();
    $(this).parent().parent().addClass('focus_card');
  });
  $("#board").append(card);
}

function sortCards(name) {
  resetCards();
  $(".style_card").not("."+name).hide();
}
function resetCards() {
  $(".style_card").show();
}

$('select[name="inverse-dropdown"], select[name="inverse-dropdown-optgroup"], select[name="inverse-dropdown-disabled"]').select2({dropdownCssClass: 'select-inverse-dropdown'});

$("#garment_select").change(function(){
  console.log($(this).val());
  var garment = $(this).val();
  if (garment !="All") {
    sortCards(garment);
  } else {
    resetCards();
  }
})

$("#board").sortable({
  cursor:"move",
  handle: ".season",
  stop: function(event, ui){
    $(".style_card").attr("style","");
  }
});
$("#overlay").click(function(){
  $(this).fadeOut();
  $(".focus_card").removeClass("focus_card");
});

addNote($(".style_card")[0]);

function addNote(el){
  var note = $("<div class='note'></div>");
  var icon = $("<span class='fui-alert-circle icon'></span>");
  note.append(icon);
  var note_content =$("<p class='note_content'><textarea rows='3' placeholder='write a note'></textarea></p>");
  note.append(note_content);
  icon.click(function(){
    note_content.toggle();
  });

  var clear_button = $('<span class="fui-check-circle clear_button"></span>');
  clear_button.click(function(){
    note.remove();
  });
  note_content.append(clear_button);
  $(el).append(note);
  return note;
}

function PrintElem(elem) {
    Popup(elem.html());
}

function Popup(data) {
    var mywindow = window.open('', 'card', 'height=400,width=600');
    mywindow.document.write('<html><head><title>my div</title>');
    //mywindow.document.write('<link rel="stylesheet" href="css/flat-ui.min.css" type="text/css" />');
    //mywindow.document.write('<link rel="stylesheet" href="css/mainstyle.css" type="text/css" />');
    mywindow.document.write('</head><body >');
    mywindow.document.write(data);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10

    mywindow.print();
    mywindow.close();

    return true;
}
