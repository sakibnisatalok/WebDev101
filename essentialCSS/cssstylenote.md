
### Padding :: 

* **padding-top** -> sets the top padding of an element.
* **padding-right** -> sets the right padding of an element.
* **padding-bottom** → sets the bottom padding of an element.
* **padding-left** -> sets the left padding of an element.

shorthand for padding : [padding: top right&left bottom]

**Box-sizing** :
>Box-sizing is an important css property when it comes to padding of an element. The defualt value is content-box where height and width of an element do not count **padding and border** ,but **box-sizing: border-box** does. With border-box, the width and height properties apply to the entire visible box, including the content, padding, and border.


### Margin :: 

* **margin-top** -> sets the top margin of an element.
* **margin-right** -> sets the right margin of an element.
* **margin-bottom** -> sets the bottom margin of an element.
* **margin-left** -> sets the left margin of an element.

shorthand for margin : [margin: top right&left bottom]

**Margin collapse** : 
>Margin collapse is when two margins collapse into a single margin.Top and bottom margins of elements are sometimes collapsed into a single margin that is equal to the largest of the two margins.


### Border ::

* **border-width** -> sets the border width of an element.
* **border-style** -> sets the border style of an element.
* **border-color** -> sets the border color of an element.
* **border-radius** -> sets roundness of the corners.
* **border-collapse** -> sets whether table borders should collapse into a single border or be separated as in standard HTML. Each cell will display its own borders. This is default.
* **border-spacing** -> When using "border-collapse: separate", the border-spacing property can be used to set the space between the cells.


shorthand for border : [border: width style color]

We can also specify the this shorthand for each side using **[border-side-*]** css property.


### Background ::

* **background-color** -> sets the color of the **element**.
* **background-image** -> sets the image of the **element**.
* **background-position** -> sets the position of the image through cartesian coord. Default is padding box.
* **background-size** -> controls swize/scaling of background image.
* **background-repeat** -> controls the repeat direction.
* **background-attachment** -> decides whether image scolls or stays fixed. 
* **background-origin** -> decides whether it should be padding box, content box or border box as well as Where background positioning starts.
* **background-clip** -> decides visible painting area.


### Box Model ::

The box-sizing property can have the following values:
content-box - This is default. The width and height properties includes only the content (border and padding are not included)
border-box - The width and height properties includes content, padding and border.


### Outline ::

An outline is a line that is drawn around elements, OUTSIDE the borders, to make the element "stand out".
Outline differs from borders! The outline is drawn outside the element's border, and may overlap other content. Also, the outline is NOT a part of the element's dimensions; the element's total width and height is not affected by the width of the outline.

- **outline-style** -> Specifies the style of the outline.
- **outline-color** -> Specifies the color of the outline.
- **outline-width** -> Specifies the width of the outline.
- **outline-offset** -> Adds space between the outline and the edge/border of an element.(**The space between an element and its outline is transparent.**).

> Outline-offset property can take negative values as well.



### Text ::

- **color** -> Specifies the color of text.
- **direction** -> Specifies the text direction/writing direction.
- **text-align** -> Specifies the horizontal alignment of text.
- **text-align-last** -> Specifies how to align the last line of a text.
- **unicode-bidi** -> Used together with the direction property to set or return whether the text should be overridden to support multiple languages in the same document.
- **vertical-align** -> Sets the vertical alignment of an element.
- **text-decoration-line**
- **text-decoration-color**
- **text-decoration-style**
- **text-decoration-thickness**
- **text-transform** -> Controls the capitalization of text.
- **letter-spacing** -> Specifies the space between characters in a text.
- **line-height** -> Specifies the line height.
- **text-indent** -> Specifies the indentation of the first line in a text-block.
- **white-space** -> Specifies how to handle white-space inside an element.
- **word-spacing** -> Specifies the space between words in a text.
- **text-shadow** -> Specifies the shadow effect added to text.

> Make sure to read the docs on web before making an website.


### Fonts ::

- **font-family** ->  property specifies the font for an element.
- **font-style** -> specifies the font style for a text.
- **font-weight** -> specifies how thick or thin characters in text should be displayed.
- **font-variant** -> specifies whether or not a text should be displayed in a small-caps font.
- **font-size** -> specifies the size of the text/font.
- ****

>Google has also enabled different font effects that you can use.First add effect=effectname to the Google API, then add a special class name to the element that is going to use the special effect. The class name always starts with font-effect- and ends with the effectname.


### CSS Lists ::

- **list-style-type** -> Specifies the type of list-item marker.
- **list-style-image** -> Specifies an image as the list-item marker.
- **list-style-position** -> Specifies the position of the list-item markers.

>The list-style-type:none; property is used to remove the list-item markers.A list has a default margin and padding. To remove this, add margin:0 and padding:0 to the **<ul>** or **<ol>** element.  


### CSS Table ::

Most of the properties of table css are covered earlier.

> Care about **overflow** property of the table for responsive design.

>The **table-layout:fixed;** property:value defines the algorithm used to lay out table cells, rows, and columns.The main benefit of table-layout: fixed; is that the table renders much faster. On large tables, users will not see any part of the table until the browser has rendered the whole table. So, if you use table-layout: fixed, users will see the top of the table while the browser loads and renders rest of the table. **This gives the impression that the page loads a lot quicker.**


### CSS Display ::

- **display** -> specifies whether an HTML element is treated as a block or an inline element.

> Possible values : inline, block, inline-block, flex, grid, contents, none.


> Setting the display property of an element only changes how the element is displayed, NOT what kind of element it is. So, an inline element with **display: block;** is not allowed to have other block elements inside it.**

> When using display: none; the element is completely hidden from the document flow and does not take up any space.

> Use **visibility:hidden;** to hide an element.However, with this property, the element will be hidden, but it will still take up the same space as if it was visible.**

### CSS The max-width Property ::

> [max-width](https://www.w3schools.com/css/css_max-width.asp)


### CSS Position ::

> position: static|absolute|fixed|relative|sticky|initial|inherit;

- **Static** : All HTML elements are positioned static by default.Static positioned elements are not affected by the top, bottom, left, and right properties.An element with **position: static;** is always positioned according to the normal flow of the page.
- **Relative** : An element with **position: relative;** is positioned relative to its normal position in the document flow.Setting the top, right, bottom, and left properties will cause the element to be adjusted away from its normal position. Other content will not be adjusted to fit into any gap left by the element.**
- **Fixed** : An element with **position: fixed;** is positioned relative to the viewport, which means it always stays in the same place even if the page is scrolled. The top, right, bottom, and left properties are used to set the final location of the element.A fixed element does not leave a gap in the page where it would normally have been located.
- **Absolute** : An element with **position: absolute;** is positioned relative to the nearest positioned ancestor (with position other than static).However, if an absolute positioned element has no positioned ancestors, it uses the document body, and moves along with page scrolling.Absolute positioned elements are removed from the normal document flow, and can overlap other elements
- **Sticky** : An element with position: sticky; toggles between a relative and fixed position, depending on the scroll position.A sticky element is positioned relative until a certain scroll position is reached - then it "sticks" in that place (like position:fixed).You must specify at least one of the top, right, bottom or left properties, for sticky positioning to work.

> Button element has its **text-align:centre;** by default.

> **z-index** : The z-index property specifies the stack order of positioned elements.The stack order defines which element should be placed in front or behind other elements.When elements are positioned, they can overlap other elements.An element can have a positive or negative stack order (z-index).If several positioned elements overlap each other without a z-index specified, the elements render in the order they are defined in the HTML source code.


### CSS Overflow ::

>The CSS overflow property controls what happens to content that is too big to fit into an area.It specifies whether to clip the content or to add scrollbars when the content of an element is too big.

The overflow property has the following values:

- **visible** -> Default. The overflow is not clipped. The content renders outside the element's box.
- **hidden** -> The overflow is clipped, and the rest of the content is hidden.
- **scroll** -> Scrollbars are added. User must scroll to see all content.
- **auto** -> Similar to scroll, but adds scrollbars only when necessary.


> The overflow-x and overflow-y properties allow you to control overflow behavior independently for horizontal and vertical directions.

- **overflow-x** -> specifies what to do with the left/right edges of the content.
- **overflow-y** -> specifies what to do with the top/bottom edges of the content.


### CSS Float ::

>The float property specifies how an element should float within its container.It places an element on the left or right side of its container, allowing text and inline elements to wrap around it.The float property is often used to wrap text around images.

The float property can have one of the following values:

- **left** -> The element floats to the left of its container.
- **right** -> The element floats to the right of its container.
- **none** -> Default. The element does not float and is displayed just where it occurs in the text.
- **inherit** -> The element inherits the float value of its parent.

> HTML **<div>** elements are block elements, and will start on a new line and take up the full width available. However, if we use float: left we can make the **<div>** elements to float next to each other.

> The clear property specifies what should happen with the element that is NEXT to a floating element.The clear property prevents elements from wrapping around or beside the floated content.

This property can have one of the following values:

- **none** -> Default. Allows elements to float on either side.
- **left** -> The element is pushed below floated elements on its left side.
- **right** -> The element is pushed below floated elements, on its right side.
- **both** -> The element is pushed below floated elements, on both its left and right side.
- **inherit** -> The element inherits the clear value from its parent.

> (Clear/clearfix hack)[https://www.w3schools.com/css/css_float_clear.asp]


### CSS Units ::

>CSS units are used to define the length and size of several properties. Several CSS properties take "length" values, such as font-size, width, margin, padding, border, etc.CSS has two types of units: Absolute units and Relative units.Absolute units are fixed, and the length expressed in any of these will appear exactly that size.

>Absolute units do NOT change when the screen size change, and are not recommended for websites. However, they can be used if the output medium is known, such as for print layout.The most used absolute unit is px (pixels).If you use pixels, the web page may not scale very well on different screen sizes and the users cannot adjust the text size in their browser settings. However, users can still use the zoom tool to resize the entire page.

>Relative units specify a length relative to another length property (like parent element, root element, or viewport).Relative length units scale better between different screen sizes, making them ideal for responsive web design.The two most used relative units are em and rem.The em unit is relative to the font size of the parent element. So, if the parent element has a font size of 16px, then 2.5em would result in 40px.In the following example, the text size in **em** is the same as the previous example in pixels. However, the em unit allows the user to adjust the text size in the browser settings. The rem unit is relative to the font size of the root HTML element (<html>).The default font-size of the <html> element in most browsers, is 16px.

### CSS Inheritance ::

>CSS inheritance is about what happens if no value is specified for a property on an element.If no value is specified for a property, the value can either be inherited from the parent element, or be set to its initial (default) value.For CSS inheritance, properties are categorized in two types: inherited properties and non-inherited properties.

>Inherited properties are, by default, set to the computed value of the parent element.Properties related to text, such as color, font-family, font-size, line-height, and text-align, are typically inherited. This ensures consistent text styling throughout a document.In the following example, the text inside the <strong> element will appear in 20px and in blue, since the <strong> element inherits the color and the font-size value from the parent (<p>) element.

>If there is not set a value for a non-inherited property, the value is set to the initial (default) value of that property.Properties related to the box model or layout, like border, background, margin, padding, width, and height, are typically not inherited. In the following example, the <strong> element, inside the <p> element, will not have an additional border (since the initial value of border-style is none).

>The **inherit** keyword is used to explicitly specify inheritance. It works on both inherited and non-inherited properties.


### CSS Specificity ::

> Check the link : [Specificity Hierarchy](https://www.w3schools.com/css/css_specificity_hierarchy.asp)


| Selector | Example | Description | Weight |
|----------|----------|-------------|--------|
| Inline styles | `<h1 style="color: pink;">` | Highest priority, will override all other selectors | 1-0-0-0 |
| ID selectors | `#navbar` | Second highest priority | 1-0-0 |
| Classes, attribute selectors, and pseudo-classes | `.test`, `[type="text"]`, `:hover` | Third highest priority | 0-1-0 |
| Elements and pseudo-elements | `h1`, `::before`, `::after` | Low priority | 0-0-1 |
| Universal selector and `:where()` | `*`, `:where()` | No priority | 0-0-0 |


The weight notation uses three numbers (X-Y-Z):

X - Number of ID selectors
Y - Number of class selectors, attribute selectors, and pseudo-classes
Z - Number of element selectors and pseudo-elements
The selector with the higher leftmost number wins. If equal, compare the next number, and so on.

>The **!important** rule is used to give the value of a specific property the highest priority.The **!important** rule will override ALL previous styling rules for that specific property on that element!The !important keyword is added to the end of a CSS declaration, before the semicolon. Syntax : **property: value !important;**.***


>The !important rule can be useful in some cases, like: **1.** To override a style that cannot be overridden in any other way. This could be if you are working in a Content Management System (CMS) and cannot edit the CSS code. Then you can set some custom styles to override some of the CMS styles. **2.** To respect user preferences. Some users have motion sensitivity and prefer websites with less animation. CSS has a @media feature called prefers-reduced-motion that lets you check if a user has asked to reduce motion, such as animations or transitions. You can use !important to turn off, or tone down animations and transitions for the users who has activated this setting on their computer. **3.** To create a highly specific, unchangeable style for a specific element.



### CSS Optimization ::

- 1. Use simple selectors when possible. Complex selectors increase the parsing time.
- 2. Avoid the universal selector (*) when not strictly necessary. The universal selector (*) affects every element and can slow down page rendering.
- 3. Avoid inline styles when not necessary. Inline styles make your HTML heavier and are harder to manage.
- 4. Avoid using @import for loading external CSS, as it delays stylesheet loading.Add external CSS with the <link> tag in the head section, so it loads before the page is rendered.
- 5. Use shorthand properties when possible. It saves space and is faster to parse.
- 6. A high number of animations and large animations require more processing power to handle, which degrades performance. So, remove unnecessary animations.
- 7. Animation performance relies also on what properties you are animating.Some properties (like width, height, left, top), trigger a layout recalculation when animated, and should be avoided.If possible, use animation properties that do not cause repaint, like transforms, opacity and filter. 
- 8. Use one CSS file when possible, and remove spaces and comments to reduce file size.You can use tools like: CSS Minifier, PostCSS and Online compressors.  
- 9. Make sure your CSS file is cached by the browser by giving it a long expiration time in your server settings. This reduces how often users need to re-load it.





































