# Storytailor

User stories describe ideal system behavior. They have different formats: some are easier to read, some are easier to write.

**Storytailor** solves the dilemma by compiling easy-to-read stories from easy-to-write code.

## Stories

Storytailor is developed using Storytailor itself (just like compilers of certain programming languages). Below are the stories that describe ideal Storytailor behavior.

### Designer writes a story

* Designer interviews User to figure out desirable system behavior.
* Designer writes a story as a sequence of events.
* <span id="designer-requests-feedback-from-user">Designer requests feedback from User</span>:
  * Questions:
    * Is the story realistic?
    * Does the story miss any important events?
    * Does the story outcome match your expectations?
* If feedback implies changes:
  * Designer modifies the story according to user feedback.
  * Designer requests user feedback ([loop](#designer-requests-feedback-from-user)).
* If feedback doesn't imply changes:
  * Designer sends the story to Programmer.

### Designer requests feedback on changes via GitHub pull request

* [Designer writes a story](#designer-writes-a-story).
* Designer switches to a separate branch.
* Designer makes changes to the story.
* Designer pushes the changes to repository.
* Designer creates a pull request that includes the changes.
* GitHub sends notifications to repository maintainers.

### Designer requests feedback from client via GitHub

* Designer creates a GitHub repository for stories.
* Designer adds client as repository maintainer. 
* [Designer requests feedback on changes via GitHub pull request](#designer-requests-feedback-on-changes-via-github-pull-request)

### Designer adds a link to definition

* Designer starts writing a story
  * Title: "Exchange updates latest price"
* Designer adds event: `Alice places an order`
* Designer adds a link to `Order` definition.

### Designer defines a model for definition

* Designer writes a definition for `Order`.
* Designer defines a model:
  ```
    * Fields:
      * Symbol
        * Example: "BTCUSD"
        * Type: String
      * Price
        * Example: 7500.0
        * Type: Float
      * Amount
        * Example: 10.0
        * Type: Float
    * Validations:
      * On insert:
        * Validate that available balance of current user is higher than sum of already placed order amounts + new order amount
  ```

### Designer reuses definition from another project

* [Designer writes a story](#designer-writes-a-story).
* Designer decides to add a definition for "Acquisition channel"
* Designer includes "Acquisition channel" definition from sales book.

### Designer reuses stories from another project

* Designer creates a new project.
* Designer realizes it needs the same user management stories:
  * Sign up.
  * Reset password.
  * Change email.
  * Change password.
* Designer includes "User management" book in the new project.

### Programmer reuses designer model definition

* [Designer defines a model for definition](#designer-defines-a-model-for-definition).
* [Designer writes a story](#designer-writes-a-story) that uses prior model definition.
* Programmer implements a story.
  * Programmer reuses model definition in the code.
  
Note: code reuse is only possible if stories & their implementations are written in the same language.

### Designer adds comment to object property

* Designer starts writing a story
  * Title: "Exchange updates latest price"
* Designer adds event:
  ```
  * Exchange adds a trade to latest trade list:
    * Price: 10000 USD.
    * Amount: 1 BTC.
    * Type: sell.
  ```
* Designer decides to explain `Type: sell` point.
* Designer modifies the point to `Type: sell (because Bob placed a sell order after Alice)`.


### Designer marks the story as draft

* [Designer writes a story](#designer-writes-a-story).
* Designer adds `_(draft)_` marker to the story title. 

### Designer defines a loop within the story _(draft)_

### Designer receives feedback in the form of counter-story

* [Designer writes a story](#designer-writes-a-story).
* Expert reads the story.
* Expert adds a comment that is also formatted as a story.

### Designer receives feedback in the form of diff to current story

* [Designer writes a story](#designer-writes-a-story).
* Expert reads the story.
* Expert adds a comment that represents the same story but with changed steps.

Note: add "Copy parent story".

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

### Storytailor parses stories from template

* Storytailor starts
* Storytailor parses stories from *.md files in current directory

### Storytailor autolinks stories

* Storytailor generates stories.
* Storytailor autolinks every step that is equal to existing story.s 
* Storytailor autolinks the first mention of every definition:
  * Storytailor doesn't autolink mentions surrounded by "][" (example: `]trader[`)
  * Storytailor doesn't autolink mentions within linked steps.

### Storytailor places full stops at the end of the points

* Storytailor generates stories.
* Storytailor places full stops at the end of the points.

### Programmer deploys Storytailor on Now

* Programmer adds Now-specific configuration for Storytailor 
* Programmer creates an account on Now
* Programmer deploys Storyteller to Now

## Notes

* Stories can be used as:
  * Marketing collateral:
    * Teach people about how things work.
    * Motivate prospects to take action.
  * Task specifications:
    * Describe work to potential hires.
    * Write tests for programmers.
    * Reach agreement with a client.
  * Unit of knowledge:
    * Approve the result of customer discovery.
    * Share company plans with teams.
    * Motivate yourself.
* Stories are just named event sequences.
* Stories should become tests.
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
* Shortcuts are story-specific:
  * With shortcut:
    ```
      * Investor buys Spacemine Energy Token (SET).
      * Investor waits until Spacemine becomes popular.
      * Investor sells Spacemine Energy Token (SET) for higher price.
    ```
  * Without shortcut:
    ```
      * Investor buys Spacemine Energy Token (SET):
        * Price: X
      * Investor waits until Spacemine becomes popular.
      * Investor sells Spacemine Energy Token (SET):
        * Price: Y (Y > X).
    ```
