const express=require("express");
const sequelize=require("./util/database")
const bodyparser=require("body-parser")
 const productsRoutes=require("./routes/products")
const Product=require("./models/products")
const Variant=require("./models/variants")

const app=express();

app.use(bodyparser.json())

const cors=require("cors")
app.use(cors());

app.use(productsRoutes)

Product.hasMany(Variant, { as: 'Variants', foreignKey: 'productId' });
Variant.belongsTo(Product, { as: 'Products', foreignKey: 'productId' });




sequelize
.sync()
//.sync({force:true})
.then(()=>{
    app.listen(3000,()=>{
        console.log("server connected on 3000")
    })
})
