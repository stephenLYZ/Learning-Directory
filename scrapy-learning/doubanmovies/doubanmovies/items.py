# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

from scrapy import Item
from scrapy import Field


class DoubanmoviesItem(Item):
    # define the fields for your item here like:
    movie_name=scrapy.Field()
    star=scrapy.Field()
    quote=scrapy.Field()
