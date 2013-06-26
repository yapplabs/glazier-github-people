glazier-github-people
======================

A card for adding an arbitrary set of people (github identities) to
a card. Great for listing core team members of a project, etc.


## Adding to glazier

    # in `glazier/cards/`
    ln -s your/path/to/glazier-github-people

    # in `glazier/`
    grunt ingestCards

    # in `glazier/glazier-server/`
    bundle exec rails console

    # lookup the CardManifest record
    cm = CardManifest.where(name: 'yapplabs/glazier-github-people').first

    # create a Pane record
    pane = Pane.create{|pane| pane.card_manifest_name = cm.name }

    # add the Pane to the dashboard of your choosing
    db = Dashboard.where(repository: 'emberjs/ember.js').first
    db.panes.push(pane)
