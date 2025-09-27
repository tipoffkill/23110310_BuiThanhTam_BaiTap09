package of.service.impl;

import lombok.RequiredArgsConstructor;
import of.entity.Category;
import of.repository.CategoryRepository;
import of.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service @RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
  private final CategoryRepository repo;

  public List<Category> findAll() { return repo.findAll(); }
  public Category findById(Long id) { return repo.findById(id).orElseThrow(); }
  public Category save(Category c) { return repo.save(c); }
  public void delete(Long id) { repo.deleteById(id); }
}
