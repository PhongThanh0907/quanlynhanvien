function DanhSachNhanVien() {
    this.arr = [];
    //Thêm NV
    this.themNV = function (nv) {
        this.arr.push(nv);
    };
    //Tìm kiếm NV
    this.timkiemNV = function(taiKhoan){
        var index = -1;
        for (var i = 0; i < this.arr.length; i++) {
            var nhanVien = this.arr[i];
            if (nhanVien.taiKhoan === taiKhoan) {
                index = i;
                break;
            }
        }
        return index;
    };
    //Xóa NV
    this._xoaNV = function (taiKhoan) {
        var index = this.timkiemNV(taiKhoan);
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    }
    //Sủa NV
    this._suaNV = function (taiKhoan) {
        var index = this.timkiemNV(taiKhoan);
        if(index !== -1){
            var nhanVien = this.arr[index];
            return nhanVien;
        }
        return null;
    };
    //Cập nhật NV
    this.capNhatNV = function (nhanVien) {
        var index = this.timkiemNV(nhanVien.taiKhoan);
        if(index !== -1){
            this.arr[index] = nhanVien;
        }
    };

    this.timNV = function (keyword) {
        var mangTimKiem = [];
        for(var i = 0; i < this.arr.length; i++){
            var nhanVien = this.arr[i];
            if(nhanVien.xepLoai.toLowerCase().indexOf(keyword.toLowerCase()) !== -1){
                mangTimKiem.push(nhanVien);
            }
        }
        return mangTimKiem;
    };
}