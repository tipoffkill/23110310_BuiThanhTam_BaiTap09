package of.graphql;

import lombok.RequiredArgsConstructor;
import of.entity.*;
import of.service.*;
import org.springframework.graphql.data.method.annotation.*;
import org.springframework.stereotype.Controller;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class QueryResolver {
    private final ProductService productService;
    private final CategoryService categoryService;
    private final UserService userService;

    @QueryMapping public List<Product> products() { return productService.getAllOrderByPriceAsc(); }
    @QueryMapping public List<Product> productsByCategory(@Argument Long categoryId) { return productService.getByCategory(categoryId); }
    @QueryMapping public List<User> users() { return userService.findAll(); }
    @QueryMapping public List<Category> categories() { return categoryService.findAll(); }
}