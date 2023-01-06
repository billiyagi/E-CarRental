$(document).ready(function() {

	// Cek Status Authentikasi
	if ( localStorage.getItem('status_login') != 1 ) {
		$('#failLoginModal').modal('show')
	}
})