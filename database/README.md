# Blog database

The initial blog backend stores published posts in `blogs.json`. The server
creates this file if it is missing and writes updates atomically. This keeps
the first version dependency-free; the storage layer can be migrated to a
managed database in a future update.

Do not place credentials in this folder. Admin credentials belong in the
server's untracked `.env` file.
