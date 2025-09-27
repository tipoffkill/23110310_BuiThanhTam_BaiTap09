<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
  <title>Quản lý User</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <script defer src="/js/app.js"></script>
</head>
<body class="container mt-4">
  <h2>👤 Quản lý User</h2>

  <form class="row g-2 mb-4" onsubmit="createUser(); return false;">
    <div class="col-md-3"><input type="text" id="fullname" class="form-control" placeholder="Fullname"/></div>
    <div class="col-md-3"><input type="email" id="email" class="form-control" placeholder="Email"/></div>
    <div class="col-md-2"><input type="password" id="password" class="form-control" placeholder="Password"/></div>
    <div class="col-md-2"><input type="text" id="phone" class="form-control" placeholder="Phone"/></div>
    <div class="col-md-2"><button class="btn btn-success w-100">Thêm</button></div>
  </form>

  <table class="table table-bordered">
    <thead><tr><th>ID</th><th>Họ tên</th><th>Email</th><th>Phone</th><th>Thao tác</th></tr></thead>
    <tbody id="userList"></tbody>
  </table>

  <div class="modal fade" id="editUserModal" tabindex="-1">
    <div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">Sửa User</h5></div>
      <div class="modal-body">
        <input type="hidden" id="editUserId"/>
        <input type="text" id="editFullname" class="form-control mb-2"/>
        <input type="text" id="editPhone" class="form-control mb-2"/>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
        <button class="btn btn-primary" onclick="updateUser()">Lưu</button>
      </div>
    </div></div>
  </div>

  <script>
    document.addEventListener("DOMContentLoaded", () => renderUsers());
  </script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
