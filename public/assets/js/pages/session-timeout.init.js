/*
Template Name: Qovex - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Session time 
*/

$.sessionTimeout({
	keepAliveUrl: 'pages-starter',
	logoutButton:'Logout',
	logoutUrl: 'pages-login',
	redirUrl: 'pages-lock-screen',
	warnAfter: 3000,
	redirAfter: 30000,
	countdownMessage: 'Redirecting in {timer} seconds.'
});

$('#session-timeout-dialog  [data-dismiss=modal]').attr("data-bs-dismiss", "modal");