package of.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/upload")
public class UploadController {

  private final Path root = Paths.get("uploads");

  @PostMapping("/image")
  public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
    if (file.isEmpty()) return ResponseEntity.badRequest().body(Map.of("error", "Chưa chọn file"));

    if (!Files.exists(root)) Files.createDirectories(root);

    String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
    Path filepath = root.resolve(filename);
    Files.copy(file.getInputStream(), filepath, StandardCopyOption.REPLACE_EXISTING);

    String url = "/uploads/" + filename; 
    return ResponseEntity.ok(Map.of("url", url));
  }
}
