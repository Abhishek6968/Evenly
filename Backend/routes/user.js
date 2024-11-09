const express=require('express')
const router=express.Router();
router.use(express.json())
router.use(express.urlencoded({extended:true}))
const userModel=require('../models/userData');
const jwt=require('jsonwebtoken')


router.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await userModel.findOne({ userName, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const payload = { userId: user._id, userType: user.userType };
        const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });
        res.status(200).json({ token, user: { userId: user._id, userName: user.userName, userType: user.userType } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/view',async (req,res)=>{
    try{
        const users=await userModel.find();
        res.status(200).json(users);

    }
    catch{
        res.status(500).json({message:'Error Occured'});
    }
})
router.post('/create',async (req,res)=>{
    try{
        const user=await userModel.create(req.body);
        res.status(200).json({message:'User Added'});
         
    }
    catch{
        res.status(500).json({message:'Error Occured'});
    }});

router.put('/edit/:id',async (req,res)=>{
    try{
        const id=req.params.id;
        const user=await userModel.findByIdAndUpdate(id,req.body);
        if(user){
            res.status(200).json({message:"User update",data:user});

        } else{
            res.status(200).json({message:'User not found'});
        } }
    catch{
        res.status(500).json({message:'Error Occurred'});
    }

    });
    router.delete('/delete/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const deletedUser = await userModel.findByIdAndDelete(id);
            if (deletedUser) {
                res.status(200).json({ message: 'User Deleted' });
            } else {
                res.status(404).json({ message: 'User Not Found' });
            }
        } catch {
            res.status(500).json({ message: 'Error Occurred' });
        }
    });
    
    module.exports = router;
