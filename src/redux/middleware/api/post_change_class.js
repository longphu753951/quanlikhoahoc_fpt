export default async function post_change_class(classId,className,trainer,date,startedTime,endedTime,buildingId,roomId){
    let data ={
        classId,
        className,
        trainer,
        date,
        startedTime,
        endedTime,
        buildingId,
        roomId
    };
    var url = `http://118.69.123.51:5000/fis/api/edu/edit_class`;
    var requestOptions={
        method:'POST',
        headers:{
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYTNiMzY0ZTY1OTVhM2JkM2JiOTFmMCIsImlhdCI6MTYwNjM3NDM1OH0.B8tk_Ua9s1sh0Y3pdszUZ_CFS7r175csNyaH7aUFTrw',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data),
    }
    const response = await fetch(url,requestOptions)
                            .then(response=>response.json())
                            .then(result=>{
                                console.log(result);
                                return{result}
                                }
                            ).catch(error=>{
                                return error;
                            });
 
    return response;
}