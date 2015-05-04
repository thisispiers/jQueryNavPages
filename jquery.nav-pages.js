/* jQueryNavPages 1.0.1 (https://github.com/thisispiers/jQueryNavPages)
 * Animated, programmable and easily navigated pages
 * Made available by Piers Simms (http://c1h.co.uk) under the MIT license (http://opensource.org/licenses/mit-license.php) */
(function($){
    $.fn.navPages = function(opts, opts2){
        var settings = this.settings = {
                pages: $(this),
                parent: $(this).parent(),
                animation: {}, // $.animate() defaults
                startPage: 0,
                backSelector: '[data-goback-nav-page], .nav-page-back',
                ignoreSelector: '[data-ignore-nav-page], .nav-page-ignore',
            },
            typeof_opts = typeof opts;
        if(typeof_opts === 'string'){
            settings.parent = $(this);
            settings.pages = $(opts, settings.parent);
            if(typeof opts2 === 'number'){
                settings.startPage = opts2;
            } else if(typeof opts2 === 'object'){
                $.extend(settings, opts2);
            }
        } else if(typeof_opts === 'object'){
            $.extend(settings, opts);
        }

        var pageHistory = this.pageHistory = [];

        // init
        if(!settings.parent.data('nav-pages-init')){
            settings.parent.data('nav-pages-init', true).wrapInner('<div style="width:100%;height:100%;position:relative;overflow:hidden;"></div>'); // wrap pages

            settings.pages.each(function(i){
                var startDiff = $(this).index() - settings.startPage;
                if(startDiff < 1){
                    pageHistory.push($(this)); // push our start page into history
                }
                $(this).css({ // properly style each page
                    'width': '100%',
                    'height': '100%',
                    'position': 'relative',
                    'margin-right': '-100%',
                    'float': 'left',
                    'left': (startDiff * 100) + '%', // this means that (start - 1) = -100% left
                });
            });

            settings.parent.trigger('nav-page-init', $(settings.parent));
        }

        // returned methods and properties
        var _this = {
            settings: settings,
            goTo: function(e){
                if(e.target){
                    e.preventDefault();
                    var $this = $(this),
                        dataSelector = $this.data('goto-nav-page'),
                        new_page_selector = (dataSelector ? dataSelector : $this.attr('href')),
                        new_page = $(new_page_selector);
                } else if(e){
                    var new_page = $(e, settings.parent);
                }
                if(new_page && new_page.length == 1){
                    pageHistory.push(new_page);
                    var old_page = pageHistory[pageHistory.length - 2];

                    // animate
                    new_page.css({left: '100%'}).animate({left: 0}, settings.animation);
                    old_page.css({left: 0}).animate({left: '-100%'}, settings.animation);
                    var eventParams = [$(new_page), $(old_page)];
                    settings.parent.trigger('nav-page-nav', eventParams);
                    settings.parent.trigger('nav-page-goto', eventParams);
                }
            },
            goBack: function(e){
                if(e.target){
                    e.preventDefault();
                }
                if(pageHistory.length > 1){
                    var new_page = pageHistory[pageHistory.length - 2],
                        old_page = pageHistory[pageHistory.length - 1];
                    pageHistory.splice(pageHistory.length -1, 1);

                    // animate
                    new_page.css({left: '-100%'}).animate({left: 0}, settings.animation);
                    old_page.css({left: 0}).animate({left: '100%'}, settings.animation);
                    var eventParams = [$(new_page), $(old_page)];
                    settings.parent.trigger('nav-page-nav', eventParams);
                    settings.parent.trigger('nav-page-back', eventParams);
                }
            }
        };

        // bind events
        settings.parent.delegate('[href^=#][href!=#]:not(' + settings.ignoreSelector + '):not(' + settings.backSelector + '), [data-goto-nav-page]:not(' + settings.ignoreSelector + '):not(' + settings.backSelector + ')', 'click', _this.goTo);
        settings.parent.delegate(settings.backSelector + ':not(' + settings.ignoreSelector + ')', 'click', _this.goBack);

        // return
        return _this;

    };
})(jQuery);

// autoload elements
jQuery(function($){
    $('.nav-pages').navPages('.nav-page');
});