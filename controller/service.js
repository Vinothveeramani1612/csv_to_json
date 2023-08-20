const mongoose = require("mongoose")
const empDetailsSchema = new mongoose.Schema(
    {
    id:String,
    Name: String,
    Father_Name: String,
    Date_of_Join: String,
    M2_Permenant_Date: String,
    Date_of_Resignation: String,
    Date_of_Birth: String,
    Mobile_NO: String,
    Postal_Address: String,
    Name_of_Nominee: String,
    Salary: String,
    Designation: String,
    Aadhar_No: String,
    PAN: String,
    Bank_AC_Number: String,
    IFSC_code: String,
    Emp_status: String,
    Company_Name: String,
    createdon: String
    }
);

const collect = mongoose.model('emp_details', empDetailsSchema)

const savedata = async(data)=>
{
    if(data.length!==0){
        const existingid = await collect.findOne({Aadhar_No:data.Aadhar_No})
        if(existingid)
        {
            return false
        }
        else
    {
    const date = new Date();
    var  empid = date.toISOString().slice(0,10).replace('-','').replace('-','');
    data.createdon = empid;
    const count = await collect.countDocuments({
        'createdon':empid
    
    })

    data.id= empid+(count+1);

    const input = new collect(data)
    const getdata = await input.save()
    return getdata
}}
else{false}
}

//find info by aadhar
const findaadhar = async(data)=>
{
    const getdetails = await collect.findOne({Aadhar_No:data.Aadhar_No})
    return getdetails
}
//get all emp_status based on_roll /resigned
const empstatus= async(data)=>
{
    const details= await collect.find({Emp_status:data.Emp_status})
    return details
}
//update all using aadhar
const updateall = async(data)=>{
    const details = await collect.findOneAndUpdate({Aadhar_No:data.Aadhar_No},
        {$set: {
            Name:data.Name,
            Father_Name:data.Father_Name,
            Date_of_Join:data.Date_of_Join
        }},{multi:true})
        return details
}
//counting no of active employee from emp_status
/*const count = async (data) => {
    const pipeline = [
        {
            $match: { Emp_status: data.Emp_status }
        },
        {
            $group: {
                _id: "$Emp_status",
                On_Roll_count: { $sum: { $cond: [{ $eq: ["$Emp_status", "On_roll"] }, 1, 0] } },
                Resigned_count: { $sum: { $cond: [{ $eq: ["$Emp_status", "Resigned"] }, 1, 0] } }
            }
        }
    ];

    try {
        const result = await collect.aggregate(pipeline).toArray();
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};*/
// on roll count
const countonroll = async(data)=>{
    const countdata = await collect.aggregate([{$match:{Emp_status:data.Emp_status}},{$count:"On_Roll counts"}])
    return countdata
}
// resigned count
const resinedcount = async(data)=>{
    const countdata = await collect.aggregate([{$match:{Emp_status:data.Emp_status}},{$count:"Resigned counts"}])
    return countdata
}


module.exports=
{
    savedata,
    findaadhar,
    empstatus,
    updateall,
    //count,
    countonroll,
    resinedcount

}