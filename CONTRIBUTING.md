# Contributing to Tempo

## Making Changes

When making changes to the codebase that should result in a version change and an entry in the changelog, you should use changesets.

### Using Changesets

We use [changesets](https://github.com/changesets/changesets) to manage versioning and changelogs for this project.

#### Adding a Changeset

After making your changes, run:

```bash
yarn changeset
```

- You'll be prompted to select the packages you've modified
- Select the appropriate packages using the space bar, then press enter
- Select the type of change for each package:
  - `major`: Breaking changes
  - `minor`: New features
  - `patch`: Bug fixes and minor changes
- Write a summary of your changes
- A new markdown file will be created in the `.changeset` directory

Commit this file along with your changes.

#### How Releases Work

1. When a PR with a changeset is merged to main, a "Version Packages" PR will be automatically created
2. This PR updates package versions and changelogs based on the changesets
3. When the "Version Packages" PR is merged, packages will be published to npm automatically

Note: If you don't want to trigger a release for your changes, don't add a changeset.
