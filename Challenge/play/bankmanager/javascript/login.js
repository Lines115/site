document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");

    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(loginForm);
        const username = formData.get("username");
        const password = formData.get("password");

        const response = await fetch("accounts.db");
        const accountsData = await response.text();
        const accounts = accountsData.split("\n").filter(Boolean);

        console.log(document.cookie);

        for (const account of accounts) {
            const [storedUsername, storedPassword] = account.split(":");
            if (storedUsername === username && storedPassword === password) {
                loginMessage.textContent = "Login successful!";
                console.log('Login Successful!')
                document.cookie = "account="+username+":"+password;
                if (username === "SrrubThebread" && password === "2020Over") {
                    window.location.href = "cabinet_hacked";
                }
                else {
                    window.location.href = "cabinet";
                }
                return;
            }
        }

        console.log('Login failed. Please check your credentials.')
        loginMessage.textContent = "Login failed. Please check your credentials.";
    });
});