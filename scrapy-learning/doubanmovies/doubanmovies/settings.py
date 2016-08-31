# -*- coding: utf-8 -*-

# Scrapy settings for doubanmovies project

BOT_NAME = 'doubanmovies'

SPIDER_MODULES = ['doubanmovies.spiders']
NEWSPIDER_MODULE = 'doubanmovies.spiders'


ITEM_PIPELINES = [
	'doubanmovies.pipelines.DoubanmoviesPipeline',
]
IMAGES_STORE = '.'

LOG_LEVEL='DEBUG'

DOWNLOAD_DELAY = 10

RANDOMIZE_DOWNLOAD_DELAY = True
USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.54 Safari/536.5'
COOKIES_ENABLED = True

MONGODB_SERVER = 'localhost'
MONGODB_PORT = 27017
MONGODB_DB = 'doubanmovies'
MONGODB_COLLECTION = 'doubanmovies'