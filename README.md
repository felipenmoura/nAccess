# NAccess

HTAccess for NodeJS, as middleware or being used independently to deal with requisitions and manage paths.

Using this module, you will be able to get a canonised, final result of a path, obeying rules for each directory.

//TODO: add build, test and validate stickers

### Why?

HTAccess has been largely used throughout the world in many, many pages, also assuring safety of systems and allowing developers to do more.

The problem with HTAccess:
- terrible syntax
- confusing pattern
- demands some time to learn and understand
- terrible for debugging problems on itself

### Advantages

NAccess come to serve some of HTAccess' features, but in a more organised, clean, easy-to-maintain way!<br/>
With it, you will have the same power to configure, protect, validate, redirect and log much more with node.js.
This module can also be used as a middleware for node frameworks like express or restify, for example.

- Fast to configure: One of its focuses is to be easy to learn, configure and understand.
- Easy maintenance: Maintaining and applying changes should be ease!
- Safe: It relies on safety for your files and paths, according to your configuration.
- Fast: We try our best to have the least overload as possible, keeping the well known performance nodejs has.
- Debugging: Offering a debugging tool is something you might expect! What about a graphic one?
- Plugins: It supports the use of addons(if enabled) to extend its power
- Modulable(API): This means you can use it as a module, extend it, and use a powerful API to do more.

## installation

//TODO<br/>
```npm install -g naccess```

## Configuration

//TODO: it must be created
You may change the default global options via:

```naccess --config```

This should open your default editor showing you the default global options as a json, for you change as you will.

To enable the naccess in a given project, you must create a ```.naccess.json``` file on the root directory of the project.<br/>
You may create a .naccess.json file into different projects to see rules overwritten(if enabled both globally, and by the config on the root directory).

To create your .naccess.json file, follow this pattern:<br/>
//TODO: finish the final pattern and document it<br/>
https://github.com/felipenmoura/nAccess/issues/2

## Security

You are advised to apply some ```chmod``` rules to the .naccess.json files, just to be sure no unwanted change will be applied to it.<br/>
Try using something like ```744``` at least for the .naccess.json on the root directory of your project.

## API

The NAccess API allows you to get information from the global settings or the local settings, get some specific path permissions or redirections, outputs, among many other features.

//TODO: Create the API and document it well
