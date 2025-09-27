package of.service;

import of.entity.Category;
import java.util.List;

public interface CategoryService {
  List<Category> findAll();
  Category findById(Long id);
  Category save(Category c);
  void delete(Long id);
}
