# admin-web-app-golang-template
It is a template for easily developing web applications by combining the following tools.

- web admin template(use: gentelella)
- golang(use: echo)
- task runner(use: goemon, gulp)


# Installation

```
$ git clone git@github.com:humangas/admin-web-app-golang-template.git {app name}
$ cd $_
$ make install
```


# Development

## Web Page design
1. `$ gulp`, run web server
1. Develop gentelella resources (Resources under the following directory: production/, src/)

## Go App development
1. `$ make build`, create /assets resources
1. `$ make serve`, run goemon serve
1. just develop golang app as usual 
