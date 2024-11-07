const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const EventModel=require('../models/eventData')
router.get('/view',async(req,res)=>{
    try{
        const data=await EventModel.find({status:'approved'});
        res.status(200).json(data);
}
catch(err){
    res.status(404).json({ message: 'Data not found' });
}
});
router.post('/post',async(req,res)=>{
    try{
        const item=req.body;
        const data=await EventModel.insertMany(item);
        res.status(200).json({ message: 'Post successful'});
    }
    catch (err) {
        res.status(400).json({ error: 'Error: ' + err.message });
      }
});
module.exports=router;