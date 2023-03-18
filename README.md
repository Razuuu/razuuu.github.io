# Razuuu's Homepage

## nginx
Proxy pass configuration, no symlink needed or something else

```nginx
server {
        ...

        location /index.html {
                proxy_pass https://razuuu.github.io;
        }
}
```

## Error in the nginx log file

```... directory index of "/var/www/html/" is forbidden ... ```

To fix this, create an empty file
```bash
touch /var/www/html/index.html
```

You're done!
