# express-ping-win-posix

## Why?

I want to get some information about disk info the server listening on,
and found [express-ping](https://github.com/palmerabollo/express-ping) nearly fit my need, but it's a pity that it does not support windows. So I make some changes to it to support windows.

## Usage

The usage of this middleware is the same as [express-ping](https://github.com/palmerabollo/express-ping),
but there is some differences in diskinfo between this middleware and the express-ping.
You will receive the following information:
```
{
  "timestamp": 1498116125059,
  "uptime": 15.704,
  "application": {
    "name": "express-ping-win-posix-example",
    "version": "1.0.0",
    "pid": 22476,
    "title": "管理员:   - node  .",
    "argv": [
      "C:\\Program Files\\nodejs\\node.exe",
      "E:\\Lab\\express-ping-win-posix\\examples"
    ],
    "versions": {
      "http_parser": "2.7.0",
      "node": "6.10.3",
      "v8": "5.1.281.101",
      "uv": "1.9.1",
      "zlib": "1.2.11",
      "ares": "1.10.1-DEV",
      "icu": "58.2",
      "modules": "48",
      "openssl": "1.0.2k"
    },
    "dependencies": {
      "express": "^4.15.3"
    }
  },
  "resources": {
    "memory": {
      "rss": 39145472,
      "heapTotal": 25251840,
      "heapUsed": 17003336,
      "external": 249788
    },
    "loadavg": [
      0,
      0,
      0
    ],
    "cpu": [
      {
        "model": "Intel(R) Core(TM)2 Duo CPU     E8200  @ 2.66GHz",
        "speed": 2666,
        "times": {
          "user": 65169433,
          "nice": 0,
          "sys": 81525139,
          "idle": 645088361,
          "irq": 1400654
        }
      },
      {
        "model": "Intel(R) Core(TM)2 Duo CPU     E8200  @ 2.66GHz",
        "speed": 2666,
        "times": {
          "user": 72378660,
          "nice": 0,
          "sys": 81296005,
          "idle": 638107020,
          "irq": 1228866
        }
      }
    ],
    "disk": [
      {
        "available": 2856988672,
        "free": 2856988672,
        "total": 53694595072,
        "path": "C:"
      },
      {
        "available": 9942626304,
        "free": 9942626304,
        "total": 98793803776,
        "path": "D:"
      },
      {
        "available": 34008039424,
        "free": 34008039424,
        "total": 97568235520,
        "path": "E:"
      }
    ],
    "nics": {
      "本地连接": [
        {
          "address": "fe80::911:64d4:aa3e:c12",
          "netmask": "ffff:ffff:ffff:ffff::",
          "family": "IPv6",
          "mac": "00:22:15:04:cc:6b",
          "scopeid": 11,
          "internal": false
        },
        {
          "address": "10.132.179.242",
          "netmask": "255.255.255.240",
          "family": "IPv4",
          "mac": "00:22:15:04:cc:6b",
          "internal": false
        }
      ],
      "Loopback Pseudo-Interface 1": [
        {
          "address": "::1",
          "netmask": "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
          "family": "IPv6",
          "mac": "00:00:00:00:00:00",
          "scopeid": 0,
          "internal": true
        },
        {
          "address": "127.0.0.1",
          "netmask": "255.0.0.0",
          "family": "IPv4",
          "mac": "00:00:00:00:00:00",
          "internal": true
        }
      ]
    }
  },
  "system": {
    "arch": "x64",
    "platform": "win32",
    "type": "Windows_NT",
    "release": "6.1.7601",
    "hostname": "PC200201010012",
    "uptime": 791781.713459,
    "cores": 2,
    "memory": 7515267072
  }
}
```

## License
MIT






