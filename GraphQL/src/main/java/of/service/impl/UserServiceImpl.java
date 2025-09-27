package of.service.impl;

import lombok.RequiredArgsConstructor;
import of.entity.User;
import of.repository.UserRepository;
import of.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service @RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserRepository repo;

  public List<User> findAll() { return repo.findAll(); }
  public User findById(Long id) { return repo.findById(id).orElseThrow(); }
  public User save(User u) { return repo.save(u); }
  public void delete(Long id) { repo.deleteById(id); }
}
