
    const sendOtpBtn = document.getElementById("sendOtpBtn");
    const verifyOtpBtn = document.getElementById("verifyOtpBtn");
    const resetBtn = document.getElementById("resetBtn");

    const emailStep = document.getElementById("emailStep");
    const otpStep = document.getElementById("otpStep");
    const resetStep = document.getElementById("resetStep");

    let resetEmail = "";
    let resetOtp = "";

    // ===== Send OTP =====
    sendOtpBtn.addEventListener("click", async () => {
        const email = document.getElementById("email").value.trim();
        if (!email) { alert("Please enter email"); return; }

        try {
            const res = await fetch(`http://localhost:8080/users/send-otp?email=${encodeURIComponent(email)}`, {
                method: "POST"
            });
            const text = await res.text();
            alert(text);
            if (res.ok) {
                resetEmail = email;
                emailStep.classList.add("hidden");
                otpStep.classList.remove("hidden");
            }
        } catch (err) {
            console.error(err);
            alert("Error sending OTP");
        }
    });

    // ===== Verify OTP =====
    verifyOtpBtn.addEventListener("click", async () => {
        const otp = document.getElementById("otp").value.trim();
        if (!otp) { alert("Please enter OTP"); return; }

        try {
            const res = await fetch(`http://localhost:8080/users/verify-otp?email=${encodeURIComponent(resetEmail)}&code=${encodeURIComponent(otp)}&newPassword=dummy123`, {
                method: "POST"
            });
            const text = await res.text();
            if (res.ok) {
                alert("OTP verified ✅ You can now reset your password");
                resetOtp = otp;
                otpStep.classList.add("hidden");
                resetStep.classList.remove("hidden");
            } else {
                alert(text);
            }
        } catch (err) {
            console.error(err);
            alert("Error verifying OTP");
        }
    });

    // ===== Reset Password =====
    resetBtn.addEventListener("click", async () => {
        const newPass = document.getElementById("newpass").value.trim();
        const confirm = document.getElementById("confirmPass").value.trim();
        if (!newPass || !confirm) { alert("Please fill both fields"); return; }
        if (newPass !== confirm) { alert("Passwords do not match"); return; }

        try {
            const res = await fetch("http://localhost:8080/users/reset-password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: resetEmail, otp: resetOtp, newPassword: newPass })
            });

            const text = await res.text();
            if (res.ok) {
                alert(text);
                emailStep.classList.remove("hidden");
                otpStep.classList.add("hidden");
                resetStep.classList.add("hidden");
                document.getElementById("email").value = "";
                document.getElementById("otp").value = "";
                document.getElementById("newpass").value = "";
                document.getElementById("confirmPass").value = "";
            } else {
                alert(text);
            }
        } catch (err) {
            console.error(err);
            alert("Error resetting password");
        }
    });
