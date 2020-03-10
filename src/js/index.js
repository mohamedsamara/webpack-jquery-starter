// Import vendors
import "./vendor/bootstrap";

// Import application sass styles
import "../styles/sass/style.scss";

// Import application css styles
import "../styles/css/style.css";

import { navigation } from "./navigation";
import { subheader } from "./subheader";

$(document).ready(function() {
  navigation();
  subheader();
});
