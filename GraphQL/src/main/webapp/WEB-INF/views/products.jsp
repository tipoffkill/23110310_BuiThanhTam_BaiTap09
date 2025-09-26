<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
  <title>Quản lý Product</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <script defer src="/js/app.js"></script>
</head>
<body class="container mt-4">
  <h2>📦 Quản lý Product</h2>

  <form class="row g-2 mb-4" onsubmit="createProduct(); return false;">
    <div class="col-md-3"><input id="pTitle" class="form-control" placeholder="Tên"/></div>
    <div class="col-md-2"><input id="pQty" type="number" class="form-control" placeholder="Số lượng"/></div>
    <div class="col-md-2"><input id="pPrice" type="number" class="form-control" placeholder="Giá"/></div>
    <div class="col-md-2"><input id="pUserId" type="number" class="form-control" placeholder="User ID"/></div>
    <div class="col-md-3"><input id="pImage" class="form-control" placeholder="Ảnh (URL)"/></div>
    <div class="col-12"><textarea id="pDesc" class="form-control" placeholder="Mô tả"></textarea></div>
    <div class="col-12"><button class="btn btn-success mt-2">Thêm</button></div>
  </form>

  <table class="table table-bordered">
    <thead><tr><th>ID</th><th>Tên</th><th>Giá</th><th>Số lượng</th><th>Thao tác</th></tr></thead>
    <tbody id="productList"></tbody>
  </table>

  <div class="modal fade" id="editProdModal" tabindex="-1">
    <div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">Sửa Product</h5></div>
      <div class="modal-body">
        <input type="hidden" id="editProdId"/>
        <input type="text" id="editProdTitle" class="form-control mb-2"/>
        <input type="number" id="editProdPrice" class="form-control mb-2"/>
        <input type="number" id="editProdQty" class="form-control mb-2"/>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
        <button class="btn btn-primary" onclick="updateProduct()">Lưu</button>
      </div>
    </div></div>
  </div>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    renderProducts();
  });
</script>

  <script>renderProducts();</script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
