package of.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
  @GetMapping("/") public String home() { return "index"; }
  @GetMapping("/products") public String products() { return "products"; }
  @GetMapping("/categories") public String categories() { return "categories"; }
  @GetMapping("/users") public String users() { return "users"; }
}
