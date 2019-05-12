# WTQ Node

## Running
1. Clone the repository
2. Install project dependencies by running `scripts/install.sh` from the project root.
3. Run `docker-compose up` to start the application.

To bring down the application and its dependent containers, simply run `docker-compose down`.

To run an interactive terminal inside the container, run `scripts/terminal.sh`.

### Access site in browser
Access site via http://localhost:8002

Access graphql sandbox via http://localhost:8001/graphql

## Adding Dependencies
This repository utilizes Yarn workspaces. To add a package to the `api` service, execute `scripts/workspace.sh wtq-node-api add [package-name]`. Likewise, to remove a package, execute `scripts/workspace.sh wtq-node-api remove [package-name]`

## GraphQL playground examples
[https://graphqlbin.com/v2/OgLJHZ]
