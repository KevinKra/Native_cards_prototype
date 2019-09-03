#### Questions

1. Describe the `PanResponder` module.
2. Describe the relation between the `PanResponder` module and the `Animated` library.
3. Explain the values of the `PanResponder`'s gesture and event arguments.
4. Explain the gesture values: `dx, dy`, `moveX, moveY`, `vx, vy`, `numberActiveTouches + x0, y0`.

#### Answers

1. `PanResponder` collects inputs (gestures) from the user and provides data regarding it.
2. The `PanResponder` provides call backs that can be utilized to handle animations. It acts independently of the `Animated` library and needs to tailored to cause animations.
3. Event (nativeEvent) and Gesture callback arguments both provide data related to the current active user gesture.
4. `dx, dy`: total distances of the the user has moved their finger during the life cycle of the gesture. `moveX, moveY`: talk about where the user is clicking down and pressing over.
   `vx, vy`: the current velocity of a gesture. `x0, y0`: (maybe) related to double finger movement distance.
5.

### Challenges

1. `Animated.View` allow for animations and the ability to click.
2. Landscape / Portrait mode, how to set this up.
3. zIndex cards so when they are enlarged they appear above the other cards.
4. Determining animations based on containers, not device specs.
5. Transitioning between screens.
6. Better devtools
