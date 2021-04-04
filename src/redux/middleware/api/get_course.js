export async function get_course(){
    var header = new Headers();
    header.append("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzQ3MjkyMzlkZDc1M2JjNzBkYTc4YyIsImlhdCI6MTYwNjc4ODI0OX0.ySlW8TEkgNMId8OzdAzcI6lYNUx_rtlOpz_jgs18vwY");
    var raw ="";
    var requestOptions ={
        method: "GET",
        headers: header,
        body: raw,
        redirect: 'follow'
    };
    
    const response = (await fetch("http://118.69.123.51:5000/fis/api/edu/get_all_course", requestOptions)).json();
    
    return response;
}