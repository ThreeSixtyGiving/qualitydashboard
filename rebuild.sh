#!/bin/sh -ex
rm -rf build
cd qualitydashboard
npm i
npm run build
git submodule update --init --recursive
cp -r ../360-ds/assets/ ../build/static
