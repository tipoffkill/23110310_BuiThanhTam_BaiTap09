// =================== GraphQL helper ===================
async function gql(query, variables = {}) {
  const res = await fetch('/graphql', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables })
  });
  return (await res.json()).data;
}

// ================= PRODUCT =================
// Hiển thị tất cả product theo giá từ thấp -> cao
window.renderProducts = async function() {
  const data = await gql("{ products { id title price quantity } }");
  if (!data.products || data.products.length === 0) {
    document.getElementById("productList").innerHTML =
      `<tr><td colspan="5" class="text-center text-muted">Chưa có sản phẩm nào.</td></tr>`;
    return;
  }
  const sorted = [...data.products].sort((a, b) => a.price - b.price);
  document.getElementById("productList").innerHTML =
    sorted.map(p => `<tr>
        <td>${p.id}</td>
        <td>${p.title}</td>
        <td>${p.price}</td>
        <td>${p.quantity}</td>
        <td>
          <button class="btn btn-sm btn-warning" 
            onclick='openEditProduct(${p.id}, ${JSON.stringify(p.title)}, ${p.price}, ${p.quantity})'>Sửa</button>
          <button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">Xóa</button>
        </td>
      </tr>`).join("");
};

// CRUD Product
window.createProduct = async function(){
  const title=document.getElementById("pTitle").value;
  const quantity=parseInt(document.getElementById("pQty").value);
  const desc=document.getElementById("pDesc").value;
  const price=parseFloat(document.getElementById("pPrice").value);
  const userId=parseInt(document.getElementById("pUserId").value);
  const image=document.getElementById("pImage").value;

  await gql(`mutation($title:String!,$quantity:Int!,$desc:String,$price:Float!,$userId:ID!,$image:String){
    createProduct(title:$title,quantity:$quantity,desc:$desc,price:$price,userId:$userId,image:$image){id}
  }`, {title,quantity,desc,price,userId,image});
  renderProducts();
};

window.openEditProduct = function(id, title, price, qty) {
  document.getElementById("editProdId").value = id;
  document.getElementById("editProdTitle").value = title;
  document.getElementById("editProdPrice").value = price;
  document.getElementById("editProdQty").value = qty;
  new bootstrap.Modal(document.getElementById('editProdModal')).show();
};

window.updateProduct = async function() {
  const id=parseInt(document.getElementById("editProdId").value);
  const title=document.getElementById("editProdTitle").value;
  const price=parseFloat(document.getElementById("editProdPrice").value);
  const quantity=parseInt(document.getElementById("editProdQty").value);
  await gql(`mutation($id:ID!,$title:String,$price:Float,$quantity:Int){
    updateProduct(id:$id,title:$title,price:$price,quantity:$quantity){id}
  }`, {id,title,price,quantity});
  bootstrap.Modal.getInstance(document.getElementById('editProdModal')).hide();
  renderProducts();
};

window.deleteProduct = async function(id) {
  if (!confirm("Xóa product này?")) return;
  await gql(`mutation($id:ID!){ deleteProduct(id:$id) }`, {id});
  renderProducts();
};

// ================= CATEGORY CRUD =================
// ================= CATEGORY CRUD =================

// Render tất cả category
window.renderCategories = async function(){
  const data = await gql("{ categories { id name images } }");
  const tbody = document.getElementById("categoryList");

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
        <button class="btn btn-sm btn-info me-1" onclick="renderProductsByCategory(${c.id})">Xem sản phẩm</button>
        <button class="btn btn-sm btn-warning me-1" onclick="openEditCategory(${c.id}, ${JSON.stringify(c.name)}, ${JSON.stringify(c.images || "")})">Sửa</button>
        <button class="btn btn-sm btn-danger" onclick="deleteCategory(${c.id})">Xóa</button>
      </td>
    </tr>`).join("");
};


// Thêm mới Category
window.createCategory = async function () {
  const name = document.getElementById("catName").value.trim();
  const images = document.getElementById("catImage").value.trim();

  if (!name) {
    alert("Tên category không được để trống!");
    return;
  }

  await gql(`mutation($name:String!,$images:String){
    createCategory(name:$name,images:$images){id}
  }`, { name, images });

  // Reset input
  document.getElementById("catName").value = "";
  document.getElementById("catImage").value = "";

  renderCategories();
};

// Mở modal sửa
window.openEditCategory = function (btn) {
  const id = btn.getAttribute("data-id");
  const name = btn.getAttribute("data-name");
  const images = btn.getAttribute("data-images");

  document.getElementById("editCatId").value = id;
  document.getElementById("editCatName").value = name;
  document.getElementById("editCatImage").value = images;

  new bootstrap.Modal(document.getElementById('editCatModal')).show();
};

// Cập nhật Category
window.updateCategory = async function () {
  const id = parseInt(document.getElementById("editCatId").value);
  const name = document.getElementById("editCatName").value.trim();
  const images = document.getElementById("editCatImage").value.trim();

  if (!name) {
    alert("Tên category không được để trống!");
    return;
  }

  await gql(`mutation($id:ID!,$name:String,$images:String){
    updateCategory(id:$id,name:$name,images:$images){id}
  }`, { id, name, images });

  bootstrap.Modal.getInstance(document.getElementById('editCatModal')).hide();
  renderCategories();
};

// Xóa Category
window.deleteCategory = async function (id) {
  if (!confirm("Bạn có chắc chắn muốn xóa category này?")) return;

  await gql(`mutation($id:ID!){ deleteCategory(id:$id) }`, { id });
  renderCategories();
};

// Gọi load khi mở trang
document.addEventListener("DOMContentLoaded", function () {
  renderCategories();
});

// ================= USER CRUD =================
window.renderUsers = async function(){
  const data = await gql("{ users { id fullname email phone } }");
  if (!data.users || data.users.length === 0) {
    document.getElementById("userList").innerHTML =
      `<tr><td colspan="5" class="text-center text-muted">Chưa có user nào.</td></tr>`;
    return;
  }
  document.getElementById("userList").innerHTML =
    data.users.map(u => `<tr>
      <td>${u.id}</td>
      <td>${u.fullname}</td>
      <td>${u.email}</td>
      <td>${u.phone ?? ""}</td>
      <td>
        <button class="btn btn-sm btn-warning" 
          onclick='openEditUser(${u.id}, ${JSON.stringify(u.fullname)}, ${JSON.stringify(u.phone??"")})'>Sửa</button>
        <button class="btn btn-sm btn-danger" onclick="deleteUser(${u.id})">Xóa</button>
      </td>
    </tr>`).join("");
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
