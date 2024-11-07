const express=require('express');
const app=express();
const cors=require('cors');
const morgan=require('morgan');
app.use(morgan('dev'));
require('dotenv').config();
app.use(cors());
const PORT=process.env.PORT
require('./db/connection');
const eventRoutes=require('./routes/basicRoutes');
app.use('/home',eventRoutes);
const userRoutes=require('./routes/user');
app.use('/user',userRoutes);
const adminRoutes=require('./routes/adminRoutes');
app.use('/admin',adminRoutes);



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})