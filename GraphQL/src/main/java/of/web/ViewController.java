package of.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/")
    public String home() { return "index"; }

    @GetMapping("/products")
    public String products() { return "products"; }
    @GetMapping("/users")
    public String users() {
        return "users"; // users.jsp
    }
    
    @GetMapping("/categories")
    public String categories() { return "categories"; }

    @GetMapping("/upload")
    public String uploadPage() { return "upload"; }
    @GetMapping("/category-products")
    public String categoryProducts() {
        return "categoryProducts";
    }
}
