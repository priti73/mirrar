require("dotenv").config()

const Sequlize=require("sequelize")
const sequelize= new Sequlize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    dialect:"mysql",
    host:'localhost',
    logging: false
})
module.exports=sequelize