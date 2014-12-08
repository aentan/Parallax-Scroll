# パララックス Parallax-Scroll

[See Demo](http://parallax-scroll.aenism.com).

Parallax-Scroll is a jQuery plugin to create elements with background images that behaves as if their `background-attachment` property is between `scroll` and `fixed`, similar to the parallax scrolling effect you see on Spotify and is loosely based on Peder Andreas Nielsen&rsquo;s [Parallax ImageScroll](https://github.com/pederan/Parallax-ImageScroll).

It makes clever use of `background-position` and `background-size` properties instead of CSS3 tranforms. It runs buttery smooth and retains the rubber-band scroll behavior in Safari. Works great on mobile too.

## Markup

The basic markup consists of content sections placed between background holders. The width and height of the original images must be supplied via data attributes. They are required for the calculation of aspect ratios.

```html
<div id="pic1" class="bg-holder" data-width="1024" data-height="768"></div>

<section>
  Content that "slides" over the backgrounds
</section>

<div id="pic2" class="bg-holder" data-width="1024" data-height="768">
  Optional content to be displayed on top of the backgrounds
</div>
```

Add background images to the `.bg-holder` elements with the following styles.

```css
/* All parent elements of .bg-holder must be 100% height for vertical stretch to work */
html,
body {
  width: 100%;
  height: 100%;
}

.bg-holder {
  width: 100%;
  height: 100%;
}

.bg-holder#pic1 {
  background-image: url('pic1.jpg');
}

.bg-holder#pic2 {
  background-image: url('pic2.jpg');
}
```

The nicest thing about using CSS background images is that by adding media queries we can do responsive image sizes.

```css
@media (min-width: 768px) {
  .bg-holder#pic1 {
    background-image: url('pic1_bigger.jpg');
  }
  .bg-holder#pic2 {
    background-image: url('pic2_bigger.jpg');
  }
}
```

## Initialization &amp; Options

To initialize the plugin, call the `parallaxScroll` method on your background elements.

```javascript
$('.bg-holder').parallaxScroll({
  friction: 0.5
});
```

The plugin accepts one option &ndash; friction. It should be a float value that is more than 0 and less than 1. 0 causes the background to behave as it has `background-attachment: scroll`. 1 (maximum friction) is the same as `background-attachment: fixed`. A value greater than 1 will cause the background to scroll in reverse!

Other features available in Pederan&rsquo;s plugin such as `holderMinHeight` and `coverRatio` can be achieved purely with CSS and should be. The fallback option to turn off parallax in mobile devices is unnecessary because this plugin works smoothly on mobile devices.

## Installation

Install using bower

```
bower install parallax-scroll
````

## Notes

Most likely requires a jQuery of lower version than other plugins you use. If in doubt I recommend 1.8.0 or higher.

The only limitation is that the `background-size` property is not supported by IE&lt;9 so this plugin would not work on that ancient browser.

This plugin is loosely based on Peder Andreas Nielsen&rsquo;s [Parallax ImageScroll](https://github.com/pederan/Parallax-ImageScroll). Beautiful tilt-shift photos in the demo by [rolohauck](https://www.flickr.com/photos/rolohauck/).

===

Made by [Aen](http://aenism.com/). Code licensed under [MIT](https://github.com/aentan/Parallax-Scroll/blob/master/LICENSE).
