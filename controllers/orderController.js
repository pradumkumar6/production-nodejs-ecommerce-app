import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { stripe } from "../server.js";

// create order controller
export const createOrderController = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemPrice,
      tax,
      shippingCharges,
      totalAmount,
    } = req.body;
    //valdiation
    // create order
    await Order.create({
      user: req.user._id,
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemPrice,
      tax,
      shippingCharges,
      totalAmount,
    });
    // stock update
    for (let i = 0; i < orderItems.length; i++) {
      // find product
      const product = await Product.findById(orderItems[i].product);
      product.stock -= orderItems[i].quantity;
      await product.save();
    }
    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Order API",
      error,
    });
  }
};
// get all orders controller
export const getAllOrdersController = async (req, res) => {
  try {
    // find orders
    const orders = await Order.find({ user: req.user._id });
    //valdiation
    if (!orders) {
      return res.status(404).send({
        success: false,
        message: "no orders found",
      });
    }
    res.status(200).send({
      success: true,
      message: "your orders data",
      totalOrder: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In My orders Order API",
      error,
    });
  }
};
// get single order controller
export const getSingleOrderController = async (req, res) => {
  try {
    // find orders
    const order = await Order.findById(req.params.id);
    //valdiation
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "no order found",
      });
    }
    res.status(200).send({
      success: true,
      message: "your order fetched",
      order,
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Get UPDATE Products API",
      error,
    });
  }
};
//payment controller
export const paymentController = async (req, res) => {
  try {
    // get ampunt
    const { totalAmount } = req.body;
    // validation
    if (!totalAmount) {
      return res.status(404).send({
        success: false,
        message: "Total Amount is require",
      });
    }
    const { client_secret } = await stripe.paymentIntents.create({
      amount: Number(totalAmount * 100),
      currency: "usd",
    });
    res.status(200).send({
      success: true,
      client_secret,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Payment API",
      error,
    });
  }
};
// admin part
// get all orders
export const getMyOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).send({
      success: true,
      message: "All Orders Data",
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get UPDATE Products API",
      error,
    });
  }
};
//change order status controller
export const changeOrderStatusController = async (req, res) => {
  try {
    // find order
    const order = await Order.findById(req.params.id);
    // validatiom
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "order not found",
      });
    }
    if (order.orderStatus === "processing") order.orderStatus = "shipped";
    else if (order.orderStatus === "shipped") {
      order.orderStatus = "deliverd";
      order.deliverdAt = Date.now();
    } else {
      return res.status(500).send({
        success: false,
        message: "order already deliverd",
      });
    }
    await order.save();
    res.status(200).send({
      success: true,
      message: "order status updated",
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Get UPDATE Products API",
      error,
    });
  }
};
