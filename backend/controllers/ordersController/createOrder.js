import { orderModel } from "../../models/ordersModel/order.js";
import validator from "validator";

async function createNewOrder(req, res) {
  const { customerDetails, totalCost, cartItems, reference } = req.body;

  // check if customer name is supplied
  if (validator.isEmpty(customerDetails.name)) {
    return res.status(400).json({ message: "Please supply customer Name" });
  }

  // check if customer supply a valid email
  if (validator.isEmail(customerDetails.email) === false) {
    return res.status(400).json({ message: "Please supply a valid Email" });
  }

  // check if customer address is supplied
  if (validator.isEmpty(customerDetails.address)) {
    return res.status(400).json({ message: "Please supply customer Address" });
  }

  // check if total cost is supplied
  if (totalCost <= 0) {
    return res.status(400).json({ message: "Please provide order cost" });
  }

  // check if cart items is supplied
  if (cartItems.lenght === 0) {
    return res.status(400).json({ message: "Please Items must be ordered" });
  }

  // check if payment reference is supplied
  if (validator.isEmpty(reference.trxref)) {
    return res.status(400).json({ message: "Transaction Reference is needed" });
  }

  try {
    const order = await orderModel.create({
      customerDetails: customerDetails,
      totalCost: totalCost,
      reference: reference,
      cartItems: cartItems,
    });
    res.status(201).json({ message: "Order successfully created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export { createNewOrder };
