//File này để khai báo các loại action 

export const POST_LOGIN ="POST_LOGIN";  //Đăng nhập
export const DID_LOGIN_ACTION ="DID_LOGIN_ACTION"; 
export const POST_LOGIN_SUCCESS ="POST_LOGIN_SUCCESS";     //Đăng nhập thành công
export const POST_LOGIN_ERROR ="POST_LOGIN_ERROR";  //Đăng nhập thất bại

export const GET_COURSE ="GET_COURSE";  //Lấy danh sách khóa học
export const GET_COURSE_SUCCESS ="GET_COURSE_SUCCESS";     //Lấy danh sách khóa học thành công
export const GET_COURSE_ERROR ="POST_COURSE_ERROR";  //Lấy danh sách khóa học thất bại

export const GET_BUILDING_ROOM = "GET_BUILDING_ROOM"; // Lấy danh sách tòa nhà + phòng
export const GET_BUILDING_ROOM_SUCCESS ="GET_BUILDING_ROOM_SUCCESS";     //Lấy danh sách tòa nhà + phòng thành công
export const GET_BUILDING_ROOM_ERROR ="GET_BUILDING_ROOM_ERROR";  //Lấy danh sách tòa nhà + phòng thất bại

export const POST_KH = "POST_KH";   //Gửi khóa học mới
export const POST_KH_SUCCESS ="POST_KH_SUCCESS";    //Gửi khóa học thành công
export const POST_KH_ERROR ="POST_KH_ERROR";    //Gửi khóa học thất bại

export const DELETE_COURSE = "DELETE_COURSE" //Xóa Khóa Học
export const DELETE_COURSE_SUCCESS = "DELETE_COURSE_SUCCESS" //Xóa Khóa Học thành công
export const DELETE_COURSE_ERROR = "DELETE_COURSE_ERROR" //Xóa Khóa Học thất bại


export const GET_CLASS = "GET_CLASS";   //Lấy danh sách lớp học theo khóa học
export const GET_CLASS_SUCCESS = "GET_CLASS_SUCCESS";   //Lấy danh sách lớp học thành công
export const GET_CLASS_ERROR = "GET_CLASS_ERROR"; //Lấy danh sách lớp học thất bại

export const POST_EDIT_KH = "POST_EDIT_KH";   //Thay đổi khóa học
export const POST_EDIT_KH_SUCCESS ="POST_EDIT_KH_SUCCESS";    //Thay đổi khóa học thành công
export const POST_EDIT_KH_ERROR ="POST_EDIT_KH_ERROR";    //Thay đổi khóa học thất bại

export const SEND_COURSE = "SEND_COURSE"; //Gửi thông tin của khóa học lên redux

export const POST_CLASS = "POST_CLASS"; //Thêm mới lớp học
export const POST_CLASS_SUCCESS = "POST_CLASS_SUCCESS"; //Thêm mới lớp học thành công
export const POST_CLASS_ERROR = "POST_CLASS_ERROR"; //Thêm mới lớp học thất bại


export const DELETE_CLASS = "DELETE_CLASS" //Xóa Khóa Học
export const DELETE_CLASS_SUCCESS = "DELETE_CLASS_SUCCESS" //Xóa Khóa Học thành công
export const DELETE_CLASS_ERROR = "DELETE_CLASS_ERROR" //Xóa Khóa Học thất bại

export const POST_EDIT_BH = "POST_EDIT_BH";   //Thay đổi khóa học
export const POST_EDIT_BH_SUCCESS ="POST_EDIT_BH_SUCCESS";    //Thay đổi khóa học thành công
export const POST_EDIT_BH_ERROR ="POST_EDIT_BH_ERROR";    //Thay đổi khóa học thất bại