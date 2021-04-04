export async function delete_class(classId){

    var url = `http://10.86.224.37:5001/api/edu/delete_class?classId=${classId}`;
    var requestOptions ={
        method:'GET',
        headers:{
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYTNiMzY0ZTY1OTVhM2JkM2JiOTFmMCIsImlhdCI6MTYwNjM3NDM1OH0.B8tk_Ua9s1sh0Y3pdszUZ_CFS7r175csNyaH7aUFTrw',
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body:'',
    }

    const response = await fetch(url, requestOptions)
                        .then(response =>response.json())
                        .then(result=>{
                            return result;
                        }).catch(error=>{
                            return error;
                        });             
    
    return response;
}