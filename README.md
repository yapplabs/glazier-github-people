glazier-github-people
======================

A card for adding an arbitrary set of people (github identities) to
a card. Great for listing core team members of a project, etc.


## Adding to glazier

    # in `glazier/cards/`
    ln -s your/path/to/glazier-github-people github-people

    # in `glazier/`
    grunt ingestCards

    # in `glazier/glazier-server/`
    bundle exec rails console

    # add the Pane to the dashboard of your choosing
    db = Dashboard.where(repository: 'emberjs/ember.js').first
    db.add_pane('yapplabs/github-people')


## Running Tests
  grunt autotest

  # view in browser
  open dist/dev/github-people/test.html
