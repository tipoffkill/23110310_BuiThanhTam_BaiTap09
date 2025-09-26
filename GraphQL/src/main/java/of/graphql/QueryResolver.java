package of.graphql;

import of.entity.*;
import of.service.*;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class QueryResolver {

    private final ProductService productService;
    private final CategoryService categoryService;
    private final UserService userService;

    public QueryResolver(ProductService ps, CategoryService cs, UserService us) {
        this.productService = ps;
        this.categoryService = cs;
        this.userService = us;
    }

    @QueryMapping
    public List<Product> products() {
        return productService.getAllOrderByPriceAsc();
    }

    @QueryMapping
    public List<Product> productsByCategory(@Argument Long categoryId) {
        return productService.getByCategory(categoryId);
    }

    @QueryMapping
    public List<User> users() {
        return userService.findAll();
    }

    @QueryMapping
    public List<Category> categories() {
        return categoryService.findAll();
    }
}
