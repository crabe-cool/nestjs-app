### 🚀 Project setup
1. Add a valid `.env` file besides the `env.template`
1. Run `yarn` to install locked dependencies
1. Run `yarn start` and attest server gets started

Congrats! 🎉 You're ready to go.

### 🧑‍💻 Architecture decisions
#### WebSockets
We wanted our server to be fast and reactive : we didn't want the client to refresh the page to get all the data from the database. We knew we would have to use Web Sockets.

#### DDD/CQRS
Additionally, we wanted our implementation to be easily scalable. So we've chosen to use Domain Driven Design combined with CQRS. Used together they're quite compatible and therefore very powerful.

#### TDD
Most of the project classes and handlers have been developed using Test Driven Development, which guided us well during features implementation. Result is we've got some securing tests asserting we're not *breaking* anything commit after commit.

#### MongoDB
Concerning data storage we've been thinking a lot about how we should or we should not be using a real database. We could have choose to use some JSON file but we finally took the MongoDB option since we're pretty familiar with noSQL.

### 🧑‍💻 DevOps
#### Continuous Integration
In order to make things work properly before pushing them anywhere, we've decided to setup a CI process using GitHub Actions.
Every push or pull request on `develop` or `main` triggers a workflow that makes sure everything's working out well.

#### Continuous Deployment
Same thing here but for deployment. Every push on `develop` or `main` triggers a workflow that deploys the server directly on our OVH VPS, making it available at :
- https://preview.crabe.cool for `develop`
- https://crabe.cool for `main`