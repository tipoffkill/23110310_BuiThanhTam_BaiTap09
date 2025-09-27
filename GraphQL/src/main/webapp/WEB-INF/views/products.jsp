<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
  <title>Quản lý Product</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <script defer src="/js/app.js"></script>
</head>
<body class="container mt-4">
  <h2>📦 Quản lý Product</h2>

  <!-- Form thêm -->
  <form class="row g-2 mb-4" onsubmit="createProduct(); return false;">
    <div class="col-md-3">
      <input id="pTitle" class="form-control" placeholder="Tên"/>
    </div>
    <div class="col-md-2">
      <input id="pQty" type="number" class="form-control" placeholder="Số lượng"/>
    </div>
    <div class="col-md-2">
      <input id="pPrice" type="number" step="0.01" class="form-control" placeholder="Giá"/>
    </div>
    <div class="col-md-3">
      <input id="pDesc" class="form-control" placeholder="Mô tả"/>
    </div>

    <!-- chọn User -->
    <div class="col-md-3 mt-2">
      <select id="pUserId" class="form-select"></select>
    </div>

    <!-- chọn Category (multi select) -->
    <div class="col-md-3 mt-2">
      <select id="pCategoryIds" class="form-select" multiple></select>
    </div>

    <div class="col-md-3 mt-2">
      <input type="file" id="pImageFile" class="form-control"/>
    </div>
    <div class="col-md-3 mt-2">
      <button class="btn btn-success w-100">Thêm</button>
    </div>
  </form>

  <!-- Table hiển thị -->
  <table class="table table-bordered align-middle">
    <thead>
      <tr>
        <th>ID</th>
        <th>Tên</th>
        <th>Ảnh</th>
        <th>Giá</th>
        <th>Số lượng</th>
        <th>User</th>
        <th>Categories</th>
        <th class="text-center">Thao tác</th>
      </tr>
    </thead>
    <tbody id="productList"></tbody>
  </table>

  <!-- Modal sửa -->
  <div class="modal fade" id="editProdModal" tabindex="-1">
    <div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">Sửa Product</h5></div>
      <div class="modal-body">
        <input type="hidden" id="editProdId"/>
        <input type="text" id="editProdTitle" class="form-control mb-2"/>
        <input type="number" id="editProdPrice" class="form-control mb-2"/>
        <input type="number" id="editProdQty" class="form-control mb-2"/>

        <select id="editProdUserId" class="form-select mb-2"></select>
        <select id="editProdCategoryIds" class="form-select mb-2" multiple></select>

        <input type="file" id="editProdImageFile" class="form-control mb-2"/>
        <input type="text" id="editProdImageUrl" class="form-control mb-2" placeholder="Hoặc URL ảnh"/>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
        <button class="btn btn-primary" onclick="updateProduct()">Lưu</button>
      </div>
    </div></div>
  </div>

  <script>
  document.addEventListener("DOMContentLoaded", () => {
    loadUsersDropdown();
    loadCategoriesDropdown();
    renderProducts();   // 👈 gọi lại để render bảng product
  });
</script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
