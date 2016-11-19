# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class Douban250Item(scrapy.Item):
    rank = scrapy.Field()
    title = scrapy.Field()
    link = scrapy.Field()
    star = scrapy.Field()
    rate = scrapy.Field()
    quote = scrapy.Field()
