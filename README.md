# Flight Search API

This is an implementation of a microservice written with [NestJS](https://nestjs.com/) to solve the path search for a list of flight records.

## Installation

Clone the current repository:

```bash
git clone git@github.com:ghiblin/flight-path-finder.git
```

and install the dependencies:

```bash
pnpm install
```

## API

The only implemented API endpoint (at the moment) is the following: `POST /flights/search-path`.
It takes a list of flight records, like the following one:

```json
[
  ["IND", "EWR"],
  ["SFO", "ATL"],
  ["GSO", "IND"],
  ["ATL", "GSO"]
]
```

To be a valid flight record, the item should:

- have only 2 elements
- each element should be a string of 3 characters.

The API endpoints returns the following payload in case of success:

```json
{ "path": ["ABC", "CDE"] }
```

otherwise it returns an HTTP 400 error with a description of the cause.
