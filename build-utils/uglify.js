const gulp = require('gulp');
const pkg = require('../package.json'); // bring in properties specified in package.json
const customPlumber = require('./custom-plumber');
const banner = require('./banner');
const $ = require('./gulp-load-plugins');

/**
 * @param {string} src: input concat path string
 * @param {string} dest: output path
 * @param {string} taskName: name of the task
 * @param {string} newerDest: target file for newer to compared against
 * @param {bool} noBanner: default false, includes banner at start of file
 */

function uglifyNewer (src, dest, taskName, newerDest, noBanner = false) {
		$.fancyLog(`----> //** Uglifying JS Files -- ${taskName}`);
		return $.pump([
			gulp.src(src, {allowEmpty: true}),
			customPlumber(`Error Running ${taskName} task`),
			$.sourcemaps.init({loadMaps:true}),
			$.newer({dest: newerDest}),
			$.uglifyEs.default({
				output: { comments: $.uglifySaveLicense }
			})
					.on('error', (err) => {
						$.fancyLog($.ansiColors.red('[Error]'), err.toString()); //more detailed error message
						// this.emit('end');
					}),
			$.if([ '**/*.js', '!**/*.min.js' ],
					$.rename({ suffix: '.min' })
			),
			$.size({
				showFiles: true,
				gzip: true,
			}),
			$.if(!noBanner,
					$.header(banner, { pkg: pkg })
			),
			$.sourcemaps.write('./'),
			gulp.dest(dest)
		]);
}

module.exports = uglifyNewer;
