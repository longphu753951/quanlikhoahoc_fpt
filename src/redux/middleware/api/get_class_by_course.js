export async function get_class_by_course(courseId){
    var url = `http://118.69.123.51:5000/fis/api/edu/get_class_by_course?courseId=${courseId}`;
    
    var requestOptions ={
        method: 'GET',
        headers:{
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYTNiMzY0ZTY1OTVhM2JkM2JiOTFmMCIsImlhdCI6MTYwNjM3NDM1OH0.B8tk_Ua9s1sh0Y3pdszUZ_CFS7r175csNyaH7aUFTrw',
        },
        
    }
    const response = await fetch(url,requestOptions)
                        .then(response=>response.json())
                        .then(result=>{
                            
                            return result;
                        }).catch(error=>{
                            return error;
                        });
    return response;
}