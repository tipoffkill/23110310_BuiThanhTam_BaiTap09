// =================== GraphQL helper ===================
async function gql(query, variables = {}) {
  const res = await fetch('/graphql', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables })
  });
  const json = await res.json();
  return json.data;
}

// =================== Upload helper ===================
async function uploadFile(fileInput) {
  if (!fileInput || fileInput.files.length === 0) return null;
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  const res = await fetch("/upload/image", { method: "POST", body: formData });
  const json = await res.json();
  return json.url || null;
}

// ================= USER CRUD =================
window.renderUsers = async function(){
  const data = await gql("{ users { id fullname email phone } }");
  const tbody = document.getElementById("userList");
  if (!tbody) return;

  if (!data.users || data.users.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">Chưa có user nào.</td></tr>`;
    return;
  }

  tbody.innerHTML = data.users.map(u => `
    <tr>
      <td>${u.id}</td>
      <td>${u.fullname}</td>
      <td>${u.email}</td>
      <td>${u.phone ?? ""}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick='openEditUser(${u.id}, ${JSON.stringify(u.fullname)}, ${JSON.stringify(u.phone ?? "")})'>Sửa</button>
        <button class="btn btn-sm btn-danger" onclick="deleteUser(${u.id})">Xóa</button>
      </td>
    </tr>
  `).join("");
};

window.createUser = async function(){
  const fullname=document.getElementById("fullname").value;
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  const phone=document.getElementById("phone").value;

  await gql(`mutation($fullname:String!,$email:String!,$password:String!,$phone:String){
    createUser(fullname:$fullname,email:$email,password:$password,phone:$phone){id}
  }`, {fullname,email,password,phone});

  renderUsers();
};

window.openEditUser = function(id, fullname, phone) {
  document.getElementById("editUserId").value = id;
  document.getElementById("editFullname").value = fullname;
  document.getElementById("editPhone").value = phone;
  new bootstrap.Modal(document.getElementById('editUserModal')).show();
};

window.updateUser = async function() {
  const id=parseInt(document.getElementById("editUserId").value);
  const fullname=document.getElementById("editFullname").value;
  const phone=document.getElementById("editPhone").value;

  await gql(`mutation($id:ID!,$fullname:String,$phone:String){
    updateUser(id:$id,fullname:$fullname,phone:$phone){id}
  }`, {id,fullname,phone});

  bootstrap.Modal.getInstance(document.getElementById('editUserModal')).hide();
  renderUsers();
};

window.deleteUser = async function(id) {
  if (!confirm("Xóa user này?")) return;
  await gql(`mutation($id:ID!){ deleteUser(id:$id) }`, {id});
  renderUsers();
};

// ================= CATEGORY CRUD =================
window.renderCategories = async function(){
  const data = await gql("{ categories { id name images } }");
  const tbody = document.getElementById("categoryList");
  if (!tbody) return;

  if (!data.categories || data.categories.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">⚠️ Chưa có category nào.</td></tr>`;
    return;
  }

  tbody.innerHTML = data.categories.map(c => `
    <tr>
      <td>${c.id}</td>
      <td>${c.name}</td>
      <td>${c.images ? `<img src="${c.images}" width="60"/>` : ""}</td>
      <td class="text-center">
        <button class="btn btn-sm btn-info me-1" 
                data-action="view" 
                data-id="${c.id}" 
                data-name="${c.name}">Xem SP</button>

        <button class="btn btn-sm btn-warning me-1" 
                data-action="edit" 
                data-id="${c.id}" 
                data-name="${c.name}" 
                data-img="${c.images || ""}">Sửa</button>

        <button class="btn btn-sm btn-danger" 
                data-action="delete" 
                data-id="${c.id}">Xóa</button>
      </td>
    </tr>
  `).join("");

  tbody.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      if (btn.dataset.action === "view") {
        loadProductsByCategory(id, btn.dataset.name);
      } else if (btn.dataset.action === "edit") {
        openEditCategory(id, btn.dataset.name, btn.dataset.img);
      } else if (btn.dataset.action === "delete") {
        deleteCategory(id);
      }
    });
  });
};

window.createCategory = async function () {
  const name = document.getElementById("catName").value.trim();
  const imageUrl = await uploadFile(document.getElementById("catImageFile"));

  await gql(`mutation($name:String!,$images:String){
    createCategory(name:$name,images:$images){id}
  }`, { name, images:imageUrl });

  renderCategories();
};

window.openEditCategory = function (id, name, images) {
  document.getElementById("editCatId").value = id;
  document.getElementById("editCatName").value = name;
  document.getElementById("editCatImage").value = images;

  const preview = document.getElementById("editCatPreview");
  if (preview) {
    if (images) {
      preview.src = images;
      preview.style.display = "block";
    } else {
      preview.style.display = "none";
    }
  }
  new bootstrap.Modal(document.getElementById('editCatModal')).show();
};

window.updateCategory = async function () {
  const id = parseInt(document.getElementById("editCatId").value);
  const name = document.getElementById("editCatName").value.trim();

  let images = null;

  const fileInput = document.getElementById("editCatImageFile");
  if (fileInput && fileInput.files.length > 0) {
    images = await uploadFile(fileInput);
  }

  if (!images) {
    images = document.getElementById("editCatImage").value.trim();
  }

  await gql(`mutation($id:ID!,$name:String,$images:String){
    updateCategory(id:$id,name:$name,images:$images){id}
  }`, { id, name, images });

  bootstrap.Modal.getInstance(document.getElementById('editCatModal')).hide();
  renderCategories();
};


window.deleteCategory = async function (id) {
  if (!confirm("Bạn có chắc chắn muốn xóa category này?")) return;
  await gql(`mutation($id:ID!){ deleteCategory(id:$id) }`, { id });
  renderCategories();
};

window.loadProductsByCategory = async function(catId, catName) {
  const data = await gql(`query($catId:ID!){
    productsByCategory(categoryId:$catId){
      id title price quantity image
      user { fullname }
    }
  }`, { catId });

  const ul = document.getElementById("productsByCat");
  if (!ul) return;

  if (!data.productsByCategory || data.productsByCategory.length === 0) {
    ul.innerHTML = `<li class="list-group-item text-muted">❌ Category "${catName}" chưa có sản phẩm.</li>`;
    return;
  }

  ul.innerHTML = data.productsByCategory.map(p => `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <b>${p.title}</b> (${p.quantity} sp) - ${p.price}₫ <br>
        👤 ${p.user ? p.user.fullname : "N/A"}
      </div>
      ${p.image ? `<img src="${p.image}" width="50"/>` : ""}
    </li>
  `).join("");
};


// ================= PRODUCT CRUD =================
window.renderProducts = async function() {
  const data = await gql(`{
    products {
      id title price quantity image
      user { id fullname }
      categories { id name }
    }
  }`);
  const tbody = document.getElementById("productList");
  if (!tbody) return;

  if (!data.products || data.products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center text-muted">Chưa có sản phẩm nào.</td></tr>`;
    return;
  }

  tbody.innerHTML = data.products.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>${p.title}</td>
      <td>${p.image ? `<img src="${p.image}" width="60"/>` : ""}</td>
      <td>${p.price}</td>
      <td>${p.quantity}</td>
      <td>${p.user ? p.user.fullname : ""}</td>
      <td>${p.categories.map(c => c.name).join(", ")}</td>
      <td class="text-center">
        <button class="btn btn-sm btn-warning" onclick='openEditProduct(${JSON.stringify(p)})'>Sửa</button>
        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">Xóa</button>
      </td>
    </tr>
  `).join("");
};

window.createProduct = async function() {
  const title = document.getElementById("pTitle").value;
  const quantity = parseInt(document.getElementById("pQty").value);
  const desc = document.getElementById("pDesc").value;
  const price = parseFloat(document.getElementById("pPrice").value);
  const userId = parseInt(document.getElementById("pUserId").value);
  const catIds = Array.from(document.getElementById("pCategoryIds").selectedOptions).map(o => parseInt(o.value));
  const imageUrl = await uploadFile(document.getElementById("pImageFile"));

  await gql(`mutation($title:String!,$quantity:Int!,$desc:String,$price:Float!,$userId:ID!,$image:String,$catIds:[ID!]){
    createProduct(title:$title,quantity:$quantity,desc:$desc,price:$price,userId:$userId,image:$image,categoryIds:$catIds){id}
  }`, { title, quantity, desc, price, userId, image:imageUrl, catIds });

  renderProducts();
};

window.openEditProduct = function(prod) {
  document.getElementById("editProdId").value = prod.id;
  document.getElementById("editProdTitle").value = prod.title;
  document.getElementById("editProdPrice").value = prod.price;
  document.getElementById("editProdQty").value = prod.quantity;
  document.getElementById("editProdUserId").value = prod.user ? prod.user.id : "";
  const selCats = document.getElementById("editProdCategoryIds");
  Array.from(selCats.options).forEach(o => {
    o.selected = prod.categories.some(c => c.id == o.value);
  });
  document.getElementById("editProdImageUrl").value = prod.image || "";
  new bootstrap.Modal(document.getElementById('editProdModal')).show();
};

window.updateProduct = async function() {
  const id = parseInt(document.getElementById("editProdId").value);
  const title = document.getElementById("editProdTitle").value;
  const price = parseFloat(document.getElementById("editProdPrice").value);
  const quantity = parseInt(document.getElementById("editProdQty").value);
  const userId = parseInt(document.getElementById("editProdUserId").value);
  const catIds = Array.from(document.getElementById("editProdCategoryIds").selectedOptions).map(o => parseInt(o.value));
  let imageUrl = null;


  const fileInput = document.getElementById("editProdImageFile");
  if (fileInput && fileInput.files.length > 0) {
    imageUrl = await uploadFile(fileInput);
  }

  if (!imageUrl) {
    imageUrl = document.getElementById("editProdImageUrl").value.trim();
  }


  await gql(`mutation($id:ID!,$title:String,$price:Float,$quantity:Int,$userId:ID,$image:String,$catIds:[ID!]){
    updateProduct(id:$id,title:$title,price:$price,quantity:$quantity,userId:$userId,image:$image,categoryIds:$catIds){id}
  }`, { id, title, price, quantity, userId, image:imageUrl, catIds });

  bootstrap.Modal.getInstance(document.getElementById('editProdModal')).hide();
  renderProducts();
};

window.deleteProduct = async function(id) {
  if (!confirm("Xóa product này?")) return;
  await gql(`mutation($id:ID!){ deleteProduct(id:$id) }`, { id });
  renderProducts();
};

// =================== Load dropdowns ===================
window.loadUsersDropdown = async function() {
  const data = await gql("{ users { id fullname } }");
  const sel = document.getElementById("pUserId");
  const selEdit = document.getElementById("editProdUserId");
  if (sel) sel.innerHTML = data.users.map(u => `<option value="${u.id}">${u.fullname}</option>`).join("");
  if (selEdit) selEdit.innerHTML = data.users.map(u => `<option value="${u.id}">${u.fullname}</option>`).join("");
};

window.loadCategoriesDropdown = async function() {
  const data = await gql("{ categories { id name } }");
  const sel = document.getElementById("pCategoryIds");
  const selEdit = document.getElementById("editProdCategoryIds");
  if (sel) sel.innerHTML = data.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
  if (selEdit) selEdit.innerHTML = data.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
};
