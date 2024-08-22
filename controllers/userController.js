
import User from "../models/User.js";
import mongoose from 'mongoose';
import { CustomError } from "../middlewares/error.js";



const getUserController = async (req, res, next) => {
    const { userId } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new CustomError("Invalid User ID format", 400);
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new CustomError("No User Found!", 404);
        }
        const { password, ...data } = user._doc;
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const updateUserController = async (req, res, next) => {

    const { userId } = req.params
    const updateData = req.body
    try {

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new CustomError("Invalid User ID format", 400);
        }
        const userToUpdate = await User.findById(userId)
        if (!userToUpdate) {
            throw new CustomError("User not found!", 404)
        }

        Object.assign(userToUpdate, updateData)
        await userToUpdate.save();

        const { password, ...userWithoutPassword } = userToUpdate._doc;


        res.status(200).json({ message: "User updated successfully!", user: userWithoutPassword })

    }
    catch (error) {
        next(error)
    }
}


export { getUserController, updateUserController };