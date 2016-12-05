# Poverty Calculator Microservice

This repository implements the Poverty Calculator Service

## Quick Overview


### FindByCountry Poverty

```
GET: /poverty/:country

```

"country" -> url param must be ISO coded
"povertyLine" -> this attribute is required and it's mandatory to include it in the QueryParam.
"years" -> (optional) filter the query by years (if it's not set, the default value is years from 2010 to 2015 both included)

### CRUD Examples

#### Getting

```
GET: /poverty/BRA?povertyLine=1.0
GET: /poverty/AUT?povertyLine=2.0&years=2010
GET: /poverty/BEL?povertyLine=1.5&years=2010,2011,2012,2013,2014,2015
```

#### Next Endpoints -> Some Countries, povertyLine interval, PPP param...

Ir order to contribute to this repo:

1. [Getting Started](#getting-started)
2. [Deployment](#deployment)

## Getting Started

### OS X

**First, make sure that you have the [API gateway running
locally](https://github.com/control-tower/control-tower).**

We're using Docker which, luckily for you, means that getting the
application running locally should be fairly painless. First, make sure
that you have [Docker Compose](https://docs.docker.com/compose/install/)
installed on your machine.

If you've not used Docker before, you may need to set up some defaults:

```
docker-machine create --driver virtualbox default
docker-machine start default
eval $(docker-machine env default)
```

You also need to configure an alias for your local machine:

Get your local IP:

```
ifconfig
```

Modify the /etc/hosts config file adding a new rule:
<your ip> mymachine
```
vim /etc/hosts
```

Now we're ready to actually get the application running:

```
git clone https://github.com/vizzuality/poverty_calculator
cd poverty_calculator
./povcal.sh develop
```

You can now access the microservice through the API gateway.

## Deployment

In progress...
