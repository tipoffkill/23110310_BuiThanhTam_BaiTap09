package of.web;

import of.dto.UploadResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Controller
@RequestMapping("/upload")
public class UploadController {

    @Value("${upload.dir}")
    private String uploadDir;

    @PostMapping("/image")
    public String uploadImage(@RequestParam("file") MultipartFile file, Model model) throws IOException {
        if (file.isEmpty()) {
            model.addAttribute("msg", "Chưa chọn file!");
            return "upload";
        }

        Path path = Paths.get("src/main/resources/static/" + uploadDir);
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }

        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filepath = path.resolve(filename);
        Files.copy(file.getInputStream(), filepath, StandardCopyOption.REPLACE_EXISTING);

        String imageUrl = "/" + uploadDir + "/" + filename;
        model.addAttribute("msg", "Upload thành công!");
        model.addAttribute("imageUrl", imageUrl);

        return "upload";
    }
}
