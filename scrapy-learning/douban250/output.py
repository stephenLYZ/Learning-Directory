import json

def readMovieJson():
    inFile = open("./result.json",'r',0)
    text = inFile.read() 
    movie_dict = json.loads(text) 
    for movie in movie_dict: 
        rank = movie["rank"][0] 
        title = movie["title"][0]
        link = movie["link"][0]
        star = movie["star"][0]
        rate = movie["rate"][0]
        quote = movie["quote"][0]

        print "top " + rank + "." + \
              title + " star " + star + \
              '(' + rate + ')' + \
              "\nlink:" + link + \
              "\nquote:" + quote + "\n"