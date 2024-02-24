import Product from "../models/product.models.js"
import extend from "lodash/extend.js"
import errorHandler from "./error.controller.js"

const create = async (req, res) =>{
    const product = new Product(req.body);

    try{
        await product.save();
        return res.status(200).json({
            message:"Successfully created!"
        })
    }
    catch(err){
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}


const list = async(req, res) =>{
    try{

        let param = req.query['name']
        let products = null
        if(!param){
            products = await Product.find();
        }else{
            products = await Product.find({ name: { $regex: 'kw', $options: 'i' } })
        }
        
        res.json(products)
    }
    catch(err){
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}


const productByID = async(req, res, next, id)=>{
    try{
        let product = await Product.findById(id)

        if(!product){
            return res.status(400).json({
                error:"Product not found"
            })
        }

        req.productInfo = product
        next()

    }
    catch(err){
        return res.status(400).json({
            error: "Could not retrieve product"
        })
    }
}

const update = async (req,res)=>{
    try{
        let product = req.productInfo;
        product = extend(product, req.body)
        product.updated = Date.now()
        await product.save()
        res.json(product)
    }
    catch(err){
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}

const read = (req, res) =>{
    return res.json(req.productInfo)
}

const remove = async (req, res) =>{
    try{
        let product = req.productInfo;
        let deletedProduct = await product.deleteOne()

        res.json(deletedProduct)
    }
    catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const removeAll = async (req, res) =>{
    try{
        let deletedAllProducts = await Product.deleteMany()

        res.json(deletedAllProducts)
    }
    catch(err){
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}

export default { create, productByID, read, removeAll, list, remove, update }