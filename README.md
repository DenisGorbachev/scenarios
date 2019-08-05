# Storytailor

User stories describe ideal system behavior. They have different formats: some are easier to read, some are easier to write. **Storytailor** solves the dilemma by compiling easy-to-read stories from easy-to-write code.

## Stories

Storytailor is developed using Storytailor itself (just like compilers of certain programming languages). Below are the stories that describe ideal Storytailor behavior.

### Designer writes a story

* Designer interviews User to figure out desirable system behavior.
* Designer writes a story as a sequence of events.
* <span id="designer-requests-feedback-from-user">Designer requests feedback from User</span>:
  * Questions:
    * Is the story real?
    * Does the story miss any important events?
    * Does the story outcome match your expectations?
* If feedback implies changes:
  * Designer modifies the story according to user feedback.
  * Designer requests user feedback ([loop](#designer-requests-feedback-from-user)).
* If feedback doesn't imply changes:
  * Designer sends the story to Programmer.

### Designer marks the story as draft

* [Designer writes a story](#designer-writes-a-story).
* Designer adds `_(draft)_` marker to the story title. 

### Designer defines a loop within the story _(draft)_

### Storytailor generates stories from events

* Programmer defines events
  * Event is an atomic change of the world
  * Event can represent an API request
  * Event can represent the passage of time
  * Event can represent a change in external system behavior
  * If Programmer wishes to test concurrency resilience, he should define more granular events
* System generates stories as event sequences
* Programmer defines updates for each step in event sequence
  * Update is a database update (insertion, removal, modification)
  
Essentially, Programmer asserts that two states are equal: test state (local flat arrays) and system state (database).

## Notes

* Stories are just named event sequences.
* Events have different forms:
  * Long form: all properties specified via nested list.
    * User signs up
      * Email: alice@example.com
      * Username: alice
      * Password: k34ekst93en
      * Subscribe to newsletter: yes
  * Short form: only story-relevant properties specified via nested list.
    * User signs up
      * Email: alice@example.com
      * Username: alice
  * Inline form: only story-relevant properties specified inline.
    * User signs up (username: alice)
* Events can be aliases for other events:
  * "Alice signs up" is an alias for "User signs up (username: alice)"
