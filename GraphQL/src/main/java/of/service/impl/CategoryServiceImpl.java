package of.service.impl;
import of.entity.*;
import of.repository.*;
import of.service.*;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repo;

    public CategoryServiceImpl(CategoryRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Category> findAll() { return repo.findAll(); }

    @Override
    public Category findById(Long id) { return repo.findById(id).orElseThrow(); }

    @Override
    public Category save(Category c) { return repo.save(c); }

    @Override
    public void delete(Long id) { repo.deleteById(id); }
}

