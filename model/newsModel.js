const mongoose = require('mongoose');

// model of CategoryTable
const nzData = new mongoose.Schema({
        title:{
            type:String,
            required:true,
        },
        author:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            required:true,
        },
        category_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Category',
        }
})

const News = new mongoose.model('News',nzData);
module.exports = News
