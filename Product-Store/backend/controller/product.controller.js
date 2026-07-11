import { Product } from "../model/product.model.js";
import mongoose from "mongoose";


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            message: "Product feteched Successfully",
            data: products
        })
    } catch (error) {
        console.log(`Error occur in getting all product ${error.message}`)
        res.status(500).json({
            success: false,
            message: "server error "
        })
    }
}

export const createProducts = async (req, res) => {
    // data lunga
    const product = req.body;

    // validate karunga
    if (!product.name || !product.price || !product.image) {
        res.status(400).json({ success: false, message: "All fields are required" })
    }

    // sab fields aayi hai to document create karo db mai sav karo
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(200).json({
            success: true,
            data: newProduct
        })
    } catch (error) {
        console.error(`Error occur in creating product ${error.message}`)
        res.status(500).json({ success: false, message: 'Internal Server Error' })


    }
}

export const deleteProducts = async (req, res) => {
    const { id } = req.params
    // console.log(`id: ${id}`)
    try {
        // try to deleting an product
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Product deleted Successfully"
        })

    } catch (error) {
        console.log(`Error occur in Deleting product ${error.message}`)
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
}

export const updateProducts =   async (req, res) => {
    // get id from params
    const { id } = req.params;

    // get data that u want to update
    const product = req.body;

    // validate id 
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "Invalid product id "
            })
        }

        // updating prouct

        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })

        res.status(201).json({
            success: true,
            message: "product updated Successfully ",
            data: updatedProduct
        })
    } catch (error) {
        console.log(`Error occur in Updating product ${error.message}`)
        res.status(500).json({
            success: false,
            message: "Server error "
        })
    }
}
