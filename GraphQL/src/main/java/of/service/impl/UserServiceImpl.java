package of.service.impl;

import of.entity.*;
import of.repository.*;
import of.service.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repo;

    public UserServiceImpl(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<User> findAll() { return repo.findAll(); }

    @Override
    public User findById(Long id) { return repo.findById(id).orElseThrow(); }

    @Override
    public User save(User u) { return repo.save(u); }

    @Override
    public void delete(Long id) { repo.deleteById(id); }
}
