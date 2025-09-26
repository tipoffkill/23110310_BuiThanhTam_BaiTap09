<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
  <title>Quản lý Category</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <script defer src="/js/app.js"></script>
</head>
<body class="container mt-4">
  <h2>📂 Quản lý Category</h2>

  <!-- Form thêm -->
  <form class="row g-2 mb-4" onsubmit="createCategory(); return false;">
    <div class="col-md-5">
      <input type="text" id="catName" class="form-control" placeholder="Tên Category"/>
    </div>
    <div class="col-md-5">
      <input type="text" id="catImage" class="form-control" placeholder="Ảnh (URL)"/>
    </div>
    <div class="col-md-2">
      <button class="btn btn-success w-100">Thêm</button>
    </div>
  </form>

  <!-- Danh sách Category -->
  <table class="table table-bordered align-middle">
    <thead class="table-light">
      <tr>
        <th>ID</th>
        <th>Tên</th>
        <th>Ảnh</th>
        <th class="text-center">Thao tác</th>
      </tr>
    </thead>
    <tbody id="categoryList"></tbody>
  </table>

  <!-- Danh sách sản phẩm thuộc Category -->
  <div class="mt-4">
    <h5>📦 Sản phẩm thuộc Category</h5>
    <ul class="list-group" id="productsByCat">
      <li class="list-group-item text-muted">Chưa chọn category nào.</li>
    </ul>
  </div>

  <!-- Modal sửa -->
  <div class="modal fade" id="editCatModal" tabindex="-1">
    <div class="modal-dialog"><div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Sửa Category</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="editCatId"/>
        <input type="text" id="editCatName" class="form-control mb-2" placeholder="Tên Category"/>
        <input type="text" id="editCatImage" class="form-control mb-2" placeholder="Ảnh (URL)"/>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
        <button class="btn btn-primary" onclick="updateCategory()">Lưu</button>
      </div>
    </div></div>
  </div>

  <!-- Auto load -->
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      renderCategories();
    });
  </script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
