import json

import web
from mako.template import Template

urls = (
    '/', 'index',
    '/books/', 'Books',
)

class index:
    def GET(self):
        t = Template(filename='collection.html', input_encoding='utf-8')
        return t.render()

class Books:
    def GET(self):
        result = []
        for i in range(5):
            result.append({"title": "book%s" % i})

            print result
        return json.dumps(result)

    def POST(self):
        data = web.data()
        print data
        return "success"


if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()