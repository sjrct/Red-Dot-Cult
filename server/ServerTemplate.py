import tornado.httpserver
import tornado.ioloop
import tornado.web

from Player import Player
from Arena import Arena

application = tornado.web.Application([(r'/ws', Player)])

if __name__ == "__main__":
	http_server = tornado.httpserver.HTTPServer(application)
	http_server.listen(8888)
	tornado.ioloop.IOLoop.instance().start()
