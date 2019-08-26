import { default as OriginalWorkflowy } from 'opusfluxus'
import Q from 'q'

// <!-- Copied from 'opusfluxus'
var utils = {
  getTimestamp: function (meta) {
    return Math.floor((Date.now() - meta.projectTreeData.mainProjectTreeInfo.dateJoinedTimestampInSeconds) / 60)
  },
  makePollId: function () {
    return (Math.random() + 1).toString(36).substr(2, 8)
  },
  httpAbove299toError: function (arg) {
    var body, error, resp
    resp = arg[0], body = arg[1]
    var status = resp.statusCode
    if (!((status === 302) && (resp.headers.location === 'https://workflowy.com/' || resp.headers.location === '/'))) {
      if ((300 <= status && status < 600)) {
        return Q.reject({ status: status, message: 'Error with request ' + resp.request.uri.href + ': ' + status })
      }
      if (error = body.error) {
        return Q.reject({ status: status, message: 'Error with request ' + resp.request.uri.href + ': ' + error })
      }
    }
    return arg
  },
}
// Copied from 'opusfluxus' -->

OriginalWorkflowy.prototype.meta = function () {
  var opts = {
    url: Workflowy.urls.meta
  }
  if (this.sessionid) {
    opts.headers = {
      Cookie: 'sessionid=' + this.sessionid
    }
  }
  return Q.ninvoke(this.request, 'get', opts)
    .then(utils.httpAbove299toError)
    .then(function (arg) {
      const body = arg[1]
      return body
    }).fail(function (err) {
      err.message = 'Error fetching document root: ' + err.message
      return Q.reject(err)
    })
}

export const Workflowy = OriginalWorkflowy

let jar = null

export async function fetchWorkflowy(auth) {
  const wf = new Workflowy(auth, jar)
  if (!jar) {
    await wf.login()
    jar = wf.jar
  }
  return await wf.meta()
}

