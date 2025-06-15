import bcrypt from "bcryptjs";
import register from "../models/registration.js";


export const registerUser = async (req, res) => {
  const { firstName, lastName, age, location, mobileNo, role, email, password } =
    req.body;

  try {
    const userExists = await register.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists." });

    // 🔹 Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await register.create({
      firstName,
      lastName,
      age,
      location,
      mobileNo,
      role,
      email,
      password: hashedPassword, // 🔹 Store hashed password
    });

    res.status(201).json({ message: "User registered successfully"});
  } catch (err) {
    console.error("Error in register:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await register.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist." });

    // 🔹 Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid Password." });

    res.status(200).json({
      message: "Login successful"
    });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
