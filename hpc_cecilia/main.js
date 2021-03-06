// This file can be seen as the entry point (main) of your application, similar
// to how C++ and Java also define a 'main' function as their entry point.
//
// Here we indicate to RequireJS that we require the 'app' module.
// It is in that module that the actual application logic is located, this file
// is nothing more than an entry point for our application where RequireJS could
// also be configured. This example does not modify the RequireJS configuration.
//
// When loading a module, RequireJS will request it at: "<baseUrl>/<moduleName>.js"
// As we have not explicitly configured a base URL, RequireJS will use the path
// of the file to which its "data-main" attribute points to as the base URL. 
//
// In our example, "data-main" is set to "scripts/main" (this file), which means 
// that the base URL will be: "scripts". RequireJS will thus try to load the 'app' 
// module by doing a request to: "scripts/app.js".

require.config({
	baseUrl: 'scripts',
	paths: {
		// Indicate that requests for the 'jquery' module should go to the 
		// specified, local path. This path is relative to the base URL
		// and must not include the file's extension (.js)
		//
		// In general can use this option to make the URL prettier, so we can just
		// request '<library>' instead of '<library>-<version>'. However,
		// jQuery is an exceptional library that actually forces you to require
		// it as 'jquery' as it registers itself explicity as the 'jquery' module.
		// For more information, see http://requirejs.org/docs/jquery.html
		'jquery': '../lib/jquery',
		'jqueryui': '../lib/jquery-ui'
		// ,
		// 'paper' : "../lib/paper-full"
	},
	shim: {
        // 'paper' : {
        //     exports: 'paper'
        // },
    },
	
});

requirejs(['../scripts/app']);