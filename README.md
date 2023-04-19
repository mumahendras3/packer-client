# Package Maintainer Helper (Packer)

This repo contains the client part of Packer prototype.

## The Main Job of The Client Part

- Provide a user-friendly UI to handle account creation (since each user can
  have their own watchlist).

- Provide a user-friendly UI to handle adding a GitHub and/or GitLab repository
  of the software that the user wants to package for their Linux distribution of
  choice.

- Provide a user-friendly UI to handle creating a new
  [task](https://github.com/mumahendras3/packer-backend/blob/main/README.md)
  that will be run by the server automatically at the user-supplied schedule.

- Provide a user-friendly UI to see the status and logs of the created tasks.
  The status will be one of (at least) three state: `Running`, `Failed`, and
  `Succeeded`. The logs will be all of the output produced by the commands that
  were run by the container (as defined by the user when the user creates the
  task).
