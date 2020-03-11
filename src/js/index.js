// Import vendors
import "./vendor/bootstrap";

// Import application sass styles
import "../styles/sass/style.scss";

// Import application css styles
import "../styles/css/style.css";

import { navigation } from "./navigation";

$(document).ready(function() {
  navigation();
});
