# Some info about this project

Controls mimic minecraft creative mode, just click in the window and then you should be able to fly around. Left clicking will remove blocks in front of you, up to 5 blocks away.

The arena is generated randomly each time, so it'll be different if you refresh the page.

I used a very basic ecs system and laid the groundwork for an event system, but due to time constraints with my class the code may resemble a plate of spaghetti.

I coded this in typescript and used webpack to compile the project into a simple bundle file. I used math.gl/core so that I could use predefined Vector3 and Matrix4 classes, specifically for the lookAt and perspective functions.

The texture atlas I used for the blocks is taken from The Painterly Pack: http://painterlypack.net/.


# For the future

Currently this is a project that I am submitting for coursework. However, I plan on implementing a better fluid system than already exists in Minecraft, and then developing this clone further into a more playable game.
