# jQueryNavPages

Animated, programmable and easily navigated pages.

## Usage

HTML:

    <div id="nav-pages">
        <div class="nav-page" id="nav-page-1">
            Welcome to page 1 <a href="#nav-page-2">Go to page 2</a>
        </div>
        <div class="nav-page" id="nav-page-2">
            Welcome to page 2 <a href="#" class="nav-page-back">Back</a>
        </div>
    </div>

JS:

`$('#nav-pages').navPages('.nav-page');` or `$('.nav-page').navPages();`

CSS:

You don't need to add any!

## Options

- **pages**<br>
_Default: Selector_<br>
_Required_<br>
Set by jQuery selector `$(pages).navPages();` or by the first argument `$(parent).navPages(pages);`

- **parent**<br>
_Default: Selector parent_<br>
_Required_<br>
Set by jQuery selector `$(parent).navPages(pages);`. This element is used to wrap its contents in a `<div>` necessary for pages to render correctly.

- **animation**<br>
_Default: `{}`<br>
_Optional_<br>
This option is directly passed on to `$.animate()`. Please see [jQuery API docs](http://api.jquery.com/animate/#animate-properties-options) for more information

- **startPage**<br>
_Default: 0<br>
_Optional_<br>
0 based index of which page to show first

- **backSelector**<br>
_Default: `.nav-page-back`<br>
_Optional_<br>
When these elements are clicked, the page navigates in reverse.

All options (except _pages_) can also be set by passing an object when calling `$.navPages();`

## API

- **goTo(`selector`)**<br>
If an element with the `selector` is found inside the `parent` then it navigates to that page. Triggers `nav-page-nav` and `nav-page-goto`.

- **goBack()**<br>
Navigates back. Triggers `nav-page-nav` and `nav-page-back`.

- **settings**<br>
The settings used as an object, in case you ever need them.

## Events

- **nav-page-init**<br>
_Arguments: `parent`_<br>
Triggered once page markup is complete and events are bound

- **nav-page-nav**<br>
_Arguments: `new_page`, `old_page`_<br>
Triggered when navigating back or navigating to a page

- **nav-page-goto**<br>
_Arguments: `new_page`, `old_page`_<br>
Triggered when navigating to a page

- **nav-page-back**<br>
_Arguments: `new_page`, `old_page`_<br>
Triggered when navigating back