import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web
 

hard_messages = ['Snell Arena;Science Center Showdown;C.A.M.P. Implosion', 'testlvl']

class WSHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        print 'new connection'
      
    def on_message(self, message):
        print 'message received %s' % message
        _id = message.split(":")[0]
        func = int(message.split(":")[1])
        self.write_message(_id + ":" + hard_messages[func])
 
    def on_close(self):
      print 'connection closed'
 
 
application = tornado.web.Application([(r'/ws', WSHandler),])
 
 
if __name__ == "__main__":
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
