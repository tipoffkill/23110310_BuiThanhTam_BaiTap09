package of.config;

import of.entity.*;
import of.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initData(UserRepository userRepo,
                               CategoryRepository catRepo,
                               ProductRepository prodRepo) {
        return args -> {
            if (userRepo.count() == 0) {
                User u1 = User.builder().fullname("Nguyen Van A")
                        .email("a@mail.com").password("123").phone("0909").build();
                userRepo.save(u1);

                Category c1 = Category.builder().name("Laptop").build();
                Category c2 = Category.builder().name("Phone").build();
                catRepo.saveAll(List.of(c1, c2));

                Product p1 = Product.builder()
                        .title("Macbook Air")
                        .quantity(10)
                        .desc("M2 2023")
                        .price(new BigDecimal("24990000"))
                        .user(u1)
                        .build();
                prodRepo.save(p1);
            }
        };
    }
}
