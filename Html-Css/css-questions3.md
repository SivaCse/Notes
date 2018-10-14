### CSS
---
* What is CSS?
    - CSS stands for Cascading Style Sheet.
    - Styles define how to display HTML elements
    - Styles were added to HTML 4.0 to solve a problem
    - External Style Sheets can save a lot of work
    - External Style Sheets are stored in CSS files


* Where to define styles? How can you integrate/import CSS on a web page?
    - Inline, used to style only a small piece of code
        ```
            <p style="color:blue">
                Hello CSS
            </p>
        ```
    - Internal/Embedded, style sheets are put between the <head>...</head>
        ```
            <style> 
                p{color:blue}
            </style>
        ```
    - External
        ```
            <link rel="stylesheet" type="text/css" href="style.css"
        ```

* What is Property?
    - The style that you are applying to a selector, e.g. border.         

        
* What is Selector? 
    - The way you declare which elements the styles should apply to. There are different kinds of selectors:
        - Class: The most commonly used selector. E.g. “.cloudy” to select an element with classname cloudy. 
            There can be more than 1 element with the same classname.
        
        - ID: Use this sparingly. You cannot reuse an ID within the same page and used only to identify an element uniquely. E.g. <div id=lovelyweather></div>
        
        - Attribute Selector: If you use any attribute other than class or id to identify an element in a stylesheet, you would be using Attribute Selectors. You can also do basic pattern matching within an attribute selector (so if you would like to do basic pattern matching for selectors using class or ID attributes, you would want to use attribute selectors).
        
        - Pseudo-Classes: Classes that are applied to elements based on information that is not present in the markup, e.g. :first-child or :last-child. Do note that the selectors are parsed from right to left (see the demo). You cannot use section article:first-child to select the first occurrence of article, if the first child of section is h1 and not article. Likewise with the :nth-child, and :last-child pseudo-classes.
        
        - Pseudo-Elements Pseudo-elements differ from Pseudo-Classes in that they actually create an element in the document tree. This is almost the first instance of CSS modifying the HTML document tree. You should ideally use pseudo-elements with “::” instead of “:” (but most browsers accept “:” notation for CSS 2.1 pseudo-elements). Pseudo-elements are: ::first-line, ::first-letter, ::before, ::after (See the demo for how pseudo-elements work).
        

* What are Combinators?
    - The selection of an element based on its occurrence in relation to another element (chosen by the choice of combinator: whitespace, >, +, or ~). You can have:


    * Descendant Combinator
        - This is the most common usage, e.g. #lovelyweather h1.
    
    
    * Child Combinator
        - Select an element if it is a direct child of another element (and not a grandchild of that element).
    
    
    * Adjacent Sibling Combinator
        - The element that is immediately adjacent to another element.


    * General Sibling Combinator
        - The element that is adjacent, but not immediately to another element.
        

* Why background and color are the separate properties if they should always be set together?
    - Color is an inherited property while background is not. So this can make confusion further.


* What is the difference between class selectors and id selectors?
    - An overall block is given to class selector while id selectors take only a single element differing from other element
  
    
* When working on a large codebase CSS it can quickly become unwieldly and difficult to maintain. How do you approach this problem? How do you architect your CSS (and have you heard/used BEM, OOCS or SMACSS)?    
    
    
* How do you organize CSS files?

    
* What are the advantages of External Style Sheets?
    - You can create classes for reusing it in many documents.
    - By using it, you can control the styles of multiple documents from one file.
    - In complex situations, you can use selectors and grouping methods to apply styles.


* What is RWD (Responsive web design) ?
    - Responsive Web Design. This technique is used to display the designed page perfectly on every screen size and device. For example: Mobile, Tablet, desktop, laptop etc. You don't need to create a different page for each device. 
    

* Explain CSS sprites, and how you would implement them on a page or site. How do you go about creating them? What are possible alternatives to sprites?    
    
    
* What are the benefits of CSS sprites?
    - If a web page has large no. of images that takes a longer time to load because each image separately sends out an http request. The concept of CSS sprites is used to reduce the loading time for a web page because it combines the various small images into one image. It reduces the number of http requests and hence the loading time. 
    
    
* What is the CSS Box model and what are its elements?
    - The CSS box model is used to define the design and layout of elements of CSS.
    - The elements are:
        - Margin
        - Border
        - Padding
        - Content
   
        
* What is the float property and what float do.
    - The CSS float property is used to move the image to the right or left along with the texts to be wrapped around it. It doesn't change the property of the elements used before it
  
    
* What is tweening?

    - It is the process of generating intermediate frames between two images.

    - It gives the impression that the first image has smoothly evolved into the second one.

    - It is an important method used in all types of animations.

    - In CSS3, Transforms (matrix, translate, rotate, scale etc.) module can be used to achieve tweening.


* What do you understand by W3C
    - W3C stands for World Wide Web Consortium.


* Explain the difference between "visibility: hidden;" and "display: none;"? What are the pros and cons of using “display:none”?

    - visibility: hidden simply hides the element but it will occupy space and affect the layout of the document.

    - display: none also hides the element but will not occupy space. It will not affect the layout of the document.
    


* Describe z-index and how stacking context is formed.
    - An element with greater stack order is always in front of an element with a lower stack order. z-index only works on positioned elements. The default stack order of non-positioned elements is their order in the document.
    

* What is the purpose of the z-index and how is it used?

    - The z-index helps specify the stack order of positioned elements that may overlap one another. The z-index default value is zero, and can take on either a positive or negative number.

    - An element with a higher z-index is always stacked above than a lower index.

    - Z-Index can take the following values:

        - Auto: Sets the stack order equal to its parents.
        - Number: Orders the stack order.
        - Initial: Sets this property to its default value (0).
        - Inherit: Inherits this property from its parent element.
    

* How does z-index relate to positioning
    - The z-index property specifies the stack order of elements. An element with a higher z-index/stack order is always rendered in front of an element with a lower z-index/stack order on the screen. Z-index will only work on elements that have a specified position (position:absolute, position:relative, or position:fixed).


* What existing CSS frameworks have you used locally, or in production? How would you change/improve them?


* What are CSS frameworks? What CSS frameworks have you used
    - It is a pre-planned libraries, which allows easier and more standards-compliant webpage styling, using CSS language.
        
        
* Who maintains the CSS specifications?
    - W3C (World Wide Web Consortium) maintains the CSS specifications.        
    
    
* How works absolute/relative/fixed/static position? 
    - https://css-tricks.com/absolute-relative-fixed-positioining-how-do-they-differ/


* How is behave absolute element if it is inside fixed element/relative/absolute element
    

* What's the difference between a relative, fixed, absolute and statically positioned element?
    
    - Static - default for every single page element. The only reason you would ever set an element to position: static is to forcefully-remove some positioning that got applied to an element outside of your control.
    
    - Relative - means "relative to itself". Setting position: relative; on an element and no other positioning attributes, it will no effect on it's positioning. It allows the use of z-index on the element and it limits the scope of absolutely positioned child elements. Any child element will be absolutely positioned within that block.
    
    - Absolute - positions the element exactly where you want it rrelative to the next parent element with relative (or absolute) positioning. If there is no such parent, it will default all the way back up to the <html> element.
    
    - Fixed - positioned relative to the viewport, or the browser window itself. regardless of scroll position.



* What are the pros and cons of using absolute positioning?


* The difference between block / inline / inline-block element
    
    - Elements with display: inline-block are like display: inline elements, but they can have a width and a height. 
    That means that you can use an inline-block element as a block while flowing it within text or other elements.
    
    - Block elements:
        respect all of those
        force a line break after the block element
        
    - Inline elements:
        respect left & right margins and padding, but not top & bottom
        cannot have a width and height set
        allow other elements to sit to their left and right.
        
    - Inline-block elements:
        allow other elements to sit to their left and right
        respect top & bottom margins and padding
        respect height and width



* List CSS selectors and their priorities
    - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors


* Talk about position property, and its values


* What are counters in CSS3 ?


* How to hide an element?


* Are CSS rule names case sensitive?


* Does margin-top or margin-bottom has effect on inline element?


* Does padding-top or padding-bottom has effect on inline element?


* Which one would you prefer among px, em % or pt and why?


* Does padding-left or padding-right or margin-left or margin-right has effect on inline element?


* If you have a <p> element with font-size: 10rem, will the text be responsive when the user resizes / drags the browser window?


* Describe pseudo-elements and discuss what they are used for.
    - https://developer.mozilla.org/en-US/docs/Web/CSS/pseudo-elements

    - A CSS pseudo-element is used to style specified parts of an element.

    For example, it can be used to:
    
        Style the first letter, or line, of an element
        Insert content before, or after, the content of an element
    
```css
p::first-line {
    color: #ff0000;
    font-variant: small-caps;
}
```


* What is pseudo element? what is pseudo class?


* How to center align a paragraph?


* How to center align a div inside another div?


* How to make a two column Web page? a three column Web page?


* How to draw a triangle? a circle? a colored square?


* How to make a tab view?


* How do you define multiple background images through CSS?


* Explain the CSS “box model” and the layout components that it consists of. Provide some usage examples.
    - The CSS box model is a rectangular layout paradigm for HTML elements that consists of the following:

    Content - The content of the box, where text and images appear
    
    
    Padding - A transparent area surrounding the content (i.e., the amount of space between the border and the content)
    
    Border - A border surrounding the padding (if any) and content
    
    Margin - A transparent area surrounding the border (i.e., the amount of space between the border and any neighboring elements)

    ```css
    /*       top   right  bottom left  */
    padding: 25px  50px   75px   100px;
    
    /* same padding on all 4 sides: */
    padding: 25px;
    
    /* top/bottom padding 25px; right/left padding 50px */
    padding: 25px 50px;
    
    /* top padding 25px; right/left padding 50px; bottom padding 75px */
    padding: 25px 50px 75px;
    ```
    
* Explain what elements will match each of the following CSS selectors:
    div, p - Selects all <div> elements and all <p> elements
    div p - Selects all <p> elements that are anywhere inside a <div> element
    div > p - Selects all <p> elements where the immediate parent is a <div> element
    div + p - Selects all <p> elements that are placed immediately after a <div> element
    div ~ p - Selects all <p> elements that are anywhere preceded by a <div> element


* Explain the meaning of each of these CSS units for expressing length:

    cm - centimeters
    em - elements (i.e., relative to the font-size of the element; e.g., 2 em means 2 times the current font size)
    in - inches
    mm - millimeters
    pc - picas (1 pc = 12 pt = 1/6th of an inch)
    pt - points (1 pt = 1/72nd of an inch)
    px - pixels (1 px = 1/96th of an inch)


* Which values (units) could be used for width?


* In CSS3, how would you select:

    Every <a> element whose href attribute value begins with “https”.
        a[href^="https"]
        
    Every <a> element whose href attribute value ends with “.pdf”.
        a[href$=".pdf"]
        
    Every <a> element whose href attribute value contains the substring “css”.
        a[href*="css"]



* What is the purpose of the box-sizing property? What are it's possible values?


* Provide an example of content-box vs border-box box-sizing


* What is * { box-sizing: border-box; }? What are advantages?


* What is the difference between RGBa and HSLa? When would you use one vs the other?


* What libraries and tools you are using?


* What preprocessors you are using?


* What are the reasons to use preprocessor


* What is CSS preprocessor


* What are the advantages/disadvantages of using CSS preprocessors?


* What preprocessor do you use? (Sass, LESS, Stylus) Why do people use them? How does something like Compass relate to Sass?
    - They are CSS preprocessors. They are a special syntax/language that compile down into CSS.
     They make managing CSS easier, with things like variables and mixins to handle vendor prefixes (among other things). 
     They make doing best practices easier, like concatenating and compressing CSS.


* Describe what you like and dislike about the CSS preprocessors you have used.


* What's the difference between "resetting" and "normalizing" CSS? Which would you choose, and why?
    - resetting will remove all the default styling applied by the browser to give you a blank canvas 
    where as normalize is a base stylesheet meaning its the starting point for custom styles and it styles the default elements to be consistent across the browsers.


* Describe Floats and how they work.


* Describe BFC(Block Formatting Context) and how it works.
    https://www.sitepoint.com/understanding-block-formatting-contexts-in-css/


* What are the various clearing techniques and which is appropriate for what context? How works .clearfix?


* What are your favourite image replacement techniques and which do you use when?


* How would you approach fixing browser-specific styling issues?


* How do you serve your pages for feature-constrained browsers? What techniques/processes do you use?


* What are the different ways to visually hide content (and make it available only for screen readers)?


* Have you ever used a grid system, and if so, what do you prefer? Explain how a grid system works


* Have you used or implemented media queries or mobile specific layouts/CSS?


* Are you familiar with styling SVG?


* How do you optimize your webpages for print?


* How would you implement a web design comp that uses non-standard fonts?


* Explain how a browser determines what elements match a CSS selector.


* What are the some pseudo classed u have used?


* How do you optimize css selectors?


* How can you load css resources conditionally?


* Describe pseudo-elements and discuss what they are used for.


* What are the properties related to box model


* Explain your understanding of the box model and how you would tell the browser in CSS to render your layout in different box models.
    - The content of the space taken by an element. Each element has an inner and outer height/width calculated based on the content, padding, border and margin.

    content-box - default. Excludes padding, border and margin from the inner dimensions.
    border-box - includes the padding and border, but not the margin in the inner dimension.


* What does * { box-sizing: border-box; } do? What are its advantages?
    - Make every element in the document include the padding and border in the element's inner dimensions; 
    making it easier to reason about the layout of elements on the page.


* List as many values for the display property that you can remember.


* The 'C' in CSS stands for Cascading. How is priority determined in assigning styles (a few examples)? How can you use this system to your advantage?


* Can you explain the differences between em, rem, px?


* What's #target.


* What existing CSS frameworks have you used locally, or in production? How would you change/improve them?



* What are most common tested browsers and devices?


* Have you played around with the new CSS Flexbox or Grid specs?

    - Flexbox or Flexible boxes, is a new layout mode in CSS3 Use of flexbox ensures that elements behave predictably when the page layout must accommodate different screen sizes and different display devices.

    - For many applications, the flexible box model provides an improvement over the block model in that it does not use floats, nor do the flex container's margins collapse with the margins of its contents.

    - Grid specs CSS Grid Layout is a specification for creating two-dimensional grids Grid is a companion to the Flexible Box Module (flexbox). Flexbox is designed for one-dimensional layout, so things can be arranged in an unbroken line. Grid is designed for two-dimensional layout, meaning the items don't need to sit next to each other. In the future we're likely to use both: Grid Layout for main page areas, and flexbox for the smaller UI elements it excels with.


* How is responsive design different from adaptive design? What is responsive design? What is the difference between fixed and fluid layouts? What are some of the pros and cons with these designs?


* Have you ever worked with retina graphics? If so, when and what techniques did you use? What kind of techniques do you use to handle images for retina screens?


* Is there any reason you'd want to use translate() instead of absolute positioning, or vice-versa? And why?


* Do you subscribe to any particular CSS structure? (SMACSS, OOCSS)


* What is browser Compatibility?


* Tell what each of these tags do, if there are alternatives, which are preferable, why?
```css
    <em>
    <b>
    <abbr>
    <nav>
    <i>
    <j>
    <link>
    <strong>
    <article>
```    

* What is At-Rule
    - An at-rule is an instruction given in a CSS document using the ```@``` character. An at-rule could have a declaration block or a simple string of text. The example below has two different at-rules:
```css
@import url(secondary.css);

@media print {
  #container {
    width: 500px;
  }
}
```
The at-rule is not just the ```@media``` or ```@import``` part at the beginning; the entire instruction comprises the complete at-rule.


* What is Combinator selector

    - A combinator is the character in a selector that connects two selectors together. There are four types of combinators. These four combinators help create descendant selectors (with a space character), child selectors (with the ```>``` character), adjacent sibling selectors (with the ```+``` character), and general sibling selectors (with the ```~``` character). To dispel any confusion, here are those four combinators in use:
```css
/* In all 4 examples */
/* whatever appears between "div" and "p" is a combinator */
/* in the first example, the combinator is a space character */
div p {
  color: #222;
}

div>p {
  color: #333;
}

div+p {
  color: #444;
}

div~p {
  color: #555;
}
```

* What is RuleSet?
    - A rule set is a single section of CSS including the selector, the curly braces, and the different lines with properties and values. The code in the example below comprises one rule set:

```html
/* the rule set starts with the line below */
body {
  font-family: Arial, sans-serif;
  color: #555;
  font-size: 14px;
}
/* ends with the closing curly brace above */
```

* Provide CSS so that three lines are displayed - red, then green, then blue (2):

    <div class="rgb">
        <span>Red</span>
        <span>Green<b>Blue</b></span>
    </div>


* Provided following HTML and CSS, what will be displayed (1)?

    <div class="red">Hi, I'm Blue</div>

    div.red    {color:green}
    div        {font-weight:bold}
    .red       {color:yellow;font-weight:normal}


* What is Declaration
    - The set of property names and values like: background: red;



* What is Declaration Block

    - A declaration block is the section of CSS where the property/value pairs appear. In the example below, everything found between the curly braces (not including the comments) is a declaration block:
```html
body {
  font-family: Arial, sans-serif; /* starts with this line */
  color: #555;
  font-size: 14px;
  line-height: 20px; /* ends here, before the closing curly brace */
}
```

* What is Universal Selector

    - The universal selector matches any element within the context in which it’s placed in a selector. 
    In the example below, the * character is the universal selector:
```html
/* the asterisk character is the universal selector */
.navigation ul * {
  width: 100px;
  float: left;
}
```

    - So, any element that appears as a child descendant of the unordered list element inside an element that has a class of “navigation” will receive the declared styles.

    - Universal selectors are generally discouraged for performance reasons.


* How can the gap under the image be removed?
    - As images being inline elements are treated same as texts, so there is a gap left, which can be   removed by:
```css
img { display: block ; }
```


* How comments can be added in CSS?
    - The comments in CSS can be added with /* and */.
    

* Define Attribute Selector ?
    - It is defined by a set of elements, value and its parts.


* Define property?
    - A style, that helps in influencing CSS. E.g. FONT. They have corresponding values or properties within them, 
    like FONT has different style like bold, italic etc.    


* What is graceful degradation?
    - In case the component fails, it will continue to work properly in the presence of a graceful degradation.
     The latest browser application is used when a webpage is designed. As it is not available to everyone,
      there is a basic functionality, which enables its use to a wider audience. 
    In case the image is unavailable for viewing, text is shown with the alt tag.


* What is progressive enhancement?
    - It’s an alternative to graceful degradation, which concentrates on the matter of the web. 
    The functionality is same, but it provides an extra edge to users having the latest bandwidth. 
    It has been into prominent use recently with mobile internet connections expanding their base.


* What is progressive rendering?

    http://stackoverflow.com/questions/33651166/what-is-progressive-rendering
    

* What is feature detection (vs browser detection)?


* What is mobile-first?


* What is accessibility/usability? What experience do you have with web accessibility? 


* What is SEO


* What is UI/UX
    - UI—or User Interface—is how a product or website is laid out and how you interact with it: Where the buttons are, how big the fonts are, and how menus are organized are all elements of UI.
    But UX—or User Experience—is how you feel about using a product or a website. So, your love for the way the new Apple Watch looks or your excitement that there’s finally a tablet-sized iPhone to watch those Corgi videos you’re obsessed with are reflections of UX.
    So the new look of the Facebook news feed involves a change to UI, and the way you navigate that new page is the UX. 


* What is semantic code


* What is typography  


* What are web standards


* What is valid HTML i CSS? (Who determines standards and criteria)


* Which of listed CSS properties are inherited?
    - position
    - font-size
    - color
    - background-color


* Enlist image types used in web, their properties and usage


* What is the purpose of em measurement unit?


* What is the purpose of pt measurement unit?


* Which property is used to change the face of a font?
    - The font-family property is used to change the face of a font.


* Which property is used to make a font italic or oblique?
    - The font-style property is used to make a font italic or oblique.


* Which property is used to create a small-caps effect?
    - The font-variant property is used to create a small-caps effect.


* Which property is used to increase or decrease how bold or light a font appears?
    - The font-weight property is used to increase or decrease how bold or light a font appears.


* Which property is used to add or subtract space between the letters that make up a word?

    - The letter-spacing property is used to add or subtract space between the letters that make up a word.


* Which property is used to add or subtract space between the words of a sentence?
    - The word-spacing property is used to add or subtract space between the words of a sentence.


* Which property is used to indent the text of a paragraph?
    - The text-indent property is used to indent the text of a paragraph.


* Which property is used to align the text of a document?
    - The text-align property is used to align the text of a document.


* Which property is used to underline, overline, and strikethrough text?
    - The text-decoration property is used to underline, overline, and strikethrough text.


* Which property is used to capitalize text or convert text to uppercase or lowercase letters?
    - The text-transform property is used to capitalize text or convert text to uppercase or lowercase letters.


* Which property allows you to control the shape or appearance of the marker of a list?
    - The list-style-type allows you to control the shape or appearance of the marker.


* How do I restore the default value of a property?
    - Initially CSS didn't provide a "default" keyword and the only way to restore the default value of a property is to explicitly re-declare that property
    This has changed with CSS 2; the keyword 'initial' is now a valid value for a CSS property. 
    It resets it to its default value, which is defined in the CSS specification of the given property.


* How do I assign multiple classes to an element?
    - HTML elements can be assigned multiple classes by listing the classes in the class attribute, with a blank space to separate them.
```html
<style type="text/css">
.news { background: black; color: white; }
.today { font-weight: bold; }
</style>

<div class="news today">
... content of today's news ...
</div>
```

* What are preferred rules for specificity?


* What is selector specificity (selector importance) and how it works? How do u calculate specificity?
    - https://developer.mozilla.org/en/docs/Web/CSS/Specificity
    
    - https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/
    
    - https://github.com/TIY-Austin-Front-End-Engineering/css-specificity


* What do you know about transition?


* What are the different css filter you can use?
    https://developer.mozilla.org/en/docs/Web/CSS/filter


* Enlist the various fonts properties?
    - font-style
    - font-variant
    - font-weight
    - font-size/line-height
    - font-family
    - caption
    - icon


* Enlist the position / display / overflow properties and what are defaults


* Enlist the various CSS background properties.
 

* Image paths in CSS vs HTML 
 

* What is transition & transform? 
 

* What is used flexbox / transforms / transitions / animations?


* What exposure do you have to CSS3 animations and transitions


* Can you export contents from PSD / Sketch?


* What kind of challenges do you run into formatting a site for Mobile devices?


* Describe Floats and Flexbox and how each works. Why Flexbox is a better solution for web layouts?
    
    - Floats - specifies that an element should be taken from the normal flow and placed along the left or right side of its container, 
    where text and inline elements will wrap around it.
    
    - Flexbox - consists of flex containers and flex items. Flex containers wrap a set of flex items and define how they are laid out. 
    Flex items has properites that define how they interact with sibling flex elements and can also be flex containers themselves.


* What font units are available in CSS?


* What is the difference between padding and margins?


* What does !important mean in CSS?
    - It overrides the cascade and gives the style rule the highest precedence.


* What is cross-browser compatibility? 


* How do you test cross-browser compatibility of your site?


* How can you make a site responsive?


* The Difference Between Responsive and Adaptive Design
    https://css-tricks.com/the-difference-between-responsive-and-adaptive-design/


* What do you know about text shadows, box shadows?


* What is the difference between CSS variables and preprocessor variables?
    https://css-tricks.com/difference-between-types-of-css-variables/


* The Difference Between :nth-child and :nth-of-type
    https://css-tricks.com/the-difference-between-nth-child-and-nth-of-type/
    

* What selects ul[class] > li:nth-child(2n+1)    
    

* What is the difference between “word-break: break-all” versus “word-wrap: break-word” in CSS
    

* How is word-wrap different from white-space ?
    https://css-tricks.com/almanac/properties/w/whitespace/


* What is ```<pre>``` ?


* How is ```<b>``` different from ```<strong>``` ?
    

* What does minification do?


* What are some ways to make websites faster? Name as many different techniques as you can.
    

* How do you test the performance of your code and/or web pages?


* What are some rules for writing efficient CSS    
    

* Sass
    * What are you favorite features in SASS?
    
    * Explain nested selectors in Sass
        
    * How do you refer to a parent selector in the SASS?
        
    * Explain what Sass Maps are and how they are use?
    
    * Explain the @import function and how it is used
    
    * Explain the @include, @mixin, @function functions and how they are used. What is %placeholder
        
        - ```@mixin``` A mixin lets you make groups of CSS declarations that you want to reuse throughout your site

            ```css
            @mixin border-radius($radius) {
              -webkit-border-radius: $radius;
                 -moz-border-radius: $radius;
                  -ms-border-radius: $radius;
                      border-radius: $radius;
            }
            ```

            ```css
            .box { @include border-radius(10px); }
            ```
            

        - ```@extend``` directive provides a simple way to allow a selector to inherit/extend the styles of another one.
            ```css
            .message {
              border: 1px solid #ccc;
              padding: 10px;
              color: #333;
            }
            
            .success {
              @extend .message;
              border-color: green;
            }
            
            .error {
              @extend .message;
              border-color: red;
            }
            ```
            

        - ```%placeholder``` are classes that aren’t output when your SCSS is compiled
            ```css
            %awesome {
                width: 100%;
                height: 100%;
            }
            body {
                @extend %awesome;
            }
            p {
                @extend %awesome;
            }
            ```
            
            ```css
            /** Output **/
            body, p {
                width: 100%;
                height: 100%;
            }
            ```


* What are some considerations in selecting font sizes? // This question is focused on accessibility


* As an organisation we aim to meet WCAG AA standards for accessibility. What experience do you have with developing accessible websites?


* How do you approach developing an accessible website?


* What are some of the common accessibility pitfalls when developing a website? How would you go about fixing them?


---
### HTML
---

* What does a doctype do?

* What happens when DOCTYPE is not given
    - The web page is rendered in quirks mode. 
    The web browsers engines use quirks mode to support older browsers which does not follow the * W3C spec.
    
    In quirks mode CSS class and id names are case insensitive. In standards mode they are case sensitive.

* What's the difference between standards mode and quirks mode?

* What's the difference between HTML and XHTML?

* Why html5 doctype does not have a DTD definition?

* Why html5 doctype does not have a DTD definition?
    
    - HTML5 is no longer based on SGML (Standard Generalized Markup Language) which actually requires a DTD for parsing/serializing, so we don't require a DTD anymore.
  
    
* What does the lang attribute in html do?
    
    - Helps in styling pages bu using them in css :lang() pseudo class Spelling and grammar checkers Languade detection by search engines


* What is desktop first and mobile first design approach
    - Desktop first : 
        General selectors and styles designed to make the site look good on DESKTOP screens defined globally. But they affect all devices, and must be overridden by max-width media queries targeting minimum screen size

    - Mobile First : 
        General selectors and styles designed to make the site look good on small MOBILE screens go here. But they affect all devices, and must be overridden by min-width media queries targeting maximum scrren size
    
    In desktop first approach the media queries will be written with respect to max-width whereas in mobile first approach media queries will be written with respect to min-width
    

* Are there any problems with serving pages as application/xhtml+xml?

* How do you serve a page with content in multiple languages?

* What kind of things must you be wary of when design or developing for multilingual sites?

* What are data- attributes good for?
    - The HTML5 data attribute lets you assign custom data to an element. When we want to store more information/data about the element when no suitable HTML5 element or attribute exists

* Consider HTML5 as an open web platform. What are the building blocks of HTML5?

* Describe the difference between a cookie, sessionStorage and localStorage.

* Describe the difference between <script>, <script async> and <script defer>.

* Why is it generally a good idea to position CSS <link>s between <head></head> and JS <script>s just before </body>? Do you know any exceptions?

* What is progressive rendering?

* Have you used different HTML templating languages before? what did you like about them?

* Why does invalid HTML work?

* What is XHTML?
    - https://www.thoughtco.com/what-is-xhtml-3464702
    
* What is a Favicon? Where are favicons displayed?
    
* Are HTML 5 tags case sensitive?
    
* Why must the ID attribute be unique on each page?
    
* What is a blockquote?
    
* What is a meta tag?
    
* How many cookies can you use on one website?

* How big can a web cookie be?
    
* What is the difference between Canvas and SVG graphics?    

* What is the difference between a ```<span>``` and a ```<div>```?
    - ```<div>``` is a block level element which means it will render it on it's own line with a width of a 100% of the parent element.
    - ```<span>``` is an inline element which means it will render on the same line as the previous element, if it is also an inline element, and it's width will be determined by it's content.


* Name 5 common block-level and inline HTML elements.
    - block elements ```<h1>, <p>, <ul>, <ol>, <li>```,
    - inline elements ```<span>, <a>, <strong>, <i>, <img>```

* What are semantic and non-semantic elements?
    - A semantic element clearly describes its meaning to both the browser and the developer.
  
    - non-semantic elements: <div> and <span> - Tells nothing about its content. semantic elements: ```<form>, <table>, and <article>``` - Clearly defines its content.

* Define semantic markup. What are the semantic meanings for ```<section>, <article>, <aside>, <nav>, <header>, <footer>``` and when/how should each be used in structuring html markup?

* What is the difference between (```<i>``` and ```<em>```) and (```<b>```, ```<strong>```) and how will screen-readers react the to each tag?
    
* What is the purpose of aria attributes?
    
* Explain what inline styles and javascript are and when they are appropriate to use.

* When is it acceptable to use font tags?

* What is the purpose of meta tags?
 
* What is the purpose of Charset meta tag?

* What does async and defer refer in script tag ? Describe the difference between ```<script>```, ```<script async>``` and ```<script defer>```
    - Async: Downloads the script file during HTML parsing and will pause the HTML parser to execute it when it has finished downloading.

    - Defer: Defer downloads the script file during HTML parsing and will only execute it after the HTML parser has completed. Not all browsers support this.
    

* Experience with website optimization?

* How to handle form validation?

* What is viewport?

* What are some of the building blocks of HTML5?

* What is the difference between cookies, sessionStorage and localStorage?
        
* Where should we place Javascript files - top OR bottom. What are the advantages and disadvantages of either method. Where would you use these (Google webfonts you need to place on top + jQuery down or top)
        
        
---
### Behavioral
---


* What are your biggest strengths? Weaknesses?


* What is your greatest achievement?
   

* Tell me about 3 times you have failed. 
    // Almost anyone can come up with 1 or 2, but it can be hard to think of 3. 
    // Be sure to wait and be quiet while the candidate thinks and ponders the answer 
    // I often feel like the most insightful answers come towards the end of this question.
    
    
* How did you prepare for this interview?


* What are some of your hobbies or passions outside of work? How did you first get into them?


* What is your availability?


* Do you consider yourself weird? Why or why not?


* Are there any questions that we didn’t ask you that we should have?


---

* Why did you choose to learn FE?


* How did you learn to code?


* What sort of project are you looking for?    


* Give me an example of a goal you set for yourself and how you achieved it.


* If money weren’t an issue and you had to work on a project for 3 months, what would you create?


* Where do you see yourself/ What do you want to do in 3/5 years? What kind of environment? How would this job fit into your plan and help you toward your goals?


* If you could master one technology this year, what would it be?


* What was your greatest challenge in FE?


* What was your favorite part about FE?


* What excites or interests you about coding?


* What has been the hardest part about learning to code so far?


* What did you learn yesterday/this week?


* What are 3 big contributors to your success?  Who inspires you in the front-end community?


* What is the last technical book you read?


* What sort of websites or blogs do you read regularly? What do you like about them?


* Do you use Git, GitHub?


* Tell me about a time you improved a tool, task, or project you were working on. What was the circumstances? Why did you do it?  Do you have any other examples?


* Do you have any side projects? What kind?


* What's the coolest thing/project you've ever coded, what are you most proud of?


* What is a recent technical challenge you experienced and how did you solve it?


* Talk about your preferred development environment. 


* What tools you use in regular workflow? 


* What tools do you use for your day to day work? Language, IDEs/editors, version control, build systems, provisioning, etc.?


* Which version control systems are you familiar with?


* How do you stay on up-to-date with current web trends/innovations, latest front-end technologies and best practices? how do you decide what to invest time into and what not to?


* What are some things you like about the developer tools you use?


* What is a recent challenges you experienced and how did you solved those?


* What was the last new technology or tool you learned?  Where did you learn about it?  Have you used it since?


* When was the last time you got something wrong?  How did you know?  What did you learn from it?


---

* Can you describe your workflow when you create a web page?


* If you have 5 different stylesheets, how would you best integrate them into the site?


* Can you describe the difference between progressive enhancement and graceful degradation?


* How would you optimize a website's assets/resources?


* How many resources will a browser download from a given domain at a time?


* Name 3 ways to decrease page load (perceived or actual load time).


* If you jumped on a project and they used tabs and you used spaces, what would you do?


* What is Flash of Unstyled Content? How do you avoid FOUC?


* Explain what ARIA and screenreaders are, and how to make a website accessible.


* Explain some of the pros and cons for CSS animations versus JavaScript animations.


* What does CORS stand for and what issue does it address?


* Describe how you would create a simple slideshow page.


* What's your favorite feature of Internet Explorer?


* What UI, Security, Performance, SEO, Maintainability or Technology considerations do you make while building a web application or site?


* Some people write good HTML, some people write bad HTML. What do you consider to be good HTML?


* Tell me about a responsive project you have worked on recently?


* Do you have any personal projects? Tell me about them.


* Ways to decrease page load?


* What tools do you use to test your code's performance?


* How many resources will a browser download from a given domain at a time?


* How would you optimize a website's assets/resources?


* Can you talk about how you have considered performance when developing a website?


* What performance issues do you anticipate when building a website?


* How would you go about troubleshooting a slow website?


* What are some ways to prevent web browser caching?


* How do you do browser compatibility testing?


* What is your favorite browser?  What sort of tools do you use to debug websites?


* What do you think of “hacks”? When should they be used in your code and when should they be avoided?


* What are the advantages of client side rendering vs. server side rendering? If you were building our site which would you use and why?


* How do you test the performance of your code and/or web pages?


* What is Flash of unstyled content?


* How to avoid Flash of unstyled content.


* How does the browser rendering engine work?

    - In order to render content the browser has to go through a series of steps:

        Document Object Model(DOM)
        
        CSS object model(CSSOM)
        
        Render Tree
        
        Layout
        
        Paint.
    

* Can you explain the difference between GET and POST?
    - https://stackoverflow.com/questions/3477333/what-is-the-difference-between-post-and-get    
        

* What is the DOM? How does the DOM work? Explain in as much detail as possible.


* What is the SAME ORIGIN POLICY


* Comparision of browsers like Chrome, Firefox, Internet explorer, Safari etc
    - Chrome: 
        Layout rendering engine - Webkit. 
        Jscript engine - V8

    - Firefox: 
        Layout rendering engine - Gecko. 
        Jscript engine - Spider monkey
        
    - Internet explorer: 
        Layout rendering engine - Trident. 
        Jscript engine - Chakra
        
    - Safari:
        Layout rendering engine - Webkit. 
        Jscript engine - JavascriptCore i.e Nitro


* Open up your last project, explain your code and thought process.
    // This is probably one of my favorite and most important questions. 
    // When I hire I like to hire candidates who are very passionate about what they do, 
    // and so programming isn’t something they just do at their job. 
    // They are actually passionate about it and pursue their own projects outside of work.
    
    
* Teach me about something for the next 10 minutes.  
    // You are looking for them to select a topic they know 
    // I generally don’t care if they are technical or not
    // and how well they communicate and break things down.


* Explain the concept of cloud computing to my older (not-very-technical) mother. 
    // I actually had to do this in real life and it was harder than I expected. 
    // Another example is explain a database to someone’s grandparents.
    
    
* In as much detail as you like, explain what happens when I type "google.com" into my browser's address bar and press enter.    
  
    
* How would you explain the Internet to a child?  


* Explain the importance of standards and standards bodies.
  
  
* What happens when somebody hits the URL in browser?


* What are HTTP methods? List all HTTP methods that you know, and explain them.


* Why has it been better to serve site assets from multiple domains?


* Do your best to describe the process from the time you type in a website's URL to it finishing loading on your screen.


---
### Version Control
---


* What is your preferred version control software? 

* Do you have experience working on a project versioned with Git?

* What is your opinion on pull requests (and code reviews)?

* What is the difference between Git and Github?

* What would you consider an effective Git workflow?

* What are build tools good for? Which ones are you familiar with?


---
### Agile
---

* Do you have experience working in an agile team?

* Do you work in sprints, or using the kanban approach? 

* Do you have a preference, and why?

* Work in Agile / Scrum?

* Have you worked with QA? How you QA/test your code?

---

* How did you communicate progress in your previous role?  Did that process always work?  What could have been done differently to keep everyone on the same page?

* Tell me about a time when you had a miscommunication at work.  What happened?  If you could do it all over again would you alter your actions?  Why or why not?

* Have you ever disagreed with your boss or manager?  What did you do?  If you haven’t had this happen, imagine that it did, how would you handle this situation?

* Give me an example of a time when you were able to communicate and work with another person even when they may not have personally liked you (or vice versa).

* How well do you work on teams?

* What did you like/not like about your last job?

* What would your peers and instructors say about you?

* Do you still write code in your job? Do you love it? 
    // This is more targeted at managers or leaders, 
    // since many do not need to be writing code to do their jobs. 
    // Hopefully this question could lead to an interesting conversation on role, etc.

* Why do you want to work at [company name]? Have you used our products? Is there a particular area or feature that got you excited?

* Give an example of when you completed a task without being asked. Can you give me another example?  Another?

* If you were hiring someone in this role, what would you look for?  What sort of interview questions would you ask? Do you have a favorite question?


https://github.com/yangshun/front-end-interview-handbook