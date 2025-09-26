package of.graphql;

import of.entity.*;
import of.service.*;

import java.math.BigDecimal;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class MutationResolver {

    private final UserService userService;
    private final CategoryService categoryService;
    private final ProductService productService;

    public MutationResolver(UserService us, CategoryService cs, ProductService ps) {
        this.userService = us;
        this.categoryService = cs;
        this.productService = ps;
    }

    // ==== User CRUD ====
    @MutationMapping
    public User createUser(@Argument String fullname, @Argument String email,
                           @Argument String password, @Argument String phone) {
        return userService.save(User.builder()
                .fullname(fullname).email(email).password(password).phone(phone).build());
    }

    @MutationMapping
    public User updateUser(@Argument Long id, @Argument String fullname, @Argument String phone) {
        User u = userService.findById(id);
        if (fullname != null) u.setFullname(fullname);
        if (phone != null) u.setPhone(phone);
        return userService.save(u);
    }

    @MutationMapping
    public Boolean deleteUser(@Argument Long id) {
        userService.delete(id);
        return true;
    }

    // ==== Category CRUD ====
    @MutationMapping
    public Category createCategory(@Argument String name, @Argument String images) {
        return categoryService.save(Category.builder().name(name).images(images).build());
    }

    @MutationMapping
    public Category updateCategory(@Argument Long id, @Argument String name, @Argument String images) {
        Category c = categoryService.findById(id);
        if (name != null) c.setName(name);
        if (images != null) c.setImages(images);
        return categoryService.save(c);
    }

    @MutationMapping
    public Boolean deleteCategory(@Argument Long id) {
        categoryService.delete(id);
        return true;
    }

    // ==== Product CRUD ====
    @MutationMapping
    public Product createProduct(@Argument String title, @Argument Integer quantity,
                                 @Argument String desc, @Argument Double price,
                                 @Argument Long userId, @Argument String image) {
        User u = userService.findById(userId);
        return productService.save(Product.builder()
                .title(title).quantity(quantity).desc(desc)
                .price(java.math.BigDecimal.valueOf(price))
                .user(u).image(image).build());
    }

    @MutationMapping
    public Product updateProduct(@Argument Long id, @Argument String title,
                                 @Argument Integer quantity, @Argument String desc,
                                 @Argument Double price, @Argument String image) {
        Product p = productService.findById(id);
        if (title != null) p.setTitle(title);
        if (quantity != null) p.setQuantity(quantity);
        if (desc != null) p.setDesc(desc);
        if (price != null) p.setPrice(java.math.BigDecimal.valueOf(price));
        if (image != null) p.setImage(image);
        return productService.save(p);
    }

    @MutationMapping
    public Boolean deleteProduct(@Argument Long id) {
        productService.delete(id);
        return true;
    }
}
