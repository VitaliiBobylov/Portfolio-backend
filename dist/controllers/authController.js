"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const JWT_SECRET = process.env.JWT_SECRET;
async function register(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }
        const exists = await user_1.default.findOne({ email });
        if (exists)
            return res.status(400).json({ message: "User already exists" });
        const hash = await bcryptjs_1.default.hash(password, 10);
        await user_1.default.create({ email, password: hash });
        return res.status(201).json({ message: "User created" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        const user = await user_1.default.findOne({ email });
        if (!user)
            return res.status(401).json({ message: "Invalid credentials" });
        const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch)
            return res.status(401).json({ message: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: "7d",
        });
        return res.json({ token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}
