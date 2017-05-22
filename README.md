# 4.um

> Personalized, interactive forum for software developers.

## Team

  - Nick Anderson
  - Preda Wen
  - Tom Dickson

## Table of Contents

1. [Git Workflow](#git-workflow)
1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Contributing](#contributing)

## Git Workflow

1. Type: git remote add upstream https://github.com/skooled/Magenta-Elephants
2. (ensure you are on master branch) type: git checkout master
3. (Sync local master with org’s master) type: git pull --rebase upstream master
4. Create a feature branch, type: git checkout -b <name_of_branch>
5. BEFORE SUBMITTING YOUR NEW CHANGES:
    1. git add .
    2. git commit
    3. git pull --rebase upstream master
6. git push origin <name_of_branch>
7. PULL REQUEST WITH GITHUB
8. Team member reviews code and decides whether to merge or not
9. IF ACCEPTED/MERGED
10. (Switch back to master) type: git checkout master
11. (Delete local branch) type: git branch -D <name_of_branch>
12. type: git pull --rebase upstream master
13. git push origin master

## Usage

> Where software developers of all skill levels and specialties can come together for trustworthy guidance and positive contributions to their community's growth.

## Requirements

- Android/iOS
- Express
- Firebase
- MySql
- React Native
- Redux
- Socket

### Getting Started

- From the root directory run 'npm install'
- Open a new terminal and run 'npm run server-dev'
- Open a new terminal from the spec directory run 'RUN=true node populateDB.js'
- Open a new terminal from the IOS_client directory run 'npm install'
- Launch emulator/simulator for the respective device you wish to emulate
- From the IOS_client directory run either 'react-native run-ios' or 'react-native run-android'
- Use a Mac/Linux to implement this repository (no bat file included for Windows)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
