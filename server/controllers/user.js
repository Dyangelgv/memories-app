//import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Users from "../models/user.js";

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await Users.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User dont'n exist! " });

        const isPassword = await bcrypt.compare(password, existingUser.password);
        if (isPassword) return res.status(400).json({ message: "Invalid credentials or password" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: '1 hour' });

        res.status(200).json({ result: existingUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await Users.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User Already exist! " });

        if (password !== confirmPassword) return res.status(400).json({ message: "passwords are not similar" });
        const hasPassword = await bcrypt.hash(password, 12);

        const result = await Users.create({ email, password: hasPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: '1 hour' });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}

