//Tạo đối tượng dsnv từ lớp đối tượng DanhSachNhanVien
var dsnv = new DanhSachNhanVien();

//Tạo đối tượng Validation từ lớp đối tượng Validation
var validation = new Validation();

//Lấy LocalStorage hiển thị trên web
getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
}

function layThongTinNhanVien() {
  //Dom tới các thẻ input lấy value
  var taiKhoan = getEle("tknv").value;
  var hoVaTen = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCB = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;

  //flag (cờ)
  var isValid = true;

  //Validation taiKhoan
  isValid &=
    validation.kiemTraRong(
      taiKhoan,
      "divErrorTaiKhoan",
      "(*)Tài Khoản không được trống"
    ) &&
    validation.kiemTraDoDaiKyTu(
      taiKhoan,
      "divErrorTaiKhoan",
      "(*) Độ dài ký tự 4-6",
      4,
      6
    );

  //Validation Họ và tên
  isValid &=
    validation.kiemTraRong(
      hoVaTen,
      "divErrorhoVaTen",
      "(*)Họ và tên không được trống"
    ) &&
    validation.kiemTraChuoiKyTu(
      hoVaTen,
      "divErrorhoVaTen",
      "(*) Vui lòng nhập chữ"
    );

  //Validation email
  isValid &= validation.kiemTraRong(
    email,
    "divErroremail",
    "(*) Email không được trống"
  ) &&
  validation.kiemTraEmail(
    email,
    "divErroremail",
    "(*) Email không đúng định dạng"
  );

  //Validation Mật Khẩu
  isValid &= validation.kiemTraRong(
    matKhau,
    "divErrorMatKhau",
    "(*) Mật khẩu không được trống"
  ) &&
  validation.kiemTraMatKhau(
    matKhau,
    "divErrorMatKhau",
    "(*) Mật khẩu 1 ký tự in hoa, 1 ký tự số, 1 ký tự đặc biệt"
  );

  //Validation Ngày Làm
  isValid &= validation.kiemTraRong(
    ngayLam,
    "divErrorNgayLam",
    "(*) Ngày làm không được trống"
  );

  //Validation Lương
  isValid &= validation.kiemTraRong(
    luongCB,
    "divErrorLuong",
    "(*) Lương không được trống"
  ) &&
  validation.kiemTraKhoang(
    luongCB,
    "divErrorLuong",
    "(*) Lương cơ bản 1 000 000 - 20 000 000",
    1000000,
    20000000,
  );

  //Validation Chức Vụ
  isValid &= validation.kiemTraChucVu(
    chucVu,
    "divErrorChucVu",
    "(*) Chức vụ không được trống"
  );

  //Validation Giờ Làm
  isValid &= validation.kiemTraRong(
    gioLam,
    "divErrorGioLam",
    "(*) Giờ làm không được trống"
  ) &&
  validation.kiemTraKhoang(
    gioLam,
    "divErrorGioLam",
    "(*) Số giờ làm trong tháng 80 - 200 giờ",
    80,
    200,
  );

  //check form
  if (!isValid) return null;

  //Tạo đối tượng nhanVien từ lớp đối tượng NhanVien()
  var nhanVien = new NhanVien(
    taiKhoan,
    hoVaTen,
    email,
    matKhau,
    ngayLam,
    luongCB,
    chucVu,
    gioLam
  );
  nhanVien.tinhTongLuong();
  nhanVien.xepLoaiNhanVien();
  return nhanVien;
}

getEle("btnThemNV").addEventListener("click", function () {
  var nhanVien = layThongTinNhanVien();
  if (nhanVien) {
    //Thêm Nhân viên
    dsnv.themNV(nhanVien);
    taoBang(dsnv.arr);
    setLocalStorage();
  }
});

function taoBang(arr) {
  var content = "";
  for (var i = 0; i < arr.length; i++) {
    var nhanVien = arr[i];
    content += `
      <tr>
        <td>${nhanVien.taiKhoan}</td>
        <td>${nhanVien.hoVaTen}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.ngayLam}</td>
        <td>${nhanVien.chucVu}</td>
        <td>${nhanVien.tongLuong}</td>
        <td>${nhanVien.xepLoai}</td>
        <td>
        <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNV('${nhanVien.taiKhoan}')">Sửa</button>
        <button class="btn btn-danger" onclick="xoaNV('${nhanVien.taiKhoan}')">x</button>
        </td>
      </tr>
    `;
  }
  getEle("tableDanhSach").innerHTML = content;
}
function setLocalStorage() {
  //Chuyển data từ JSON => String
  var dataString = JSON.stringify(dsnv.arr);
  //Lưu xuống localStorage
  localStorage.setItem("DSNV", dataString);
}
function getLocalStorage() {
  var data = localStorage.getItem("DSNV");
  if (data) {
    //Chuyển từ String => JSON
    var dataJSON = JSON.parse(data);
    dsnv.arr = dataJSON;
    taoBang(dsnv.arr);
  }
}
//Xóa nhân viên
function xoaNV(taiKhoan) {
  dsnv._xoaNV(taiKhoan);
  taoBang(dsnv.arr);
  setLocalStorage();
}
//Sủa nhân viên
function suaNV(taiKhoan) {
  // var nhanVien = dsnv._suaNV(taiKhoan);
  // if (nhanVien) {
  //   getEle("tknv").value = nhanVien.taiKhoan;
  //   getEle("name").value = nhanVien.hoVaTen;
  // }
  getEle("btnCapNhat").style.display = "inline-block";
  getEle("btnThemNV").style.display = "none";
  var nhanVien = dsnv._suaNV(taiKhoan);
  getEle("tknv").value = nhanVien.taiKhoan;
  getEle("tknv").disabled = true;
  getEle("name").value = nhanVien.hoVaTen;
  getEle("email").value = nhanVien.email;
  getEle("password").value = nhanVien.matKhau;
  getEle("datepicker").value = nhanVien.ngayLam;
  getEle("luongCB").value = nhanVien.luongCB;
  getEle("chucvu").value = nhanVien.chucVu;
  getEle("gioLam").value = nhanVien.gioLam;
}
/**
 * Cập nhật nhanVien benday
 */
getEle("btnCapNhat").addEventListener("click", function () {
  var nhanVien = layThongTinNhanVien();
  dsnv.capNhatNV(nhanVien);
  taoBang(dsnv.arr);
  setLocalStorage();
});

/**
 * Tìm kiếm nhanVien
 */
getEle("txtKeyword").addEventListener("keyup", function () {
  var keyword = getEle("txtKeyword").value;
  var mangTimKiem = dsnv.timNV(keyword);
  taoBang(mangTimKiem);
});

function openThemSVModal(){
  getEle("btnCapNhat").style.display = "none";
  getEle("btnThemNV").style.display = "inline-block";
}