$(document).ready(function () {
	// Cek Status Authentikasi
	if (
		(!localStorage.getItem("username") && !localStorage.getItem("name")) ||
		(localStorage.getItem("username") == "" &&
			localStorage.getItem("name") == "")
	) {
		$("#failLoginModal").modal("show");
	} else {
		$("#userFullName").text(localStorage.getItem("name"));
	}

	$("#logoutBtn").click(function () {
		if (confirm("Yakin ingin keluar?")) {
			localStorage.removeItem("username");
			localStorage.removeItem("name");
			window.location.href = "/index.html";
		}
	});
});
