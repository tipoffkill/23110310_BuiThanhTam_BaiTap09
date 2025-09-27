<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
  <title>GraphQL Store</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet"/>
  <style>
    body {
      background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    }
    .dashboard-card {
      transition: transform .2s, box-shadow .2s;
      cursor: pointer;
    }
    .dashboard-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    }
    .icon-circle {
      width: 60px; height: 60px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 28px;
    }
    .card-products .icon-circle { background: #ffe0e0; color: #dc3545; }
    .card-categories .icon-circle { background: #e0f7ff; color: #0d6efd; }
    .card-users .icon-circle { background: #e9fbe0; color: #198754; }
  </style>
</head>
<body class="container py-5">
  <h2 class="text-center mb-4">Hệ thống quản lý</h2>

  <div class="row g-4">
    <!-- Products -->
    <div class="col-md-4">
      <div class="card dashboard-card card-products h-100 text-center p-4" onclick="location.href='products'">
        <div class="icon-circle mx-auto mb-3"><i class="bi bi-box-seam"></i></div>
        <h5 class="card-title">Quản lý Product</h5>
        <p class="text-muted">Thêm, sửa, xóa và theo dõi thông tin sản phẩm trong cửa hàng.</p>
        <a href="products" class="btn btn-outline-danger">Đi tới Product</a>
      </div>
    </div>

    <!-- Categories -->
    <div class="col-md-4">
      <div class="card dashboard-card card-categories h-100 text-center p-4" onclick="location.href='categories'">
        <div class="icon-circle mx-auto mb-3"><i class="bi bi-folder"></i></div>
        <h5 class="card-title">Quản lý Category</h5>
        <p class="text-muted">Tổ chức sản phẩm theo từng danh mục với hình ảnh và tên gọi riêng.</p>
        <a href="categories" class="btn btn-outline-primary">Đi tới Category</a>
      </div>
    </div>

    <!-- Users -->
    <div class="col-md-4">
      <div class="card dashboard-card card-users h-100 text-center p-4" onclick="location.href='users'">
        <div class="icon-circle mx-auto mb-3"><i class="bi bi-people"></i></div>
        <h5 class="card-title">Quản lý User</h5>
        <p class="text-muted">Quản lý tài khoản người dùng, thông tin liên hệ.</p>
        <a href="users" class="btn btn-outline-success">Đi tới User</a>
      </div>
    </div>
  </div>

  <footer class="text-center mt-5 text-muted small">
  Bùi Thành Tâm
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
