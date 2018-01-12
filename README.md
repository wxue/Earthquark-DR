# Earthquark-DR
Earth quark - dangerous region query api



| Earthquark-DR    | Node.js    | loopback       |
|--------------------------|------------------|---------------|
| master                   | 9.2.1            | 3.0.0        |

### Dev environment set up

1. Install node.js
2. Install strongloop
3. Install dependencies
    ```
    npm install
    ```

### API

Using LoopBack API Explorer:

[http://localhost:3000/explorer/](http://localhost:3000/explorer/)


##### Try curl yourself:

###### 1. Region Type =  area  
(http://localhost:3000/api/earthquakes/regions?count=5&days=8&region_type=area)

```
curl -X POST --header 'Content-Type: application/x-www-form-urlencoded' --header 'Accept: application/json' -d 'count=5&days=8&region_type=area' 'http://localhost:3000/api/earthquakes/regions'
```

Return:
```
{
  "result": [
    {
      "name": "Honduras",
      "earthquake_count": 8,
      "total_magnitude": 7.6000383442056005
    },
    {
      "name": "Indonesia",
      "earthquake_count": 70,
      "total_magnitude": 6.536232337084887
    },
    {
      "name": "Bouvet Island",
      "earthquake_count": 1,
      "total_magnitude": 6.5
    },
    {
      "name": "Japan",
      "earthquake_count": 69,
      "total_magnitude": 6.134075058554392
    },
    {
      "name": "Burma",
      "earthquake_count": 13,
      "total_magnitude": 6.07124917848477
    }
  ]
}
```

###### 2. Region Type =  timezone  
(http://localhost:3000/api/earthquakes/regions?count=8&days=30&region_type=timezone)

```
curl -X POST --header 'Content-Type: application/x-www-form-urlencoded' --header 'Accept: application/json' -d 'count=8&days=30&region_type=timezone' 'http://localhost:3000/api/earthquakes/regions'
```

Return:
```
{
  "result": [
    {
      "name": "TZ 0",
      "earthquake_count": 1,
      "total_magnitude": 6.5
    },
    {
      "name": "TZ -120",
      "earthquake_count": 1,
      "total_magnitude": 5.099999999999999
    },
    {
      "name": "TZ 240",
      "earthquake_count": 1,
      "total_magnitude": 5.099999999999999
    },
    {
      "name": "TZ 180",
      "earthquake_count": 1,
      "total_magnitude": 4.900000000000001
    },
    {
      "name": "TZ -180",
      "earthquake_count": 1,
      "total_magnitude": 4.8
    },
    {
      "name": "TZ 120",
      "earthquake_count": 1,
      "total_magnitude": 4.8
    },
    {
      "name": "TZ -60",
      "earthquake_count": 1,
      "total_magnitude": 4.8
    },
    {
      "name": "TZ 360",
      "earthquake_count": 1,
      "total_magnitude": 4.7
    }
  ]
}
```