# 4KHD WEBSITE

## Start project

Run:

`yarn`

to download dependencies. Run:

`yarn start`

to start local server.

## Update and format data

Copy and paste ALL data entries in `./public/data`.

They must be `.csv` files with the following structure:

```
day,city start,country start,city end,country end,total distance [km],total time [h],mean velocity [km/h],total climb [m],total descent [m]
1,Legnano,Italy,Surses,Switzerland,226.719,10.2962026814,22.01967142794944,5293.399999999986,4016.2999999999874
longitude,latitude,altitude
8.914221,45.59827,207.3
8.913413,45.597987,207.7
8.912522,45.597723,208.1
```

Run:

`yarn format-data`
