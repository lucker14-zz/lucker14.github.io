<?php 
require 'mobile_detect.php';

$detect = new Mobile_Detect;
$deviceType = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'phone') : 'computer');

if ($deviceType == 'computer') {
	header('Location: web_production/index.html');
} else {
	header('Location: web_mobile/index.html');
}
?>