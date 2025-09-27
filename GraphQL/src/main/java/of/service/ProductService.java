package of.service;

import of.entity.Product;
import java.util.List;

public interface ProductService {
  List<Product> findAll();
  List<Product> getAllOrderByPriceAsc();
  List<Product> getByCategory(Long categoryId);
  Product findById(Long id);
  Product save(Product p);
  void delete(Long id);
}
