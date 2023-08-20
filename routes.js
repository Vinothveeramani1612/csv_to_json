const express= require('express')
const router = express.Router()
const functions = require('./controller/index')
const multer = require('./config/multer')
    

let routes = (app)=>
{
    router.post('/uploadcsv',multer.single("upload"),functions.csv2json);
    router.post('/adhardetails',functions.get);
    router.post('/getempstatus',functions.getempstatus);
    router.post('/updateall',functions.update);
   // router.post('/countdetails',functions.countdetails);
   router.post('/onrollcount',functions.onrolldata);
   router.post('/resignedcount',functions.resigneddata);
    app.use('/api',router)
        
}
module.exports=routes