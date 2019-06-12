// Map each class of actor to a character
var actorChars = {
  "@": Player,
  "o": Coin,
  "0": Fakecoin,
  "q": Fakewall,
  "i": Fakewood,
  "z": Sign,
  "y": Signn,
  "w": Signnn,
  "^": Signnnn,
  "&": Oldman,
  "%": Demonwizard,
  "p": Powerup,
  "b": Bee,  // A coin will wobble up and down
  "=": Lava, "|": Lava, "v": Lava,
  "l": Test, "e": Test, "m": Test
};

function Level(plan) {
  // Use the length of a single row to set the width of the level
  this.width = plan[0].length;
  // Use the number of rows to set the height

  this.height = plan.length;

  // Store the individual tiles in our own, separate array
  this.grid = [];

  // Store a list of actors to process each frame
  this.actors = [];

  // Loop through each row in the plan, creating an array in our grid
  for (var y = 0; y < this.height; y++) {
    var line = plan[y], gridLine = [];

    // Loop through each array element in the inner array for the type of the tile
    for (var x = 0; x < this.width; x++) {
      // Get the type from that character in the string. It can be 'x', '!' or ' '
      // If the character is ' ', assign null.

      var ch = line[x], fieldType = null;
      var Actor = actorChars[ch];
      // Use if and else to handle the three cases
      if (Actor)
        // Create a new actor at that grid position.
        this.actors.push(new Actor(new Vector(x, y), ch));
      else if (ch == "x")
        fieldType = "wall";
	  else if (ch == "n")
		fieldType = "walol";
      // Because there is a third case (space ' '), use an "else if" instead of "else"
      else if (ch == "!")
        fieldType = "lava";

      // "Push" the fieldType, which is a string, onto the gridLine array (at the end).
      gridLine.push(fieldType);
    }
    // Push the entire row onto the array of rows.
    this.grid.push(gridLine);
  }

  // Find and assign the player character and assign to Level.player
  this.player = this.actors.filter(function(actor) {
    return actor.type == "player";
  })[0];
}

// Check if level is finished
Level.prototype.isFinished = function() {
  return this.status != null && this.finishDelay < 0;
};

function Vector(x, y) {
  this.x = x; this.y = y;
}

// Vector arithmetic: v_1 + v_2 = <a,b>+<c,d> = <a+c,b+d>
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

// Vector arithmetic: v_1 * factor = <a,b>*factor = <a*factor,b*factor>
Vector.prototype.times = function(factor) {
  return new Vector(this.x * factor, this.y * factor);
};


// A Player has a size, speed and position.
function Player(pos) {
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(0.8, 1.5);
  this.speed = new Vector(0, 0);
}
Player.prototype.type = "player";

// Add a new actor type as a class
function Coin(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(0.6, 0.6);
  // Make it go back and forth in a sine wave.
  this.wobble = Math.random() * Math.PI * 2;
}
function Powerup(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(0.6, 0.6);
  // Make it go back and forth in a sine wave.
  this.wobble = Math.random() * Math.PI * 2;
}
function Fakecoin(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(0.6, 0.6);
  // Make it go back and forth in a sine wave.
  this.wobble = Math.random() * Math.PI * 2;
}
function Fakewall(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0,0));
  this.size = new Vector(1.0, 1.0);
}
function Fakewood(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0,0));
  this.size = new Vector(1.0, 1.0);
}
function Signn(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0, -1));
  this.size = new Vector(2.0, 2.0);
  // Make it go back and forth in a sine wave.
  this.wobble = 0;//Math.random() * Math.PI * 2;
}
function Sign(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(1, 1.5);
  // Make it go back and forth in a sine wave.
  this.wobble = 0;//Math.random() * Math.PI * 2;
}
function Oldman(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0, -1));
  this.size = new Vector(2.0, 2.0);
  // Make it go back and forth in a sine wave.
  this.wobble = 0;//Math.random() * Math.PI * 2;
}
function Demonwizard(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0, -1));
  this.size = new Vector(2.0, 2.0);
  // Make it go back and forth in a sine wave.
  this.wobble = 0;//Math.random() * Math.PI * 2;
}
function Bee(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(0.6, 0.6);
  // Make it go back and forth in a sine wave.
  this.wobble = 0;//Math.random() * Math.PI * 2;
}
function Signnn(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(1, 1.5);
  // Make it go back and forth in a sine wave.
  this.wobble = 0;//Math.random() * Math.PI * 2;
}
function Signnnn(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(1, 1.5);
  // Make it go back and forth in a sine wave.
  this.wobble = 0;//Math.random() * Math.PI * 2;
}
Demonwizard.prototype.type = "demonwizard";
Fakewall.prototype.type = "fakewall";
Fakewood.prototype.type = "fakewall";
Powerup.prototype.type = "powerup";
Fakecoin.prototype.type = "fakecoin";
Coin.prototype.type = "coin";
Bee.prototype.type = "bee";
Sign.prototype.type = "sign";
Signn.prototype.type = "signn";
Signnn.prototype.type = "signnn";
Signnnn.prototype.type = "signnnn";
Oldman.prototype.type = "oldman";

// Lava is initialized based on the character, but otherwise has a
// size and position
function Lava(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  if (ch == "=") {
    // Horizontal lava
    this.speed = new Vector(8, 0);
  } else if (ch == "|") {
    // Vertical lava
    this.speed = new Vector(2, 3);
  } else if (ch == "v") {
    // Drip lava. Repeat back to this pos.
    this.speed = new Vector(-2, 3);
    this.repeatPos = pos;
  }
}
Lava.prototype.type = "lava";

function Test(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  if (ch == "l") {
    // Horizontal lava
    this.speed = new Vector(2, 1);
  } else if (ch == "e") {
    // Vertical lava
    this.speed = new Vector(1, 2);
  } else if (ch == "m") {
    // Drip lava. Repeat back to this pos.
    this.speed = new Vector(1, 3);
    this.repeatPos = pos;
  }
}
Test.prototype.type = "test";

// Helper function to easily create an element of a type provided 
function elt(name, className) {
  var elt = document.createElement(name);
  if (className) elt.className = className;
  return elt;
}
	

// Main display class. We keep track of the scroll window using it.
function DOMDisplay(parent, level) {

// this.wrap corresponds to a div created with class of "game"
  this.wrap = parent.appendChild(elt("div", "game"));
  this.level = level;

  // In this version, we only have a static background.
  this.wrap.appendChild(this.drawBackground());

  // Keep track of actors
  this.actorLayer = null;

  // Update the world based on player position
  this.drawFrame();
  
}

var scale = 20;

DOMDisplay.prototype.drawBackground = function() {
  var table = elt("table", "background");
  table.style.width = this.level.width * scale + "px";

  // Assign a class to new row element directly from the string from
  // each tile in grid
  this.level.grid.forEach(function(row) {
    var rowElt = table.appendChild(elt("tr"));
    rowElt.style.height = scale + "px";
    row.forEach(function(type) {
      rowElt.appendChild(elt("td", type));
    });
  });
  return table;
};

// All actors are above (in front of) background elements.  
DOMDisplay.prototype.drawActors = function() {
  // Create a new container div for actor dom elements
  var wrap = elt("div");

  // Create a new element for each actor each frame
  this.level.actors.forEach(function(actor) {
    var rect = wrap.appendChild(elt("div",
                                    "actor " + actor.type));
    rect.style.width = actor.size.x * scale + "px";
    rect.style.height = actor.size.y * scale + "px";
    rect.style.left = actor.pos.x * scale + "px";
    rect.style.top = actor.pos.y * scale + "px";
  });
  return wrap;
};

DOMDisplay.prototype.drawFrame = function() {
  if (this.actorLayer)
    this.wrap.removeChild(this.actorLayer);
  this.actorLayer = this.wrap.appendChild(this.drawActors());
  // Update the status each time with this.level.status"
  this.wrap.className = "game " + (this.level.status || "");
  this.scrollPlayerIntoView();
};

DOMDisplay.prototype.scrollPlayerIntoView = function() {
  var width = this.wrap.clientWidth;
  var height = this.wrap.clientHeight;

  // We want to keep player at least 1/3 away from side of screen
  var margin = width / 3;

  // The viewport
  var left = this.wrap.scrollLeft, right = left + width;
  var top = this.wrap.scrollTop, bottom = top + height;

  var player = this.level.player;
  // Change coordinates from the source to our scaled.
  var center = player.pos.plus(player.size.times(0.5))
                 .times(scale);

  if (center.x < left + margin)
    this.wrap.scrollLeft = center.x - margin;
  else if (center.x > right - margin)
    this.wrap.scrollLeft = center.x + margin - width;
  if (center.y < top + margin)
    this.wrap.scrollTop = center.y - margin;
  else if (center.y > bottom - margin)
    this.wrap.scrollTop = center.y + margin - height;
};

// Remove the wrap element when clearing the display
// This will be garbage collected
DOMDisplay.prototype.clear = function() {
  this.wrap.parentNode.removeChild(this.wrap);
};

// Return the first obstacle found given a size and position.
Level.prototype.obstacleAt = function(pos, size) {
  // Find the "coordinate" of the tile representing left bound
  var xStart = Math.floor(pos.x);
  // right bound
  var xEnd = Math.ceil(pos.x + size.x);
  // top bound
  var yStart = Math.floor(pos.y);
  // Bottom bound
  var yEnd = Math.ceil(pos.y + size.y);

  // Consider the sides and top and bottom of the level as walls
  if (xStart < 0 || xEnd > this.width || yStart < 0)
    return "wall";
  if (yEnd > this.height)
    return "lava";

  // Check each grid position starting at yStart, xStart
  // for a possible obstacle (non null value)
  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      var fieldType = this.grid[y][x];
      if (fieldType) return fieldType;
    }
  }
};

// Collision detection for actors is handled separately from 
// tiles. 
Level.prototype.actorAt = function(actor) {
  // Loop over each actor in our actors list and compare the 
  // boundary boxes for overlaps.
  for (var i = 0; i < this.actors.length; i++) {
    var other = this.actors[i];
    // if the other actor isn't the acting actor
    if (other != actor &&
        actor.pos.x + actor.size.x > other.pos.x &&
        actor.pos.x < other.pos.x + other.size.x &&
        actor.pos.y + actor.size.y > other.pos.y &&
        actor.pos.y < other.pos.y + other.size.y)
      // check if the boundaries overlap by comparing all sides for
      // overlap and return the other actor if found
      return other;
  }
};

// Update simulation each step based on keys & step size
Level.prototype.animate = function(step, keys) {
  // Have game continue past point of win or loss
  if (this.status != null)
    this.finishDelay -= step;

  // Ensure each is maximum 100 milliseconds 
  while (step > 0) {
    var thisStep = Math.min(step, maxStep);
    this.actors.forEach(function(actor) {
      // Allow each actor to act on their surroundings
      actor.act(thisStep, this, keys);
    }, this);
   // Do this by looping across the step size, subtracing either the
   // step itself or 100 milliseconds
    step -= thisStep;
  }
};

Lava.prototype.act = function(step, level) {
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};

Test.prototype.act = function(step, level) {
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};

var maxStep = 0.05;

var wobbleSpeed = 8, wobbleDist = 0.07;

Coin.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};
Fakewall.prototype.act = function(step) {
  
};
Fakewood.prototype.act = function(step) {
  
};
Powerup.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};
Fakecoin.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};

Bee.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = 0 * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};
Sign.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = 0 * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};
Oldman.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = 0 * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};
Demonwizard.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = 0 * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};
Signnn.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = 0 * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};
Signn.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = 0 * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};
Signnnn.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = 0 * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};
/*
var maxStep = 0.05;

var wobbleSpeed = 8, wobbleDist = 0.07;

Coin.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};
*/
var maxStep = 0.05;

var playerXSpeed = 7;

Player.prototype.moveX = function(step, level, keys) {
  this.speed.x = 0;
  if (keys.left) this.speed.x -= playerXSpeed;
  if (keys.right) this.speed.x += playerXSpeed;

  var motion = new Vector(this.speed.x * step, 0);
  // Find out where the player character will be in this frame
  var newPos = this.pos.plus(motion);
  // Find if there's an obstacle there
  var obstacle = level.obstacleAt(newPos, this.size);
  // Handle lava by calling playerTouched
  if (obstacle)
    level.playerTouched(obstacle);
  else
    // Move if there's not an obstacle there.
    this.pos = newPos;
};

var gravity = 30;
var jumpSpeed = 17;

Player.prototype.moveY = function(step, level, keys) {
  // Accelerate player downward (always)
  this.speed.y += step * gravity;;
  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  // The floor is also an obstacle -- only allow players to 
  // jump if they are touching some obstacle.
  if (obstacle) {
    level.playerTouched(obstacle);
    if (keys.up && this.speed.y > 0)
      this.speed.y = -jumpSpeed;
    else
      this.speed.y = 0;
  } else {
    this.pos = newPos;
  }
};

Player.prototype.act = function(step, level, keys) {
  this.moveX(step, level, keys);
  this.moveY(step, level, keys);

  var otherActor = level.actorAt(this);
  if (otherActor)
    level.playerTouched(otherActor.type, otherActor);

  // Losing animation
  if (level.status == "lost") {
    this.pos.y -= step;
    this.size.y -= step;
	this.size.x -= step;
	this.pos.x -= step;
  }
};

Level.prototype.playerTouched = function(type, actor) {

  // if the player touches lava and the player hasn't won
  // Player loses
  if (type == "lava" && this.status == null) {
    this.status = "lost";
    this.finishDelay = 1;
} 
  else if (type == "test" && this.status == null) {
    this.status = "lost";
    this.finishDelay = 1;
}
  else if (type == "coin") {
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
	
    // If there aren't any coins left, player wins
    if (!this.actors.some(function(actor) {
           return actor.type == "coin";
         })) {
      this.status = "won";
      this.finishDelay = 1;
    }
  } else if (type == "bee") {
	  this.actors = this.actors.filter(function(other) {
      return other != actor;
	  });
	  //actor.stop
	  alert("bee!");
  }
  else if (type == "fakecoin") {
	  this.actors = this.actors.filter(function(other) {
      return other != actor;
	  });
  }
  else if (type == "powerup") {
	  this.actors = this.actors.filter(function(other) {
      return other != actor;
	  });
	  playerXSpeed = 30;
	  jumpSpeed = 40;
	  setTimeout(powerupFunction,6000);
	  function powerupFunction() {
		playerXSpeed = 7;
		jumpSpeed = 17;
	  }  
  }
  else if (type == "sign") {
	   if (firsttime2 == 0)
		alert("Ecstasy : Truth : Power");
		firsttime2 = 1;
  }

 else if (type == "signn") {
	  if (firsttime == 0)
		alert("HELP! Someone just stole my groceries! He flew into that boat over there!");
		firsttime = 1;
  }
   else if (type == "signnn") {
	  if (firsttime5 == 0)
		alert("WARNING: DEMON WIZARD LAIR AHEAD");
		firsttime5 = 1;
  }
    else if (type == "signnnn") {
	   if (firsttime3 == 0)
		alert("Some walls are only in place to keep out the weak.");
		firsttime3 = 1;
  }

    else if (type == "demonwizard") {
	  this.actors = this.actors.filter(function(other) {
      return other != actor;
	  });
	  
	  alert("EHheheh! You can't stop me, THEY'RE MY GROCERIES NOW!");
  }
 else if (type == "oldman") {
	  if (firsttime4 == 0)
		alert("Thank you! My brother trys to steal my groceries on "+ dateee +"s! You're my hero purple block!");
		firsttime4 = 1;
  }

};
var datee = new Date();
var dateee = datee.getDay();
if (dateee == 0)
	dateee = "Sunday"
else if (dateee == 1)
	dateee = "Monday"
else if (dateee == 2)
	dateee = "Tuesday"
else if (dateee == 3)
	dateee = "Wednesday"
else if (dateee == 4)
	dateee = "Thursday"
else if (dateee == 5)
	dateee = "Friday"
else if (dateee == 6)
	dateee = "Saturday"

var firsttime = 0;
var firsttime1 = 0;
var firsttime2 = 0;
var firsttime3 = 0;
var firsttime4 = 0;
var firsttime5 = 0;
// Arrow key codes for readibility
var arrowCodes = {37: "left", 38: "up", 39: "right"};

// Translate the codes pressed from a key event
function trackKeys(codes) {
  var pressed = Object.create(null);

  // alters the current "pressed" array which is returned from this function. 
  // The "pressed" variable persists even after this function terminates
  // That is why we needed to assign it using "Object.create()" as 
  // otherwise it would be garbage collected

  function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      // If the event is keydown, set down to true. Else set to false.
      var down = event.type == "keydown";
      pressed[codes[event.keyCode]] = down;
      // We don't want the key press to scroll the browser window, 
      // This stops the event from continuing to be processed
      event.preventDefault();
    }
  }
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  return pressed;
}

// frameFunc is a function called each frame with the parameter "step"
// step is the amount of time since the last call used for animation
function runAnimation(frameFunc) {
  var lastTime = null;
  function frame(time) {
    var stop = false;
    if (lastTime != null) {
      // Set a maximum frame step of 100 milliseconds to prevent
      // having big jumps
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }
    lastTime = time;
    if (!stop)
      requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// This assigns the array that will be updated anytime the player
// presses an arrow key. We can access it from anywhere.
var arrows = trackKeys(arrowCodes);

// Organize a single level and begin animation
function runLevel(level, Display, andThen) {
  var display = new Display(document.body, level);

  runAnimation(function(step) {
    // Allow the viewer to scroll the level
    level.animate(step, arrows);
    display.drawFrame(step);
    if (level.isFinished()) {
      display.clear();
      if (andThen)
        andThen(level.status);
      return false;
    }
  });
}
	
function runGame(plans, Display) {
  function startLevel(n) {
    // Create a new level using the nth element of array plans
    // Pass in a reference to Display function, DOMDisplay (in index.html).
    runLevel(new Level(plans[n]), Display, function(status) {
      if (status == "lost"){
        startLevel(n);
	  }
		
      else if (n < plans.length - 1){
		replacejscssfile("game2.css", "game3.css", "css");
		replacejscssfile("game1.css", "game2.css", "css");
		replacejscssfile("game.css", "game1.css", "css"); //Replace all occurences "oldstyle.css" with "newstyle.css"
        startLevel(n+1);
	  }
      else
        console.log("You win!");
    });
  }
  startLevel(0);
}

function createjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    return fileref
}
 
function replacejscssfile(oldfilename, newfilename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist using
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename)!=-1){
            var newelement=createjscssfile(newfilename, filetype)
            allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i])
        }
    }
}
