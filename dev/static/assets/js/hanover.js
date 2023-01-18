$(document).ready(function () {
	$.getJSON(
		"https://raw.githubusercontent.com/billiyagi/billiyagi.github.io/main/assets/data-hanover.json"
	)
		.fail(function () {
			alert("Koneksi bermasalah");
		})
		.always(function (dbUser) {
			// Validasi Login
			$("#formLoginHanover").submit(function (event) {
				event.preventDefault();
				let username = $("#usernameLoginHanover").val();
				let password = $("#passwordLoginHanover").val();

				// Periksa Kolom Login
				if (username == "" && password == "") {
					// Tambahkan feedback ketika tidak ada kolom yang di isi
					$("#usernameLoginHanover").addClass("is-invalid");
					$("#passwordLoginHanover").addClass("is-invalid");
				} else if (username != "" && password == "") {
					// Tambahkan feedback ketika kolom username tidak di isi
					$("#passwordLoginHanover").addClass("is-invalid");
					$("#usernameLoginHanover").removeClass("is-invalid");
				} else if (username == "" && password != "") {
					// Tambahkan feedback ketika klom password tidak di isi
					$("#usernameLoginHanover").addClass("is-invalid");
					$("#passwordLoginHanover").removeClass("is-invalid");
				} else {
					// Kondisi ketika semua kolom di isi
					$("#usernameLoginHanover").removeClass("is-invalid");
					$("#passwordLoginHanover").removeClass("is-invalid");

					// Temukan akun dengan id username
					let userFinded;
					dbUser.forEach(function (user) {
						if (user.username == username) {
							userFinded = user;
						}
					});

					// Cek password dan username yang ditemukan di database
					if (userFinded) {
						// Cek password jika benar alihkan ke halaman selanjutnya
						if (userFinded.password == password) {
							showAlert(
								"success",
								"login berhasil, anda akan dialihkan ke dashboard"
							);

							// Tambahkan info akun
							localStorage.setItem(
								"username",
								userFinded.username
							);
							localStorage.setItem("name", userFinded.name);

							// Alihkan pengguna ke halaman admin
							setTimeout(function () {
								window.location.href = "/admin/mechanics/";
							}, 2000);
						} else {
							showAlert("danger", "Username atau password salah");
						}

						// Tampilkan feedback bahwa akun tidak ditemukan
					} else {
						showAlert("danger", "Username atau password salah");
					}
				}
			});
		});
});

const showAlert = function (type, message) {
	$("#getAlert")
		.html(`<div class="alert alert-${type} alert-dismissible fade show" role="alert">${message}.
				<button type="button" class="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				</div>`);
};

const loadingButton = function (btn) {
	$(btn).attr("disabled", "");
	$("#loadingSpinner").show();

	setTimeout(() => {
		$("#loadingSpinner").hide();
		$(btn).attr("disabled", "");
	}, 10000);
};
