# JS-2D-Tiled-Map
>JavaScript dynamic rendered 2D tiled map with collisions.
## `Project incomplete.`

## Explanations
___
## tiles.js:
First script declare list of images:
```javascript
let texture = [];
for(let i=0; i<3; i++) // 3 is max number of texture images
{
	texture[i] = new Image(100, 100);
	texture[i].src = i+".jpg";
}
```

After this script uses pre-defined list of objects in `window object` using `var` statement instead of `let` like so:
```javascript
var c1x1 = { bg: texture[2], collision: false },
c1x2 = { bg: texture[1], collision: false },
c1x3 = { bg: texture[0], collision: false },
//...
//...
c500x500 = { bg: texture[0], collision: false };
// there is ofc program to generate 250000 objects...
```
`var` *c**X**x**Y*** name is very important, e.g. `c1x1` is used later for background name:
```javascript
eval(window["c"+(x+canvasX)+"x"+(y+canvasY)].bg)
```

___
## map.js:
