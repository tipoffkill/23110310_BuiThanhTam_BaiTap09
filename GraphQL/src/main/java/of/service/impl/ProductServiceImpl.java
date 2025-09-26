package of.service.impl;
import of.entity.*;
import of.repository.*;
import of.service.*;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepo;
    private final UserRepository userRepo;
    private final CategoryRepository categoryRepo;

    public ProductServiceImpl(ProductRepository pr, UserRepository ur, CategoryRepository cr) {
        this.productRepo = pr;
        this.userRepo = ur;
        this.categoryRepo = cr;
    }

    @Override
    public List<Product> findAll() { return productRepo.findAll(); }

    @Override
    public List<Product> getAllOrderByPriceAsc() { return productRepo.findAllByOrderByPriceAsc(); }

    @Override
    public List<Product> getByCategory(Long categoryId) { return productRepo.findByCategoryId(categoryId); }

    @Override
    public Product findById(Long id) { return productRepo.findById(id).orElseThrow(); }

    @Override
    public Product save(Product p) {
        // check user tồn tại
        if (p.getUser() != null && p.getUser().getId() != null) {
            User u = userRepo.findById(p.getUser().getId()).orElseThrow();
            p.setUser(u);
        }
        return productRepo.save(p);
    }

    @Override
    public Product update(Long id, Product p) {
        Product old = productRepo.findById(id).orElseThrow();
        old.setTitle(p.getTitle());
        old.setQuantity(p.getQuantity());
        old.setDesc(p.getDesc());
        old.setPrice(p.getPrice());
        old.setImage(p.getImage());
        return productRepo.save(old);
    }

    @Override
    public void delete(Long id) { productRepo.deleteById(id); }
}

