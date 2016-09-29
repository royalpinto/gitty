#### Demo setup using docker
```bash
docker-compose -f demo/docker-compose.yml up --build
```

Examples requests after the setup.
```bash
curl -i -X GET 'http://localhost:3000/api/events/'
```
