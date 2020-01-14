#!/bin/bash

cd stack && npm install && sls deploy -v && cd - || exit 1