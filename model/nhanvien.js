function NhanVien(
    _taiKhoan,
    _hoVaTen,
    _email,
    _matKhau,
    _ngayLam,
    _luongCB,
    _chucVu,
    _gioLam,
) {
    this.taiKhoan = _taiKhoan;
    this.hoVaTen = _hoVaTen;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCB = _luongCB;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.xepLoai = "";

    this.tinhTongLuong = function(){
        if(this.chucVu == "Sếp"){
            this.tongLuong = parseFloat(this.luongCB) * 3;
        }else if(this.chucVu == "Trưởng phòng"){
            this.tongLuong = parseFloat(this.luongCB) * 2;
        }else{
            this.tongLuong = parseFloat(this.luongCB);
        }
    };
    this.xepLoaiNhanVien = function(){
        if(this.gioLam >= 192){
            this.xepLoai = "Nhân viên xuất sắc";
        }else if(this.gioLam >= 176 && this.gioLam < 192){
            this.xepLoai = "Nhân viên giỏi";
        }else if(this.gioLam >= 160 && this.gioLam < 176){
            this.xepLoai = "Nhân viên khá";
        }else if(this.gioLam < 160){
            this.xepLoai = "Nhân viên trung bình"
        }
    }
}