# -*- coding: utf-8 -*-


from pymongo import MongoClient
from scrapy.exceptions import DropItem
from scrapy.conf import settings
from scrapy import log

class Douban250Pipeline(object):
    def __init__(self):
        connection = MongoClient(
            settings['MONGODB_SERVER'],
            settings['MONGODB_PORT']
        )
        db = connection[settings['MONGODB_DB']]
        self.collection = db[settings['MONGODB_COLLECTION']]
        
    def process_item(self, item, spider):
    	valid = True
    	for data in item:
    		if not data:
    			valid = False
    			raise DropItem('Missing %s' % data)
    	if valid:
    		new_movie = [{
    			"rank":item['rank'][0],
                "title":item['title'][0],
                "link":item['link'][0],
                "star":item['star'],
                "rate":item['rate'],
                "quote":item['quote']
    		}]
    	self.collection.insert(new_movie)
    	log.msg("Item wrote to MongoDB database %s/%s" %
            (settings['MONGODB_DB'], settings['MONGODB_COLLECTION']),
            level=log.DEBUG, spider=spider)
        return item
