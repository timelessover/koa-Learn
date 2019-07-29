import mongoose from 'mongoose'
//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb')

let Schema = mongoose.Schema
// 账户的数据库模型
const UserSchema = Schema({
    username: String,
    password: Number
});

const dataSchema = Schema({
    appkey: String,
    appname: String,
    connectionType: String,
    deviceId: String,
    duration: Number,
    initTime: Number,
    isDebug: Boolean,
    language: String,
    latitude: Number,
    lib_name: String,
    longitude: Number,
    model: String,
    openid: String,
    platform: String,
    query: { name: String, age: String },
    referrerInfo: { appId: String, extraData: String },
    scene: String,
    scr_height: Number,
    scr_width: Number,
    sdk_version: String,
    start: Number,
    timezone: Number,
    userinfo: {
        errMsg: String,
        rawData: { nickName: String, avatarUrl: String, gender: Number, city: String, province: String, country: String, language: String },
        userInfo: {
            nickName: String, avatarUrl: String, gender: Number,
            avatarUrl: String,
            city: String,
            country: String,
            gender: Number,
            language: String,
            nickName: String,
            province: String
        }
    },
    version: String,
    versionName: String,
    version_code: String
})

//建立用户model层
export const User = mongoose.model('User', UserSchema);
export const Data = mongoose.model('Data', dataSchema);

