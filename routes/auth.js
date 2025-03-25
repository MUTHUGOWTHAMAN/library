const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const passport = require("passport");
const middleware = require("../middleware/index.js");

// ✅ Admin Signup - GET
router.get("/auth/admin-signup", middleware.ensureNotLoggedIn, (req, res) => {
	res.render("auth/adminSignup", {
		title: "Admin Signup"
	});
});

// ✅ Admin Signup - POST
router.post("/auth/admin-signup", middleware.ensureNotLoggedIn, async (req, res) => {
	const { firstName, lastName, email, password1, password2 } = req.body;
	let errors = [];

	// Form validation
	if (!firstName || !lastName || !email || !password1 || !password2) {
		errors.push({ msg: "Please fill in all the fields" });
	}
	if (password1 !== password2) {
		errors.push({ msg: "Passwords do not match" });
	}
	if (password1.length < 4) {
		errors.push({ msg: "Password length should be at least 4 characters" });
	}

	if (errors.length > 0) {
		return res.render("auth/adminSignup", {
			title: "Admin Signup",
			errors, firstName, lastName, email, password1, password2
		});
	}

	try {
		// Check if email already exists
		const user = await User.findOne({ email });
		if (user) {
			errors.push({ msg: "This email is already registered. Please try another." });
			return res.render("auth/adminSignup", {  // ✅ Fixed route name
				title: "Admin Signup",
				errors, firstName, lastName, email, password1, password2
			});
		}

		// Create and save new admin user
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password1, salt);
		const newUser = new User({
			firstName,
			lastName,
			email,
			password: hash,
			role: "admin"
		});

		await newUser.save();
		req.flash("success", "You are successfully registered. You can now log in.");
		res.redirect("/auth/admin-login");

	} catch (err) {
		console.error(err);
		req.flash("error", "An error occurred. Please try again.");
		res.redirect("back");
	}
});

// ✅ Admin Login - GET
router.get("/auth/admin-login", middleware.ensureNotLoggedIn, (req, res) => {
	res.render("auth/adminLogin", {
		title: "Admin Login"
	});
});

// ✅ Admin Login - POST
router.post("/auth/admin-login", middleware.ensureNotLoggedIn, passport.authenticate('local-admin', {
	successRedirect: "/admin/dashboard",
	failureRedirect: "/auth/admin-login",
	failureFlash: true
}));

// ✅ Admin Logout
router.get("/auth/admin-logout", middleware.ensureAdminLoggedIn, (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		req.flash("success", "Logged out successfully");
		res.redirect("/");
	});
});


// ✅ Student Signup - GET
router.get("/auth/student-signup", middleware.ensureNotLoggedIn, (req, res) => {
	res.render("auth/studentSignup", {
		title: "Student Signup"
	});
});

// ✅ Student Signup - POST
router.post("/auth/student-signup", middleware.ensureNotLoggedIn, async (req, res) => {
	const { firstName, lastName, email, password1, password2 } = req.body;
	let errors = [];

	// Form validation
	if (!firstName || !lastName || !email || !password1 || !password2) {
		errors.push({ msg: "Please fill in all the fields" });
	}
	if (password1 !== password2) {
		errors.push({ msg: "Passwords do not match" });
	}
	if (password1.length < 4) {
		errors.push({ msg: "Password length should be at least 4 characters" });
	}

	if (errors.length > 0) {
		return res.render("auth/studentSignup", {
			title: "Student Signup",
			errors, firstName, lastName, email, password1, password2
		});
	}

	try {
		// Check if email already exists
		const user = await User.findOne({ email });
		if (user) {
			errors.push({ msg: "This email is already registered. Please try another." });
			return res.render("auth/studentSignup", {  // ✅ Fixed route name
				title: "Student Signup",
				errors, firstName, lastName, email, password1, password2
			});
		}

		// Create and save new student user
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password1, salt);
		const newUser = new User({
			firstName,
			lastName,
			email,
			password: hash,
			role: "student"
		});

		await newUser.save();
		req.flash("success", "You are successfully registered. You can now log in.");
		res.redirect("/auth/student-login");

	} catch (err) {
		console.error(err);
		req.flash("error", "An error occurred. Please try again.");
		res.redirect("back");
	}
});

// ✅ Student Login - GET
router.get("/auth/student-login", middleware.ensureNotLoggedIn, (req, res) => {
	res.render("auth/studentLogin", {
		title: "Student Login"
	});
});

// ✅ Student Login - POST
router.post("/auth/student-login", middleware.ensureNotLoggedIn, passport.authenticate('local-student', {
	successRedirect: "/student/dashboard",
	failureRedirect: "/auth/student-login",
	failureFlash: true
}));

// ✅ Student Logout
router.get("/auth/student-logout", middleware.ensureStudentLoggedIn, (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		req.flash("success", "Logged out successfully");
		res.redirect("/");
	});
});

module.exports = router;
