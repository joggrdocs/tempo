# Why Tempo

## Background

At [Joggr](https://joggr.io), the core of our application is a developer-first docs editor that allows users to create and edit their documentation, which is then stored as Markdown files in a GitHub repository. 

## Problem

There are two core problems we needed to solve:

1. Markdown is not 100% standardized 
2. Markdown can be difficult to work with programmatically

When it came down to it, we needed a way to input some data and output a Markdown file in a standardized format. So we built Tempo.

## How we use Tempo

We use Tempo for a lot of things with-in our platform:

* Joggr's core templates
* Generating documentation using LLMs
* Templated prompts for interacting with LLMs
* Templatizing the outputs of LLM (aka can we get a standardized format even if the content changes)

We also use Tempo internally in an operational capacity:

* Generating release notes
* Generating changelogs
* Generating READMEs for internal GitHub Actions

## Why not use a templating engine?

We could have used a templating engine like Handlebars or Liquid, but we wanted to keep things simple and use Markdown as the source of truth. We also wanted to be able to use the same templates for both the input and output of our documentation.

## Why not use a markdown parser?

We could have used a markdown parser (like [remark](https://github.com/remarkjs/remark)) but we wanted to be able to control the output format and not include the bloat of a full markdown parser.