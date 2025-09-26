<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
  <title>Sản phẩm theo Category</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <script defer src="/js/app.js"></script>
</head>
<body class="container mt-4">
  <h2>📂 Sản phẩm theo Category</h2>

  <div class="row g-2 mb-4">
    <div class="col-md-6">
      <select id="catSelect" class="form-select"></select>
    </div>
    <div class="col-md-2">
      <button class="btn btn-primary" onclick="loadProductsByCategory()">Xem</button>
    </div>
  </div>

  <ul id="productsByCat" class="list-group"></ul>

  <script>
    async function loadCategoriesDropdown() {
      const data = await gql("{ categories { id name } }");
      const sel = document.getElementById("catSelect");
      sel.innerHTML = data.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
    }

    function loadProductsByCategory() {
      const cid = document.getElementById("catSelect").value;
      window.renderProductsByCategory(parseInt(cid));
    }

    // load categories khi mở trang
    loadCategoriesDropdown();
  </script>
</body>
</html>
