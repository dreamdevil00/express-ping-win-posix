var os        = require('os'),
    diskusage = require('diskusage'),
    drivelist = require('drivelist'),
    async     = require('async'),
    path      = require('path');

function loadMainPackageJSON(attempts) {
  attempts = attempts || 1;
  if (attempts > 5) {
    throw new Error('Can\'t resolve main package.json file')
  }
  var mainPath = attempts === 1 ? './': Array(attempts).join("../");
  try {
    return require.main.require(mainPath + 'package.json');
  } catch (e) {
    return loadMainPackageJSON(attempts + 1);
  }
}

var pjson = loadMainPackageJSON();
var DEFAULT_PATH = '/ping';


/**
 * Get mount path
 * @param {function} cb 
 */
function getMountPoints(cb) {
  drivelist.list(function (err, drives) {
    if (err) {
      cb && cb(err);
      return;
    }

    var pathsArr = [];
    drives.forEach(function (drive) {
      drive.mountpoints.forEach(function (pathObj) {
        pathsArr.push(pathObj.path)
      })
    })

    cb && cb(null, pathsArr);
  })
}

/**
 * Get one disk info
 * @param {string} path 
 * @param {function} cb 
 */
function diskCheck(path, cb) {
  diskusage.check(path, function (err, info) {
    if (err) {
      cb && cb(err);
      return;
    }
    info.path = path;
    cb && cb(null, info)
  })
}

/**
 * Get all disk info in the system
 * @param {function} cb 
 */
function diskInfo(cb) {
  getMountPoints(function (err, pathsArr) {
    if (err) {
      cb && cb(err);
      return;
    }
    async.map(pathsArr, function(path, callback){
      diskCheck(path, function (err, info) {
        if (err) {
          callback(err)
          return;
        }
        callback(null, info)
      })
    }, function (err, results) {
      if (err) {
        cb(err);
        return;
      }
      cb(null, results)
    })
  })
}

/**
 * Get System information
 * @param {Function } cb 
 */
function info(cb) {
  diskInfo(function (err, diskInfo) {

    if (err) {
      diskInfo = err.message;
    }
    
    var data = {
      timestamp: Date.now(),
      uptime: process.uptime(),

      application: {
        name: pjson.name,
        version: pjson.version,
        pid: process.pid,
        title: process.title,
        argv: process.argv,
        versions: process.versions,
        node_env: process.NODE_ENV,
        dependencies: pjson.dependencies
      },

      resources: {
        memory: process.memoryUsage(),
        loadavg: os.loadavg(),
        cpu: os.cpus(),
        disk: diskInfo,
        nics: os.networkInterfaces()
      },

      system: {
        arch: process.arch,
        platform: process.platform,
        type: os.type(),
        release: os.release(),
        hostname: os.hostname(),
        uptime: os.uptime(),
        cores: os.cpus().length,
        memory: os.totalmem()
      }
    };
    cb(null, data);
  })
}

function pingMiddleware(path) {
  path = path || DEFAULT_PATH;
  return function pingMiddleware(req, res, next) {
    if (req.path === path) {
      info(function (err, data) {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(data, null, 2));
      });
    } else {
      next()
    }
  }
}
module.exports = {
  info: info,
  ping: pingMiddleware
}