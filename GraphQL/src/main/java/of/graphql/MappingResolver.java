package of.graphql;

import of.entity.*;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.util.Set;

@Controller
public class MappingResolver {

    @SchemaMapping(typeName = "User", field = "categories")
    public Set<Category> categories(User user) {
        return user.getCategories();
    }

    @SchemaMapping(typeName = "Category", field = "users")
    public Set<User> users(Category category) {
        return category.getUsers();
    }

    @SchemaMapping(typeName = "Product", field = "user")
    public User user(Product product) {
        return product.getUser();
    }

    @SchemaMapping(typeName = "Product", field = "categories")
    public Set<Category> categories(Product product) {
        return product.getCategories();
    }
}
