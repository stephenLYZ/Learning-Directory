# -*- coding: utf-8 -*-

# Scrapy settings for douban250 project

BOT_NAME = 'douban250'

SPIDER_MODULES = ['douban250.spiders']
NEWSPIDER_MODULE = 'douban250.spiders'




# Obey robots.txt rules
ROBOTSTXT_OBEY = True

USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.54 Safari/536.5'


# Configure a delay for requests for the same website (default: 0)
# See http://scrapy.readthedocs.org/en/latest/topics/settings.html#download-delay
# See also autothrottle settings and docs
DOWNLOAD_DELAY = 3


# Disable cookies (enabled by default)
COOKIES_ENABLED = False




# Configure item pipelines
# See http://scrapy.readthedocs.org/en/latest/topics/item-pipeline.html
ITEM_PIPELINES = {
   'douban250.pipelines.Douban250Pipeline': 300,
}

MONGODB_SERVER = 'localhost'
MONGODB_PORT = 27017
MONGODB_DB = 'doubanmovies'
MONGODB_COLLECTION = 'doubanmovies'



