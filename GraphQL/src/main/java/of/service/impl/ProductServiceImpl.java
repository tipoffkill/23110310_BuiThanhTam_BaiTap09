package of.service.impl;

import lombok.RequiredArgsConstructor;
import of.entity.Product;
import of.repository.ProductRepository;
import of.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service @RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
  private final ProductRepository repo;

  public List<Product> findAll() { return repo.findAll(); }
  public List<Product> getAllOrderByPriceAsc() { return repo.findAllByOrderByPriceAsc(); }
  public List<Product> getByCategory(Long categoryId) { return repo.findByCategoryId(categoryId); }
  public Product findById(Long id) { return repo.findById(id).orElseThrow(); }
  public Product save(Product p) { return repo.save(p); }
  public void delete(Long id) { repo.deleteById(id); }
}
