<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
  <title>Quản lý Categories</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <!-- đảm bảo app.js chạy đúng context -->
  <script defer src="${pageContext.request.contextPath}/js/app.js"></script>
</head>
<body class="container mt-4">
  <h2>📂 Quản lý Category</h2>

  <!-- Form thêm Category -->
  <form class="row g-2 mb-4" onsubmit="createCategory(); return false;">
    <div class="col-md-5">
      <input type="text" id="catName" class="form-control" placeholder="Tên Category"/>
    </div>
    <div class="col-md-5">
      <input type="file" id="catImageFile" class="form-control"/>
    </div>
    <div class="col-md-2">
      <button class="btn btn-success w-100">Thêm</button>
    </div>
  </form>

  <!-- Bảng Category -->
  <table class="table table-bordered align-middle">
    <thead class="table-light">
      <tr>
        <th>ID</th>
        <th>Tên</th>
        <th>Ảnh</th>
        <th class="text-center">Thao tác</th>
      </tr>
    </thead>
    <tbody id="categoryList">
      <!-- render bằng JS -->
    </tbody>
  </table>

  <!-- Danh sách sản phẩm theo Category -->
  <div class="mt-4">
    <h5>📦 Sản phẩm thuộc Category</h5>
    <ul class="list-group" id="productsByCat">
      <li class="list-group-item text-muted">Chưa chọn category nào.</li>
    </ul>
  </div>

  <!-- Modal sửa Category -->
  <div class="modal fade" id="editCatModal" tabindex="-1">
    <div class="modal-dialog"><div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Sửa Category</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="editCatId"/>
        <input type="hidden" id="editCatImage"/>

        <div class="mb-2">
          <label class="form-label">Tên Category</label>
          <input type="text" id="editCatName" class="form-control"/>
        </div>

        <div class="mb-2">
          <label class="form-label">Ảnh hiện tại</label><br>
          <img id="editCatPreview" class="img-thumbnail mb-2" 
               style="max-height:120px; display:none"/>
        </div>

        <div class="mb-2">
          <label class="form-label">Chọn ảnh mới</label>
          <input type="file" id="editCatImageFile" class="form-control"/>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
        <button class="btn btn-primary" onclick="updateCategory()">Lưu</button>
      </div>
    </div></div>
  </div>

  <!-- Script khởi tạo -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      renderCategories(); // gọi render khi load trang
    });
  </script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
