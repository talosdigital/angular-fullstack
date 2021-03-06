<?php
/**
 * This makes our life easier when dealing with paths. Everything is relative
 * to the application root now.
 */
chdir(dirname(__DIR__)."/../../backend-php/");

// Decline static file requests back to the PHP built-in webserver
if (php_sapi_name() === 'cli-server' && is_file(__DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))) {
    return false;
}

// Setup autoloading
require 'init_autoloader.php';

if (isset($_SERVER['environment']) && $_SERVER['environment'] == 'development') {
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	ini_set('log_errors', 1);
	error_reporting(E_ERROR);
}

// Run the application!
Zend\Mvc\Application::init(require 'config/application.config.php')->run();
