var casper = require('casper').create(),
    viewportSizes = JSON.parse(casper.cli.get('viewportSizes')),
    urls = casper.cli.get('urls').split(','),
    saveDir = casper.cli.get('dir'),
    today = new Date(),
    month = today.getMonth() + 1;

month = (month > 10) ? month : '0' + month;
saveDir += today.getFullYear() + '-' + month + '-' + today.getDate();

casper.start();

casper.each(urls, function (self, url) {
    'use strict';
    self.thenOpen(url, function () {
        this.echo('Opening ' + url);
        casper.each(viewportSizes, function (self, viewportSize) {

            // set two vars for the viewport height and width as we loop through each item in the viewport array
            var width = viewportSize[0],
            height = viewportSize[1],
            urlName = url.replace(/[^a-zA-Z0-9]/gi, '-').replace(/^https?-+/, '');

            //set the viewport to the desired height and width
            this.viewport(width, height);

            //Set up two vars, one for the fullpage save, one for the actual viewport save
            var FPfilename = saveDir + '/fullpage/' + urlName + '-' + width + '.png';
            var ACfilename = saveDir + '/' + urlName + '-' + width + '-' + height + '.png';

            //Capture selector captures the whole body
            this.captureSelector(FPfilename, 'body');

            //capture snaps a defined selection of the page
            this.capture(ACfilename, {top: 0, left: 0, width: width, height: height});
            this.echo(width + 'x' + height + ' snapshots taken');
        });
    });
});

casper.run(function () {
    'use strict';
    this.echo('Finished captures').exit();
});
