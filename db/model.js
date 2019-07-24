import mongoose from 'mongoose'
//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb')
// 账户的数据库模型
const UserSchema = mongoose.Schema({
    username: String,
    password: Number,
});
//建立用户model层
const User = mongoose.model('User', UserSchema);


export default User