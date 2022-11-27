const connectSocket = ({ io, connectedUsers }) => {
  return function(req, _res, next) {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
  };
};

export default connectSocket
