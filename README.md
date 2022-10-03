jeeves-cli
=================

A nodejs CLI application with some helpful utilities

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g jeeves-cli
$ jeeves COMMAND
running command...
$ jeeves (--version)
jeeves-cli/0.1.0 darwin-x64 node-v16.17.0
$ jeeves --help [COMMAND]
USAGE
  $ jeeves COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`jeeves help [COMMAND]`](#jeeves-help-command)
* [`jeeves ip`](#jeeves-ip)
* [`jeeves ip internet`](#jeeves-ip-internet)
* [`jeeves joke`](#jeeves-joke)
* [`jeeves plugins`](#jeeves-plugins)
* [`jeeves plugins:install PLUGIN...`](#jeeves-pluginsinstall-plugin)
* [`jeeves plugins:inspect PLUGIN...`](#jeeves-pluginsinspect-plugin)
* [`jeeves plugins:install PLUGIN...`](#jeeves-pluginsinstall-plugin-1)
* [`jeeves plugins:link PLUGIN`](#jeeves-pluginslink-plugin)
* [`jeeves plugins:uninstall PLUGIN...`](#jeeves-pluginsuninstall-plugin)
* [`jeeves plugins:uninstall PLUGIN...`](#jeeves-pluginsuninstall-plugin-1)
* [`jeeves plugins:uninstall PLUGIN...`](#jeeves-pluginsuninstall-plugin-2)
* [`jeeves plugins update`](#jeeves-plugins-update)
* [`jeeves weather`](#jeeves-weather)

## `jeeves help [COMMAND]`

Display help for jeeves.

```
USAGE
  $ jeeves help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for jeeves.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `jeeves ip`

Provides information about your internet ip address

```
USAGE
  $ jeeves ip

DESCRIPTION
  Provides information about your internet ip address

EXAMPLES
  Show machine ip address

    $ jeeves ip
```

_See code: [dist/commands/ip/index.ts](https://github.com/gchristiansen/jeeves-cli/blob/v0.1.0/dist/commands/ip/index.ts)_

## `jeeves ip internet`

Provides information about your internet ip address

```
USAGE
  $ jeeves ip internet [-d]

FLAGS
  -d, --detail

DESCRIPTION
  Provides information about your internet ip address

EXAMPLES
  Show internet ip address

    $ jeeves ip internet

  Show internet ip address with detail

    $ jeeves ip internet -d | --detail
```

## `jeeves joke`

describe the command here

```
USAGE
  $ jeeves joke [-t]

FLAGS
  -t, --type

DESCRIPTION
  describe the command here

EXAMPLES
  Get a random joke

    $ jeeves joke

  Get a random joke by type

    $ jeeves joke --type | -t
```

_See code: [dist/commands/joke.ts](https://github.com/gchristiansen/jeeves-cli/blob/v0.1.0/dist/commands/joke.ts)_

## `jeeves plugins`

List installed plugins.

```
USAGE
  $ jeeves plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ jeeves plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.1/src/commands/plugins/index.ts)_

## `jeeves plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ jeeves plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ jeeves plugins add

EXAMPLES
  $ jeeves plugins:install myplugin 

  $ jeeves plugins:install https://github.com/someuser/someplugin

  $ jeeves plugins:install someuser/someplugin
```

## `jeeves plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ jeeves plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ jeeves plugins:inspect myplugin
```

## `jeeves plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ jeeves plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ jeeves plugins add

EXAMPLES
  $ jeeves plugins:install myplugin 

  $ jeeves plugins:install https://github.com/someuser/someplugin

  $ jeeves plugins:install someuser/someplugin
```

## `jeeves plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ jeeves plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ jeeves plugins:link myplugin
```

## `jeeves plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ jeeves plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ jeeves plugins unlink
  $ jeeves plugins remove
```

## `jeeves plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ jeeves plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ jeeves plugins unlink
  $ jeeves plugins remove
```

## `jeeves plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ jeeves plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ jeeves plugins unlink
  $ jeeves plugins remove
```

## `jeeves plugins update`

Update installed plugins.

```
USAGE
  $ jeeves plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `jeeves weather`

describe the command here

```
USAGE
  $ jeeves weather [-c <value> | -z <value>]

FLAGS
  -c, --city=<value>
  -z, --zip=<value>   Zip code to retrieve weather from

DESCRIPTION
  describe the command here

EXAMPLES
  Show weather based on machine location (Uses GeoIp info)

    $ jeeves weather

  Show weather for specified city

    $ jeeves weather --city | -c

  Show weather for city with multiple words - option 1 enclose in ""

    $ jeeves weather --city "salt lake city"

  Show weather for city with multiple words - option 2 use either "-" or "_" to separate

    $ jeeves weather --city salt-lake-city

  Show weather for common city name, include country code to be more specific

    $ jeeves weather --city london,uk or jeeves weather --city london,us

  Show weather for specified zip code

    $ jeeves weather --zip | -z

  Show weather for specified zip code outside US, then country code must be included

    $ jeeves weather --zip 6000,ph
```

_See code: [dist/commands/weather.ts](https://github.com/gchristiansen/jeeves-cli/blob/v0.1.0/dist/commands/weather.ts)_
<!-- commandsstop -->
