# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

from pymongo import MongoClient
from scrapy.exceptions import DropItem
from scrapy.conf import settings
from scrapy import log
from scrapy.contrib.pipeline.images import ImagesPipeline

class DoubanmoviesPipeline(ImagesPipeline):
    # def __init__(self):
    #     connection = MongoClient(
    #         settings['MONGODB_SERVER'],
    #         settings['MONGODB_PORT']
    #     )
    #     db = connection[settings['MONGODB_DB']]
    #     self.collection = db[settings['MONGODB_COLLECTION']]

    def get_media_requests(self, item, info):
        for image_url in item['image_urls']:
            yield scrapy.Request(image_url, meta={'item': item})

    def item_completed(self, results, item, info):
        image_paths = [x['path'] for ok, x in results if ok]
        if not image_paths:
            raise DropItem("Item contains no images")
        return item

    def file_path(self, request, response=None, info=None):
        item = request.meta['item']
        name = item['name']
        filename = u'full/{0}.jpg'.format(name)
        return filename

    # def process_item(self, item, spider):
    # 	valid = True
    # 	for data in item:
    # 		if not data:
    # 			valid = False
    # 			raise DropItem('Missing %s' % data)
    # 	if valid:
    # 		new_movie = [{
    # 			"name":item['name'][0],
    #             "year":item['year'][0],
    #             "score":item['score'][0],
    #             "director":item['director'],
    #             "classification":item['classification'],
    #             "actor":item['actor']
    # 		}]
    # 	self.collection.insert(new_movie)
    # 	log.msg("Item wrote to MongoDB database %s/%s" %
    #         (settings['MONGODB_DB'], settings['MONGODB_COLLECTION']),
    #         level=log.DEBUG, spider=spider)
    #     return item
