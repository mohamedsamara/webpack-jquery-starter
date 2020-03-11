export function navigation() {
  $(".navbar-light .dmenu").hover(
    function() {
      $(this)
        .find(".sm-menu")
        .first()
        .stop(true)
        .slideDown(150);
    },
    function() {
      $(this)
        .find(".sm-menu")
        .first()
        .stop(true)
        .slideUp(105);
    }
  );
}
