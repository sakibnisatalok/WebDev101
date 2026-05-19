
### Padding :: 

* padding-top -> sets the top padding of an element
* padding-right -> sets the right padding of an element
* padding-bottom → sets the bottom padding of an element
* padding-left -> sets the left padding of an element

shorthand for padding : [padding: top right&left bottom]

**Box-sizing** :
>Box-sizing is an important css property when it comes to padding of an element. The defualt value is content-box where height and width of an element do not count **padding and border** ,but **box-sizing: border-box** does. With border-box, the width and height properties apply to the entire visible box, including the content, padding, and border.


### Margin :: 

* margin-top -> sets the top margin of an element
* margin-right -> sets the right margin of an element
* margin-bottom -> sets the bottom margin of an element
* margin-left -> sets the left margin of an element

shorthand for margin : [margin: top right&left bottom]

**Margin collapse** : 
>Margin collapse is when two margins collapse into a single margin.Top and bottom margins of elements are sometimes collapsed into a single margin that is equal to the largest of the two margins.

### Border ::

* border-width -> sets the border width of an element
* border-style -> sets the border style of an element
* border-color -> sets the border color of an element
* border-radius -> sets roundness of the corners.

shorthand for border : [border: width style color]

We can also specify the this shorthand for each side using **[border-side-*]** css property.


### Background ::

* background-color -> sets the color of the **element**.
* background-image -> sets the image of the **element**.
* background-position -> sets the position of the image through cartesian coord. Default is padding box.
* background-size -> controls swize/scaling of background image.
* background-repeat -> controls the repeat direction.
* background-attachment -> decides whether image scolls or stays fixed. 
* background-origin -> decides whether it should be padding box, content box or border box as well as Where background positioning starts.
* background-clip -> decides visible painting area.

### Box Model ::

The box-sizing property can have the following values:
content-box - This is default. The width and height properties includes only the content (border and padding are not included)
border-box - The width and height properties includes content, padding and border.

### Outline ::

An outline is a line that is drawn around elements, OUTSIDE the borders, to make the element "stand out".
Outline differs from borders! The outline is drawn outside the element's border, and may overlap other content. Also, the outline is NOT a part of the element's dimensions; the element's total width and height is not affected by the width of the outline.

-outline-style -> Specifies the style of the outline
-outline-color -> Specifies the color of the outline
-outline-width -> Specifies the width of the outline
-outline-offset -> Adds space between the outline and the edge/border of an element.(**The space between an element and its outline is transparent.**)

> Outline-offset property can take negative values as well.


