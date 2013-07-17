js-responsive-screenshots
=========================

WIP Project to make responsive screenshots, using [PhantomJS](http://phantomjs.org/) and [CasperJS](http://casperjs.org/),
based on [the following tutorial](http://net.tutsplus.com/tutorials/javascript-ajax/responsive-screenshots-with-casper/)
with changes implemented from the comments as well.

At the current stage it is not very complex. You invoke it from the terminal (with Grunt, use the grunt-shell plugin,
further description below), using the following options: 

`viewportSizes`: JSON array of arrays, ex: `"[[320, 480],[600,800]]"`

`urls`: Commaseparated URLs you want to screenshots

`dir`: Directory to store the screenshots in, using either a relative or absolute URL. Screenshots will then further be
separated into the date they were taken, named by the url and resolution, ex: `Screenshots/2013-07-10/mariehogebrandt-se-320-480.png`.
Full-page screenshots are stored in the folder `fullpages` under the dir, named by url and width.

## Implement with Grunt
Currently, the implementation for using it in your build process with Grunt is crude, to say the least. That is certainly
one of the parts of the WIP.

Using [Grunt-Shell](https://github.com/sindresorhus/grunt-shell), you will need a task that looks about like the following:

~~~
shell: {
    screenshot: {
        command: 'casperjs ' +
        '--viewportSizes="[[320,480],[320,568],[600,1024],[1024,768],[1280,800],[1440,900]]" ' +
        '--urls="http://url.local/file.html,http://url.local/file2.html" screenshot.js ' +
        '--dir="../../../screenshots/"',
        options: {
            stdout: true,
            execOptions: {
                cwd: 'app/components/js-responsive-screenshot/'
            },
            stderr: true
        }
    }
}
~~~

Thoughts, feature requests, inquiries are welcomed, but may take time to implement. I am intending to get a task working
so that there is less need to use the shell task, but rather more elegant config options.
