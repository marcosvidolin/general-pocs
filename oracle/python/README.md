# pyoracle

Ubuntu image with Python and Oracle Instant Client

## How to

Run the image

```bash
docker run -p 5000:5000 -e "DB_USERNAME=myuser" -e "DB_PASSWORD=mypass" -e "DB_CONNECT_DESCRIPTOR=localhost:1521/foo" vidolin/pyoracle:latest
```

```bash
docker run -p 5000:5000 -e "QUERY=select 'Hello Oracle' from dual" -e "DB_USERNAME=myuser" -e "DB_PASSWORD=mypass" -e "DB_CONNECT_DESCRIPTOR=localhost:1521/foo" vidolin/pyoracle:latest
```

Test the connection

```bash
curl localhost:5000
```

Will return: "Hello, World from Oracle DB!"

## Thanks to

[@egojason](https://github.com/egojason/)

## Contributors
