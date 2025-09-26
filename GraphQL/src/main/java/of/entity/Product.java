package of.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.*;

@Entity
@Table(name = "Product")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private Integer quantity;

    @Column(name = "[desc]") // desc là từ khóa trong SQL, phải đặt []
    private String desc;

    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal price;

    private String image;

    @ManyToOne
    @JoinColumn(name = "userid", nullable = false)
    private User user;

    @ManyToMany(mappedBy = "products")
    private Set<Category> categories = new HashSet<>();
}
