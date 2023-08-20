const service = require('./service')
const csv = require('csvtojson')


//csv to json
const csv2json=async(req,res)=>{
    try{
        if((req.file==undefined)||(req.file==null)){
            res.send({code:404,message:"please upload csv file...!"})
            return console.log('kindly select and upload csv file');
        }
        let path="./files/"+req.file.filename
        const details=await csv().fromFile(path)
    
        
        for (const item of details){
            
            const servicesave =await service.savedata(item)
        }res.send({status:200,success:true ,message:"uploaded succesfully"})
    }catch(error){
        res.send({message:error,status:"not uploaded"})
    
    }     
    }
    //finding by aahdar
    const get = async(req,res)=>{
        const display = await service.findaadhar(req.body)
        res.send(display)
    }
    // emp status
    const getempstatus = async(req,res)=>{
        const display = await service.empstatus(req.body)
        res.send(display)
    }
    //updateall using aadhar
    const update= async(req,res)=>{
        const change = await service.updateall(req.body)
        res.send(change)
    }
/*count of emp_status
const countdetails = async(req,res)=>{
    const details = await service.count(req.body)
    res.send(details)
}*/
// on roll count
const onrolldata = async(req,res)=>{
    const details = await service.countonroll(req.body)
    res.send(details)
}
//resigned count

const resigneddata = async(req,res)=>{
    const details = await service.resinedcount(req.body)
    res.send(details)
}
module.exports={
        
        csv2json,
        get,
        getempstatus,
        update,
        //countdetails,
        onrolldata,
        resigneddata
    }