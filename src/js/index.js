// Import application sass styles
import "../styles/sass/style.scss";
import "../styles/css/style.css";

$(document).ready(function() {
  $(".burger").click(function() {
    $("header").toggleClass("clicked");
  });

  $("nav ul li").click(function() {
    $("nav ul li").removeClass("selected");
    $("nav ul li").addClass("notselected");
    $(this).toggleClass("selected");
    $(this).removeClass("notselected");
  });
});
